import React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { screenOptions } from '../components/navigations/stack/ScreenOptions';

export type HomeParamList = {
  Home: undefined;
};

const Stack = createStackNavigator<HomeParamList>();

const TestComp: React.FC = () => {
  return (
    <View>
      <Text>test</Text>
    </View>
  );
};

interface HomeNavigatorProps {}

const HomeNavigator: React.FC<HomeNavigatorProps> = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Home" component={TestComp} options={{ title: 'Homepage' }} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
