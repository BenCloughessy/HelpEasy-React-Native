import PlaceFinder from "../TomTom search api/placeFinder.js";
import { useState, useEffect } from "react";
import { View, StyleSheet} from "react-native";
import { Button } from "@rneui/themed";
import * as Location from 'expo-location';
import * as Animatable from 'react-native-animatable';

const LocalSearchScreen = ({ navigation }) => {
    const [location, setLocation] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null)
    const [results, setResults] = useState(['empty']) // initialize to string 'empty' to recognize if later set to an empty array

    // Re-initializing location and isLoading after results fetched, needed if coming from "try Again" on ErrorScreen
    useEffect(() => {
      setLocation(null)
      setIsLoading(false)
    }, [results])

    // Requesting permission and getting location with Expo Location
    const getLocation = async() => {
      setIsLoading(true)
      console.log('location: ', location)
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
        
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location)
    }


    // Call to TomTom's placeFinder API passing my API key and user location
    const shelterSearch = async() => {
      console.log('shelterSearch isLoading: ', isLoading)
      const lat = location.coords.latitude
      const lng = location.coords.longitude
  
      
      let placeFinder = new PlaceFinder('aWYBPDg8q4jsUHu3EViMzBg3kJi91gaV');
      let results = await placeFinder.getNearbyPlaces(lat, lng)
      results = results.filter((result) => result.poi.name !== 'Homeless Shelter') // filtering out results with non-unique names
      results = results.sort((a, b) => a.dist - b.dist) // sorting results by distance from user
      setResults(results);
      return results
    }

    // Query MongoDB Atlas database for shelters
    const atlasSearch = async() => {
      const atlasResults = await fetch(`http://192.168.50.244:3001/shelters/${location.coords.longitude}/${location.coords.latitude}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
      }).then((response) => response.json())

      console.log(atlasResults)
    }

    // Using location to search for shelters after location has been set
    useEffect(() => {
      if (location) {
        shelterSearch()
        atlasSearch()
      }
    }, [location])

    
    // Navigate to loading when isLoading changes to true and no location set
    useEffect(() => {
      if (isLoading && (!location || location === undefined)) {
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
            <Animatable.View animation='bounceInLeft' duration={1500} delay={0} style={{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}>
              <Button
                type='solid' 
                title="Search" 
                color='#60b593'
                buttonStyle={{ borderRadius: 20 }}
                onPress={() => getLocation()}
              />
            </Animatable.View>
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