import { Text, Button, Icon, Card } from "@rneui/themed"


const ResultDetailScreen = ({ navigation, route }) => {
    const { shelter } = route.params

    return (
        <>
            <Button
                type="solid"
                containerStyle={{ width: 100, marginLeft: 14, marginTop: 8 }}
                buttonStyle={{ borderRadius: 25 }}
                color='#4f7ba5'
                onPress={() => navigation.goBack()}
            >
                <Icon name="arrow-back-outline" type='ionicon' color="white" />
                Back
            </Button>
        
            <Card>
                <Card.Title style={{ fontSize: 20 }}>{shelter.poi.name}</Card.Title>
                <Card.Divider></Card.Divider>
                
                        <Text style={{ fontSize: 23, textAlign: 'center' }}>{shelter.address.freeformAddress}</Text>
                      
            </Card>
        </>
    )
}

export default ResultDetailScreen