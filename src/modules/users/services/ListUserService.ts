import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repository/UsersRepositories';

class ListUserService {
  public async execute(): Promise<User[]> {
    const usersRepository = getCustomRepository(UsersRepository);
    const users = await usersRepository.find();
    return users;
  }
}
export default ListUserService;
