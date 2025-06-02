import { describe, it, expect } from 'vitest'
import { getMateriasMock } from './data/materia';

describe("/api/materia - GET", () => {
  it('should return a list of materias', async () => {
    const response = await fetch('http://localhost:3000/api/materia')
 
    await expect(response.json()).resolves.toEqual(getMateriasMock)
  });
})