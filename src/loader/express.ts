import express from "express";
import { useExpressServer } from 'routing-controllers';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';
// 각종 서버 내 설정
export async function setExpress(app: express.Application) {

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());
  app.use(morgan('dev'));
  useExpressServer(app, {
    controllers: [path.join(`${__dirname}/../controller/*`)],
  });
}