import express from 'express';
import {Request, Response, NextFunction} from 'express';
import 'reflect-metadata';
import { setExpress } from './loader/express';
import { logger } from './config/winston';

const app = express();

async function startServer(){
  setExpress(app);
  const PORT = process.env.PORT || 3000;
  // 에러 핸들러 미들웨어를 추가합니다.
  app.use((error: any, request: Request, response: Response, next: NextFunction) => {
    console.error(error.stack);
    response.status(500).send('Something broke!');
  });

  app.listen(PORT, ()=>{
    logger.info(`start ${PORT}`);
  });

  console.log(process.env.DATABASE);
  console.log(process.env.DATABASE_HOST);
  console.log(process.env.DATABASE_USER);
}
startServer();

