import { useSyncExternalStore } from "react";
import type {
  ContactTemplate,
  ContactTemplateId,
} from "@/content/site/contact";

export interface ContactDraftState {
  subject: string;
  message: string;
  selectedTemplate: ContactTemplateId | null;
  baselineSubject: string;
  baselineMessage: string;
}

const initialDraftState: ContactDraftState = {
  subject: "",
  message: "",
  selectedTemplate: null,
  baselineSubject: "",
  baselineMessage: "",
};

let currentDraftState: ContactDraftState = { ...initialDraftState };
let isSessionActive = false;
const listeners = new Set<() => void>();

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

export function isDraftEdited(state: ContactDraftState = currentDraftState): boolean {
  return (
    state.subject !== state.baselineSubject ||
    state.message !== state.baselineMessage
  );
}

export function getDraftState(): ContactDraftState {
  return currentDraftState;
}

function getServerDraftState(): ContactDraftState {
  return initialDraftState;
}

export function subscribeDraftState(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function updateDraftFields(subject: string, message: string): void {
  currentDraftState = {
    ...currentDraftState,
    subject,
    message,
  };
  isSessionActive = true;
  emitChange();
}

export function applyTemplateToDraft(template: ContactTemplate): void {
  currentDraftState = {
    subject: template.subject,
    message: template.message,
    selectedTemplate: template.id,
    baselineSubject: template.subject,
    baselineMessage: template.message,
  };
  isSessionActive = true;
  emitChange();
}

export function clearDraftState(): void {
  currentDraftState = {
    ...initialDraftState,
  };
  isSessionActive = true;
  emitChange();
}

export function resetContactSession(): void {
  currentDraftState = {
    ...initialDraftState,
  };
  isSessionActive = false;
  emitChange();
}

export function syncContactRoute(pathname: string | null | undefined): void {
  if (!pathname) return;
  const isContact =
    pathname === "/en/contact" ||
    pathname === "/id/contact" ||
    pathname.endsWith("/contact") ||
    pathname.endsWith("/contact/");

  if (!isContact && isSessionActive) {
    resetContactSession();
  }
}

export function useContactDraftStore(): {
  draft: ContactDraftState;
  isEdited: boolean;
  updateFields: (subject: string, message: string) => void;
  applyTemplate: (template: ContactTemplate) => void;
  clearDraft: () => void;
} {
  const draft = useSyncExternalStore(
    subscribeDraftState,
    getDraftState,
    getServerDraftState,
  );

  return {
    draft,
    isEdited: isDraftEdited(draft),
    updateFields: updateDraftFields,
    applyTemplate: applyTemplateToDraft,
    clearDraft: clearDraftState,
  };
}
