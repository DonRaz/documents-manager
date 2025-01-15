export type DocumentStatus = 'pending_signature' | 'in_review' | 'completed' | 'archived';
export type DocumentType = 'contract' | 'tax_document' | 'legal_agreement' | 'financial_report';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  initials: string;
}

export interface DocumentVersion {
  id: string;
  version: string;
  createdAt: string;
  createdBy: User;
  changes: string;
}

export interface DocumentAction {
  id: string;
  type: 'view' | 'sign' | 'comment' | 'tag' | 'share';
  user: User;
  timestamp: string;
  details: string;
}

export interface Document {
  id: string;
  title: string;
  type: DocumentType;
  status: DocumentStatus;
  createdAt: string;
  modifiedAt: string;
  owner: User;
  pendingSigners: User[];
  tags: string[];
  versions: DocumentVersion[];
  actions: DocumentAction[];
  currentVersion: string;
}