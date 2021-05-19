import React from 'react';
import { NavigationContainer  } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SingleMatch from './Screens/SignleMatch'
import { RootStackParamList } from './types';
import HomeScreen from './Screens/Home'

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


const MainStack = createStackNavigator<RootStackParamList>();

const MainNavigator = () => {
  const {Navigator, Screen} = MainStack;

  return (
    <Navigator>
    <Screen name="Home" component={HomeScreen} />
    <Screen name="SingleMatch" component={SingleMatch} />
  </Navigator>
  )
}

export default function App() {  
  return (
    <NavigationContainer>
      <MainNavigator />
  </NavigationContainer>
  );
}

