// user.controller.ts
import { JsonController, Req, Res, UploadedFiles, Param } from 'routing-controllers';
import { Get, Post, Delete } from 'routing-controllers';
import { Response, NextFunction, Request } from 'express';
import { Container } from 'typedi'
import { KantoLocationService } from '../service/kantolocation.service';
import { multerOption } from '../utils/multer';


@JsonController('/kantolocation')
export class KantoLocationController {
	private kantoLocationService: KantoLocationService;
	constructor() {
		this.kantoLocationService = Container.get(KantoLocationService);
	}


	@Get('/:anime_name')
	async findByAnimeName(@Param('anime_name') anime_name: string, @Res() response: Response){
		try {
			const data = await this.kantoLocationService.findByAnimeName(anime_name);
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

	@Get('/')
	async findAll(@Res() response: Response){
		try {
			const data = await this.kantoLocationService.findAll();
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
	async insert(@UploadedFiles('files', multerOption) files: any[], @Res() response: Response) {
		try {
			const data = await this.kantoLocationService.insert(files);
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