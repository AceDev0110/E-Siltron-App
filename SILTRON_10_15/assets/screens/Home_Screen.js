import React, { Component, useState, useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';

import { SafeAreaView, StyleSheet, ScrollView, View, Text, Icon, TextInput, Image, StatusBar, Modal, Button, BackHandler, Dimensions, Alert, Linking } from 'react-native';
//import {  Header,  LearnMoreLinks,  Colors,  DebugInstructions,  ReloadInstructions,} from 'react-native/Libraries/NewAppScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SliderBox } from "react-native-image-slider-box";
import Toast from 'react-native-simple-toast';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
//++++++++++++++  Firebase +++++++++
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
const dashboard3 = firestore().collection('Dashboard3');  // category collection
const dashboard5 = firestore().collection('Dashboard5');  // subCategory collection
//++++++++++++++ component +++++++++++++
import KTextInput from '../components/KTextInput';
import KMainButton from '../components/KMainButton';
import Header from '../components/Header.js';
import { Container } from 'native-base';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
export default function Home_Screen({ navigation }) {
  const [SignInVisible, setSignInVisible] = useState(false);
  /*var sliderImages = [ 
    "https://source.unsplash.com/1024x768/?keyboard",
    "https://source.unsplash.com/1024x768/?tablet",
    "https://source.unsplash.com/1024x768/?guitars"
  ];*/
  const [sliderImages, setSliderImages] = useState([]);
  const [fiveImages, setFiveImages] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const onExit = () => {
    BackHandler.exitApp();
  }

  const on_View_Catalogue = () => {
    navigation.navigate("View Catalogue");
  }
  const on_View_Enquiry = () => {
    navigation.navigate("View Enquiry");
  }
  const on_Contact_Us = () => {
    navigation.navigate("Contact Us");
  }
  const on_Amazon = () => {
    Linking.openURL('https://www.amazon.ae/s?me=A14HXOL16FUM7T&marketplaceID=A2VIGQ35RCS4UG').catch((err) => console.error('An error occurred', err));
  }

  // const backAction = () => {
  //   console.log("backAction");
  // }

  useEffect(() => {
    //setIsFetching(true);
    console.log("fetching");


    focusListener = navigation.addListener('didFocus', () => {
      global.screenName = "Home Screen";
    });


    dashboard3.get().then(async (querySnapshot) => {
      var timages = [];
      if (querySnapshot.empty)
        setSliderImages([]);
      querySnapshot.forEach(async (documentSnapshot) => {
        let dashImage = documentSnapshot.data().uri;
        const uri = await storage().ref(dashImage).getDownloadURL();
        timages[timages.length] = uri;
        if (timages.length == querySnapshot.size) {
          setSliderImages(timages);
          console.log("done3 ", timages);
        }
      });
    });

    //    setFiveImages(["https://source.unsplash.com/1024x768/?keyboard","https://source.unsplash.com/1024x768/?keyboard","https://source.unsplash.com/1024x768/?keyboard"]);
    dashboard5.get().then(async (querySnapshot) => {
      var timages = [];
      if (querySnapshot.empty) {
        setFiveImages([]);
        setIsFetching(false);
      }
      querySnapshot.forEach(async (documentSnapshot) => {
        let fiveImage = documentSnapshot.data().uri;
        const uri = await storage().ref(fiveImage).getDownloadURL();
        timages[timages.length] = uri;
        if (timages.length == querySnapshot.size) {
          setFiveImages(timages);
          setIsFetching(false);
          console.log("done5 ", timages);
        }
      });
    });

    // BackHandler.addEventListener("hardwareBackPress", backAction);
    // return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);



  return (
    <Container>
      <Header />
      <StatusBar hidden={true} />
      <LinearGradient colors={['#fff', '#fff']} style={styles.linearGradient}>
        <ScrollView>



          <View>
            <SliderBox
              images={sliderImages}
              style={{ height: 250 }}
              circleLoop
              resizeMode="stretch"
            />
          </View>

          {
            isFetching ?
              (
                <View style={{flex: 1, alignItems: 'center', margin : 20}}>
                  <Bubbles size={10} color="#004499" padding={10} />
                </View>
              ) :
              (<View style={styles.horizontalImageList}>
                {fiveImages.length >= 1 ? <Image style={styles.imageItem} source={{ uri: fiveImages[0] }} resizeMode="stretch" /> : null}
                {fiveImages.length >= 2 ? <Image style={styles.imageItem} source={{ uri: fiveImages[1] }} resizeMode="stretch" /> : null}
                {fiveImages.length >= 3 ? <Image style={styles.imageItem} source={{ uri: fiveImages[2] }} resizeMode="stretch" /> : null}
                {fiveImages.length >= 4 ? <Image style={styles.imageItem} source={{ uri: fiveImages[3] }} resizeMode="stretch" /> : null}
                {fiveImages.length >= 5 ? <Image style={styles.imageItem} source={{ uri: fiveImages[4] }} resizeMode="stretch" /> : null}
              </View>)
          }

          <View style={{ width: '100%', alignSelf: 'center' }}>
            <KMainButton title="View catalogue" callback={on_View_Catalogue} />
            <KMainButton title="View enquiry" callback={on_View_Enquiry} />
            <KMainButton title="Contact Us" callback={on_Contact_Us} />
            <KMainButton title="SHOP NOW" callback={on_Amazon} style={{ color: 'yellow', fontSize: 30 }} amazonimage={true} />
          </View>
        </ScrollView>
      </LinearGradient>
    </Container>
  );
};


const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 0,
    paddingRight: 0,
  },
  horizontalImageList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20
  },
  imageItem: {
    width: screenWidth * 0.16,
    height: screenWidth * 0.16,
    backgroundColor: '#004499',
    borderColor: '#002277',
    borderWidth: 2
  }
});
