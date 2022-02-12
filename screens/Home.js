import React, { useContext } from "react";
import {
  ActivityIndicator,
  View,
  StyleSheet,
  StatusBar,
} from "react-native";
import PetsList from './PetsList';

import { DataContext  } from "../context/DataContext";

const Home = () => {
  const {loading} = useContext(DataContext);

  //Logic for showing Loading Sign
  if (loading) {
    return (
      <View>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <PetsList/>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <ActivityIndicator size="large" color="#6c6c6c" />
      </View>
    );
  }
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
