import { describe, it, expect, vi, beforeEach } from "vitest";
import { UserService } from "../../../src/application/services/UserServices";
import { MongoUserRepository } from "../../../src/infrastructure/repositories/MongoUserRepository";
import bcrypt from "bcrypt";

vi.mock("../../../src/infrastructure/repositories/MongoUserRepository");
vi.mock("bcrypt");

describe("UserService", () => {
  let userService: UserService;

  beforeEach(() => {
    vi.clearAllMocks();
    userService = new UserService();
  });

  describe("createUser", () => {
    it("登録済みのユーザー名でエラーを返すこと", async () => {
      const mockUser = {
        username: "test",
        email: "test@test.com",
        password: "11111111",
      };

      (MongoUserRepository.prototype.findByUsername as any).mockResolvedValue({
        username: "test",
      });

      await expect(
        userService.createUser(
          mockUser.username,
          mockUser.email,
          mockUser.password,
        ),
      ).rejects.toThrow("このユーザー名は既に使用されています");
    });
  });
});
