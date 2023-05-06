import { View, Text, Image, StyleSheet, Animated, Easing} from 'react-native'
import React from 'react'


const Profile = () => {
  return (
    <View style={styles.container}>
    <View style={styles.rectangle}>
      
    <Image style={{
          alignSelf:'center', 
          width: 200, height: 200, 
          marginTop: 30, 
          shadowColor: '#000', 
          shadowOffset: {width: 0, height: 40},
          shadowOpacity: 0.8, shadowRadius: 12, elevation: 50,  shadowOpacity: 50}}
          source={require('../assets/icons/Logo.png')} />
    
    <Text style={{
      fontFamily:'Urbanist-Medium',
      marginLeft: '25%',
      fontSize: 25,  
      color: '#fff', 
      marginTop: 15, }}>
      Welcome to Rizzlr
    </Text>

    
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    backgroundColor: '#000',
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