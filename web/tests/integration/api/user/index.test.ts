import { describe, it, vi, beforeEach, expect, Mock } from "vitest";
import * as userService from '@/backend/services/user'
import * as authService from '@/backend/services/auth'
import { postUserMock } from "../../mocks/user";
import { createRequest } from "../../mocks/requests";

vi.mock('@/backend/services/user', () => ({
  findUserByEmail: vi.fn(),
}))

import { POST } from '@/backend/api/user/route'

describe.skip('POST /api/user', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const createUserRequest = () => createRequest(postUserMock, 'user')

  it("should fail if there's another user with the same email", async () => {
    (userService.findUserByEmail as Mock).mockResolvedValue(postUserMock);

    const response = await POST(createUserRequest());
    expect(response?.status).toBe(409);
  });

  it('should register if everything is alright', async () => {
    (userService.findUserByEmail as Mock).mockResolvedValue(null);

    const response = await POST(createUserRequest());
    expect(response?.status).toBe(201);
    
    const data = await response?.json();
    expect(data.user).toBeTruthy();
  });
})