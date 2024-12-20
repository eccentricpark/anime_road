import fs from 'fs';
import csv from 'csv-parser';
import { Service } from "typedi";

interface CSVData {
    [key: string]: string;
}

@Service()
export class FileUtil {
    // CSV 데이터 추출
    processFiles(files: any[]) {
        return new Promise((resolve, reject) => {
            const results: CSVData[] = [];
            fs.createReadStream(files[0].path, 'utf8')
                .pipe(csv())
                .on('data', (data) => {
                    const temp = this.#trimData(data); 
                    results.push(temp);
                })
                .on('end', () => resolve(results))
                .on('error', (err) => reject(err));
        });
    }

    #trimData(data: any){
        const temp: CSVData = {};
        for(const key in data){
            const trimmedkey = key.trim()
            temp[trimmedkey] = data[key]?.trim() || data[key];
        }
        return temp;
    }
}