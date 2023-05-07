import React, { useState } from 'react';
import OpenAI from 'openai-api';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import Voice from '@react-native-voice/voice';
import Icon from 'react-native-vector-icons/FontAwesome5';

const openai = new OpenAI('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');

const RizzBot = () => {
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const generateOutput = async (prompt) => {
    setIsLoading(true);
    try {
      const response = await openai.complete({
        engine: 'text-davinci-003',
        prompt: prompt,
        maxTokens: 300,
        n: 1,
        temperature: 0.8,
      });
      setOutput(response.data.choices[0].text);
    } catch (err) {
      console.log(err);
      setOutput('');
    } finally {
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
    } catch (e) {
      console.log(e);
    }
  };

  const onSpeechResults = (event) => {
    setPrompt(event.value[0]);
    setTimeout(() => {
      generateOutput();
    }, 100);
  };

  Voice.onSpeechResults = onSpeechResults;
  

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPressIn={startRecording}
        onPressOut={stopRecording}
        style={{
          backgroundColor: isRecording ? 'red' : 'green',
          padding: 20,
          borderRadius: 10,
          marginBottom: 20,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
        <Icon name="microphone" size={30} color="#fff" />
      </TouchableOpacity>
      <View style={{ 
        backgroundColor: '#000',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        width: '100%',
        height: 200,
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
   

