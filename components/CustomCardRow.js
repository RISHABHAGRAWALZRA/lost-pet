import React from "react";
import { StyleSheet } from "react-native";
import { Card } from "react-native-paper";

const CustomCardRow = ({ pet }) => {
  const solve = (str) => {
    var ans = "";
    for (let c of str) {
      if (c == "T") return ans;
      ans += c;
    }
  };

  const getAge = (bornAt) => {
    var date = new Date(bornAt);
    var dd = date.getDate();
    var dm = date.getMonth() + 1;
    var dy = date.getFullYear();

    var today = new Date();
    var td = today.getDate();
    var tm = 1 + today.getMonth();
    var ty = today.getFullYear();

    var month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (dd > td) {
      td = td + month[tm - 1];
      tm = tm - 1;
    }
    if (dm > tm) {
      tm = tm + 12;
      ty = ty - 1;
    }
    var d = td - dd;
    var m = tm - dm;
    var y = ty - dy;
    return { d, m, y };
  };

  const calculate = (bornAt) => {
    var arr = getAge(solve(bornAt));
    return "Age: " + arr.y + " Years " + arr.m + " Months " + arr.d + " Days";
  };

  return (
    <Card style={styles.container}>
      <Card.Title title={pet.name} subtitle={calculate(pet.bornAt)} />
    </Card>
  );
};

export default CustomCardRow;

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
});
