import { Card, Text, Input, Button } from "@rneui/themed";
import { ScrollView, StyleSheet, Linking } from "react-native";
import axios from "axios";
import { useState } from "react";

const AddShelter = () => {
    const [name, setName] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')

    const submitRequestForm = async(name, city, state) => {
        const data = { name, city, state }
        console.log(data)
        // Send a POST request to server
        fetch('http://192.168.50.244:3000/requestforms', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                city,
                state
            })
        });
    }

    return (
        <ScrollView>
            <Card>
                <Card.Title style={styles.title}>Not Finding a Shelter?</Card.Title>
                <Card.Divider></Card.Divider>
                <Text style={styles.text}>Fill out the information here! Our team will add do some research and it to our database.</Text>
                <Input 
                    placeholder="Shelter Name"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <Input 
                    placeholder="Shelter City" 
                    value={city}
                    onChangeText={(text) => setCity(text)}
                />
                <Input 
                    placeholder="Shelter State"
                    value={state}
                    onChangeText={(text) => setState(text)}
                />
                <Button
                    title={'React Native Elements'}
                    containerStyle={styles.container}
                    buttonStyle={styles.button}
                    onPress={() => submitRequestForm(name, city, state)}
                />
            </Card>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        textAlign: 'center',
        color: '#4f7ba5'
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 15
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      },
    button: {
        backgroundColor: '#60b593',
        borderRadius: 5
      },
    quote: {
        fontSize: 25,
        marginBottom: 25,
        textAlign: 'center',
        fontStyle: 'italic',
        color: '#4f7ba5'
    },
    link: {
        fontSize: 23,
        marginBottom: 20,
        textAlign: 'center',
        fontStyle: 'italic',
        color: '#60b593',
        fontWeight: 'bold'
    }
})

export default AddShelter;