import React, { useEffect, useState } from "react";
import {
  useGetFilms,
  useGetPeople,
  useGetPlanets,
  useGetSpecies,
} from "./useusrs";
import { Col, Divider, Input, Pagination, Row, Select } from "antd";
import UserCard from "./userCard";
import Loading from "../../../shared/loading";
import { extractIdFromUrl, findMatches } from "../../../utils";
import EmptyState from "../../../shared/emptyState";

export default function Home() {
  const [current, setCurrent] = useState(1);
  const [search, setSearch] = useState(null);
  const [peoplePlanets, setPeoplePlanets] = useState(null);
  const [peopleFilms, setPeopleFilms] = useState(null);
  const [peopleSpecies, setPeopleSpecies] = useState(null);
  const [localPeopleArr, setLocalPeopleArr] = useState([]);
  //handle page change for pagination
  const onChange = (page) => {
    setCurrent(page);
  };
  // a custom hook taking current page and search word to get matched characters
  const { data, isFetching } = useGetPeople(current, search);

  // here i am trying to get all characters in one array to use while filtering
  // SWAPI doesn't support that, it forces me to paginate with only 10 per page
  // the problem here that i only can search in the result of pagination which is max of 10 results. so i can not filter in all results
  const { data: page_1 } = useGetPeople(1);
  const { data: page_2 } = useGetPeople(2);
  const { data: page_3 } = useGetPeople(3);
  const { data: page_4 } = useGetPeople(4);
  const { data: page_5 } = useGetPeople(5);
  const { data: page_6 } = useGetPeople(6);
  const { data: page_7 } = useGetPeople(7);
  const { data: page_8 } = useGetPeople(8);
  const { data: page_9 } = useGetPeople(9);

  // a custom hook to get filters dropdowns options
  const { data: films, isFetching: filmsIsFetching } = useGetFilms();
  const { data: planets, isFetching: planetsIsFetching } = useGetPlanets();
  const { data: species, isFetching: speciesIsFetching } = useGetSpecies();

  //a condition to toggle between search and filtering
  const displayedList =
    peoplePlanets || peopleFilms || peopleSpecies
      ? localPeopleArr
      : data?.results;

  useEffect(() => {
    // arr includes all characters
    const totalPeople = page_1?.results
      .concat(page_2?.results)
      .concat(page_3?.results)
      .concat(page_4?.results)
      .concat(page_5?.results)
      .concat(page_6?.results)
      .concat(page_7?.results)
      .concat(page_8?.results)
      .concat(page_9?.results);

    // const searchResultIds = totalPeople?.map((item) =>
    //   extractIdFromUrl(item?.url)
    // );

    // getting ids of searching result to use it in filter algorithm
    const searchResultIds = data?.results?.map((item) =>
      extractIdFromUrl(item?.url)
    );

    // getting ids of dropdown result to use it in filter algorithm
    const peoplePlanetsIds = peoplePlanets?.map((item) =>
      extractIdFromUrl(item)
    );
    const peopleFilmsIds = peopleFilms?.map((item) => extractIdFromUrl(item));
    const peopleSpeciesIds = peopleSpecies?.map((item) =>
      extractIdFromUrl(item)
    );

    // find matched ids over all results
    const matches = findMatches(
      searchResultIds,
      peoplePlanetsIds,
      peopleFilmsIds,
      peopleSpeciesIds
    );

    // handle displayed data after apply search and filter
    const filteredArrays = totalPeople?.filter((people) =>
      matches?.includes(extractIdFromUrl(people?.url))
    );
    setLocalPeopleArr(filteredArrays);
  }, [data, peoplePlanets, peopleFilms, peopleSpecies]);

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12} lg={6}>
          <Input
            size="large"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={6}>
          <Select
            size="large"
            loading={planetsIsFetching}
            allowClear
            fieldNames={{
              label: "name",
              value: "name",
            }}
            options={planets?.results}
            placeholder="Select planet..."
            onChange={(_, option) => setPeoplePlanets(option?.residents)}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={6}>
          <Select
            size="large"
            loading={filmsIsFetching}
            allowClear
            fieldNames={{
              label: "title",
              value: "title",
            }}
            options={films?.results}
            placeholder="Select films..."
            onChange={(_, option) => setPeopleFilms(option?.characters)}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={6}>
          <Select
            size="large"
            loading={speciesIsFetching}
            allowClear
            fieldNames={{
              label: "name",
              value: "name",
            }}
            options={species?.results}
            placeholder="Select species.."
            onChange={(_, option) => setPeopleSpecies(option?.people)}
          />
        </Col>
      </Row>

      <Divider />
      {displayedList?.length === 0 && <EmptyState />}
      {isFetching ? (
        <Loading />
      ) : (
        <>
          <Row gutter={[16, 16]}>
            {displayedList?.map((user, index) => (
              <Col key={index} xs={24} sm={24} md={12} lg={6}>
                <UserCard
                  userData={user}
                  loading={isFetching}
                  index={index}
                ></UserCard>
              </Col>
            ))}
          </Row>
          {!(peoplePlanets || peopleFilms || peopleSpecies) && (
            <Row justify="end">
              <Pagination
                current={current}
                onChange={onChange}
                total={data?.count}
                hideOnSinglePage
                defaultPageSize={10}
                showSizeChanger={false}
              />
            </Row>
          )}
        </>
      )}
    </>
  );
}
