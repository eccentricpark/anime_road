import { Service } from "typedi";
import { AnimeIntroduceRepository } from "../repository/animeintroduce.repository";


@Service()
export class AnimeIntroduceService{
  constructor(
    private animeIntroduceRepository : AnimeIntroduceRepository,
  ){}

  async findAll(){
    return await this.animeIntroduceRepository.findAll();
  }

  async findByAnimeName(anime_korean_name: string){
    return await this.animeIntroduceRepository.findByAnimeName(anime_korean_name);
  }
}