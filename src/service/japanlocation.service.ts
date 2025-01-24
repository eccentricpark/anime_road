import { Service } from "typedi";
import { JapanLocationRepository } from "../repository/japanlocation.repository";
import { JapanLocationDeleteDto, JapanLocationDto } from "../dto/japanlocation.dto";
import { FileUtil } from "../utils/csv_convert";


@Service()
export class JapanLocationService {
	constructor(
		private japanLocationRepository: JapanLocationRepository,
		private fileUtil: FileUtil
	) { }

	async findAll() {
		return await this.japanLocationRepository.findAll();
	}

	// locationId 하나로 해당 지역 이름명을 추출해야 한다.
	async findOneById(location_id: string) {
		return await this.japanLocationRepository.findOneById(location_id);
	}


	// 일본 지역 정보를 csv로 입력
	async insert(files: any[]) {
		// csv 데이터 추출
		const japanLocationData: any = await this.fileUtil.processFiles(files);
		let affectedRows = 0;
		// csv 데이터 입력
		for (let i = 0; i < japanLocationData.length; i++) {
			const temp: any[] = [];

			// 한 세트씩 DB에 입력
			for (const [key, value] of Object.entries(japanLocationData[i]))
				temp.push(value);
			const row = await this.japanLocationRepository.insert(temp);
			affectedRows += row.affectedRows;
		}
		return affectedRows;
	}


	async deleteLocation(japanLocationDeleteDto: JapanLocationDeleteDto) {
		const { location_id } = japanLocationDeleteDto;
		const row = await this.japanLocationRepository.deleteLocation(location_id);
		const { affectedRows } = row;
		return affectedRows;
	}
}