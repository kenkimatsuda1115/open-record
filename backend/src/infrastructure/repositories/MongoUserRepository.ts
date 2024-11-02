import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/userRepository";
import { UserModel } from "../models/UserModel";

export class MongoUserRepository implements UserRepository {
  async save(user: User): Promise<User> {
    const userModel = new UserModel({
      id: user.getId(),
      username: user.getUsername(),
      email: user.getEmail(),
      hashedPassword: user.getHashedPassword(),
      createdAt: user.getCreatedAt(),
      updatedAt: user.getUpdatedAt(),
    });

    const savedUser = await userModel.save();

    return new User(
      savedUser.id,
      savedUser.username,
      savedUser.email,
      savedUser.hashedPassword,
      savedUser.createdAt,
      savedUser.updatedAt,
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ email });
    if (!user) return null;

    return new User(
      user.id,
      user.username,
      user.email,
      user.hashedPassword,
      user.createdAt,
      user.updatedAt,
    );
  }

  async findById(id: string): Promise<User | null> {
    const user = await UserModel.findOne({ id: parseInt(id) });
    if (!user) return null;

    return new User(
      user.id,
      user.username,
      user.email,
      user.hashedPassword,
      user.createdAt,
      user.updatedAt,
    );
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await UserModel.findOne({ username });
    if (!user) return null;

    return new User(
      user.id,
      user.username,
      user.email,
      user.hashedPassword,
      user.createdAt,
      user.updatedAt,
    );
  }
}
