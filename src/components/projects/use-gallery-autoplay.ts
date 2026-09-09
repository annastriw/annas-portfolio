"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

export interface UseGalleryAutoplayOptions {
  slideCount: number;
  intervalMs?: number;
  isLightboxOpen?: boolean;
}

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined" || !window.matchMedia) {
    return () => {};
  }
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener("change", callback);
    return () => mediaQuery.removeEventListener("change", callback);
  }
  mediaQuery.addListener(callback);
  return () => mediaQuery.removeListener(callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

function subscribeVisibility(callback: () => void) {
  if (typeof document === "undefined") {
    return () => {};
  }
  document.addEventListener("visibilitychange", callback);
  return () => {
    document.removeEventListener("visibilitychange", callback);
  };
}

function getVisibilitySnapshot() {
  if (typeof document === "undefined") return true;
  return document.visibilityState === "visible";
}

function getVisibilityServerSnapshot() {
  return true;
}

export function useGalleryAutoplay({
  slideCount,
  intervalMs = 4000,
  isLightboxOpen = false,
}: UseGalleryAutoplayOptions) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [trackIndex, setTrackIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [timerKey, setTimerKey] = useState(0);

  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const userInteractionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const isReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  const isDocumentVisible = useSyncExternalStore(
    subscribeVisibility,
    getVisibilitySnapshot,
    getVisibilityServerSnapshot,
  );

  // Pause autoplay temporarily when user manually interacts
  const pauseOnInteraction = useCallback((durationMs = 8000) => {
    setIsUserInteracting(true);
    if (userInteractionTimeoutRef.current) {
      clearTimeout(userInteractionTimeoutRef.current);
    }
    userInteractionTimeoutRef.current = setTimeout(() => {
      setIsUserInteracting(false);
    }, durationMs);
  }, []);

  // Restart timer function for manual navigation
  const restartTimer = useCallback(() => {
    setTimerKey((prev) => prev + 1);
  }, []);

  const goToNext = useCallback(() => {
    if (slideCount <= 1) return;
    pauseOnInteraction();
    setIsTransitioning(true);
    setTrackIndex((prev) => {
      const currentBase = prev === slideCount + 1 ? 1 : prev === 0 ? slideCount : prev;
      const next = currentBase + 1;
      const computedActive = (next - 1 + slideCount) % slideCount;
      setActiveIndex(computedActive);
      return next;
    });
    restartTimer();
  }, [slideCount, restartTimer, pauseOnInteraction]);

  const goToPrev = useCallback(() => {
    if (slideCount <= 1) return;
    pauseOnInteraction();
    setIsTransitioning(true);
    setTrackIndex((prev) => {
      const currentBase = prev === 0 ? slideCount : prev === slideCount + 1 ? 1 : prev;
      const next = currentBase - 1;
      const computedActive = (next - 1 + slideCount) % slideCount;
      setActiveIndex(computedActive);
      return next;
    });
    restartTimer();
  }, [slideCount, restartTimer, pauseOnInteraction]);

  const goToIndex = useCallback(
    (index: number) => {
      if (index >= 0 && index < slideCount) {
        pauseOnInteraction();
        setIsTransitioning(true);
        setActiveIndex(index);
        setTrackIndex(index + 1);
        restartTimer();
      }
    },
    [slideCount, restartTimer, pauseOnInteraction],
  );

  // Handle transitionend to loop seamlessly without reverse jump
  const handleTransitionEnd = useCallback(() => {
    if (slideCount <= 1) return;
    if (trackIndex === slideCount + 1) {
      // Reached Clone_First (after last slide), silently jump to first real slide (trackIndex = 1)
      setIsTransitioning(false);
      setTrackIndex(1);
    } else if (trackIndex === 0) {
      // Reached Clone_Last (before first slide), silently jump to last real slide (trackIndex = slideCount)
      setIsTransitioning(false);
      setTrackIndex(slideCount);
    }
  }, [slideCount, trackIndex]);

  // Autoplay timer effect: 4-second interval advancing slide with seamless horizontal wrap
  useEffect(() => {
    if (
      isReducedMotion ||
      isLightboxOpen ||
      isHovered ||
      isFocused ||
      isUserInteracting ||
      !isDocumentVisible ||
      slideCount <= 1
    ) {
      return;
    }

    // Adapt interval on coarse pointer / touch devices (approx 7 seconds)
    const isCoarsePointer =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(pointer: coarse)").matches;
    const effectiveInterval = isCoarsePointer ? Math.max(intervalMs, 7000) : intervalMs;

    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTrackIndex((prev) => {
        const currentBase = prev === slideCount + 1 ? 1 : prev === 0 ? slideCount : prev;
        const next = currentBase + 1;
        const computedActive = (next - 1 + slideCount) % slideCount;
        setActiveIndex(computedActive);
        return next;
      });
    }, effectiveInterval);

    return () => {
      clearInterval(timer);
    };
  }, [
    isReducedMotion,
    isLightboxOpen,
    isHovered,
    isFocused,
    isUserInteracting,
    isDocumentVisible,
    slideCount,
    intervalMs,
    timerKey,
  ]);

  // Container focus tracking
  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback((e: React.FocusEvent<HTMLElement>) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(e.relatedTarget as Node | null)
    ) {
      setIsFocused(false);
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return {
    activeIndex,
    trackIndex,
    isTransitioning: isReducedMotion ? false : isTransitioning,
    setActiveIndex,
    goToNext,
    goToPrev,
    goToIndex,
    handleTransitionEnd,
    restartTimer,
    isHovered,
    isFocused,
    isReducedMotion,
    containerRef,
    containerProps: {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onFocusCapture: handleFocus,
      onBlurCapture: handleBlur,
    },
  };
}
