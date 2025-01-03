import { Service } from 'typedi';
import { Database } from '../config/Database';
import {SELECT_ALL_QUERY, INSERT_KOREAN_QUERY, DELETE_KOREAN_QUERY, INSERT_KOREAN_BY_FILE_QUERY, SELECT_BY_KOREAN_NAME_QUERY} from '../utils/animeintroduce.query';


@Service()
export class AnimeIntroduceRepository {
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

    async findByAnimeName(anime_korean_name: string){
        const connection = await Database.getInstance().getConnection();
        await connection.beginTransaction();
        try {
            const [rows] = await connection.query(SELECT_BY_KOREAN_NAME_QUERY, [anime_korean_name]);
            connection.commit();
            connection.release();
            return rows;
        } catch (error) {
            console.error(error);
            await connection.rollback();
        }
    }

    // 애니 소개 CSV로 입력하기
    async insertCSV(temp: any[]){
        const connection = await Database.getInstance().getConnection();
        await connection.beginTransaction();
        try {
            const [rows]: any = await connection.query(INSERT_KOREAN_BY_FILE_QUERY, temp);
            connection.commit();
            connection.release();
            return rows;
        } catch (error) {
            console.error(error);
            await connection.rollback();
        }
    }

    // 애니 소개 입력
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

    async deleteAnime(anime_korean_name: string){
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