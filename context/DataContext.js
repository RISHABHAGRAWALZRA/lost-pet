import { createContext, useEffect, useState } from "react";

export const DataContext = createContext();

const DataContextProvider = (props) => {
  //Data Variable required to implement this aaplication
  const [data, setData] = useState([]);
  const [petsList, setPetsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  //Function for fetching data with the given API
  const fetchData = async () => {
    fetch("https://60d075407de0b20017108b89.mockapi.io/api/v1/animals")
      .then((response) => response.json())
      .then((json) => {
        setData(json), setPetsList(json);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(true));
  };

  //Squizing out the required part of the bornAt data to use in creating a Data from this
  const solve = (str) => {
    var ans = "";
    for (let c of str) {
      if (c == "T") return ans;
      ans += c;
    }
  };

  //Runs at the start of application
  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.log("useEffect: " + error.message);
    }
  }, []);

  //Runs whenever seach variable changes or we can whenever there has a query for search
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
    organize("name");
  }, [search]);

  //Use to sort pet list in a specific order
  const organize = (sortBy) => {
    console.log(sortBy);
    petsList.sort((a, b) => {
      if (sortBy == "age") {
        if (new Date(solve(a.bornAt)) > new Date(solve(b.bornAt))) return -1;
        else return 1;
      } else {
        if (a.name > b.name) return 1;
        else return -1;
      }
    });
  };

  return (
    <DataContext.Provider
      value={{
        data,
        petsList,
        search,
        loading,
        setSearch,
        organize
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
