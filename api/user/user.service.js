const UserModel = require('./user.model');

async function createUser(user) {
  const newUser = await UserModel.create(user);
  return newUser;
}

async function getAllUsers() {
  const users = await UserModel.find();
  return users;
}

async function getUserById(id) {
  const userById = await UserModel.findById(id);
  return userById;
}

async function getUserByEmail(email) {
  const userByEmail = await UserModel.findOne({ email });
  return userByEmail;
}

async function updateUser(id, user) {
  const updatedUser = await UserModel.findByIdAndUpdate(id, user, { new: true });
  return updatedUser;
}

async function deleteUser(id) {
  const deletedUser = await UserModel.findByIdAndDelete(id);
  return deletedUser;
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
};
