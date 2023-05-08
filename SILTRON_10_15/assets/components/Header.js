import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// pull in from DrawerTrigger.js
import DrawerTrigger from './DrawerTrigger'

class Header extends React.Component {
  render() {
    return (
      <LinearGradient colors={['#003388','#0066DD']} style={styles.header}>
        {/* <View style={styles.header}> */}
          <DrawerTrigger />
              <Text style = {styles.text}> SILTRON ELECTRONICS </Text>
        {/* </View> */}
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    paddingRight: 40,
    backgroundColor: '#004499',
    flexDirection : 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  text:{
    color : 'white',
    fontWeight: 'bold',
    fontStyle : 'italic',
    fontSize: 24
  }
});

export default Header;
