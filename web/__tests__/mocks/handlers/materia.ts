import { http, HttpResponse } from 'msw';
import { getMateriasMock } from '../../data/materia';

export const materiaHandlers = [
  http.get('http://localhost:3000/api/materia', () => {
    return HttpResponse.json(getMateriasMock);
  }),
];
