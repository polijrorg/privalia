import { MockContext, Context, createMockContext } from '@/context'
import { getAllMaterias } from '@/services/api/materia'

let mockCtx: MockContext
let ctx: Context

beforeEach(() => {
  mockCtx = createMockContext()
  ctx = mockCtx as unknown as Context
})

describe('/api/materias - getAllMaterias', () => {
  it('should return all materias successfully', async () => {
    // Arrange
    const mockMaterias = [
      { 
        id: 1, 
        name: 'Matemática', 
        codigo: 'MAT001',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01')
      },
      { 
        id: 2, 
        name: 'Português', 
        codigo: 'POR001',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01')
      },
    ]
    
    mockCtx.prisma.materia.findMany.mockResolvedValue(mockMaterias)

    // Act
    const result = await getAllMaterias(ctx)

    // Assert
    expect(result).toEqual(mockMaterias)
    expect(mockCtx.prisma.materia.findMany).toHaveBeenCalledWith({
      orderBy: {
        name: 'asc'
      }
    })
    expect(mockCtx.prisma.materia.findMany).toHaveBeenCalledTimes(1)
  })

  it('should return empty array when no materias exist', async () => {
    // Arrange
    mockCtx.prisma.materia.findMany.mockResolvedValue([])

    // Act
    const result = await getAllMaterias(ctx)

    // Assert
    expect(result).toEqual([])
    expect(mockCtx.prisma.materia.findMany).toHaveBeenCalledTimes(1)
  })

  it('should throw error when database fails', async () => {
    // Arrange
    const dbError = new Error('Database connection failed')
    mockCtx.prisma.materia.findMany.mockRejectedValue(dbError)

    // Act & Assert
    await expect(getAllMaterias(ctx)).rejects.toThrow('Error: Database connection failed')
    expect(mockCtx.prisma.materia.findMany).toHaveBeenCalledTimes(1)
  })

  it('should order materias by name ascending', async () => {
    // Arrange
    const mockMaterias = [
      { id: 1, name: 'Física', codigo: 'FIS001' },
      { id: 2, name: 'Matemática', codigo: 'MAT001' },
      { id: 3, name: 'Química', codigo: 'QUI001' },
    ]
    
    mockCtx.prisma.materia.findMany.mockResolvedValue(mockMaterias)

    // Act
    await getAllMaterias(ctx)

    // Assert
    expect(mockCtx.prisma.materia.findMany).toHaveBeenCalledWith({
      orderBy: {
        name: 'asc'
      }
    })
  })
})