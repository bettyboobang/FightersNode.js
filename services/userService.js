import { userRepository } from "../repositories/userRepository.js";

class UserService {
  getAll() {//get all users
    const users = userRepository.getAll();
    if (!users) {
      return [];
    }
    return users;
  }
  getOne(id) {//get user by id
    const user = userRepository.getOne({ id });
    return user || null;
  }
  create(userData) {//create new user
    const emailExists = userRepository.getOne({ email: userData.email });//check if there is already a user with the same email
    if (emailExists) {
      throw new Error(`User with email "${userData.email}" already exists`);
    }
    const phoneExists = userRepository.getOne({ phone: userData.phone });//check if there is already a user with the same phone number
    if (phoneExists) {
      throw new Error(`User with phone number "${userData.phone}" already exists`);
    }
    const newUser = userRepository.create(userData);//create new user with provided data and return it
    return newUser;
  }
  update(id, dataToUpdate) {//update user by id with provided data
    const user = this.getOne(id);
    if (!user) {
      return null;
    }
    if (dataToUpdate.email) {//check if there is a user with the same email as the new email provided in dataToUpdate
      const duplicateEmail = userRepository.getOne({ email: dataToUpdate.email });
      if (duplicateEmail && duplicateEmail.id !== id) {//if there is a user with the same email and it is not the same user we are trying to update
        throw new Error(`User with email "${dataToUpdate.email}" already exists`);
      }
    }
    if (dataToUpdate.phone) {//check if there is a user with the same phone number as the new phone number provided in dataToUpdate
      const duplicatePhone = userRepository.getOne({ phone: dataToUpdate.phone });
      if (duplicatePhone && duplicatePhone.id !== id) {
        throw new Error(`User with phone number "${dataToUpdate.phone}" already exists`);
      }
    }
    const updatedUser = userRepository.update(id, dataToUpdate);//update user by id with provided data and return the updated data
    return updatedUser;
  }
  delete(id) {//delete user by id
    const user = this.getOne(id);
    if (!user) {
      return null;
    }
    const deletedUser = userRepository.delete(id);
    return deletedUser;
  }
  search(search) {//search for users by email or phone number
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
}
const userService = new UserService();
export { userService };