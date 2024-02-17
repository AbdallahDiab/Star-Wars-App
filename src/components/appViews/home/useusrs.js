import { useQuery } from "@tanstack/react-query";
import LookupsServices from "../../../services/lookps";

const getPeople = (page, search) => {
  return LookupsServices.getPeople(page, search);
};
const getFilms = () => {
  return LookupsServices.getFilms();
};
const getPlanets = () => {
  return LookupsServices.getPlanets();
};
const getSpecies = () => {
  return LookupsServices.getSpecies();
};

export const useGetPeople = (page, search, onSuccess = (res) => res) => {
  return useQuery({
    queryKey: [`get-people`, page, search],
    queryFn: () => getPeople(page, search),
    onSuccess,
    cacheTime: 60000 * 60 * 24,
    staleTime: 60000 * 60,
  });
};

export const useGetFilms = (onSuccess = (res) => res) => {
  return useQuery({
    queryKey: [`get-films`],
    queryFn: () => getFilms(),
    onSuccess,
  });
};

export const useGetPlanets = (onSuccess = (res) => res) => {
  return useQuery({
    queryKey: [`get-planets`],
    queryFn: () => getPlanets(),
    onSuccess,
  });
};
export const useGetSpecies = (onSuccess = (res) => res) => {
  return useQuery({
    queryKey: [`get-species`],
    queryFn: () => getSpecies(),
    onSuccess,
  });
};
