import React, { useEffect, useState } from 'react';
import { StatusBar, setStatusBarTranslucent } from 'expo-status-bar';
import { FlatList, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { API_TOKEN } from "react-native-dotenv";
import useInterval from './useInterval'

enum COMPETITIONS_ID {
  BRASIL_SERIE_A = 2013,
  CHAMPIONSHIP = 2016,
  PREMIER_LEAGUE = 2021,
  UCL = 2001,
  EL = 2018,
  ITALY_SERIE_A = 2019,
  EREDEVISIE = 2003,
  PRIMERA_LIGA =2017,
  PRIMERA_DEVISION = 2014,
  FIFA_WC = 2000
}

interface ICompetitions {
  id: number;
  name: string;
}


const fromSeconds = (seconds: number): number => 1000 * seconds;

const renderItem = ({ item }) => (
  <Text key={item.id}>{item?.name}</Text>
);


export default function App() {
  // The counter
  const [competitions, setcompetitions] = useState<ICompetitions[]>([])

  useEffect(    () => {
    setStatusBarTranslucent(false)
    // Your custom logic here
  fetch('http://api.football-data.org/v2/competitions?plan=TIER_ONE', { headers:{'X-Auth-Token': API_TOKEN}})
    .then((response) => response.json())
    .then((json) =>setcompetitions(json.competitions))
    .catch((error) => console.error(error))
    .finally(() => console.log({fromUseEffect: competitions}))

  },[])

  // useInterval(
  //   () => {
  //     // Your custom logic here
  //   fetch('http://api.football-data.org/v2/competitions/2021/matches?matchday=34', { headers:{'X-Auth-Token': API_TOKEN}})
  //     .then((response) => response.json())
  //     .then((json) =>setcompetitions(json))
  //     .catch((error) => console.error(error))
  //     .finally(() => console.log({fromInterval: apiData}))

  //   },
  //   // Delay in milliseconds or null to stop it
  //   fromSeconds(60),
  // )
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Competitions</Text>
      {competitions.length > 0 && <FlatList
        data={competitions}
        renderItem={renderItem}
        keyExtractor={item => item?.id}
      />}
      <StatusBar style="auto" />
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text:{
    borderStyle: "solid",
    borderColor: "red",
    borderWidth: 2
  }
});
