//initialize unsplash

// import { createApi } from "unsplash-js";

// on your node server
// const unsplashApi = createApi({
//   accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
//   //...other fetch options
// });

import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

const getUrlForCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
  // return "https://api.foursquare.com/v3/places/search?query=coffee&ll=6.678986905053477%2C3.165150920591198&limit=6";
};

// const getListOfCoffeeStorePhotos = async () => {
//   const photos = await unsplashApi.search.getPhotos({
//     query: "coffee shop",
//     perPage: 30,
//   });
//   const unsplashResults = photos.response?.results || [];
//   return unsplashResults.map((result) => result.urls["small"]);
// };

const getListOfCoffeeStorePhotos = async () => {
  const photos = await unsplash.search.getPhotos({
    query: "coffee shop",
    perPage: 30,
  });

  const unsplashResults = photos.response?.results;
  return unsplashResults.map((result) => result.urls["small"]);
};

export const fetchCoffeeStores = async (latLong = "43.653833032607096%2C-79.37896808855945", limit = 6) => {
  const photos = await getListOfCoffeeStorePhotos();
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      // Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
      Authorization: process.env.FOURSQUARE_API,
    },
  };

  const response = await fetch(getUrlForCoffeeStores(latLong, "coffee", limit), options);
  const data = await response.json();
  return data?.results?.map((result, idx) => {
    const neighborhood = result.location.neighborhood;
    return {
      id: result.fsq_id,
      address: result.location.address,
      name: result.name,
      neighbourhood: neighborhood?.length > 0 ? neighborhood[0] : "",
      imgUrl: photos.length > 0 ? photos[idx] : null,
    };
  });
};

// export const fetchCoffeeStores = async () => {
//   const photos = await getListOfCoffeeStorePhotos();
//   const options = {
//     method: "GET",
//     headers: {
//       accept: "application/json",
//       Authorization: process.env.FOURSQUARE_API,
//     },
//   };

//   const response = await fetch(getUrlForCoffeeStores("43.653833032607096%2C-79.37896808855945", "coffee", 6), options);

//   const data = await response.json();
//   return data.results;
//   // console.log(data.results);
//   // .catch((err) => console.error(err));
// };
