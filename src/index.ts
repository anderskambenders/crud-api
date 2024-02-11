import { createServer, IncomingMessage, ServerResponse } from 'http';
import { handleErrors } from './error/errorHandler';
import { handleRequest } from './controller/requestHandler';
import { UsersModel } from './model/UsersModel';
import { EOL } from 'os';
import 'dotenv/config';

export const runServer = (UsersModel: UsersModel) => {
  const port = process.env.PORT! || 5000;
  const host = 'localhost';

  const server = createServer((request: IncomingMessage, response: ServerResponse) => {
    const { url, method } = request;
    try {
      const urlArray = (url as string).split('/').filter((item) => item);
      const handle = handleRequest(method as string, urlArray, url as string);
      const userId = urlArray[2];
      handle(UsersModel, response, request,  userId).catch((error: unknown) => handleErrors(error as Error, response));
    } catch (error) {
      handleErrors(error as Error, response);
    }
})

  server.listen(port, () => {
    console.log(`Server is running on http://${host}:${port}${EOL}`);
  })
  server.on('error', (error) => {
    console.log('Error http server', error);
  });
}

const userModel = new UsersModel();
runServer(userModel);
