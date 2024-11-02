export class User {
  constructor(
    private readonly id: number,
    private readonly username: string,
    private readonly email: string,
    private readonly hashedPassword: string,
    private readonly nickname: string,
    private readonly bio: string,
    private readonly location: string,
    private readonly website: string,
    private readonly createdAt: Date,
    private readonly updatedAt: Date,
  ) {}

  // ゲッターメソッド
  public getId(): number {
    return this.id;
  }
  public getUsername(): string {
    return this.username;
  }
  public getEmail(): string {
    return this.email;
  }
  public getHashedPassword(): string {
    return this.hashedPassword;
  }
  public getNickname(): string {
    return this.nickname;
  }
  public getCreatedAt(): Date {
    return this.createdAt;
  }
  public getUpdatedAt(): Date {
    return this.updatedAt;
  }
  public getBio(): string {
    return this.bio;
  }
  public getLocation(): string {
    return this.location;
  }
  public getWebsite(): string {
    return this.website;
  }
}

// TODO: ここでUserProfileを定義するのは適切か？
export interface UserProfile {
  nickname: string;
  bio: string;
  location: string;
  website: string;
}
