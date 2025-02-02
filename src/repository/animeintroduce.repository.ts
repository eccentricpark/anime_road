import { Service } from 'typedi';
import { Database } from '../config/Database';
import {SELECT_ALL_QUERY, SELECT_BY_KOREAN_NAME_QUERY} from '../utils/animeintroduce.query';


@Service()
export class AnimeIntroduceRepository {
    async findAll(){
        const connection = await Database.getInstance().getConnection();
        try {
            const [rows] = await connection.query(SELECT_ALL_QUERY, []);
            return rows;
        } catch (error) {
            console.error(error);
            throw error;
        } finally{
            connection.release();
        }
    }

    async findByAnimeName(anime_korean_name: string){
        const connection = await Database.getInstance().getConnection();
        try {
            const [rows] = await connection.query(SELECT_BY_KOREAN_NAME_QUERY, [`%${anime_korean_name}%`]);
            return rows;
        } catch (error) {
            console.error(error);
            throw error;
        } finally{
            connection.release();
        }
    }
}