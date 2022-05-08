const FavsModel = require('./favs.model');

async function createFav(fav) {
  const newFav = await FavsModel.create(fav);
  return newFav;
}

async function getAllFavs() {
  const allFavs = await FavsModel.find();
  return allFavs;
}

async function getOneFav(id) {
  const fav = await FavsModel
    .findById(id)
    .populate({ path: 'userId', select: 'firstName lastName' });
  return fav;
}

async function updateFav(id, body) {
  const updatedFav = await FavsModel.findByIdAndUpdate(
    id,
    { $push: { item: body } },
  );
  return updatedFav;
}

async function deleteFav(id) {
  const deletedFav = await FavsModel.findByIdAndDelete(id);
  return deletedFav;
}

module.exports = {
  createFav,
  getAllFavs,
  getOneFav,
  updateFav,
  deleteFav,
};
