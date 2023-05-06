import { View, Text, Image, StyleSheet, Animated, Easing} from 'react-native'
import React from 'react'


const Profile = () => {
  return (
    <View>
      <Text>Profile</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    backgroundColor: '#fff',
  },

  rectangle: {
    width: '100%',
    height: '40%',
    backgroundColor: '#606060',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    padding: 10,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 40},
    shadowOpacity: 1, shadowRadius: 20, elevation: 20,

    alignSelf: 'center',
 },
 });


export default Profile