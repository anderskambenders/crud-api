import getUsers from "./getUsers";
import postUsers from "./postUser";
import putUsers from "./putUser";

const endpoints = {
  'GET': getUsers,
  'POST': postUsers,
  'PUT': putUsers,
  'DELETE': DeleteUser,
};

export const handleRequest = (method, urlArray, url) => {
  if (method && urlArray[0] === 'api' && urlArray[1] === 'users' && endpoints[method]) {
    return endpoints[method];
  }
  throw new Error('http error');
};