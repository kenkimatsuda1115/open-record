import { describe, it, expect, vi, beforeEach } from "vitest";
import { UserController } from "../../../src/interfaces/controllers/UserController";
import { UserService } from "../../../src/application/services/UserServices";

vi.mock("../../../src/application/services/UserServices");

describe("UserController", () => {
  let userController: UserController;
  let mockRequest: any;
  let mockResponse: any;

  beforeEach(() => {
    userController = new UserController();
    mockRequest = {
      body: {
        username: "test",
        email: "test@test.com",
        password: "11111111",
      },
    };
    mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
  });

  describe("signUp", () => {
    it("ユーザー登録が失敗した場合、400レスポンスを返すこと", async () => {
      (UserService.prototype.createUser as any).mockRejectedValue(
        new Error("test"),
      );
      await userController.signUp(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(400);
    });
  });
});
