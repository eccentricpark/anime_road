// user.controller.ts
import { JsonController, Get, Res, Param } from 'routing-controllers';
import { Response } from 'express';
import { Container } from 'typedi'
import { AnimeIntroduceService } from '../service/animeintroduce.service';
import { errorLogger } from '../config/winston';


@JsonController('/anime-introduce')
export class AnimeIntroduceController {
    private animeIntroduceService: AnimeIntroduceService;
    constructor() {
        this.animeIntroduceService = Container.get(AnimeIntroduceService);
    }

    @Get('/')
    async findAll(@Res() response: Response) {
        const data = await this.animeIntroduceService.findAll();
        try {
            return response.status(200).json({
                "data": data,
                "message": "OK"
            });
        } catch (error) {
            errorLogger.error(error);
            return response.status(400).json({
                "message": "bad request"
            })
        }
    }

    @Get('/:anime_korean_name')
    async findByAnimeName(@Param('anime_korean_name') anime_korean_name: string, @Res() response: Response){
        try {
            const data = await this.animeIntroduceService.findByAnimeName(anime_korean_name);
            return response.status(200).json({
                "data": data,
                "message": "OK"
            });
        } catch (error) {
            errorLogger.error(error);
            return response.status(400).json({
                "message": error
            })
        }

    }
}