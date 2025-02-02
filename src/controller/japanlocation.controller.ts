// user.controller.ts
import { JsonController, Get, Res, Param } from 'routing-controllers';
import { Response } from 'express';
import { Container } from 'typedi'
import { JapanLocationService } from '../service/japanlocation.service';
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
}