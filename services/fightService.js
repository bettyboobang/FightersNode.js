import { fightRepository } from "../repositories/fightRepository.js";

class FightersService {
  getAll() {//get all fights
    const fights = fightRepository.getAll();
    if (!fights) {
      return [];
    }
    return fights;
  }
  getOne(id) {//get fight by id
    const fight = fightRepository.getOne({ id });
    return fight || null;
  }
  create(fightData) {//create new fight
    const newFight = fightRepository.create(fightData);//create new fight with provided data and return it
    return newFight;
  }
  delete(id) {//delete fight by id
    const fight = this.getOne(id);
    if (!fight) {//if there is no fight with such id we return null
      return null;
    }
    const deletedFight = fightRepository.delete(id);
    return deletedFight;
  }
}
const fightersService = new FightersService();
export { fightersService };