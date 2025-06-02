import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'
import * as materiaService from '@/backend/services/materia'
import { GET } from '@/backend/api/materia/route'

import { getMateriasMock } from './mocks/materia'

vi.mock('@/auth', () => ({
  handlers: {},
  signIn: vi.fn(),
  signOut: vi.fn(),
  auth: vi.fn(),
}));

vi.mock('@/backend/services/materia', () => ({
  getAllMaterias: vi.fn(),
  createMateria: vi.fn(),
}))

describe('GET /api/materia', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns materias from the service', async () => {
    // Arrange
    (materiaService.getAllMaterias as Mock).mockResolvedValue(getMateriasMock)

    // Act
    const response = await GET()

    // Assert
    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data).toEqual(getMateriasMock)
    expect(materiaService.getAllMaterias).toHaveBeenCalled()
  })
})