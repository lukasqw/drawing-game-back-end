import User from '../models/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface ILineRepository {
  create(data: ICreateUserDTO): Promise<User>;
  get(): Promise<User[] | undefined>;
  delete(id_user: string): Promise<void>;
}
