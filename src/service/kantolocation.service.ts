import { Service } from "typedi";
import { KantoLocationRepository } from "../repository/kantolocation.repository";
import { FileUtil } from "../utils/csv_convert";


@Service()
export class KantoLocationService {
    constructor(private kantoLocationRepository: KantoLocationRepository, private fileUtil: FileUtil) { }

    // 지역 내 모든 성지 정보를 받아 온다.
    async findAll() {
        return await this.kantoLocationRepository.findAll();
    }

    // 애니 이름으로 성지 정보를 받아 온다.
    async findByAnimeName(anime_name: string){
        return await this.kantoLocationRepository.findByAnimeName(anime_name);
    }

    // 성지 정보를 CSV로 입력 (하나씩 입력하는 건 미친 짓이다.)
    async insert(files: any[]) {
        // csv 데이터 추출
        const animePilgrimData: any = await this.fileUtil.processFiles(files);

        // csv 데이터 입력
        for (let i = 0; i < animePilgrimData.length; i++) {
            const temp: any[] = [];

            // 한 세트씩 DB에 입력
            for (const [key, value] of Object.entries(animePilgrimData[i]))
                temp.push(value);
            const row = await this.kantoLocationRepository.insert(temp);
            const {affectedRows} = row;

            if(affectedRows !== 1)
                throw Error("데이터 하나가 잘못 입력됐습니다.");
        }
        return 1;
    }
}