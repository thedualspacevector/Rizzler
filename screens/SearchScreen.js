import React, { useState } from 'react';
import OpenAI from 'openai-api';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Voice from '@react-native-voice/voice';
import Icon from 'react-native-vector-icons/FontAwesome5';

const openai = new OpenAI('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');

const SearchScreen = () => {
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const generateOutput = async () => {
    try {
      const response = await openai.complete({
        engine: 'text-davinci-003',
        prompt: `Question for Friendly AI bot: ${prompt}\n\n Paranoid and problematic answers: \n\n`,
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
    } catch (err) {
      console.log(err);
      setOutput('');
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
        <TextInput
          style={{
            color: '#fff',
            fontSize: 16,
            marginBottom: 10,
          }}> {prompt}</TextInput>
        {prompt.length > 0 &&
          <TouchableOpacity style={styles.button} onPress={generateOutput}>
            <Text style={styles.buttonText}>Generate Output</Text>
          </TouchableOpacity>
        }
        {output ? (
          <Text style={styles.output}>{output}</Text>
        ) : (
          <Text style={styles.placeholder}>Output will appear here</Text>
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
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
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
    opacity: 0.5,
  },
});

export default SearchScreen;