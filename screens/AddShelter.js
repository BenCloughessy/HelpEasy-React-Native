import { Card, Text, Input, Button } from "@rneui/themed";
import { ScrollView, StyleSheet, View, Modal, Pressable } from "react-native";
import { useState } from "react";


const AddShelter = () => {
    const [name, setName] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [modalOpen, setModalOpen] = useState(false)

    const submitRequestForm = async(name, city, state) => {
        // Send a POST request to server
        fetch('http://192.168.50.244:3001/requestforms', {
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
        }).then(() => {
            setModalOpen(!modalOpen)
        })
    }

    return (
        <>
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
                        title={'Request to Add Shelter'}
                        containerStyle={styles.container}
                        buttonStyle={styles.button}
                        onPress={() => submitRequestForm(name, city, state)}
                    />
                </Card>
            </ScrollView>

            {/* Form submission success modal */}
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalOpen}
                    backgroundColor='blue'
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Success! We got your request and will look into in ASAP. Thanks!</Text>
                            <Button
                                title={'Got it!'}
                                containerStyle={styles.container}
                                buttonStyle={styles.button}
                                onPress={() => {
                                    setModalOpen(!modalOpen)
                                    setName('')
                                    setCity('')
                                    setState('')
                                }}
                            />
                        </View>
                    </View>
                </Modal>
            </View>
        </>
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
        color: 'white',
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
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        position: "absolute",
        bottom: '19%',
        margin: 15,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 25,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      modalText: {
        marginBottom: 15,
        fontSize: 20,
        textAlign: "center"
      }
})

export default AddShelter;