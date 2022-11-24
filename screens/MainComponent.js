import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Platform, View } from "react-native";
import HomeScreen from "./HomeScreen";
import LocalSearchScreen from "./LocalSearchScreen";
import AboutScreen from "./AboutScreen";
import ResourcesScreen from "./ResourcesScreen";
import { Constants } from "expo-constants";
import { Ionicons } from '@expo/vector-icons';
import SearchStack from "./LocalSearchScreen";

// '#4f7ba5' blue I like

const screenOptions = ({ route }) => ({
    tabBarIcon: ({color, size }) => {
      let iconName;
      
      if (route.name === 'Home') {
        iconName = 'home';
      } else if (route.name === 'Local Search') {
        iconName = 'rocket';
      } else if (route.name === 'About') {
        iconName = 'help';
      } else if (route.name === 'Resources') {
        iconName = 'book';
      }
      
      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: '#60b593',
    tabBarInactiveTintColor: 'gray',
    headerStyle: {
        backgroundColor: '#60b593'
    }
  })

const Tab = createBottomTabNavigator();

const Main = () => {
    return (
        <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight }}>
            <Tab.Navigator initialRouteName="Home" screenOptions={screenOptions}>
                <Tab.Screen 
                    name="Home"
                    component={HomeScreen}
                    options={{ title: 'Help Easy', tabBarLabel: 'Home' }}
                />

                <Tab.Screen 
                    name="Local Search"
                    component={SearchStack}
                    options={{ title: 'Help Easy', tabBarLabel: 'Lift Off' }}
                />

                <Tab.Screen 
                    name="Resources"
                    component={ResourcesScreen}
                    options={{ title: 'Help Easy', tabBarLabel: 'Resources' }}
                />

                <Tab.Screen 
                    name="About"
                    component={AboutScreen}
                    options={{ title: 'Help Easy', tabBarLabel: 'About Us' }}
                />
            </Tab.Navigator>
        </View>
    );
}

export default Main;