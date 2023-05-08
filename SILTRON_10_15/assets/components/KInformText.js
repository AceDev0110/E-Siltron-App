import React, { Component, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';



var opa = 0;
var maxopa = 20;
var direct = 1;
export default function KInformText({text}) {
  const [op, setOp] = useState(0.0);
  
  useEffect (() => {
    setInterval(() => {
      opa += direct;
      if(opa == maxopa || opa == 0)
        direct = -direct;
      setOp( (maxopa * maxopa - opa * opa) / (maxopa * maxopa) );
    }, 100);
  }, []);

  return (
    <Text style = {{
      backgroundColor : '#0066DD',
      color: 'white',
      margin: 20,      
      //opacity : op,  
      padding: 5,
      paddingRight : 20,
      paddingLeft : 20,
      marginTop : 0,
      borderRadius : 20,
      borderTopLeftRadius : 0,
      borderTopRightRadius : 0,
      minWidth : '40%',
      textAlign : 'center',
      fontWeight: 'bold',
      fontSize : 20}}>
        {text} 
    </Text>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
});