const { Router } = require('express');
const { isAuthenticated } = require('../../auth/auth.service');

const {
  handlerCreateFav,
  handlerGetAllFavs,
  handlerGetOneFav,
  handlerUpdateFav,
  handlerDeleteFav,
} = require('./favs.controller');

const router = Router();

router.post('/', isAuthenticated(), handlerCreateFav);
router.get('/', isAuthenticated(), handlerGetAllFavs);
router.get('/:id', isAuthenticated(), handlerGetOneFav);
router.patch('/:id', isAuthenticated(), handlerUpdateFav);
router.delete('/:id', isAuthenticated(), handlerDeleteFav);

module.exports = router;
