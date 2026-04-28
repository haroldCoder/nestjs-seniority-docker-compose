import { InvalidEmailException } from "../exceptions";

export class User {
  constructor(
    public readonly id: number,
    public readonly email: string,
    public readonly name: string | null,
    public readonly password: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) { }

  static create(data: {
    id?: number;
    email: string;
    name?: string | null;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    if (!data.email.includes("@")) {
      throw new InvalidEmailException(data.email);
    }

    return new User(
      data.id || 0,
      data.email,
      data.name || null,
      data.password,
      data.createdAt || new Date(),
      data.updatedAt || new Date(),
    );
  }
}
