import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, Image, TouchableOpacity, Dimensions, Alert, BackHandler, ScrollView, Linking } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import FontAwesome5Brands from 'react-native-vector-icons/FontAwesome5Brands';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
import { Container } from 'native-base';
//++++++++++++++  Firebase +++++++++
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
const catCol = firestore().collection('Category');  // category collection
const subCol = firestore().collection('SubCategory');  // subCategory collection
const itemsCol = firestore().collection('Items');  // item collection
//++++++++++++++  UI  +++++++++++++
import KInformText from '../components/KInformText';
import KButtonBlue from '../components/KButtonBlue';
import Header from '../components/Header.js';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const numColumns = 2;
//+++++++++++++ temp  +++++++++++++++
let downloadURL = async (item) => {
  const url = await storage().ref(item).getDownloadURL();
  //console.log(url);
  return url;
}

export default function View_Catalogue_Screen({ navigation }) {
  const [step, setStep] = useState(0);
  const [initialized, setInitialized] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [itemsData, setItemsData] = useState([]);
  const [currentItemData, setCurrentItemData] = useState();
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    global.catstep = 0;


    global.screenName = "view catalogue";
    focusListener = navigation.addListener('didFocus', () => {
      global.screenName = "view catalogue";
    });

    catCol.get().then(async (querySnapshot) => {
      var tcategories = [];
      let minPriority = 0;

      if (querySnapshot.empty) {
        setCategoryData([]);
        setIsFetching(false);
      }
      querySnapshot.forEach(async (documentSnapshot) => {
        let catName = documentSnapshot.data().name;
        let catImage = documentSnapshot.data().image;
        let priority = documentSnapshot.data().priority;
        if (priority < minPriority)
          minPriority = priority;
        const url = await storage().ref(catImage).getDownloadURL();
        tcategories[tcategories.length] = {
          name: catName,
          uri: url,
          priority: priority
        }
        if (tcategories.length == querySnapshot.size) {
          tcategories.sort((a, b) => a.priority - b.priority);
          setCategoryData(tcategories);
          setIsFetching(false);
        }
      });
    });






    const backAction = () => {
      console.log("backAction", global.screenName);
      if (global.screenName == "view catalogue") {
        console.log("Clicking go back");
        console.log(step, global.catstep);
        //goBackClick();

        if (global.catstep == 0) {
          navigation.navigate('Home');
          global.catstep = 0;
        } else {
          setStep(global.catstep - 1);
          global.catstep = global.catstep - 1;
        }


        return true;
      }
    }
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  const itemSelected = (item) => {
    //console.log(categories.length);
    if (step == 0) {
      //  need to show sub categories
      console.log(item);
      setSubCategoryData([]);
      setIsFetching(true);
      subCol.where('categoryname', '==', item.name).get().then(async (querySnapshot) => {
        var temp = [];
        let minPriority = 0;
        if (querySnapshot.empty) {
          setSubCategoryData([]);
          setIsFetching(false);
        }
        querySnapshot.forEach(async (documentSnapshot) => {
          let subCatName = documentSnapshot.data().subcategoryname;
          let subCatImage = documentSnapshot.data().image;
          let priority = documentSnapshot.data().priority;
          if (priority < minPriority)
            minPriority = priority;
          //console.log(subCatName);
          const url = await storage().ref(subCatImage).getDownloadURL();
          temp[temp.length] = {
            categoryname: item.name,
            name: subCatName,
            uri: url,
            priority: priority
          }
          if (temp.length == querySnapshot.size) {
            temp.sort((a, b) => a.priority - b.priority);
            setSubCategoryData(temp);
            setIsFetching(false);
          }
        });
      })

      setStep(1);
      global.catstep = 1;
    } else if (step == 1) {
      //  need to show items
      console.log(item);
      //setItemsData([]);
      setIsFetching(true);
      itemsCol.where('categoryname', '==', item.categoryname).where('subcategoryname', '==', item.name).get().then(async (querySnapshot) => {
        var temp = [];
        let minPriority = 0;
        if (querySnapshot.empty) {
          setItemsData([]);
          setIsFetching(false);
        }
        querySnapshot.forEach(async (documentSnapshot) => {
          let itemName = documentSnapshot.data().number;
          let itemImage = documentSnapshot.data().image;
          let itemSpec = documentSnapshot.data().specification;
          let priority = documentSnapshot.data().priority;
          if (priority < minPriority)
            minPriority = priority;
          console.log(itemName);
          const url = await storage().ref(itemImage).getDownloadURL();
          temp[temp.length] = {
            categoryname: item.categoryname,
            subcategoryname: item.name,
            name: itemName,
            number: itemName,
            uri: url,
            specification: itemSpec,
            priority: priority
          }
          if (temp.length == querySnapshot.size) {
            temp.sort((a, b) => a.priority - b.priority);
            setItemsData(temp);
            setIsFetching(false);
          }
        });
      });

      setStep(2);
      global.catstep = 2;
    } else if (step == 2) {
      //console.log(item);
      //  need to get item specification
      setCurrentItemData(item);
      setStep(3);
      global.catstep = 3;
    }
  }

  const heartClick = () => {
    Alert.alert("", "Added to your enquiry list.");
    global.prepareEnquiry = global.prepareEnquiry || [];
    //console.log(currentItemData);

    let alreadyContains = false;
    global.prepareEnquiry.forEach(peitem => {
      if (peitem.uri == currentItemData.uri)
        alreadyContains = true;
    })

    if (alreadyContains == false)
      global.prepareEnquiry.push(currentItemData);

    console.log(global.prepareEnquiry);
  }

  const goBackClick = () => {
    if (step == 0) {
      navigation.navigate('Home');
      global.catstep = 0;
    } else {
      console.log(step);
      setStep(step - 1);
      global.catstep = step - 1;
    }
  }

  const goWhatsApp = () => {
    let message = ":)";
    let number = "+971505858899";
    let url = "whatsapp://send?text=" + message + "&phone=" + number;
    Linking.openURL(url)
      .then(data => {
        console.log("WhatsApp Opened successfully " + data);  //<---Success
      })
      .catch(() => {
        alert("Make sure WhatsApp installed on your device");  //<---Error
      });
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

  return (
    <React.Fragment>
      <Header />

      {/* <View>
        <Bubbles size={10} color="#FFF" />
        <Bars size={10} color="#FDAAFF" />
        <Pulse size={10} color="#52AB42" />
        <DoubleBounce size={10} color="#1CAFF6" />
      </View> */}



      {step == 0 ? (
        <View style={styles.container}>
          <KInformText text=" Please Select Category " />
          {isFetching ?
            (<Bubbles size={10} color="#004499" />) :
            (<FlatList data={categoryData} renderItem={renderItem} numColumns={numColumns} keyExtractor={(item, index) => index.toString()} />)
          }
        </View>
      ) : null}

      {step == 1 ? (
        <View style={styles.container}>
          <KInformText text=" Please Select Sub Category " />
          {isFetching ?
            (<Bubbles size={10} color="#004499" />) :
            (<FlatList data={subCategoryData} renderItem={renderItem} numColumns={numColumns} keyExtractor={(item, index) => index.toString()} />)
          }
        </View>
      ) : null}

      {step == 2 ? (
        <View style={styles.container}>
          <KInformText text=" Please Select Item " />
          {isFetching ?
            (<Bubbles size={10} color="#004499" />) :
            (<FlatList data={itemsData} renderItem={renderItem} numColumns={numColumns} keyExtractor={(item, index) => index.toString()} />)
          }
        </View>
      ) : null}

      {step == 3 ? (
        <Container>
          <ScrollView style={{ marginBottom: 80 }}>
            <View style={styles.container}>
              <View style>
                <Image
                  source={{ uri: currentItemData.uri }}
                  resizeMode="stretch"
                  style={styles.bigImageStyle}
                />

                <View style={{
                  position: 'absolute',
                  right: 0,
                  top: 20,
                }}>
                  <TouchableOpacity onPress={heartClick} style={{ margin: 10 }} >
                    <AntDesign name="heart" size={40} color="red" />
                  </TouchableOpacity>


                </View>
              </View>
              <Text style={[styles.informText, { borderRadius: 20, width: '60%', backgroundColor: '#004499' }]}> {currentItemData.number} </Text>
              <Text style={styles.specificationText} >{currentItemData.specification}</Text>

            </View>


          </ScrollView>
          <View style={{ position: 'absolute', alignSelf: 'center', bottom: 10 }}>
            <KButtonBlue title="E N Q U I R E" callback={heartClick} />
          </View>
        </Container>

      ) : null}


      <View style={{
        position: 'absolute',
        bottom: 40,
        //backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: 20,
      }}>
        <TouchableOpacity onPress={goWhatsApp} >
          <Image source={require('../images/whatsapp.png')} style={{ width: 60, height: 60, borderRadius: 10 }} />
        </TouchableOpacity>
      </View>

      {/* 
      <View style={{
        position: 'absolute',
        bottom: 10,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: 20,
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 40
      }}>
        <TouchableOpacity onPress={goBackClick} >
        </TouchableOpacity>
      </View> */}

    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
    fontWeight: 'bold',
    fontSize: 20
  },
  specificationText: {
    textAlign: 'center',
    width: '80%',
    fontSize: 15,
    fontWeight: 'bold'
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
  bigImageStyle: {
    width: screenWidth * 0.8,
    height: screenWidth * 0.8,
    marginTop: 20,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: 'gray'
  }
});
