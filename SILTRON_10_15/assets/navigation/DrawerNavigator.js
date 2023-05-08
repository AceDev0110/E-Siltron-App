import React from 'react';
import {View,Text} from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Home_Screen from '../screens/Home_Screen';
import View_Catalogue_Screen from '../screens/View_Catalogue_Screen';
import ContactUs_Screen from '../screens/ContactUs_Screen';
import View_Enquiry_Screen from '../screens/View_Enquiry_Screen';


const DrawerNavigator = createDrawerNavigator({
  "Home": Home_Screen,
  "View Catalogue": View_Catalogue_Screen,
  "View Enquiry": View_Enquiry_Screen,
  "Contact Us": ContactUs_Screen,
});

export default DrawerNavigator;
