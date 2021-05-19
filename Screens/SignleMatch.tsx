import React from 'react';
import { View, Text } from 'react-native'

const SingleMatch = ({route}) => {
    const { id: matchId, otherParam } = route.params;
return <View><Text>match id: {matchId}</Text><Text>otherParam: {otherParam}</Text></View>}

export default SingleMatch