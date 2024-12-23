import { Service } from 'typedi';
import { Database } from '../config/Database';


@Service()
export class AppRepository{
    constructor(){}


    async findAll(){
        const connection = await Database.getInstance().getConnection();
        await connection.beginTransaction();
        try {
            const [rows] = await connection.query("SELECT * FROM japan_location", []);
            connection.commit();
            connection.release();
            return rows;
        } catch (error) {
            console.error(error);
            await connection.rollback();
        }
    }
}