import shelterSearch from "../TomTom search api/shelterSearch.js";
import { useState, useEffect } from "react";
import { View, StyleSheet} from "react-native";
import { Button } from "@rneui/themed";
import atlasSearch from "../MongoDB Query/atlasSearch.js";
import * as Location from 'expo-location';
import * as Animatable from 'react-native-animatable';
import mergeData from "../Merge Results/mergeAndSort.js";

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

    // Using location to call tomtom api after location has been set
    useEffect(() => {
      if (location) {
        shelterSearch(location.coords.latitude, location.coords.longitude)
          .then((res) => setTomtomResults(res))
      }
    }, [location])

    // Querying atlas database after results from tomtom are set
    useEffect(() => {
      if (location) {
        atlasSearch(location.coords.latitude, location.coords.longitude)
          .then((res) => setAtlasResults(res))
      }
    }, [tomtomResults])

    // Merging tomtom and atlas results once both have been set
    useEffect(() => {
      // Location must be set to prevent merge attempt on page load
      if (location) {
        let mergedResults = mergeData(atlasResults, tomtomResults)
        setResults(mergedResults)
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