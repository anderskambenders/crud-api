import getUsers from "./getUsers";
import postUsers from "./postUser";
import putUsers from "./putUser";
import deleteUsers from "./deleteUser";
import ErrorHttp from "../error/ErrorHttp";

interface EndpointHandlers {
  [key: string]: Function;
}

const endpoints: EndpointHandlers = {
  'GET': getUsers,
  'POST': postUsers,
  'PUT': putUsers,
  'DELETE': deleteUsers,
};

export const handleRequest = (method: string, urlArray: string[], url: string) => {
  if (method && urlArray[0] === 'api' && urlArray[1] === 'users' && endpoints[method]) {
    return endpoints[method];
  }
  throw new ErrorHttp(`Non-existing endpoint ${method} ${url}`, 404);
};