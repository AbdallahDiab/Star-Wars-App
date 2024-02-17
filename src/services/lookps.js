import fetch from "../Hooks/FetchInterceptor";

const LookupsServices = {};

LookupsServices.getPeople = function (page, search) {
  let queryList = [];

  page && queryList.push(`page=${page}`);
  search && queryList.push(`search=${search}`);

  let query =
    queryList.length > 0
      ? queryList.reduce(
          (accumulator, currentValue) => accumulator + "&" + currentValue
        )
      : ``;
  return fetch({
    url: `people?${query}`,
    method: "get",
  });
};
LookupsServices.getFilms = function () {
  return fetch({
    url: `films`,
    method: "get",
  });
};
LookupsServices.getPlanets = function () {
  return fetch({
    url: `planets`,
    method: "get",
  });
};
LookupsServices.getSpecies = function () {
  return fetch({
    url: `species`,
    method: "get",
  });
};

export default LookupsServices;
