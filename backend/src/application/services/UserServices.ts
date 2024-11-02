import bcrypt from "bcrypt";
import { User, UserProfile } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/userRepository";
import { MongoUserRepository } from "../../infrastructure/repositories/MongoUserRepository";

export class UserService {
  private readonly userRepository: UserRepository;

  constructor() {
    this.userRepository = new MongoUserRepository();
  }

  async createUser(
    username: string,
    email: string,
    password: string,
  ): Promise<User> {
    // ユーザー名の重複チェック
    const existingUsername = await this.userRepository.findByUsername(username);
    if (existingUsername) {
      throw new Error("このユーザー名は既に使用されています");
    }

    // メールアドレスの重複チェック
    const existingEmail = await this.userRepository.findByEmail(email);
    if (existingEmail) {
      throw new Error("このメールアドレスは既に登録されています");
    }

    // パスワードのハッシュ化
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // ユーザーの作成
    const user = new User(
      0,
      username,
      email,
      hashedPassword,
      new Date(),
      new Date(),
    );

    return this.userRepository.save(user);
  }

  async login(username: string, password: string): Promise<User> {
    // ユーザー名でユーザーを検索
    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      throw new Error("ユーザーが見つかりません");
    }

    // パスワードの照合
    const isPasswordValid = await bcrypt.compare(
      password,
      user.getHashedPassword(),
    );
    if (!isPasswordValid) {
      throw new Error("パスワードが正しくありません");
    }

    return user;
  }

  async forgetPassword(
    username: string,
    email: string,
    newPassword: string,
  ): Promise<User> {
    // ユーザー名でユーザーを検索
    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      throw new Error("ユーザーが見つかりません");
    }
    console.log(
      "[[[[username]]]]: ",
      username,
      " [[[[email]]]]: ",
      email,
      " [[[[user]]]]: ",
      user.getId(),
      " [[[[user.getEmail()]]]]: ",
      user.getEmail(),
    );

    // メールアドレスの照合
    if (user.getEmail() !== email) {
      throw new Error("メールアドレスが正しくありません");
    }

    // パスワードのハッシュ化
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    return this.userRepository.updatePassword(user.getId(), hashedPassword);
  }

  async getUserProfile(username: string): Promise<User | null> {
    return this.userRepository.getUserProfile(username);
  }

  async updateUserProfile(
    username: string,
    profile: Partial<UserProfile>,
  ): Promise<User | null> {
    return this.userRepository.updateUserProfile(username, profile);
  }
}
