/*This is an Example of React Native Map*/
import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, StatusBar, Alert, Dimensions, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import KButtonPink from '../Components/KButtonPink';
import KShapeCircle from '../Components/KShapeCircle';
// import Firebase from '@react-native-firebase/app';
import {firebaseDB} from '../src/config';

var tempMarkerPosition;
var itemsRef = firebaseDB.ref('/items');
var cnt = 0;
var markerArray = [{ "latitude": 1, "longitude": 1 }];
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

let AddToFirebase = item => {
  itemsRef.push({
    latitude : item.latitude,
    longitude : item.longitude,
    ttl : 1800
  });
};

function Map_Screen({navigation}) {

  const [isLoaded, setIsLoaded] = useState(false);
  const [regionInitialized , setRegionInitialized] = useState(false);
  const [isMarking, setIsMarking] = useState(0);
  const [forceUpdate, setForceUpdate] = useState(0);
  // const [markerArray, setMarkerArray] = useState([{ "latitude": 1, "longitude": 1 }]);
  const [region, setRegion] = useState({ latitude: 0, longitude: 0,  latitudeDelta: 0, longitudeDelta: 0 });
  const [myLocation, setMyLocation] = useState({ latitude: 0, longitude: 0});
  useEffect(() => {
    if(isLoaded == false){
      setIsLoaded(true);

      Geolocation.getCurrentPosition((position) => {
        var currentLocation = {
          latitude : position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta : 0.003 ,
          longitudeDelta : 0.003 * (screenWidth / screenHeight),
        };
        setRegion(currentLocation);
        setMyLocation(currentLocation);
      })
    }

    const onValueChange = itemsRef.on('value', snapshot => {
      //console.log(cnt++);

      let lastLength = markerArray.length;
      markerArray = [];
      snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key;
        var childData = childSnapshot.val();
        if(childData.ttl < 100000)
          markerArray[markerArray.length] = { "latitude" : childData.latitude, "longitude": childData.longitude, "ttl" : childData.ttl};
      });

      if(lastLength != markerArray.length)
        setForceUpdate(forceUpdate + 1);
      
    });

    return () => { itemsRef.off('value', onValueChange); }
    return () => {}
  });
  
  const onRegionChange = (region) => {
    if(isMarking == 0){
      setRegion(region);
    }
    if(region.latitude != 0)
      setRegionInitialized(true);
    console.log(region);
  }
  const onAddMarker_Click = () => {
    console.log("Add Marker Clicked");
    setIsMarking(1);
    tempMarkerPosition = { "latitude" : region.latitude, "longitude": region.longitude};    
  }
  const onRelocation_Click = () => {
    setRegion({ 
      latitude : myLocation.latitude,
      longitude : myLocation.longitude,
      latitudeDelta : region.latitudeDelta,
      longitudeDelta : region.longitudeDelta
    });
    setRegionInitialized(false);
  }
  const onReport_Click = () => {
    setIsMarking(0);
    AddToFirebase(tempMarkerPosition);
  }
  const onCancelMarker_Click = () => {
    console.log("Cancel Clicked");
    setIsMarking(0);
  }
  const onMarkerDragFinished = (markerPosition) => {
    tempMarkerPosition = markerPosition;
  }

  var mapStyle = [
    { "elementType": "geometry", "stylers": [{ "color": "#242f3e" }] },     { "elementType": "labels.text.fill", "stylers": [{ "color": "#746855" }] },     { "elementType": "labels.text.stroke", "stylers": [{ "color": "#242f3e" }] },     { "featureType": "administrative.locality", "elementType": "labels.text.fill", "stylers": [{ "color": "#d59563" }] },     { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#d59563" }] },     { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#263c3f" }] },     { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [{ "color": "#6b9a76" }] },     { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#38414e" }] },     { "featureType": "road", "elementType": "geometry.stroke", "stylers": [{ "color": "#212a37" }] },     { "featureType": "road", "elementType": "labels.text.fill", "stylers": [{ "color": "#9ca5b3" }] },     { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#746855" }] },     { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#1f2835" }] },     { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [{ "color": "#f3d19c" }] },     { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#2f3948" }] },     { "featureType": "transit.station", "elementType": "labels.text.fill", "stylers": [{ "color": "#d59563" }] },     { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#17263c" }] },     { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "color": "#515c6d" }] },     { "featureType": "water", "elementType": "labels.text.stroke", "stylers": [{ "color": "#17263c" }] }];
  return (
    <View style={styles.container}>
        <StatusBar hidden={true} />  
        <MapView
          style={styles.map}
          initialRegion = {{
            latitude : 0,
            longitude : 0,
            latitudeDelta : 0,
            longitudeDelta : 0,
          }}
          mapType = "satellite"
          region = { regionInitialized ? null : region}
          customMapStyle={mapStyle}
          onRegionChangeComplete ={region => { onRegionChange(region); }}
        >
        
        {
          isLoaded ? (
            <Marker
              draggable
              coordinate={{
                latitude: myLocation.latitude,
                longitude: myLocation.longitude
              }}
              title={'My Location'}
              pinColor = {'#00ff00'}>
            </Marker>) : null
        }


        {
          markerArray.map((item, key) => {
            return(
              <Marker
                coordinate={{
                  latitude: item.latitude,
                  longitude: item.longitude,
                }}
                key = {key}>
                  {/* <Image
                    source={require('../assets/images/marker_small_red.png')}
                    style={{width: 30, height: 30}}
                  /> */}
              </Marker>
            );
          })
        }

        {
          isMarking ? (
            <Marker
              draggable
              coordinate={{
                latitude: region.latitude,
                longitude: region.longitude,
              }}
              onDragEnd={(e) => onMarkerDragFinished(e.nativeEvent.coordinate)}
              title={'Your Marker'}
              description={'Drag this to set location'}
              pinColor = {'#0000ff'}>
                {/* <Image
                  source={require('../assets/images/marker_small_blue.png')}
                  style={{width: 30, height: 30}}
                /> */}
            </Marker>
            ) : null
        }

        </MapView>
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',//use absolute position to show button on top of the map
            top: '86%', //for center align
            alignSelf: 'center' //for align to right
          }}
        >
          {!isMarking ? (<KButtonPink title="Add New" callback={onAddMarker_Click} />) : null}
          {!isMarking ? (<KButtonPink title="Relocation" callback={onRelocation_Click} />) : null}
          {isMarking ? (<KButtonPink title="Report" callback={onReport_Click} />) : null}
          {isMarking ? (<KButtonPink title="Cancel" callback={onCancelMarker_Click} />) : null}

        </View>
      </View>
  )
}
export default Map_Screen;


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});