import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';

export default class KMainButton extends Component {

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
    marginRight:40,
    marginLeft:40,
    marginTop:10,
    backgroundColor:'crimson',
    borderRadius:30,
    borderWidth: 2,
    borderColor: 'white',
    height : 50,
  },

  loginText:{
      color:'#fff',
      textAlign:'center',
      paddingTop : 8,
      fontSize: 18,
  }
});