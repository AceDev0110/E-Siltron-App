import React, {Component, useState, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';

import {  SafeAreaView,  StyleSheet,  ScrollView,  View,  Text,  TextInput,  Image,  StatusBar, Modal,  Button, BackHandler, Alert} from 'react-native';
import {  Header,  LearnMoreLinks,  Colors,  DebugInstructions,  ReloadInstructions,} from 'react-native/Libraries/NewAppScreen';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Toast from 'react-native-simple-toast';
import auth from '@react-native-firebase/auth';
//--------------------  Custom  ---------------------------
import KTextInput from '../Components/KTextInput';
import KMainButton from '../Components/KMainButton';

// import auth from '@react-native-firebase/auth';
function Main_Screen({navigation}){
  const [SignInVisible, setSignInVisible] = useState(false);
  const [SignUpVisible, setSignUpVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignIn = () => {
    console.log(email);
    console.log(password);

    if(email == ""){
      Toast.show('Please input email');
    }else if(password == ""){
      Toast.show('Please input password');
    }else{
      auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        navigation.navigate('xMapScreen');
      })
      .catch(error => {
        Toast.show(error.code);
      });
    }
  }

  const onSignUp = () => {
    console.log(email);
    console.log(password);
    if(email == ""){
      Toast.show('Please input email');
    }else if(password == ""){
      Toast.show('Please input password');
    }else{
      auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        Toast.show('User account created');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Toast.show('That email address is already in use');
        }else if (error.code === 'auth/invalid-email') {
          Toast.show('That email address is invalid');
        }else{
          Toast.show(error.code);
        }
      });
    }    
  }

  const onExit = () => {
    BackHandler.exitApp();
  }

  const open_SignIn_Modal = () => {
    setSignInVisible(true);
  }

  const close_SignIn_Modal = () => {
    setSignInVisible(false);
  }

  const open_SignUp_Modal = () => {
    setSignUpVisible(true);
  }

  const close_SignUp_Modal = () => {
    setSignUpVisible(false);
  }

  return ( 
    <LinearGradient colors={['#ff1b50', '#aa0027']} style={styles.linearGradient}>
      <ScrollView style={styles.container}>
        <StatusBar hidden={true} />  
        <View style = {{alignItems : 'center', marginTop: '10%'}}  >
          <Image source={require('../assets/images/logo.png')} style = {{width: 300, height: 300}} />
        </View>

        <View style = {{alignItems : 'center'}} >
          <Image source={require('../assets/images/title.png')} style = {{width: 300, height: 60}} />
        </View>

        {/* <View style = {{height: '20%'}}></View>           */}

        { SignInVisible ?
        (<View style = {{flexDirection : 'column', justifyContent: 'center', marginTop: 20,  width : '80%', alignSelf: 'center', marginTop : '10%'}}>
          <KTextInput placeholder = "User Email"  onChangeText = {email => setEmail(email.replace(/\s/g, ''))} />
          <KTextInput placeholder = "User Password" onChangeText = {password => setPassword(password.replace(/\s/g, ''))} />

          <View style = {{flexDirection : 'row',justifyContent: 'center', alignSelf: 'center', width: '80%', marginTop : '10%'}}>
            <KMainButton title = "     Back     " callback = {close_SignIn_Modal}/>
            <KMainButton title = "   Sign In   " callback = {onSignIn} />
          </View>
        </View>) : null }

        
        { SignUpVisible ?
        (<View style = {{flexDirection : 'column', justifyContent: 'center', marginTop: 20,  width : '80%', alignSelf: 'center', marginTop : '10%'}}>
          <KTextInput placeholder = "User Email" onChangeText = {email => setEmail(email.replace(/\s/g, ''))} />
          <KTextInput placeholder = "User Password" onChangeText = {password => setPassword(password.replace(/\s/g, ''))} />

          <View style = {{flexDirection : 'row',justifyContent: 'center', alignSelf: 'center', width: '80%', marginTop : '10%'}}>
            <KMainButton title = "     Back     " callback = {close_SignUp_Modal}/>
            <KMainButton title = "   Sign Up   " callback = {onSignUp} />
          </View>
        </View>) : null }


        { !SignInVisible && !SignUpVisible ?
        (<View style = {{flexDirection : 'column', justifyContent: 'center', marginTop: 20,  width : '80%', alignSelf: 'center'}}>
          <KMainButton title = "Sign In" callback = {open_SignIn_Modal} />
          <KMainButton title = "Sign Up" callback = {open_SignUp_Modal} />       
          <KMainButton title = "Exit" callback = {onExit} />
          {/* <Text style = {{ color : "#FFF", padding : 20 , alignSelf : 'center' }}>my email = danevhome01@gmail.com</Text>          */}
        </View>) : null }
        
        <View></View>
      </ScrollView>
    </LinearGradient>
  );
};
export default Main_Screen;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  titleText: {
    fontSize: 50,
    fontFamily: 'Rowdies-Light',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  inputContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    padding: 20,
    margin:20,
    marginTop:20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },

  regtext: {
    color: "darkblue",
    fontSize: 18,
    fontWeight: "normal",
    marginTop: 10,
    marginLeft:15,
    fontStyle: 'italic'
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  innerContainer: {
    alignItems: 'center',
  },

});
