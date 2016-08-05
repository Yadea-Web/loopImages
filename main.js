/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';

import LoopImages from './LoopImages.js';

export default class LoopImageProject extends Component {
  render() {
   let HEIGHT = Dimensions.get('window').width / 2;

  let photos = [require('./image/image_01.png'),
               require('./image/image_02.png'),
               require('./image/image_03.png'),
               require('./image/image_04.png')];
   return (
     <View>
       <LoopImages photos = {photos}
         height = {HEIGHT}
         isNativePhoto = {true}
         selectedIndicatorColor = {'#00F406'}
         normalIndicatorColor = {'#FF00F3'}
         delay = {1000}
         onPress = {this.onPress.bind(this)}/>
     </View>
   );
  }

  onPress(data) {
    // do something you want do
    console.log('----------------' + data);
  }
}
