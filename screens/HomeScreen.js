import { Text, View, Modal, Pressable, StyleSheet  } from "react-native";
import { useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const HomeScreen = () => {
    const [modal1Visible, setModal1Visible] = useState(false);
    const [modal2Visible, setModal2Visible] = useState(false);

    return (
        <>
            <Animatable.View animation='bounceInUp' duration={1900} delay={100} style={(modal1Visible || modal2Visible) ? styles.container1Blur : styles.container1}> 
                <Text style={styles.homeText1}>Welcome to Help Easy</Text>

                {/* Modal 1 */}
                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modal1Visible}
                        backgroundColor='blue'
                    >
                        <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Ionicons style={styles.modalText} name='help' size={30} color='#60b593'  />
                            <Text style={styles.modalText}>Check out more about the project</Text>
                            <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => {
                                setModal1Visible(!modal1Visible)
                                setModal2Visible(true)
                            }}
                            >
                            <Text style={styles.textStyle}>Next</Text>
                            </Pressable>
                        </View>
                        </View>
                    </Modal>
                    <Pressable
                        style={[styles.button, styles.buttonOpen]}
                        onPress={() => {setModal1Visible(true)}}
                    >
                        <Text style={(modal1Visible || modal2Visible) ? styles.textStyleOpaque: styles.textStyle}>Tutorial</Text>
                    </Pressable>
                </View>

                {/* Modal 2 */}
                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modal2Visible}
                    >
                        <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Ionicons style={styles.modalText} name='rocket' size={30} color='#60b593'  />
                            <Text style={styles.modalText}>Search for nearby homeless shelters and walkthrough the process of helping! Easy-peasy.</Text>
                            <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => {setModal2Visible(!modal2Visible)}}
                            >
                            <Text style={styles.textStyle}>Got it!</Text>
                            </Pressable>
                        </View>
                        </View>
                    </Modal>
                </View> 
            </Animatable.View>
            
            <Animatable.View animation='bounceInUp' duration={1900} delay={350} style={(modal1Visible || modal2Visible) ? styles.container2Blur : styles.container2}>
                <Ionicons name='rocket' size={150} color='#60b593' style={(modal1Visible || modal2Visible) ? {opacity: .5} : {opacity: 1}}  />
            </Animatable.View>
        </>
    );
}

const styles = StyleSheet.create({
    homeText1: {
        marginTop: 100,
        fontSize: 37,
        textAlign: 'center',
        fontStyle: 'italic',
    },
    container1: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    container1Blur: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        opacity: .3,
        backgroundColor: '#535756'
    },
    container2: {
        alignItems: 'center',
        justifyContent: 'start',
        flex: 1
    },
    container2Blur: {
        alignItems: 'center',
        justifyContent: 'start',
        flex: 1,
        opacity: .3,
        backgroundColor: '#535756'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        position: "absolute",
        bottom: '9%',
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
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      buttonOpaque: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        opacity: .7
      },
      buttonOpen: {
        backgroundColor: "#4f7ba5",
      },
      buttonClose: {
        backgroundColor: "#4f7ba5",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      textStyleOpaque: {
        color: "#a6a6a6",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
})

export default HomeScreen;