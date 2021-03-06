import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repository/UsersRepositories';

interface IRequest {
  name: string;
  email: string;
  password: string;
  admin: boolean;
}

class CreateUserService {
  public async execute({
    name,
    email,
    password,
    admin,
  }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const emailExists = await usersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already used');
    }
    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
      admin,
    });
    await usersRepository.save(user);
    return user;
  }
}
export default CreateUserService;
