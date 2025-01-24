// user.controller.ts
import { JsonController, Get, Post, Delete, Req, Res, Body, Param, UploadedFiles } from 'routing-controllers';
import { Response } from 'express';
import { Container } from 'typedi'
import { AnimeIntroduceService } from '../service/animeintroduce.service';
import { AnimeIntroduceKoreanDto } from '../dto/animeintroduce.dto';
import { multerOption } from '../utils/multer';
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

    @Post('/files')
    async insertCSV(@UploadedFiles('files', multerOption) files : any[], @Res() response: Response) {
        try {
            const data = await this.animeIntroduceService.insertCSV(files);
            return response.status(201).json({
                "data": data,
                "message": "OK"
            });
        } catch (error) {
            return response.status(400).json({
                "message": error
            })
        }
    }


    @Post('/')
    async insert(@Body() animeIntroduceKoreanDto : AnimeIntroduceKoreanDto, @Res() response: Response) {
        try {
            const data = await this.animeIntroduceService.insert(animeIntroduceKoreanDto);
            return response.status(201).json({
                "data": data,
                "message": "OK"
            });
        } catch (error) {
            return response.status(400).json({
                "message": "bad request"
            })
        }
    }

    @Delete('/')
    async deleteAnime(@Req() request: Request, @Res() response: Response){
        try {
            const {anime_korean_name} : any = request.body;
            const data = await this.animeIntroduceService.deleteAnime(anime_korean_name);
            return response.status(201).json({
                "data": data,
                "message": "OK"
            });
        } catch (error) {
            return response.status(400).json({
                "message": "bad request"
            })
        }
    }
}