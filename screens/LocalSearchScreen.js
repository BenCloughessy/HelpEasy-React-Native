import PlaceFinder from "../TomTom search api/placeFinder.js";
import { useState, useEffect } from "react";
import { Button, View, Text, Platform } from "react-native";
import { StyleSheet } from "react-native";
import * as Location from 'expo-location';

const LocalSearchScreen = () => {
    const [location, setLocation] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null)
    const [results, setResults] = useState([])
    let text

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

    useEffect(() => {
      if (location) {
        shelterSearch()
      }
      
    }, [location])


    const shelterSearch = async() => {
      const lat = location.coords.latitude
      const lng = location.coords.longitude
  
      let placeFinder = new PlaceFinder('aWYBPDg8q4jsUHu3EViMzBg3kJi91gaV');
      let results = await placeFinder.getNearbyPlaces(lat, lng)
      setResults(results);
      
      return results
    }

      if (isLoading) {
        text = 'Waiting..';
      } 
      if (errorMsg) {
        text = errorMsg;
      }
      if (location) {
        text = location.coords.latitude
      }
      if (results) {
        console.log('results', results)
      }

    return (
        <View style={styles.container}>
            <View style={{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}>
                <Button title="Get Location" color='#60b593' onPress={getLocation} />
            </View>
            <Text>{text}</Text>
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