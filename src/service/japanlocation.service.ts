import { Service } from "typedi";
import {JapanLocationRepository} from "../repository/japanlocation.repository";
import { JapanLocationDeleteDto, JapanLocationDto } from "../dto/japanlocation.dto";

@Service()
export class JapanLocationService{
  constructor(private japanLocationRepository : JapanLocationRepository){}

  async findAll(){
    return await this.japanLocationRepository.findAll();
  }

  // locationId 하나로 해당 지역 이름명을 추출해야 한다.
  async findOneById(location_id : string){
    return await this.japanLocationRepository.findOneById(location_id);
  }

  async insert(japanLocationDto : JapanLocationDto){
    const row = await this.japanLocationRepository.insert(japanLocationDto);
    const {affectedRows} = row;
    return affectedRows
  }


  async deleteLocation(japanLocationDeleteDto : JapanLocationDeleteDto){
    const {location_id} = japanLocationDeleteDto;
    const row = await this.japanLocationRepository.deleteLocation(location_id);
    const {affectedRows} = row;
    return affectedRows;
  }
}