import React, { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Searchbar } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

import { DataContext } from "../context/DataContext";

import CustomCardRow from "../components/CustomCardRow";

const PetsList = () => {
  const {petsList, search, setSearch, organize} = useContext(DataContext);
  const [sortBy,setSortBy] = useState(null);

  //Updating Search varible
  const onChangeSearch = (query) => {
    setSearch(query);
  }

  //use to update the ordering 
  useEffect(()=>{
    organize(sortBy);
  },[sortBy])

  
  return (
    <View>
      <View style={styles.topbar}>
        <Picker
          selectedValue={sortBy}
          onValueChange={(itemValue, itemIndex) =>
            setSortBy(itemValue)
          }>
          <Picker.Item label="By Age" value="name" />
          <Picker.Item label="By Name" value="age" />
        </Picker>
        <View style={styles.space} />
        <Searchbar
          style={styles.seachbar}
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={search}
        />
      </View>
      <View>
        <FlatList
          data={petsList}
          renderItem={({ item, index }) => <CustomCardRow
            pet={item}
          />}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  topbar: {
    marginTop: 10,
    margin: 5,
  },
  picker: {
    borderColor: '#000',
  },
  space: {
    width: 20, // or whatever size you need
    height: 10,
  },
});


export default PetsList;