import { Document, User, DocumentVersion, DocumentAction } from '../types/document';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    initials: 'JS',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    initials: 'SJ',
  },
  {
    id: '3',
    name: 'Mike Wilson',
    email: 'm.wilson@example.com',
    initials: 'MW',
  },
];

export const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'Contract Agreement - Smith & Co',
    type: 'contract',
    status: 'pending_signature',
    createdAt: '2024-03-15T10:00:00Z',
    modifiedAt: '2024-03-20T15:30:00Z',
    owner: mockUsers[0],
    pendingSigners: [mockUsers[1], mockUsers[2]],
    tags: ['Legal', 'Contract', 'Urgent'],
    versions: [
      {
        id: 'v2',
        version: 'v1.2',
        createdAt: '2024-03-20T15:30:00Z',
        createdBy: mockUsers[0],
        changes: 'Updated terms in section 3.2',
      },
      {
        id: 'v1',
        version: 'v1.1',
        createdAt: '2024-03-18T09:15:00Z',
        createdBy: mockUsers[1],
        changes: 'Initial draft',
      },
    ],
    actions: [
      {
        id: 'a1',
        type: 'sign',
        user: mockUsers[0],
        timestamp: '2024-03-20T15:30:00Z',
        details: 'Signed the document',
      },
      {
        id: 'a2',
        type: 'tag',
        user: mockUsers[1],
        timestamp: '2024-03-19T11:20:00Z',
        details: "Added tags: 'Legal', 'Urgent'",
      },
    ],
    currentVersion: 'v1.2',
  },
  {
    id: '2',
    title: 'Annual Tax Report 2023',
    type: 'tax_document',
    status: 'completed',
    createdAt: '2024-03-10T09:00:00Z',
    modifiedAt: '2024-03-19T16:45:00Z',
    owner: mockUsers[1],
    pendingSigners: [],
    tags: ['Tax', 'Financial', '2023'],
    versions: [
      {
        id: 'v1',
        version: 'v1.0',
        createdAt: '2024-03-10T09:00:00Z',
        createdBy: mockUsers[1],
        changes: 'Final version',
      },
    ],
    actions: [
      {
        id: 'a1',
        type: 'view',
        user: mockUsers[2],
        timestamp: '2024-03-19T16:45:00Z',
        details: 'Reviewed final version',
      },
    ],
    currentVersion: 'v1.0',
  },
];