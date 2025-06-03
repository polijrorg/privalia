import { vi } from 'vitest';
import { NextRequest } from 'next/server';
import { Role } from '@/generated/prisma';

let currentRole: Role | null = null;

export const getCurrentAuth = () => 
  currentRole ? { user: { role: currentRole } } : null;

export const setCurrentRole = (role: Role | null) => {
  currentRole = role;
};