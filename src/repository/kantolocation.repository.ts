import { Service } from 'typedi';
import { Database } from '../config/Database';
import { SELECT_ANIME_QUERY, SELECT_QUERY, INSERT_QUERY } from '../utils/kantolocation.query';

@Service()
export class KantoLocationRepository {
    constructor(){}

    // 간토 지역 성지 정보 모두 가져오기기
    async findAll(){
        const connection = await Database.getInstance().getConnection();
        await connection.beginTransaction();
        try {
            const [rows] = await connection.query(SELECT_QUERY, []);
            connection.commit();
            connection.release();
            return rows;
        } catch (error) {
            console.error(error);
            await connection.rollback();
        }
    }

    // 애니에 맞는 성지 검색하기
    async findByAnimeName(anime_name: string){
        const connection = await Database.getInstance().getConnection();
        await connection.beginTransaction();
        try {
            const [rows] = await connection.query(SELECT_ANIME_QUERY, [anime_name]);
            connection.commit();
            connection.release();
            return rows;
        } catch (error) {
            console.error(error);
            await connection.rollback();
        }
    }

    // 성지정보 추출된 CSV 데이터로 한 번에 입력하기
    async insert(temp: any[]){
        const connection = await Database.getInstance().getConnection();
        await connection.beginTransaction();
        try {
            const [row]: any = await connection.query(INSERT_QUERY, temp);
            connection.commit();
            connection.release();
            return row;
        } catch (error) {
            console.error(error);
            await connection.rollback();
        }
    }
}