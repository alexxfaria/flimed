import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repository/UsersRepositories';

interface IRequest {
  id: string;
  name: string;
  email: string;
  password: string;
  admin: boolean;
}

class UpdateUserService {
  public async execute({
    id,
    name,
    email,
    password,
    admin,
  }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findOne(id);
    if (!user) {
      throw new AppError('User not exist.');
    }
    const usersExists = await usersRepository.findByName(email);

    if (usersExists && email != user.email) {
      throw new AppError('Email address already used');
    }

    const hashedPassword = await hash(password, 8);

    user.name = name;
    user.email = email;
    user.password = hashedPassword;
    user.admin = admin;

    await usersRepository.save(user);
    return user;
  }
}
export default UpdateUserService;
