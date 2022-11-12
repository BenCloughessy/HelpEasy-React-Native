import PlaceFinder from "../TomTom search api/placeFinder.js";
import { useState, useEffect } from "react";
import { Button, View, Text, Platform } from "react-native";
import { StyleSheet } from "react-native";
import * as Location from 'expo-location';




const LocalSearchScreen = () => {
    const [location, setLocation] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null)

    const requestPermission = async() => {
        setIsLoading(true)
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
        
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
    }
    
    let text = ''
      if (isLoading) {
        text = 'Waiting..';
      } 
      
      if (errorMsg) {
        text = errorMsg;
      } 
      
      if (location) {
        text = `Lat: ${location.coords.latitude} Long: ${location.coords.longitude}`;
      }

    return (
        <View style={styles.container}>
            <View style={{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}>
                <Button title="Get Location" color='#60b593' onPress={requestPermission} />
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