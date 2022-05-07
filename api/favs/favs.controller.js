const {
  createFav,
  getAllFavs,
  getOneFav,
  updateFav,
  deleteFav,
} = require('./favs.service');

async function handlerCreateFav(req, res) {
  const newFav = req.body;
  try {
    const fav = await createFav(newFav);
    res.status(201).json(fav);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function handlerGetAllFavs(req, res) {
  try {
    const favs = await getAllFavs();
    res.status(200).json(favs);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function handlerGetOneFav(req, res) {
  const { id } = req.params;
  try {
    const fav = await getOneFav(id);
    res.status(200).json(fav);
  } catch (error) {
    res.status(404).json(error);
  }
}

async function handlerUpdateFav(req, res) {
  const { id } = req.params;
  const { body } = req;
  try {
    const updatedFav = await updateFav(id, body);
    res.status(200).json(updatedFav);
  } catch (error) {
    res.status(404).json(error);
  }
}

async function handlerDeleteFav(req, res) {
  const { id } = req.params;
  try {
    const deletedFav = await deleteFav(id);
    res.status(200).json(deletedFav);
  } catch (error) {
    res.status(404).json(error);
  }
}

module.exports = {
  handlerCreateFav,
  handlerGetAllFavs,
  handlerGetOneFav,
  handlerUpdateFav,
  handlerDeleteFav,
};
