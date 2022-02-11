import { createContext, useEffect, useState } from "react";

export const DataContext = createContext();

const DataContextProvider = (props) => {
  const [today, setToday] = useState(null);
  const [data, setData] = useState([]);
  const [petsList, setPetsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const fetchData = async () => {
    fetch("https://60d075407de0b20017108b89.mockapi.io/api/v1/animals")
      .then((response) => response.json())
      .then((json) => {setData(json),setPetsList(json)})
      .catch((error) => console.error(error))
      .finally(() => setLoading(true));
  };

  const solve = (str) => {
    var ans = "";
    for (let c of str) {
      if (c == "T") return ans;
      ans += c;
    }
  };

  useEffect(() => {
    try {
      fetchData();
      setToday(new Date());
    } catch (error) {
      console.log("useEffect: " + error.message);
    }
  }, []);

  useEffect(() => {
    setPetsList(
      data.filter((obj) => {
        if (
          search.length == 0 ||
          obj.name.toLowerCase().includes(search.toLowerCase())
        )
          return true;
        else return false;
      })
    );
  }, [search]);

  useEffect(() => {
    /*
    if("Saarloos Wolfdog">"German Spaniel") console.log("true");
    else console.log("false");
    */
    petsList.sort((a, b) => {
      if (sortBy == "age"){
          if(new Date(solve(a.bornAt)) > new Date(solve(b.bornAt))) return -1;
          else return 1;
      }
      else if (sortBy == "name"){
          if(a.name>b.name) return 1;
          else return -1;
      }
    });
    //console.log(sortBy);
  }, [sortBy]);

  return (
    <DataContext.Provider
      value={{
        data,
        petsList,
        search,
        loading,
        sortBy,
        setSortBy,
        setSearch,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
