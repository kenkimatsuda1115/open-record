import { UserService } from "../application/services/UserServices";

export interface Context {
  userService: UserService;
}

export const context = async ({ req }: { req: any }): Promise<Context> => {
  // TODO: 認証トークンの検証
  return {
    userService: new UserService(),
  };
};
