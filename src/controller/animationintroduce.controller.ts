// user.controller.ts
import { JsonController, Get, Post, Delete, Req, Res, Body, UploadedFiles } from 'routing-controllers';
import { Response } from 'express';
import { Container } from 'typedi'
import { AnimationIntroduceService } from '../service/animationintroduce.service';
import { AnimationIntroduceKoreanDto } from '../dto/animationintroduce.dto';
import { multerOption } from '../utils/multer';


@JsonController('/animation-introduce')
export class AnimationDetailController {
    private animationIntroduceService: AnimationIntroduceService;
    constructor() {
        this.animationIntroduceService = Container.get(AnimationIntroduceService);
    }

    @Get('/')
    async findAll(@Res() response: Response) {
        const data = await this.animationIntroduceService.findAll();
        try {
            return response.status(200).json({
                "data": data,
                "message": "OK"
            });
        } catch (error) {
            return response.status(400).json({
                "message": "bad request"
            })
        }
    }


    @Post('/')
    async insert(@Body() animationIntroduceKoreanDto : AnimationIntroduceKoreanDto, @Res() response: Response) {
        try {
            const data = await this.animationIntroduceService.insert(animationIntroduceKoreanDto);
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
    async deleteAnimation(@Req() request: Request, @Res() response: Response){
        try {
            const {anime_korean_name} : any = request.body;
            const data = await this.animationIntroduceService.deleteAnimation(anime_korean_name);
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