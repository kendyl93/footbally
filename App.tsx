import React, { useEffect, useState } from 'react';
import { StatusBar, setStatusBarTranslucent } from 'expo-status-bar';
import { FlatList, Platform, SafeAreaView, SectionList,StyleSheet, Text, View } from 'react-native';
import { API_TOKEN } from "react-native-dotenv";
import useInterval from './useInterval'
import _ from 'lodash';
import { NavigationContainer  } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

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

const MatchScreen = ({ navigation }) => <View><Text>aksjflkajsflahslfhashflijh</Text></View>

const HomeScreen = ({ navigation }) => {
  const [competitions, setcompetitions] = useState<ICompetitions[]>([])

  useEffect(    () => {
    setStatusBarTranslucent(false)
    // Your custom logic here
  fetch('http://api.football-data.org/v2/matches?plan=TIER_ONE', { headers:{'X-Auth-Token': API_TOKEN}}) // put into localstorage and do not refetch before 1min
    .then((response) => response.json())
    .then((json) =>setcompetitions(_.groupBy(json.matches, m=>m?.competition?.name)))
    .catch((error) => console.error(error))
    .finally(() => console.log({competitions}))

  },[])

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Competitions</Text>
      <SectionList 
      sections={Object.entries(competitions).map(([key, value])=> ({title: key, data: value}))}
        renderItem={({item}) => 
          <>
           <Text key={`${item}-title`}  onPress={() => {
                  /* 1. Navigate to the Details route with params */
                  navigation.navigate('Match', {
                    itemId: item?.id,
                    otherParam: 'anything you want here',
                  });
                }}>{item?.homeTeam.name} - {item?.awayTeam.name}</Text>
        </>}
        renderSectionHeader={({section}) => <Text style={styles.text}>{section.title}</Text>}
        keyExtractor={(item, index) => index}
      />
      <StatusBar style="auto" />
    </SafeAreaView >
  );
}

const Stack = createStackNavigator();

export default function App() {


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
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Match" component={MatchScreen} />
    </Stack.Navigator>
  </NavigationContainer>
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
