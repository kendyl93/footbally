import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { API_TOKEN } from "react-native-dotenv";



export default function App() {
  useEffect(() => {
    fetch('http://api.football-data.org/v2/competitions/2021/matches?matchday=1', { headers:{'X-Auth-Token': API_TOKEN}})
      .then((response) => response.json())
      .then((json) => console.log({DATA: json}))
      .catch((error) => console.error(error))
  }, []);
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Open up App.tsx to start working on your app!!!!!!!!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    borderStyle: "solid",
    borderColor: "red",
    borderWidth: 2
  }
});
