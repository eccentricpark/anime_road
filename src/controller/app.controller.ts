import { JsonController, Get, Post, Res } from 'routing-controllers';
import { Response } from 'express';
import { Container } from 'typedi'
import { AppRepository } from '../repository/app.repository';
import { logger } from '../config/winston';

@JsonController('/')
export class AppController {
  private appRepository: AppRepository;
  constructor() {
    this.appRepository = Container.get(AppRepository);
  }

  @Get('/')
  sayHello(@Res() response: Response) {
    logger.info("응답 성공");
    return response.send(`
      <h1>
        Hello world!
      </h1>
    `);
    
  }

  @Post('/')
  async testDB(@Res() response: Response){
    const data = await this.appRepository.findAll();
    try {
      return response.status(200).json({
        data : data,
        message : "데이터베이스에 연결됐습니다."
      });  
    } catch (error) {
      return response.status(500).json({
        message : "internal server error"
      });
    }
    
  }
}