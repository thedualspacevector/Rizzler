import React, { useState, useEffect } from 'react';
import OpenAI from 'openai-api';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import Voice from '@react-native-voice/voice';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { API_KEY } from '../config';
import Tts from 'react-native-tts';

const openai = new OpenAI(API_KEY);

const generateText = async (prompt) => {
  try {
    const response = await openai.complete({
      engine: 'text-davinci-003',
      prompt: prompt,
      maxTokens: 300,
      n: 1,
      temperature: 0.7,
      topP: 1,
      presencePenalty: 0,
      frequencyPenalty: 0.3,
      bestOf: 3,
      stream: false,
      stop: ['\n\n'],
    });
    return response.data.choices[0].text;
  } catch (err) {
    console.log(err);
    return '';
  }
};

const RizzBot = () => {
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [stopGeneration, setStopGeneration] = useState(false);

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechEnd = onSpeechEnd;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);
  
  const generateOutput = async () => {
    setIsLoading(true);
    const finalPrompt = `Original Text: ${prompt}\n\nProfessional Rephrase: \n\n`;
    const minChars = 100;
    const minLines = 6;
    const maxCharsPerLine = 50;
    const minCharsPerLine = 10;
    const stop = ['\n\n'];
    let output = '';
    let lines = 0;
    do {
      const newOutput = await generateText(finalPrompt);
      if (newOutput) {
        output += newOutput;
        const { length: chars } = output;
        lines = output.split('\n').length;
        for (let i = output.length - 1, lastLineChars = 0; i >= 0; i--) {
          const char = output.charAt(i);
          if (char === '\n') {
            lastLineChars = output.length - i - 1;
            break;
          }
        }
        if (
          lastLineChars > maxCharsPerLine ||
          lastLineChars < minCharsPerLine ||
          stop.some((stopString) => output.endsWith(stopString))
        ) {
          break;
        }
      }
    } while (!stopGeneration && (output.length < minChars || lines < minLines));
    console.log(finalPrompt);
    setOutput(output);
    setIsLoading(false);
  };
  

  const startRecording = async () => {
    setIsRecording(true);
    setStopGeneration(false);
    try {
      await Voice.start('en-US');
    } catch (err) {
      console.log(err);
    }
  };

  const stopRecording = async () => {
    setIsRecording(false);
    setStopGeneration(true);
    try {
      await Voice.stop();
    } catch (err) {
      console.log(err);
    }
  };

  const onSpeechResults = (event,) => {
    setPrompt(event.value[0]);
    generateOutput();
  };

  const onSpeechEnd = () => {
    setIsRecording(false);
  };

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
                position: 'absolute',
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


