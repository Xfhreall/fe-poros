import Select from "react-select";
import { useEffect, useState } from "react";
import "../style/main.css";

const Main = () => {
  const [datas, setDatas] = useState([]);
  const [userSelect, setUserSelect] = useState("");
  const [descs, setDescs] = useState([]);
  const [details, setDetails] = useState([]);
  const baseEnd = "https://pokeapi.co/api/v2/pokemon/";
  const type = "https://pokeapi.co/api/v2/pokemon-species/";

  //endpoint nama pokemon
  try {
    const getData = async () => {
      const data = await fetch(baseEnd);
      const value = await data.json();
      const result = value.results.map((data) => {
        return {
          label: data.name,
          value: data.name,
        };
      });
      setDatas(result.sort((a, b) => a.label.localeCompare(b.label)));
    };
    useEffect(() => {
      getData();
    }, []);
  } catch (err) {
    throw err;
  }

  //dom
  const change = (value) => {
    setUserSelect(value);
    hitpoints();
  };

  const Desc = () => {
    if (descs) {
      return (
        <div className="desc" data-aos="fade-up" data-aos-duration="2000">
          <div
            style={{
              marginTop: "1em",
              textTransform: "capitalize",
              fontWeight: "bolder",
            }}
          >
            {details.map((val, i) => {
              return (
                <div id={i.toString()}>
                  <p>{`Pokemon: ${val.name}`}</p>
                </div>
              );
            })}
          </div>
          <div className="card">
            <div className="text">
              {details.map((val, i) => {
                return (
                  <div id={i.toString()}>
                    <p>{`habitat: ${val.habitat.name}`}</p>
                  </div>
                );
              })}
              {descs.map((val, i) => {
                return (
                  <div id={i.toString()}>
                    <p>{`${val.stat.name} : ${val.base_stat}`}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }
  };

  const hitpoints = async () => {
    try {
      const data = await fetch(`${baseEnd}${userSelect}`);
      const value = await data.json();
      const data2 = await fetch(`${type}${userSelect}`);
      const value2 = await data2.json();
      setDescs(value.stats);
      setDetails([value2]);
    } catch (err) {
      throw err;
    }
  };

  const Submit = async () => {
    hitpoints();
  };
  useEffect(() => {
    Submit();
  }, []);

  //desc
  return (
    <div className="page">
      <div className="main">
        <p
          data-aos="fade-down"
          data-aos-duration="2000"
          className="poros"
          fill="POROS"
        >
          POROS
        </p>
        <div className="search">
          <Select
            className="drop"
            options={datas}
            onChange={(i) => change(i.value)}
            placeholder="Masukkan nama pokemon"
            styles={{ backgroundColor: "blue" }}
          />
          <button
            onClick={() => Submit()}
            disabled={!userSelect}
            className="btn"
          >
            Show
          </button>
        </div>
        <>
          <Desc />
        </>
      </div>
      <div className="credit">
        <div>
          <p>{`Dont forget to hover the POROS title ;) `}</p>
          <p>Made By @Risqi_Fahreal for Poros FE Freepass</p>
        </div>
      </div>
    </div>
  );
};

export default Main;
