import { UserService } from "../../../application/services/UserServices";

export const userResolvers = {
  Query: {
    getUser: async (
      _: any,
      { username }: any,
      { userService }: { userService: UserService },
    ) => {
      return await userService.getUserProfile(username);
    },
    getUserProfile: async (
      _: any,
      { username }: any,
      { userService }: { userService: UserService },
    ) => {
      return await userService.getUserProfile(username);
    },
  },

  Mutation: {
    createUser: async (
      _: any,
      { input }: any,
      { userService }: { userService: UserService },
    ) => {
      const { username, email, password } = input;
      return await userService.createUser(username, email, password);
    },
    updateProfile: async (
      _: any,
      { username, input }: any,
      { userService }: { userService: UserService },
    ) => {
      return await userService.updateUserProfile(username, input);
    },
    login: async (
      _: any,
      { input }: any,
      { userService }: { userService: UserService },
    ) => {
      const { username, password } = input;
      const user = await userService.login(username, password);
      // TODO: JWTトークンの生成
      const token = "dummy-token";
      return { token, user };
    },
    forgetPassword: async (
      _: any,
      { input }: any,
      { userService }: { userService: UserService },
    ) => {
      const { username, email, newPassword } = input;
      return await userService.forgetPassword(username, email, newPassword);
    },
  },
};
