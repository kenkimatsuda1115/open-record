export class User {
  constructor(
    private readonly id: number,
    private readonly username: string,
    private readonly email: string,
    private readonly hashedPassword: string,
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
  public getCreatedAt(): Date {
    return this.createdAt;
  }
  public getUpdatedAt(): Date {
    return this.updatedAt;
  }
}
