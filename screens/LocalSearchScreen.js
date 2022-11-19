import PlaceFinder from "../TomTom search api/placeFinder.js";
import { useState, useEffect } from "react";
import { Button, View, StyleSheet} from "react-native";
import * as Location from 'expo-location';
import SearchResultsView from "../TomTom search api/SearchResultsView.js";
import LoadingScreen from "./LoadingScreen.js";
import ErrorScreen from "./ErrorScreen.js";

const LocalSearchScreen = () => {
    const [location, setLocation] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null)
    const [results, setResults] = useState([])
    let text


    // Requesting permission and getting location with Expo Location
    const getLocation = async() => {
      setIsLoading(true)
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
        
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }

    // Using location to search for shelters after location has been set
    useEffect(() => {
      if (location) {
        shelterSearch()
      }
      
    }, [location])

    // Call to TomTom's placeFinder API passing my API key 
    const shelterSearch = async() => {
      const lat = location.coords.latitude
      const lng = location.coords.longitude
  
      let placeFinder = new PlaceFinder('aWYBPDg8q4jsUHu3EViMzBg3kJi91gaV');
      let results = await placeFinder.getNearbyPlaces(lat, lng)
      results = results.filter((result) => result.poi.name !== 'Homeless Shelter') // filtering out results with non-unique names
      setResults(results);
      
      return results
    }

      // Error and loading handling after search request
      if (isLoading && !location) {
        return <LoadingScreen />
      }

      // If error or no results
      if (errorMsg || (location && results.length === 0)) { 
        return <ErrorScreen errorMsg={errorMsg} />
      } 

      if (results.length > 0) {
        return <SearchResultsView results={results} />
      }

        return (
          <View style={styles.container}>
            <View style={{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}>
              <Button title="Search" color='#60b593' onPress={getLocation} />
            </View>
          </View>
      );  

      
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
   });

export default LocalSearchScreen;