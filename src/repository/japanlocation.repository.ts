import { Service } from 'typedi';
import { Database } from '../config/Database';
import { JapanLocationDto } from '../dto/japanlocation.dto';
import { SELECT_ALL_QUERY, SELECT_BY_ID_QUERY, INSERT_QUERY, DELETE_QUERY } from '../utils/japanlocation.query';

@Service()
export class JapanLocationRepository {
    constructor(){
    }
    
    // 일본 지역 정보 모두 가져오기
    async findAll() {
        const connection = await Database.getInstance().getConnection();
        await connection.beginTransaction();
        try {
            const [rows] = await connection.query(SELECT_ALL_QUERY, []);
            connection.commit();
            connection.release();
            return rows;
        } catch (error) {
            console.error(error);
            await connection.rollback();
        }
    }

    async findOneById(location_id : string){
        const connection = await Database.getInstance().getConnection();
        await connection.beginTransaction();
        try {
            const [rows] = await connection.query(SELECT_BY_ID_QUERY, [location_id]);
            connection.commit();
            connection.release();
            return rows;
        } catch (error) {
            console.error(error);
            await connection.rollback();
        }
    }

    // 일본지역 정보 입력하기
    async insert(japanLocationDto : JapanLocationDto){
        const {location_id, location_korean_name, location_english_name, location_japan_name} = japanLocationDto;
        const connection = await Database.getInstance().getConnection();
        await connection.beginTransaction();
        try {
            const [row]: any = await connection.query(INSERT_QUERY, [location_id, location_korean_name, location_english_name, location_japan_name]);
            connection.commit();
            connection.release();
            return row;
        } catch (error) {
            console.error(error);
            await connection.rollback();
        }
    }

    // 일본지역 정보 삭제하기
    async deleteLocation(location_id : string){
        const connection = await Database.getInstance().getConnection();
        await connection.beginTransaction();
        try {
            const [row]: any = await connection.query(DELETE_QUERY, [location_id]);
            connection.commit();
            connection.release();
            return row;
        } catch (error) {
            console.error(error);
            await connection.rollback();
        }
    }
}