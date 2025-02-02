import { Service } from 'typedi';
import { Database } from '../config/Database';
import { SELECT_ALL_QUERY, SELECT_BY_ID_QUERY } from '../utils/japanlocation.query';

@Service()
export class JapanLocationRepository {
    constructor(){
    }
    
    // 일본 지역 정보 모두 가져오기
    async findAll() {
        const connection = await Database.getInstance().getConnection();
        try {
            const [rows] = await connection.query(SELECT_ALL_QUERY, []);
            return rows;
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            connection.release();
        }
    }

    async findOneById(location_id : string){
        const connection = await Database.getInstance().getConnection();
        try {
            const [rows] = await connection.query(SELECT_BY_ID_QUERY, [location_id]);
            return rows;
        } catch (error) {
            console.error(error);
            throw error;
        } finally{
            connection.release();
        }
    }
}