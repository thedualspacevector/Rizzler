import React, { useState } from 'react';
import OpenAI from 'openai-api';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, ToastAndroid, Image } from 'react-native';
import Voice from '@react-native-voice/voice';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { API_KEY } from '../config';
const openai = new OpenAI(API_KEY);


const RizzBot = () => {
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const generateOutput = async () => {
    setIsLoading(true);
    try {
      const response = await openai.complete({
        engine: 'text-davinci-003',
        prompt: `Asking Philosopher AI: "${prompt}" ...\n\n`,
        maxTokens: 300,
        n: 1,
        temperature: 0.7,
        topP: 1,
        presencePenalty: 0,
        frequencyPenalty : 0.3,
        bestOf: 1,
        n: 1,
        stream: false,
        stop: ['\n\n'],
      });
      setOutput(response.data.choices[0].text);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setOutput('');
      setIsLoading(false);
    }
  };


  const startRecording = async () => {
    try {
      await Voice.start('en-US');
      setIsRecording(true);
      setPrompt('');
    } catch (e) {
      console.log(e);
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
      setIsRecording(false);
      generateOutput();
    } catch (e) {
      console.log(e);
    }
  };

  const onSpeechResults = (e) => {
    setPrompt(e.value[0]);
  };

  const onSpeechEnd = () => {
    generateOutput();
  };

  Voice.onSpeechResults = onSpeechResults;
  Voice.onSpeechEnd = onSpeechEnd;

  return (
    <View style={styles.container}>
      
      <View style={{
        backgroundColor: '#000',
        padding: 20,
        borderRadius: 10,
        marginBottom: 100,
        width: '100%',
        height: 'auto'
      }}>
        <Text
          style={{
            color: '#fff',
            fontSize: 16,
            marginBottom: 10,
            alignSelf: 'center',
          }}>{prompt}</Text>
        {isLoading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <Text
            style={{
              color: '#fff',
              fontSize: 16,
            }}>{output}</Text>
        )}

      </View>
      <TouchableOpacity
        onPressIn={startRecording}
        onPressOut={stopRecording}
        style={{
          backgroundColor: '#000',
          width: 80,
          height: 80,

          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          alignSelf: 'center',
          bottom: 70,

        }}>
        {
          isRecording ? (
            <Image source={require('../assets/icons/animate2.gif')} style={{
                width: 150,
                height: 150, 
               position:'absolute',
               }} />
          ) : (
            <Icon name="microphone" 
            size={30} 
            color="#fff"
            />
          )
        }
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  output: {
    color: '#fff',
    fontSize: 16,
  },
  placeholder: {
    color: '#fff',
    fontSize: 16,
    fontStyle: 'italic',
  },
});

export default RizzBot


