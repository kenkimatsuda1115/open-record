import { User, UserProfile } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/userRepository";
import { UserModel } from "../models/UserModel";

export class MongoUserRepository implements UserRepository {
  async save(user: User): Promise<User> {
    /**
     * ユーザーを保存する
     */
    const userModel = new UserModel({
      id: user.getId(),
      username: user.getUsername(),
      email: user.getEmail(),
      hashedPassword: user.getHashedPassword(),
      nickname: user.getNickname(),
      createdAt: user.getCreatedAt(),
      updatedAt: user.getUpdatedAt(),
      bio: user.getBio(),
      location: user.getLocation(),
      website: user.getWebsite(),
    });

    const savedUser = await userModel.save();

    return new User(
      savedUser.id,
      savedUser.username,
      savedUser.email,
      savedUser.hashedPassword,
      savedUser.nickname,
      savedUser.bio,
      savedUser.location,
      savedUser.website,
      savedUser.createdAt,
      savedUser.updatedAt,
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    /**
     * ユーザーをメールアドレスで検索する
     */
    const user = await UserModel.findOne({ email });
    if (!user) return null;

    return new User(
      user.id,
      user.username,
      user.email,
      user.hashedPassword,
      user.nickname,
      user.bio,
      user.location,
      user.website,
      user.createdAt,
      user.updatedAt,
    );
  }

  async findById(id: string): Promise<User | null> {
    /**
     * ユーザーをIDで検索する
     */
    const user = await UserModel.findOne({ id: parseInt(id) });
    if (!user) return null;

    return new User(
      user.id,
      user.username,
      user.email,
      user.hashedPassword,
      user.nickname,
      user.bio,
      user.location,
      user.website,
      user.createdAt,
      user.updatedAt,
    );
  }

  async findByUsername(username: string): Promise<User | null> {
    /**
     * ユーザーをユーザー名で検索する
     */
    const user = await UserModel.findOne({ username });
    if (!user) return null;

    return new User(
      user.id,
      user.username,
      user.email,
      user.hashedPassword,
      user.nickname,
      user.bio,
      user.location,
      user.website,
      user.createdAt,
      user.updatedAt,
    );
  }

  async updatePassword(userId: number, hashedPassword: string): Promise<User> {
    /**
     * パスワードを更新する
     */
    const user = await UserModel.updateOne(
      { id: userId }, // ユーザーを特定するための条件
      {
        $set: {
          hashedPassword: hashedPassword,
          updatedAt: new Date(),
        },
      },
    );
    const updatedUser = await UserModel.findOne({ id: userId });
    if (!updatedUser) throw new Error("ユーザーが見つかりません");
    console.log("[[[[updatedUser]]]]: ", updatedUser);
    // パスワードを更新したユーザーを返す
    return new User(
      updatedUser.id,
      updatedUser.username,
      updatedUser.email,
      updatedUser.hashedPassword,
      updatedUser.nickname,
      updatedUser.bio,
      updatedUser.location,
      updatedUser.website,
      updatedUser.createdAt,
      updatedUser.updatedAt,
    );
  }

  async getUserProfile(username: string): Promise<User | null> {
    /**
     * ユーザーのプロフィールを取得する
     */
    const user = await UserModel.findOne({ username });
    if (!user) return null;
    return new User(
      user.id,
      user.username,
      user.email,
      user.hashedPassword,
      user.nickname,
      user.bio,
      user.location,
      user.website,
      user.createdAt,
      user.updatedAt,
    );
  }

  async updateUserProfile(
    username: string,
    profile: Partial<UserProfile>,
  ): Promise<User | null> {
    /**
     * ユーザーのプロフィールを更新する
     */
    const user = await UserModel.updateOne({ username }, { $set: profile });
    const updatedUser = await UserModel.findOne({ username });
    if (!updatedUser) {
      throw new Error("ユーザーが見つかりません");
    }
    return new User(
      updatedUser.id,
      updatedUser.username,
      updatedUser.email,
      updatedUser.hashedPassword,
      updatedUser.nickname,
      updatedUser.bio,
      updatedUser.location,
      updatedUser.website,
      updatedUser.createdAt,
      updatedUser.updatedAt,
    );
  }
}
