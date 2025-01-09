import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from './RootNavigation';
import { ListPage } from "../pages/ListPage/ListPage";
import { HomePage } from "../pages/HomePage/HomePage";
import { CardScannerPage } from "../pages/CardScannerPage/CardScannerPage";

const Stack = createStackNavigator();

type Route = {
    name: string,
    component: React.ComponentType<any>
}

const routes: Route[] = [
    { name: "HomePage", component: HomePage },
    { name: "ListPage", component: ListPage },
    { name: "CardScannerPage", component: CardScannerPage },
];

function AppStack() {
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator 
                screenOptions={{
                    headerShown: false,
                }}
            >
                {routes.map(route => {
                        return(
                            <Stack.Screen key={route.name} name={route.name} component={route.component} />
                        )
                    }
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppStack;
