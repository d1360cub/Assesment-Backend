const { Router } = require('express');
const {
  handlerCreateFav,
  handlerGetAllFavs,
  handlerGetOneFav,
  handlerUpdateFav,
  handlerDeleteFav,
} = require('./favs.controller');

const router = Router();

router.post('/', handlerCreateFav);
router.get('/', handlerGetAllFavs);
router.get('/:id', handlerGetOneFav);
router.patch('/:id', handlerUpdateFav);
router.delete('/:id', handlerDeleteFav);

module.exports = router;
