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
    const [atlasResults, setAtlasResults] = useState(['empty'])
    const [tomtomResults, setTomtomResults] = useState(['empty'])

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
      let tomtomResults = await placeFinder.getNearbyPlaces(lat, lng)
      tomtomResults = tomtomResults.filter((result) => result.poi.name !== 'Homeless Shelter') // filtering out results with non-unique names
      console.log("tomtom results",tomtomResults)
      setTomtomResults(tomtomResults);
      return tomtomResults
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

      console.log("atlas results",atlasResults)

      setAtlasResults(atlasResults)
      return atlasResults
    }

    // Using location to call tomtom api after location has been set
    useEffect(() => {
      if (location) {
        shelterSearch()
      }
    }, [location])

    // Querying atlas database after results from tomtom are set
    useEffect(() => {
      if (location) {
        atlasSearch()
      }
    }, [tomtomResults])

    // Merging tomtom and atlas results once both have been set
    useEffect(() => {
      if(location) {
        console.log("merging...",[...atlasResults, ...tomtomResults])

        // Include only non-empty arrays in the new array, else the array is empty.
        if(tomtomResults.length > 0 && atlasResults.length > 0) {
          let mergedArray = [...atlasResults, ...tomtomResults]
          mergedArray.sort((a, b) => a.dist - b.dist) // sorting results by distance from user
          setResults(mergedArray) 
        } else if (tomtomResults.length > 0 && !(atlasResults.length > 0)) {
          setResults(tomtomResults)
        }else if (!(tomtomResults.length > 0) && atlasResults.length > 0) {
          setResults(atlasResults)
        } else {
          setResults([])
        }
        
      }
    }, [atlasResults])

    
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
          console.log('navigating to search results. Results:', results)
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