import { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Voice from '@react-native-voice/voice';
import OpenAI from 'openai-api';
import { API_KEY } from '../config';

const openai = new OpenAI(API_KEY);

import { NativeEventEmitter, NativeModules } from 'react-native';

const eventEmitter = new NativeEventEmitter(NativeModules.VoiceModule);

const generateText = async (prompt, temperature = 0.5, frequencyPenalty = 0.4) => {
    try {
      const response = await openai.complete({
        engine: 'text-davinci-002',
        prompt,
        maxTokens: 300,
        temperature,
        topP: 1,
        presencePenalty: 0,
        frequencyPenalty,
        bestOf: 1,
        n: 1,
        stop: ['\n\n'],
      });
      console.log('OpenAI response:', response);
      return response.choices[0].text;
    } catch (err) {
      console.log(err);
      console.log('OpenAI error:', err);
      console.log('OpenAI error:', err.message);
      throw err;
    }
  };

const RizzBot = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [holdTimeout, setHoldTimeout] = useState(null);

  useEffect(() => {
    const subscription = eventEmitter.addListener(
      'onSpeechResults',
      (event) => {
        const text = event.value[0];
        setInputText(text);
      },
    );
    return () => {
      subscription.remove();
    };
  }, []);

  const onStartRecording = () => {
    setIsRecording(true);
    setHoldTimeout(
      setTimeout(() => {
        try {
          Voice.start('en-US');
        } catch (error) {
          console.log(error);
        }
      }, 500),
    );
  };

  const onStopRecording = async () => {
    setIsRecording(false);
    clearTimeout(holdTimeout);
    try {
      await Voice.stop();
      generateResponse();
    } catch (error) {
      console.log(error);
    }
  };

  const generateResponse = async () => {
    console.log('Generating response');
    setIsLoading(true);
    try {
      if (inputText) {
        const prompt = `The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\nHuman ${inputText}\nAI`;
        const response = await generateText(prompt);
        setOutputText(response);
        }
    } catch (error) {
        console.log(error);
    }
    setIsLoading(false);
    };

    useEffect(() => {
        if (inputText) {
            generateResponse();
        }
    }, [inputText]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity
        onPressIn={onStartRecording}
        onPressOut={onStopRecording}
        style={{
          backgroundColor: isRecording ? 'red' : 'green',
          padding: 20,
          borderRadius: 10,
          marginBottom: 20,
        }}>
        <Icon name="microphone" size={30} color="#fff" />
      </TouchableOpacity>

        <Text style={{ color: '#fff', marginBottom: 20 }}>{inputText}</Text>
        {isLoading ? (
            <ActivityIndicator size="large" color="#fff" />
        ) : (
            <Text style={{ color: '#fff', marginBottom: 20 }}>{outputText}</Text>
        )}

        
    </View>
    );
};

export default RizzBot;


