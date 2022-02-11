//{"id":"1","createdAt":"2021-06-21T11:39:03.670Z","name":"French Bulldog","avatar":"http://placeimg.com/640/480/animals","bornAt":"2021-01-28T04:26:47.647Z"}

import { StyleSheet } from "react-native";

import DataContextProvider from "./context/DataContext";

import Home from "./screens/Home";

export default function App() {
  return (
    <DataContextProvider>
      <Home />
    </DataContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
