// user.controller.ts
import { JsonController, Get, Post, Delete, Req, Res, Param, Body, UploadedFiles } from 'routing-controllers';
import { Response } from 'express';
import { Container } from 'typedi'
import { JapanLocationService } from '../service/japanlocation.service';
import { JapanLocationDeleteDto } from '../dto/japanlocation.dto';
import { multerOption } from '../utils/multer';
import { errorLogger } from '../config/winston';


@JsonController('/japan-location')
export class JapanLocationController {
	private japanLocationService: JapanLocationService;
	constructor() {
		this.japanLocationService = Container.get(JapanLocationService);
	}

	@Get('/')
	async findAll(@Res() response: Response) {
		const data = await this.japanLocationService.findAll();
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

	@Get('/:location_id')
	async findOneById(@Param('location_id') location_id: string, @Res() response: Response) {
		const data = await this.japanLocationService.findOneById(location_id);
		try {
			return data;
		} catch (error) {
			errorLogger.error(error);
			return response.status(400).json({
				"message": "bad request"
			})
		}
	}

	@Post('/')
	async insert(@UploadedFiles('files', multerOption) files: any[], @Res() response: Response) {
		try {
			const data = await this.japanLocationService.insert(files);
			return response.status(201).json({
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

	@Delete('/')
	async deleteLocation(@Body() japanLocationDeleteDto: JapanLocationDeleteDto, @Res() response: Response) {
		try {
			const resultDelete = await this.japanLocationService.deleteLocation(japanLocationDeleteDto);
			return response.status(201).json({
				"data": resultDelete,
				"message": "OK"
			});
		} catch (error) {
			errorLogger.error(error);
			return response.status(400).json({
				"message": "bad request"
			})
		}
	}
}