import { v4 } from 'uuid';
import { User } from '../types/types';

export class UsersModel {
  private users: Map<string ,User>;

  constructor() {
    this.users = new Map();
  }

  public getAllUsers = () => {
    return Object.fromEntries(this.users);
  };

  public getUser = (id: string) => {
    const user = this.users.get(id);
    return user || null
  };

  public addUser = (newUser: User) => {
    const userId = v4();
    const user = { ...newUser, id: userId}
    this.users.set(userId ,user);
    return user;
  };

  public updateUser = (id: string, user: User) => {
    const updatingUser = this.users.get(id);
    if (!updatingUser) return null;
    this.users.set(id, { ...updatingUser, ...user, id });
    return this.users.get(id);
  };

  public deleteUser = (id: string) => {
    const user = this.users.get(id);
    if (user) {
      return this.users.delete(id);
    }
    return null;
  };
}