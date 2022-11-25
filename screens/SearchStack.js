import { createStackNavigator } from "@react-navigation/stack";
import LocalSearchScreen from "./LocalSearchScreen";
import LoadingScreen from "./LoadingScreen";
import ErrorScreen from "./ErrorScreen";
import SearchResultsView from "../TomTom search api/SearchResultsView";
import { NavigationContainer } from "@react-navigation/native";
import ResultDetailScreen from "./ResultDetailScreen";

const Stack = createStackNavigator()

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="search"
        component={LocalSearchScreen}
      />

      <Stack.Screen 
        name="loading"
        component={LoadingScreen}
      />

      <Stack.Screen 
        name="error"
        component={ErrorScreen}
      />

      <Stack.Screen 
        name="searchResults"
        component={SearchResultsView}
      />

      <Stack.Screen
        name="resultDetails"
        component={ResultDetailScreen}
      />
    </Stack.Navigator>
  )
}

export default function SearchStack() {
    return(
        <NavigationContainer independent={true}>
            <MyStack />
        </NavigationContainer>
    )
}