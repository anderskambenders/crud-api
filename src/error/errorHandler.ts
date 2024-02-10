import { ServerResponse } from 'http';
import ErrorHttp from './ErrorHttp';

export const handleErrors = (err: ErrorHttp, response: ServerResponse) => {
  if (err instanceof ErrorHttp) {
    response.writeHead(err.statusCode, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ message: err.message }));
    return;
  }
  response.writeHead(500, { 'Content-Type': 'text/plain' });
  response.end(`Internal Server Error`);
};