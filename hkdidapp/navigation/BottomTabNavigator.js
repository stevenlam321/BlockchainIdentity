import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import SettingScreen from '../screens/SettingScreen';
import Scanner from '../screens/Scanner';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Scanner';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Credentials"
        component={HomeScreen}
        options={{
          title: 'Credentials',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />
        }}
      />
        <BottomTab.Screen
        name="Scanner"
        component={Scanner}
        options={{
          title: 'Scanner',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          title: 'Settings',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" />
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Scanner':
      return 'Scanner';
    case 'Credentials':
      return 'Credentials';
    case 'Settings':
      return 'Settings';
  }
}
