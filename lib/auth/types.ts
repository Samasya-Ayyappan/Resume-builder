/**
 * Types and interfaces prepared for Phase 2: Authentication and Cloud Storage
 */

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface UserSession {
  user: UserProfile | null;
  token?: string;
  expiresAt?: string;
}

export interface CloudResumeRecord {
  id: string;
  userId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  isPublic: boolean;
  slug?: string;
}
