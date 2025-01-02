import { Service } from "typedi";
import { AnimationIntroduceRepository } from "../repository/animationintroduce.repository";
import { AnimationIntroduceKoreanDto } from "../dto/animationintroduce.dto";
import { FileUtil } from "../utils/csv_convert";


@Service()
export class AnimationIntroduceService{
  constructor(
    private animationIntroduceRepository : AnimationIntroduceRepository,
    private fileUtil : FileUtil
  ){}

  async findAll(){
    return await this.animationIntroduceRepository.findAll();
  }

  async insert(animationDetailKoreanDto : AnimationIntroduceKoreanDto){
    const {location_id, anime_korean_name, content_korean} = animationDetailKoreanDto;
    const row = await this.animationIntroduceRepository.insert([location_id, anime_korean_name, content_korean]);
    const {affectedRows} = row;
    if(affectedRows !== 1)
      throw Error("잘못 입력됐습니다. SQL이나 데이터를 다시 확인하세요.");
    return affectedRows;
  }

  // 일본 지역 정보를 csv로 입력
  async insertByCSV(files : any[]){
    // csv 데이터 추출
    const csvData:any = await this.fileUtil.processFiles(files);
    
    // csv 데이터 입력
    for (let i = 0; i < csvData.length; i++) {
      const temp: any[] = [];

      // 한 세트씩 DB에 입력
      for (const [key, value] of Object.entries(csvData[i]))
          temp.push(value);
      const row = await this.animationIntroduceRepository.insert(temp);
      const {affectedRows} = row;

      if(affectedRows !== 1)
          throw Error("데이터 하나가 잘못 입력됐습니다.");
    }
    return 1;
  }


  async deleteAnimation(anime_korean_name: string){
    const row = await this.animationIntroduceRepository.deleteAnimation(anime_korean_name);
    const {affectedRows} = row;
    return affectedRows;
  }
}