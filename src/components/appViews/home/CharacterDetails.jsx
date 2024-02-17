import { Divider } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

export default function CharacterDetails({ data }) {
  const [homeWorldData, setHomeWorldData] = useState({});

  // get home world data
  useEffect(() => {
    axios.get(data.homeworld).then((res) => setHomeWorldData(res.data));
  }, [data]);

  return (
    <div>
      <h4>Character details</h4>
      <p> Height : {data.height}</p>
      <p> Mass : {data.mass}</p>
      <p> Date : {dayjs(data.created).format("DD-MM-YYYY")}</p>
      <p> Number of films : {data.films.length}</p>
      <p> Birth year : {data.birth_year}</p>
      <Divider />
      <h4>Home world</h4>
      <p> Name: {homeWorldData?.name}</p>
      <p> Terrain : {homeWorldData?.terrain}</p>
      <p> Climate : {homeWorldData?.climate}</p>
      <p> Num of residents : {homeWorldData?.residents?.length}</p>
    </div>
  );
}
