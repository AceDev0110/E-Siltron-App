import React, {useEffect} from 'react';
import { View, StyleSheet, ScrollView, Text, Image, FlatList, Dimensions, TouchableOpacity, Alert, Linking } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/AntDesign';

//++++++++++++++++  Component ++++++++++++++++
import ScreenName from '../components/ScreenName.js'
import Header from '../components/Header.js'
import KButtonBlue from '../components/KButtonBlue';
import KInformText from '../components/KInformText';
import KMainButton from '../components/KMainButton';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const numColumns = 2;


export default function ContactUs_Screen({ navigation }) {

  useEffect(() => {
    global.screenName = "contact us";
    focusListener = navigation.addListener('didFocus', () => {
      global.screenName = "contact us";
    });
  }, []);



  const goBackClick = () => {
    navigation.navigate('Home');
  }
  const on_Amazon = () => {
    Linking.openURL('https://www.amazon.com/').catch((err) => console.error('An error occurred', err));
  }
  const on_Instagram = () => {
    Linking.openURL('https://www.instagram.com/siltron_electronics/').catch((err) => console.error('An error occurred', err));
  }
  const on_Facebook = () => {
    Linking.openURL('https://m.facebook.com/Siltron-Electronics-107902611034439/').catch((err) => console.error('An error occurred', err));
  }
  const on_Youtube = () => {
    Linking.openURL('https://www.youtube.com/channel/UCL2QyJvPPuoJvyGBttL5gPQ/').catch((err) => console.error('An error occurred', err));
  }

  return (
    <React.Fragment>
      <Header />
      <View style={{ alignItems: 'center' }}>
        <KInformText text = " Contact Us "/>
      </View>

      <ScrollView style={styles.container}>

        <View style = {styles.doubleBox}>
          <Text style={styles.lightText}> SILTRON </Text>
          <Text style={styles.boldText}> HILAL AL EMARAT GENERAL TRADING L.L.C</Text>
        </View>

        <View style = {styles.doubleBox}>
          <Text style={styles.lightText}> ADDRESS: </Text>
          <Text style={styles.boldText}> SHOP NO.4 AL WARI{"\n"} BUILDING, 21A STREET, NAIF AREA, DEIRA, DUBAI, U.A.E</Text>
        </View>

        <View style = {styles.doubleBox}>
          <Text style={styles.lightText}> TEL NUMBERS: </Text>
          <Text style={styles.boldText}> LANDLINE: +9714-2227653{"\n"}MOBILE: +971-505858899{"\n"}WHATSAPP: +971505858899 </Text>
        </View>

        <View style = {styles.doubleBox}>
          <Text style={styles.lightText}> EMAIL: </Text>
          <Text style={styles.boldText}> hilalgen@eim.ae </Text>
        </View>

        <View style = {{width : '100%', marginBottom : 30}}>
          {/* <KMainButton title = "SHOP NOW" callback = {on_Amazon} style = {{color : 'cyan', fontSize : 30}}/> */}
          <KMainButton title = "SHOP NOW" callback = {on_Amazon} style = {{color : 'yellow', fontSize : 30}} amazonimage = {true}/>
        </View>

        <View style = {styles.doubleBox}>
          <Text style={[styles.lightText, {fontSize : 24, color : 'yellow'}]}>PLEASE FOLLOW US ON</Text>
          <View style = {{alignSelf : 'center', flexDirection : 'row', backgroundColor : '#0055AA', width : '100%', justifyContent : 'space-around', padding: 10, borderRadius: 20}}>
            <View/>
            <TouchableOpacity onPress = {on_Instagram}>
              <Icon name="instagram" size={50} color="white" />
            </TouchableOpacity>

            <TouchableOpacity onPress = {on_Facebook}>
              <Icon name="facebook-square" size={50} color="white" />
            </TouchableOpacity>

            <TouchableOpacity onPress = {on_Youtube}>
              <Icon name="youtube" size={50} color="white" />
            </TouchableOpacity>
            <View/>
          </View>
        </View>



        <View style = {{height: 50}}></View>

      </ScrollView>

      {/* <View style={{
        position: 'absolute',
        bottom: 10,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: 20,
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 40
      }}>
        <TouchableOpacity onPress={goBackClick} >
          <FontAwesome5 name="arrow-circle-left" size={50} color="#004488" />
        </TouchableOpacity>
      </View> */}
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  doubleBox: {
    alignItems: "center",
    justifyContent : 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor : '#0066BB',
    borderRadius: 20,
    width: '80%',
    marginBottom : 20,
  },
  lightText : {
    color : 'white',
    padding: 10,
    fontWeight : 'bold',
    fontSize : 20
  },
  boldText: {
    color: 'white',
    width: '100%',
    textAlign : 'center',
    backgroundColor: '#0055AA',
    padding: 10,
    paddingTop : 10,
    paddingBottom : 10,
    borderRadius: 20,
    fontSize: 18,
    fontWeight: 'bold',
    //marginBottom: 40
  }
});
