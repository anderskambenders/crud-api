import { ServerResponse } from 'http';
import { validate } from 'uuid';
import ErrorHttp from '../error/ErrorHttp';
import { UsersModel } from '../model/UsersModel';

const getUsers = async (
  usersModel: UsersModel,
  res: ServerResponse,
  userId?: string | undefined,
) => {
  if (!userId) {
    const users = usersModel.getAllUsers();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
    return;
  }
  if (!validate(userId)) throw new ErrorHttp(`UserId ${userId} is invalid.`, 400);
  const user = usersModel.getUser(userId);
  if (user === null) throw new ErrorHttp(`User with id ${userId} doesn't exist.`, 404);
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(user));
};

export default getUsers