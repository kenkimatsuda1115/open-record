import bcrypt from "bcrypt";
import { User } from "../../domain/entities/User";
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
    // メールアドレスの重複チェック
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
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
}
