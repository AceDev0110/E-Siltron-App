import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, FlatList, Dimensions, TouchableOpacity, BackHandler, Alert } from 'react-native';
import { StackActions } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import firestore from '@react-native-firebase/firestore';
import email from 'react-native-email';
//+++++++++++++ Component +++++++++++++++
import ScreenName from '../components/ScreenName.js';
import Header from '../components/Header.js'
import KButtonBlue from '../components/KButtonBlue';
import KInformText from '../components/KInformText';
import { useFocusEffect } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const numColumns = 2;
//var itemData = [  { uri : "https://source.unsplash.com/1024x768/?cables2",    name : "Enquiry Item 1",  }, {    uri : "https://source.unsplash.com/1024x768/?accessories",    name : " Enquiry Item 2",  },  {    uri : "https://source.unsplash.com/1024x768/?duck",    name : "Enquiry Item 3",  },  {    uri : "https://source.unsplash.com/1024x768/?rainbow",    name : "Enquiry Item 4"}];
export default function View_Enquiry_Screen({ navigation }) {
  const [itemData, setItemData] = useState([]);
  const [forceUpdate, setForceUpdate] = useState(0);
  useEffect(() => {
    setItemData(global.prepareEnquiry);
    global.screenName = "view enquiry";
    focusListener = navigation.addListener('didFocus', () => {
      console.log(global.prepareEnquiry);
      setItemData(global.prepareEnquiry);
      setForceUpdate(forceUpdate + 1);
      global.screenName = "view enquiry";
      BackHandler.removeEventListener("hardwareBackPress", true);
    });
    BackHandler.removeEventListener("hardwareBackPress", true);
  }, []);




  const sendEnquiryClick = () => {
    //Alert.alert("Sending Enquiry");
    var enquiryData = global.prepareEnquiry;
    enquiryData = enquiryData || [];

    if (enquiryData.size == 0) {
      Alert.alert("Enquiry list is empty!");
      return;
    }

    var sendData = '';
    let index = 1;
    enquiryData.forEach(item => {
      let eachItem = '';
      eachItem = eachItem + index.toString() + ". ";
      eachItem = eachItem + item.categoryname + " \\ ";
      eachItem = eachItem + item.subcategoryname + " \\ ";
      eachItem = eachItem + item.name;
      sendData = sendData + eachItem + "\n";
      index++;
    });


    const to = ['hilalgen@eim.ae'];
    email(to, {
      subject: 'SILTRON ELECTRONICS',
      isHtml: true,
      body: sendData
    }).catch(console.error);
  }

  const itemSelected = (item) => {
  }

  const renderItem = ({ item, onPress }) => {
    let length = item.name.length;
    let fontsize = 14;
    if (length > 20) fontsize = 12;
    if (length > 25) fontsize = 10;
    return (
      <View style={styles.renderItemStyle}>
        <TouchableOpacity
          style={styles.renderImageCoverStyle}
          onPress={() => itemSelected(item)}
        >
          <Image
            source={{ uri: item.uri }}
            style={styles.imageStyle}
            resizeMode="stretch"
          />
        </TouchableOpacity>
        <Text style={[styles.itemTextStyle, { fontSize: fontsize }]}>{item.name}</Text>
      </View>
    );
  }

  const goBackClick = () => {
    navigation.navigate('Home');
  }

  return (
    <React.Fragment>
      <Header />
      <View style={styles.container}>
        <KInformText text=" Your Enquiry " />
        <FlatList data={itemData} renderItem={renderItem} numColumns={numColumns} keyExtractor={(item, index) => index.toString()} />
      </View>
      <View style={{ padding: 10, justifyContent: 'center', alignItems: 'center' }}>
        <KButtonBlue title="Send Enquiry" callback={sendEnquiryClick} />
      </View>

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
    alignItems: 'center',
    justifyContent: 'center',
  },
  informText: {
    backgroundColor: 'red',
    color: 'white',
    margin: 20,
    padding: 5,
    paddingRight: 20,
    paddingLeft: 20,
    marginTop: 0,
    borderRadius: 20,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    minWidth: '40%',
    textAlign: 'center',
    fontSize: 20
  },
  renderItemStyle: {
    width: screenWidth * 0.4,
    height: screenWidth * 0.5,
    margin: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#004499'
    //    justifyContent : 'center'
  },
  renderImageCoverStyle: {
    width: '100%',
    height: '75%',
    alignItems: 'center',
    display: 'flex'
  },
  itemTextStyle: {
    //position : 'absolute', 
    //bottom : 0,
    marginTop: 0,
    width: '100%',
    height: '25%',
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: '#004499',
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    //borderRadius : 10,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTopColor: 'white',
    borderTopWidth: 1
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    //borderRadius : 10,
    //borderWidth : 2,
    //borderColor : '#003388'
  },
});
