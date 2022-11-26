import PlaceFinder from "../TomTom search api/placeFinder.js";
import { useState, useEffect } from "react";
import { View, StyleSheet} from "react-native";
import { Button } from "@rneui/themed";
import * as Location from 'expo-location';

const LocalSearchScreen = ({ navigation }) => {
    const [location, setLocation] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null)
    const [results, setResults] = useState(['empty']) // initialize to string 'empty' to recognize if later set to an empty array

    // Re-initializing location to null on page load, needed if coming from "try Again" on ErrorScreen
    useEffect(() => {
      setIsLoading(null)
    }, [])

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


    // Call to TomTom's placeFinder API passing my API key and user location
    const shelterSearch = async() => {
      const lat = location.coords.latitude
      const lng = location.coords.longitude
  
      
      let placeFinder = new PlaceFinder('aWYBPDg8q4jsUHu3EViMzBg3kJi91gaV');
      let results = await placeFinder.getNearbyPlaces(lat, lng)
      results = results.filter((result) => result.poi.name !== 'Homeless Shelter') // filtering out results with non-unique names
      setResults(results);
      return results
    }

    // Using location to search for shelters after location has been set
    useEffect(() => {
      if (location) {
        shelterSearch()
      }
    }, [location])

    
    // Navigate to loading when isLoading changes to true and no location set
    useEffect(() => {
      if (isLoading && !location) {
        navigation.navigate('loading')
      }
    }, [isLoading])


    // Navigate to errorScreen if no results found, else to searchResultsScreen
    useEffect(() => {
      if(!(results[0] === 'empty')) {
        if (results.length === 0) { 
          navigation.navigate('error', {errorMsg})
        } else {
          navigation.navigate('searchResults', {results})
        }
      }
    }, [results])


        return (
          <View style={styles.container}>
            <View style={{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}>
              <Button
                type='solid' 
                title="Search" 
                color='#60b593'
                buttonStyle={{ borderRadius: 20 }}
                onPress={() => getLocation()}
              />
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

export default LocalSearchScreen