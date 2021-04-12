// export const appendToFavorites = async (popularResult, favoriteList, movie) => {
//   const exist = popularResult.findIndex(m => m.id === movie.id);
//   if (exist === -1) {
//     return [...favoriteList, movie];
//   } else {
//     console.log("\nexist?\n " + true + '\nindex: ' + exist)
//     // return movie.id;
//     return;
//   }
// };

export const appendToFavorites = async (popularResult, favoriteList, movie) => {
  const exist = await popularResult.findIndex(m => m.id === movie.id);
  console.log("\n############\n\nexist: ##############" + exist)

  if (exist === -1) {
    return [...favoriteList,  {movie: movie} ];
  } else {
    return movie.id;
  }
};


export const removeFavorite = async (favoriteList, movie) => {
  return await favoriteList.filter(m => m.id !== movie.id);
};