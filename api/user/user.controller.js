const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('./user.service');

async function handlerCreateUser(req, res) {
  const newUser = req.body;
  try {
    const user = await createUser(newUser);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'La contraseña debe tener mas de 8 caracteres e incluir un numero y una letra mayúscula' });
  }
}

async function handlerGetAllUsers(req, res) {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function handlerGetUserById(req, res) {
  const { id } = req.params;
  try {
    const user = await getUserById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json(error);
  }
}

async function handlerUpdateUser(req, res) {
  const { id } = req.params;
  const { body } = req;
  try {
    const updatedUser = await updateUser(id, body);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(404).json(error);
  }
}

async function handlerDeleteUser(req, res) {
  const { id } = req.params;
  try {
    const deletedUser = await deleteUser(id);
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(404).json(error);
  }
}

module.exports = {
  handlerCreateUser,
  handlerGetAllUsers,
  handlerGetUserById,
  handlerUpdateUser,
  handlerDeleteUser,
};
