import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
    Home: undefined,
    SingleMatch: { id: Number, otherParam: String }
  }
  
type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

export interface HomeProps {
  navigation: HomeScreenNavigationProp
}