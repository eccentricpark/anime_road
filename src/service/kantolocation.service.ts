import { Service } from "typedi";
import { KantoLocationRepository } from "../repository/kantolocation.repository";


@Service()
export class KantoLocationService {
    constructor(
        private kantoLocationRepository: KantoLocationRepository, 
    ) { }

    // 지역 내 모든 성지 정보를 받아 온다.
    async findAll() {
        return await this.kantoLocationRepository.findAll();
    }

    // 애니 이름으로 성지 정보를 받아 온다.
    async findByAnimeName(anime_name: string){
        return await this.kantoLocationRepository.findByAnimeName(anime_name);
    }
}