import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  getAll() {//get all fighters
    const fighters = fighterRepository.getAll();
    if (!fighters) {
      return [];
    }
    return fighters;
  }
  getOne(id) {//get fighter by id
    const fighter = fighterRepository.getOne({ id });
    return fighter || null;
  }
  create(fighterData) {//create new fighter
    const eixstingFighter = fighterRepository.getOne({//check if there is already a fighter with the same name
      name: (name) => name.toLowerCase() === fighterData.name.toLowerCase()
    });

    if (eixstingFighter) {//if there is a fighter with the same name we throw an error
      throw new Error(`Fighter with name "${fighterData.name}" already exists`);
    }
    if (fighterData.health === undefined || fighterData.health === null) {//if health is not provided we set it to 85 by default
      fighterData.health = 85;
    }
    const newFighter = fighterRepository.create(fighterData);//create new fighter with provided data and return it
    return newFighter;
  }
  update(id, dataToUpdate) {//update fighter by id with provided data
    const fighter = this.getOne(id);//check if there is a fighter with such id
    if (!fighter) {
      return null;
    }
    if (dataToUpdate.name) {//check if there is a fighter with the same name as the new name provided in dataToUpdate
      const duplicateFighter = fighterRepository.getOne({
        name: (name) => name.toLowerCase() === dataToUpdate.name.toLowerCase()
      });
      if (duplicateFighter && duplicateFighter.id !== id) {//if there is a fighter with the same name and it is not the same fighter we are trying to update
        throw new Error(`Fighter with name "${dataToUpdate.name}" already exists`);
      }
    }
    const updatedFighter = fighterRepository.update(id, dataToUpdate);
    return updatedFighter;
  }
  delete(id) {//delete fighter by id
    const fighter = this.getOne(id);
    if (!fighter) {
      return null;
    }
    const deletedFighter = fighterRepository.delete(id);//delete fighter by id and return the deleted data
    return deletedFighter;
  }
}
const fighterService = new FighterService();
export { fighterService };
