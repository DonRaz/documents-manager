"use client";

import { useCallback } from 'react';
import { mockDocuments } from '../data/mock-data';
import { Document } from '../types/document';

export function useDocument(id: string) {
  const document = mockDocuments.find(doc => doc.id === id);
  
  const getVersionHistory = useCallback(() => {
    if (!document) return [];
    
    return [...document.versions]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [document]);

  const getActionHistory = useCallback(() => {
    if (!document) return [];
    
    return [...document.actions]
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [document]);

  return {
    document,
    getVersionHistory,
    getActionHistory,
  };
}