import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { navigationRef } from "./RootNavigation";
import { ListScreen } from "../screens/ListScreen/ListScreen";
import { HomeScreen } from "../screens/HomeScreen/HomeScreen";
import { CardScannerScreen } from "../screens/CardScannerScreen/CardScannerScreen";
import { DuelConfigScreen } from "../screens/DuelConfigScreen/DuelConfigScreen";
import { DuelScreen } from "../screens/DuelScreen/DuelScreen";

const Stack = createStackNavigator();

type Route = {
  name: string;
  component: React.ComponentType<any>;
};

const routes: Route[] = [
  { name: "HomeScreen", component: HomeScreen },
  { name: "ListScreen", component: ListScreen },
  { name: "CardScannerScreen", component: CardScannerScreen },
  { name: "DuelConfigScreen", component: DuelConfigScreen },
  { name: "DuelScreen", component: DuelScreen },
];

function AppStack() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {routes.map((route) => {
          return (
            <Stack.Screen
              key={route.name}
              name={route.name}
              component={route.component}
            />
          );
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppStack;
