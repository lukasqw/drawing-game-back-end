import { uuid } from 'uuidv4';

import IUserRepository from './IUserRepository';

import User from '../models/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

import fakeDataBase from '../FakeDataBase';

class UserRepository implements IUserRepository {

  public async get(): Promise<User[] | undefined>{
    return fakeDataBase.users;
  }

  public async create(userData : ICreateUserDTO): Promise<User>{
    const user = new User();

    Object.assign(user, { id: uuid(), score: 0 }, userData);

    fakeDataBase.users.push(user);

    return user;
  }

  public async delete(id_user: string): Promise<void>{
    const newUsers = fakeDataBase.users.filter(user => user.id !== id_user);
    fakeDataBase.users = newUsers;
  }
}

export default UserRepository;
