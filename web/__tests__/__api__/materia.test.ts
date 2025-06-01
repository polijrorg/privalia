import { MockContext, Context, createMockContext } from '@/context'
import { getAllMaterias } from '@/backend/services/materia'

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
        id: '1', 
        name: 'Matemática', 
        descricao: 'Matéria de matemática',
        cor: '#FF0000',
        slug: 'matematica'
      },
      { 
        id: '2', 
        name: 'Português', 
        descricao: 'Matéria de português',
        cor: '#00FF00',
        slug: 'portugues'
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
    mockCtx.prisma.materia.findMany.mockResolvedValue([])

    const result = await getAllMaterias(ctx)

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

    const mockMaterias = [
      { id: '1', name: 'Física', descricao: 'Matéria de física', cor: '#0000FF', slug: 'fisica' },
      { id: '2', name: 'Matemática', descricao: 'Matéria de matemática', cor: '#FF0000', slug: 'matematica' },
      { id: '3', name: 'Química', descricao: 'Matéria de química', cor: '#00FFFF', slug: 'quimica' },
    ]
    
    mockCtx.prisma.materia.findMany.mockResolvedValue(mockMaterias)
    
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
