import { Text, View, Alert, Modal, Pressable  } from "react-native";
import { StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from '@expo/vector-icons';



const HomeScreen = () => {
    const [modal1Visible, setModal1Visible] = useState(false);
    const [modal2Visible, setModal2Visible] = useState(false);
    const [modal3Visible, setModal3Visible] = useState(false);

    useEffect(() => {

    }, [])

    return (
        <>
        
        <View style={styles.container1}>
            <Text style={styles.homeText1}>Welcome to Help Easy</Text>

            {/* Modal 1 */}
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modal1Visible}
                    onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModal1Visible(!modal1Visible);
                    }}
                >
                    <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Ionicons style={styles.modalText} name='help' size={30} color='#60b593'  />
                        <Text style={styles.modalText}>Check out more about our project</Text>
                        <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                            setModal1Visible(!modal1Visible)
                            setModal2Visible(true);
                        }}
                        >
                        <Text style={styles.textStyle}>Next</Text>
                        </Pressable>
                    </View>
                    </View>
                </Modal>
                <Pressable
                    style={[styles.button, styles.buttonOpen]}
                    onPress={() => setModal1Visible(true)}
                >
                    <Text style={styles.textStyle}>Tutorial</Text>
                </Pressable>
            </View>

            {/* Modal 2 */}
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modal2Visible}
                    onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModal2Visible(!modal2Visible);
                    setModal3Visible(true);
                    }}
                >
                    <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Ionicons style={styles.modalText} name='book' size={30} color='#60b593'  />
                        <Text style={styles.modalText}>Dive into some recommended reading</Text>
                        <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                            setModal2Visible(!modal2Visible)
                            setModal3Visible(true);
                        }}
                        >
                        <Text style={styles.textStyle}>Next</Text>
                        </Pressable>
                    </View>
                    </View>
                </Modal>
            </View>

            {/* Modal 3 */}
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modal3Visible}
                    onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModal1Visible(!modal3Visible);
                    }}
                >
                    <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Ionicons style={styles.modalText} name='rocket' size={30} color='#60b593'  />
                        <Text style={styles.modalText}>Use our shelter search and guide to helping</Text>
                        <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModal3Visible(!modal3Visible)}
                        >
                        <Text style={styles.textStyle}>Next</Text>
                        </Pressable>
                    </View>
                    </View>
                </Modal>
            </View> 
        </View>
        
        <View style={styles.container2}>
            <Ionicons name='rocket' size={150} color='#60b593'  />
        </View>
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
    container2: {
        alignItems: 'center',
        justifyContent: 'start',
        flex: 1
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
        elevation: 2
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
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
})

export default HomeScreen;