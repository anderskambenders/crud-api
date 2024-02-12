import { IncomingMessage as IncMsg } from 'http';
import { EOL } from 'os';

export const showRequestStatus = (req: IncMsg, statusCode: number) => {
  const getColoredStatusCode = (colorNumber: number): string => {
    return `\x1b[${colorNumber}m${statusCode}\x1b[0m`;
  }
  const coloredStatusCode = statusCode.toString().startsWith('2') ? getColoredStatusCode(32) : getColoredStatusCode(33);
  process.stdout.write(
    `${req.method} ${req.url} ${coloredStatusCode}${EOL}`,
  )
}