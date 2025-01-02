import { Service } from 'typedi';
import { Database } from '../config/Database';
import {SELECT_ALL_QUERY, INSERT_KOREAN_QUERY, DELETE_KOREAN_QUERY} from '../utils/animationintroduce.query';


@Service()
export class AnimationIntroduceRepository {
    async findAll(){
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

    async insert(temp: any[]){
        const connection = await Database.getInstance().getConnection();
        await connection.beginTransaction();
        try {
            const [rows]: any = await connection.query(INSERT_KOREAN_QUERY, temp);
            connection.commit();
            connection.release();
            return rows;
        } catch (error) {
            console.error(error);
            await connection.rollback();
        }
    }

    async deleteAnimation(anime_korean_name: string){
        const connection = await Database.getInstance().getConnection();
        await connection.beginTransaction();
        try {
            const [rows]: any = await connection.query(DELETE_KOREAN_QUERY, [anime_korean_name]);
            connection.commit();
            connection.release();
            return rows;
        } catch (error) {
            console.error(error);
            await connection.rollback();
        }
    }
}