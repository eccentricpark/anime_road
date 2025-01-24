import { createLogger, transports, format } from "winston";
import dotenv from 'dotenv';
dotenv.config();
export const logger = createLogger({
    level: process.env.NODE_ENV === 'production' ? 'error' : 'development', // 환경별 로그 레벨 설정
    // level: 'info', // 환경별 로그 레벨 설정
    format: format.combine(
      format.colorize(), // 색상 추가
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      format.printf(({ level, message, timestamp }) => {
        return `[${timestamp}] ${level}: ${message}`;
      })
    ),
    transports: [
      new transports.Console({level: 'info'}),
      new transports.File({ filename: './logs/combined.log', level: 'info' })
    ]
});

export const errorLogger = createLogger({
    level: 'error', // 환경별 로그 레벨 설정
    format: format.combine(
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      format.printf(({ level, message, timestamp }) => {
        return `[${timestamp}] ${level}: ${message}`;
      })
    ),
    transports: [
      new transports.Console({ level: 'error' }),
      new transports.File({ filename: './logs/error.log', level: 'error' }),
    ]
});
