import React, { useEffect, useState } from 'react';
import { StatusBar, setStatusBarTranslucent } from 'expo-status-bar';
import { FlatList, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { API_TOKEN } from "react-native-dotenv";
import useInterval from './useInterval'
import _ from 'lodash';

const COMPETITIONS_ID: {
  BRASIL_SERIE_A: {id: 2013,name: "Série A"},
  CHAMPIONSHIP: {id: 2016,name: "Championship", ensignUrl: "https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg",},
  PREMIER_LEAGUE: {id: 2021, name: "Premier League", ensignUrl: "https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg"},
  UCL: {id:2001, name: "UEFA Champions League"},
  EL: {id: 2018, name: "European Championship", },
  ITALY_SERIE_A: {id: 2019, name: "Serie A", ensignUrl: "https://upload.wikimedia.org/wikipedia/en/0/03/Flag_of_Italy.svg"},
  EREDEVISIE: {id: 2003, name: "Eredivisie", ensignUrl: "https://upload.wikimedia.org/wikipedia/commons/2/20/Flag_of_the_Netherlands.svg"},
  PRIMERA_LIGA:{id: 2017, name: "Primeira Liga",ensignUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Portugal.svg"},
  BUNDESLIGA: {id: 2002, name:"Bundesliga", ensignUrl: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg"}
  PRIMERA_DEVISION: {id: 2014,name:"Primera Division", ensignUrl: "https://upload.wikimedia.org/wikipedia/en/9/9a/Flag_of_Spain.svg"},
  FIFA_WC: {id: 2000, name: "FIFA World Cup"}
}

interface ICompetitions {
  id: number;
  name: string;
}


const fromSeconds = (seconds: number): number => 1000 * seconds;

const renderMatch = ({ item }) => (
  <Text key={item.id}>{item?.homeTeam.name} - {item?.awayTeam.name}</Text>
);

const renderItem = ({ item }) => {
  console.log({item})
  return (
  <>
   <Text style={styles.text}key={`${item[0]}-title`}>{item[0]}</Text>
  <FlatList
        data={item[1]}
        renderItem={renderMatch}
        keyExtractor={item => `${item?.homeTeam.name}-${item?.awayTeam.name}`}
      />
      
</>
)};


export default function App() {
  // The counter
  const [competitions, setcompetitions] = useState<ICompetitions[]>([])

  useEffect(    () => {
    setStatusBarTranslucent(false)
    // Your custom logic here
  fetch('http://api.football-data.org/v2/matches?plan=TIER_ONE', { headers:{'X-Auth-Token': API_TOKEN}})
    .then((response) => response.json())
    .then((json) =>setcompetitions(_.groupBy(json.matches, m=>m?.competition?.name)))
    .catch((error) => console.error(error))
    .finally(() => console.log({competitions}))

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
      {<FlatList
        data={Object.entries(competitions)}
        renderItem={renderItem}
        keyExtractor={item => item[0].toString()}
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
