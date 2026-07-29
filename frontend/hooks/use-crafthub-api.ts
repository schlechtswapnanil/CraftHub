"use client";

import { useMutation, useQuery } from "@tanstack/react-query";

import {
  draftEmail,
  fetchDocuments,
  sendChatQuestion,
  submitIntake,
  uploadDocument
} from "@/lib/api";

export function useDocuments() {
  return useQuery({
    queryKey: ["documents"],
    queryFn: fetchDocuments
  });
}

export function useChat() {
  return useMutation({
    mutationFn: (question: string) => sendChatQuestion(question)
  });
}

export function useUpload() {
  return useMutation({
    mutationFn: (file: File) => uploadDocument(file)
  });
}

export function useIntake() {
  return useMutation({
    mutationFn: submitIntake
  });
}

export function useDraftEmail() {
  return useMutation({
    mutationFn: draftEmail
  });
}
