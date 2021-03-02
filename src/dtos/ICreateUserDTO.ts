import User from '../models/User';

export default interface ICreateUserDTO {
  user: Omit<User, 'id'>;
}
