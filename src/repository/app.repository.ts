import { Service } from 'typedi';
import { Database } from '../config/Database';


@Service()
export class AppRepository{
    constructor(){}

    async findAll(){
        const connection = await Database.getInstance().getConnection();
        try {
            const [rows] = await connection.query("SELECT * FROM japan_location", []);
            return rows;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}