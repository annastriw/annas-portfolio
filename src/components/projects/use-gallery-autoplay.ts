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
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [timerKey, setTimerKey] = useState(0);

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

  // Restart timer function for manual navigation
  const restartTimer = useCallback(() => {
    setTimerKey((prev) => prev + 1);
  }, []);

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev < slideCount - 1 ? prev + 1 : 0));
    restartTimer();
  }, [slideCount, restartTimer]);

  const goToPrev = useCallback(() => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : slideCount - 1));
    restartTimer();
  }, [slideCount, restartTimer]);

  const goToIndex = useCallback(
    (index: number) => {
      if (index >= 0 && index < slideCount) {
        setActiveIndex(index);
        restartTimer();
      }
    },
    [slideCount, restartTimer],
  );

  // Autoplay timer effect: 4-second interval advancing slide with seamless wrap
  useEffect(() => {
    if (
      isReducedMotion ||
      isLightboxOpen ||
      isHovered ||
      isFocused ||
      !isDocumentVisible ||
      slideCount <= 1
    ) {
      return;
    }

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev < slideCount - 1 ? prev + 1 : 0));
    }, intervalMs);

    return () => {
      clearInterval(timer);
    };
  }, [
    isReducedMotion,
    isLightboxOpen,
    isHovered,
    isFocused,
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
    setActiveIndex,
    goToNext,
    goToPrev,
    goToIndex,
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
