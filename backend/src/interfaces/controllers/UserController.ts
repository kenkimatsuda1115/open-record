import { Request, Response } from "express";
import { UserService } from "../../application/services/UserServices";

export class UserController {
  private readonly userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public signUp = async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, email, password } = req.body;
      const user = await this.userService.createUser(username, email, password);

      res.status(201).json({
        success: true,
        data: {
          id: user.getId(),
          username: user.getUsername(),
          email: user.getEmail(),
        },
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: (error as Error).message,
      });
    }
  };

  public login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, password } = req.body;
      const user = await this.userService.login(username, password);
      res.status(200).json({
        success: true,
        data: user,
        name: user.getUsername(),
        email: user.getEmail(),
        username: user.getUsername(),
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: (error as Error).message,
      });
    }
  };

  public forgetPassword = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const { username, email, newPassword } = req.body;
      const user = await this.userService.forgetPassword(
        username,
        email,
        newPassword,
      );
      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: (error as Error).message,
      });
    }
  };
}
