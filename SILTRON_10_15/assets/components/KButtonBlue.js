import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';

export default class KButtonBlue extends Component {

    onClick = () => {
        if (this.props.callback) {
            if (this.props.param != undefined) {
                this.props.callback(this.props.param);
            } else {
                this.props.callback();
            }
        }
    }

    render() {
        return (
            <TouchableOpacity
                onPress={ this.onClick } 
                style = {styles.loginScreenButton}
            >
                <Text style = {styles.loginText}> {this.props.title} </Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },

  loginScreenButton:{
    marginRight:20,
    marginLeft:20,
    marginTop:10,
    marginBottom : 5,
    padding : 8,
    paddingLeft: 13,
    paddingRight: 13,
    backgroundColor:'#0066DD',
    borderRadius:20,
    //borderWidth: 3,
    borderColor: '#004499',
    //height : 100,
    justifyContent : 'center'
  },

  loginText:{
    color:'#fff',
    fontSize: 24,
    fontWeight : 'bold'
  }
});