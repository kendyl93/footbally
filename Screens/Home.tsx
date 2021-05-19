import React, { useEffect, useState } from 'react';
import { StatusBar, setStatusBarTranslucent } from 'expo-status-bar';
import { FlatList, Platform, SafeAreaView, SectionList,StyleSheet, Text, View } from 'react-native';
import { API_TOKEN } from "react-native-dotenv";
import { HomeProps } from '../types';
import _ from 'lodash';


interface ICompetitions {
    id: number;
    name: string;
  }
  
  
  
  
  interface matchData {
    title: string,
    data: any
  }

const Home: React.FC<HomeProps> = ({ navigation }) => {
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

  export default Home;