import { Service } from 'typedi';
import { Database } from '../config/Database';
import { SELECT_ANIME_QUERY, SELECT_QUERY } from '../utils/kantolocation.query';

@Service()
export class KantoLocationRepository {
    constructor(){}

    // 간토 지역 성지 정보 모두 가져오기기
    async findAll(){
        const connection = await Database.getInstance().getConnection();
        try {
            const [rows] = await connection.query(SELECT_QUERY, []);
            return rows;
        } catch (error) {
            console.error(error);
            throw error;
        } finally{
            connection.release();
        }
    }

    // 애니에 맞는 성지 검색하기
    async findByAnimeName(anime_name: string){
        const connection = await Database.getInstance().getConnection();
        try {
            const [rows] = await connection.query(SELECT_ANIME_QUERY, [anime_name]);
            return rows;
        } catch (error) {
            console.error(error);
            throw error;
        } finally{
            connection.release();
        }
    }
}