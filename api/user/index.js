const { Router } = require('express');
const {
  handlerCreateUser,
  handlerGetAllUsers,
  handlerGetUserById,
  handlerUpdateUser,
  handlerDeleteUser,
} = require('./user.controller');

const router = Router();

router.get('/', handlerGetAllUsers);
router.get('/:id', handlerGetUserById);
router.post('/', handlerCreateUser);
router.patch('/:id', handlerUpdateUser);
router.delete('/:id', handlerDeleteUser);

module.exports = router;
