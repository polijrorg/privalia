import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'
import * as materiaService from '@/backend/services/materia'
import { GET, POST } from '@/backend/api/materia/route'
import { NextRequest } from 'next/server'
import { getMateriasMock, postMateriaMock } from './mocks/materia'

let currentRole: 'ADMIN' | 'SUPER_ADMIN' | 'USER' | null = 'ADMIN';

const getCurrentRole = () => 
  currentRole ? { user: { role: currentRole } } : null;

export const setCurrentRole = (role: 'ADMIN' | 'SUPER_ADMIN' | 'USER' | null) => {
  currentRole = role;
};

vi.mock('@/auth', () => ({
  auth: vi.fn().mockImplementation((handler) =>
    (req: NextRequest, ctx: any) => {
      const newReq = req;
      (newReq as any).auth = getCurrentRole();
      return handler(newReq, ctx)
    }
  ),
}));

vi.mock('@/backend/services/materia', () => ({
  getAllMaterias: vi.fn(),
  createMateria: vi.fn(),
}))

describe('GET /api/materia', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setCurrentRole(null);
  });

  it('returns materias from the service', async () => {
    (materiaService.getAllMaterias as Mock).mockResolvedValue(getMateriasMock);
    const response = await GET();
    
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toEqual(getMateriasMock);
    expect(materiaService.getAllMaterias).toHaveBeenCalled();
  });
});

describe('POST /api/materia', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setCurrentRole(null); // Reset auth context
  });

  const createRequest = (body = postMateriaMock) => {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');

    return new NextRequest('http://localhost:3000/api/materia', {
      method: 'POST',
      body: JSON.stringify(body),
      headers,
    });
  };

  it('should fail if unauthenticated', async () => {
    setCurrentRole(null);
    const response = await POST(createRequest(), {} as any);
    expect(response?.status).toBe(401);
  });

  it('should fail if user is not ADMIN or SUPER_ADMIN', async () => {
    setCurrentRole('USER');
    const response = await POST(createRequest(), {} as any);
    expect(response?.status).toBe(403);
  });

  it('should succeed if user is ADMIN', async () => {
    setCurrentRole('ADMIN');
    (materiaService.createMateria as Mock).mockResolvedValue(postMateriaMock);

    const response = await POST(createRequest(), {} as any);
    expect(response?.status).toBe(201);
    
    const data = await response?.json();
    expect(data).toEqual(postMateriaMock);
    expect(materiaService.createMateria).toHaveBeenCalledWith(postMateriaMock);
  });

  it('should succeed if user is SUPER_ADMIN', async () => {
    setCurrentRole('SUPER_ADMIN');
    (materiaService.createMateria as Mock).mockResolvedValue(postMateriaMock);

    const response = await POST(createRequest(), {} as any);
    expect(response?.status).toBe(201);
    
    const data = await response?.json();
    expect(data).toEqual(postMateriaMock);
  });
});