import { User } from './user.entity';
import { InvalidEmailException } from '../exceptions/invalid-email.exception';

describe('User Entity', () => {
  it('should create a user instance with valid data', () => {
    const data = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
    };

    const user = User.create(data);

    expect(user).toBeInstanceOf(User);
    expect(user.email).toBe(data.email);
    expect(user.password).toBe(data.password);
    expect(user.name).toBe(data.name);
  });

  it('should throw InvalidEmailException when email is invalid', () => {
    const data = {
      email: 'invalid-email',
      password: 'password123',
    };

    expect(() => User.create(data)).toThrow(InvalidEmailException);
  });

  it('should set default values for id, createdAt and updatedAt', () => {
    const user = User.create({
      email: 'test@example.com',
      password: 'password123',
    });

    expect(user.id).toBe(0);
    expect(user.createdAt).toBeInstanceOf(Date);
    expect(user.updatedAt).toBeInstanceOf(Date);
  });
});
