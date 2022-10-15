import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findOne({ email });
    if (!user) throw new Error('Email or password is invalid!');

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) throw new Error('Email or password is invalid!');

    const token = sign({ email }, '06c219e5bc8378f3a8a3f83b4b7e4649', {
      subject: user.id,
      expiresIn: '1d',
    });
    return token;
  }
}

export { AuthenticateUserService };
