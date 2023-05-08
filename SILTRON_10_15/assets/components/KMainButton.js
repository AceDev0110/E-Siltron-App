import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  StyleSheet,
  Text,
  Image,
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
                <LinearGradient colors={['#0088FF', '#0066EE']} style={styles.linearGradient}>
                    {
                    this.props.amazonimage ?
                    (<Image source={require('../images/amazon.jpeg')} style = {{width: 100, height: 60, borderRadius : 10}} />) : null
                    }
                    <Text style = {[styles.textStyle, this.props.style]}> {this.props.title} </Text>
                </LinearGradient>
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
  tinyLogo: {
    width: 50,
    height: 50,
  },
  linearGradient: {
    flex: 1,
    //paddingLeft: 0,
    //paddingRight: 0,
    alignItems: "center",
    justifyContent : 'center',
    borderRadius : 10,
    flexDirection : 'row',
    //borderColor : '#004499',
    //borderWidth : 3,
    
    width: '100%'
  },
  loginScreenButton:{
    marginRight:40,
    marginLeft:40,
    marginTop:10,
    backgroundColor:'#004499',
    borderRadius:10,
    borderWidth: 0,
    borderColor: '#004499',
    height : 70,
    alignItems : 'center',
    justifyContent: 'center'
  },

  textStyle:{
      color:'#fff',
      textAlign:'center',
      //fontFamily: 'impact',
      fontWeight: 'bold',
      fontSize: 22,
  }
});