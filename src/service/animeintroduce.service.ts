import { Service } from "typedi";
import { AnimeIntroduceRepository } from "../repository/animeintroduce.repository";
import { AnimeIntroduceKoreanDto } from "../dto/animeintroduce.dto";
import { FileUtil } from "../utils/csv_convert";


@Service()
export class AnimeIntroduceService{
  constructor(
    private animeIntroduceRepository : AnimeIntroduceRepository,
    private fileUtil : FileUtil
  ){}

  async findAll(){
    return await this.animeIntroduceRepository.findAll();
  }

  async findByAnimeName(anime_korean_name: string){
    return await this.animeIntroduceRepository.findByAnimeName(anime_korean_name);
  }

  async insert(animeIntroduceKoreanDto : AnimeIntroduceKoreanDto){
    const {location_id, anime_korean_name, content_korean} = animeIntroduceKoreanDto;
    const row = await this.animeIntroduceRepository.insert([location_id, anime_korean_name, content_korean]);
    const {affectedRows} = row;
    if(affectedRows !== 1)
      throw Error("잘못 입력됐습니다. SQL이나 데이터를 다시 확인하세요.");
    return affectedRows;
  }

  // 일본 지역 정보를 csv로 입력
  async insertCSV(files : any[]){
    // csv 데이터 추출
    const csvData:any = await this.fileUtil.processFiles(files);
    let affectedRows = 0;
    // csv 데이터 입력
    for (let i = 0; i < csvData.length; i++) {
      const temp: any[] = [];

      // 한 세트씩 DB에 입력
      for (const [key, value] of Object.entries(csvData[i]))
          temp.push(value);
      const row = await this.animeIntroduceRepository.insertCSV(temp);
      affectedRows += row.affectedRows;
    }
    return affectedRows;
  }


  async deleteAnime(anime_korean_name: string){
    const row = await this.animeIntroduceRepository.deleteAnime(anime_korean_name);
    const {affectedRows} = row;
    return affectedRows;
  }
}