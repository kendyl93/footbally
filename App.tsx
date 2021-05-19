import React, { useEffect, useState } from 'react';
import { StatusBar, setStatusBarTranslucent } from 'expo-status-bar';
import { FlatList, Platform, SafeAreaView, SectionList,StyleSheet, Text, View } from 'react-native';
import { API_TOKEN } from "react-native-dotenv";
import useInterval from './useInterval'
import _ from 'lodash';
import { NavigationContainer  } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import SingleMatch from './Screens/SignleMatch'

// const COMPETITIONS_ID: {
//   BRASIL_SERIE_A: {id: 2013,name: "Série A"},
//   CHAMPIONSHIP: {id: 2016,name: "Championship", ensignUrl: "https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg",},
//   PREMIER_LEAGUE: {id: 2021, name: "Premier League", ensignUrl: "https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg"},
//   UCL: {id:2001, name: "UEFA Champions League"},
//   EL: {id: 2018, name: "European Championship", },
//   ITALY_SERIE_A: {id: 2019, name: "Serie A", ensignUrl: "https://upload.wikimedia.org/wikipedia/en/0/03/Flag_of_Italy.svg"},
//   EREDEVISIE: {id: 2003, name: "Eredivisie", ensignUrl: "https://upload.wikimedia.org/wikipedia/commons/2/20/Flag_of_the_Netherlands.svg"},
//   PRIMERA_LIGA:{id: 2017, name: "Primeira Liga",ensignUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Portugal.svg"},
//   BUNDESLIGA: {id: 2002, name:"Bundesliga", ensignUrl: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg"}
//   PRIMERA_DEVISION: {id: 2014,name:"Primera Division", ensignUrl: "https://upload.wikimedia.org/wikipedia/en/9/9a/Flag_of_Spain.svg"},
//   FIFA_WC: {id: 2000, name: "FIFA World Cup"}
// }

interface ICompetitions {
  id: number;
  name: string;
}

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

interface matchData {
  title: string,
  data: any
}

const HomeScreen = ({navigation}) => {
  const [competitions, setcompetitions] = useState<ICompetitions[]>([])

  useEffect(    () => {
    setStatusBarTranslucent(false)
    // Your custom logic here
  fetch('http://api.football-data.org/v2/matches?plan=TIER_ONE', { headers:{'X-Auth-Token': API_TOKEN}}) // put into localstorage and do not refetch before 1min
    .then((response) => response.json())
    .then((json) =>setcompetitions(_.groupBy(json.matches, (m: any) => m?.competition?.name)))
    .catch((error) => console.error(error))
    .finally(() => console.log({competitions}))

  },[])

  const data: matchData[] = Object.entries(competitions).map(([key, value])=> ({title: key, data: value}))
console.log({data})
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Competitions</Text>
      <SectionList 
        sections={data}
        renderItem={({item}) => 
          <>
           <Text key={`${item}-title`}  onPress={() => {
                  /* 1. Navigate to the Details route with params */
                  navigation.navigate('SingleMatch', {
                    id: item?.id,
                    otherParam: 'anything you want here',
                  });
                }}>{item?.homeTeam.name} - {item?.awayTeam.name}</Text>
        </>}
        renderSectionHeader={({section}) => <Text style={styles.text}>{section.title}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
      <StatusBar style="auto" />
    </SafeAreaView >
  );
}

type RootStackParamList = {
  Home: undefined,
  SingleMatch: { id: Number, otherParam: String }
}

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {  
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="SingleMatch" component={SingleMatch} />
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
