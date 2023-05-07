
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, BackHandler, ScrollView, SafeAreaView, } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import {useIsFocused} from '@react-navigation/native';

import { API_KEY } from '../config';
import Icon from 'react-native-vector-icons/FontAwesome5';

import OpenAI from 'openai-api';

const openai = new OpenAI(API_KEY);

const generateText = async ( prompt,temperature=0.5, frequencyPenalty=0.4) => {

  try {
    const response = await openai.complete({
      engine: 'text-davinci-003',
      prompt: prompt,
      maxTokens: 300,
      temperature,
      topP: 1,
      presencePenalty: 0,
      frequencyPenalty,
      bestOf: 1,
      n: 1,
      stream: false,
      stop: ['\n\n'],
    });
    return response.data.choices[0].text;
  } catch (err) {
    console.log(err);
    return '';
  }
};

const OutputScreen = ({route, navigation }) => {
  const [output, setOutput] = useState('');
  const [prompt, setPrompt] = useState('');
  const [error , setError] = useState('' );
  const [isLoading, setIsLoading] = useState(false);
  const [showOutputBox, setShowOutputBox] = useState(false);
  const [stopGeneration, setStopGeneration] = useState(false);
  const scrollViewRef = useRef();

  const handlePromptChange = (text) => {
    setPrompt(text);
  };

  const isFocused = useIsFocused();
  useEffect(() => {
    const onBackPress = () => {
      setStopGeneration(true);
      navigation.goBack();
      return true;
    };
    if (isFocused) {
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
    } else {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }
    return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, [isFocused, navigation]);
  

const generateOutput = async () => {
  setIsLoading(true);
  setError('');
  setOutput('');
  setShowOutputBox(false);
  
  
  let finalPrompt = '';
  let temperature = 0.5;
  let frequencyPenalty = 0.4;
  if (route.params.title === 'Lyrics Generator') {
    finalPrompt = `Genre: ${prompt}\n\n Lyrics: \n\n`;
    temperature = 0.6;
    frequencyPenalty = 0.3;
    
  } else if (route.params.title === 'Conversation Starters') {
    finalPrompt = `Topics: ${prompt}\n\n Conversation Starter: \n\n`;
    temperature = 0.7;
    frequencyPenalty = 0.3;
   
  } else if (route.params.title === 'Rizzler') {
    finalPrompt = `Generate a flirty response to the following message: "${prompt}"`
    temperature = 0.8;
    frequencyPenalty = 0.2;
    
  } else if (route.params.title === 'Poetry') {
    finalPrompt = `Poem: \n\n ${prompt}`;
    temperature = 0.7;
    frequencyPenalty = 0.3;
    
  } else if (route.params.title === 'Movie Scripts') {
    finalPrompt = `Movie: ${prompt}\n\n Script: \n\n`;
    temperature = 0.7;
    frequencyPenalty = 0.3;
    
  } else if (route.params.title === 'Blog Post') {
    finalPrompt = `Blog Post: \n\n ${prompt}`;
    temperature = 0.7;
    frequencyPenalty = 0.3;

  } else if (route.params.title === 'Twitter Post') {
    finalPrompt = `Twitter Post: \n\n ${prompt}`;
    temperature = 0.7;
    frequencyPenalty = 0.3;

  } else if (route.params.title === 'Email') {
    finalPrompt = `Email: \n\n ${prompt}`;
    temperature = 0.7;
    frequencyPenalty = 0.3;
  } else if (route.params.title === 'Movies Recommendation') {
    finalPrompt = `Movies name: \n\n ${prompt}`;
    temperature = 0.7;
    frequencyPenalty = 0.3;
  } 

  const minChars = 100;
  const minLines = 6;
  const maxCharsPerLine = 50;
  const minCharsPerLine = 10;
  const stop = ['\n\n'];
  let output = '';
  let chars = 0;
  let lines = 0;
  let newOutput = '';

  while (!stopGeneration && (output.length < minChars || lines < minLines)) {
    newOutput = await generateText(finalPrompt, temperature, frequencyPenalty);
    if (!newOutput) {
      continue;
    }
    output += newOutput;
    chars = output.length;
    lines = output.split('\n').length;
    const lastLineChars = output.split('\n').slice(-1)[0].length;
    if (
      lastLineChars > maxCharsPerLine ||
      lastLineChars < minCharsPerLine ||
      stop.some((stopString) => output.includes(stopString))
    ) {
      break;
    }
  }
  setIsLoading(false);
  setShowOutputBox(true);
  setOutput(output);
  setStopGeneration(false);
};

const handleSubmit = () => {
  if (prompt === '') {
    setError('Please enter a prompt');
  } else {
    generateOutput();
  }
};

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView>
      <SafeAreaView style={styles.header}>
        <Text style={styles.headerText}>{route.params.title}</Text>
        <TouchableOpacity>
          <Icon name="bars" size={20} color="white" />
        </TouchableOpacity>
      </SafeAreaView>
      <SafeAreaView style={styles.body}>
      <TextInput style={styles.formInput} placeholder="Enter a prompt" placeholderTextColor={"#fff"} value={prompt} onChangeText={handlePromptChange} />
        {isLoading ? 
          <ActivityIndicator size="large" color="#fff" /> : null }
        {error ? 
          <Text style={styles.errorText}>{error}</Text> : null }
        {showOutputBox ?
            <ScrollView ref={scrollViewRef} onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
            style={styles.card}>
            <Text
              style={{
                fontSize: 16,
                color: '#fff',
              }}
             selectable >{output}</Text>
             <TouchableOpacity style={styles.copyButton} onPress={() => Clipboard.setString(output)}>
              <Icon name="bookmark" size={18} color="#cccc" />
            </TouchableOpacity>
            
            </ScrollView>
            : null }

        <View style={styles.form}>
          <TouchableOpacity style={styles.formButton} onPress={handleSubmit}>
            <Text style={styles.formButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
        </SafeAreaView>
        </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000"
  },
  header: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  menuIcon: {
    width: 24,
    height: 24,
  },
  body: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  card: {
    width: '80%',
    height: 'auto',
    backgroundColor: '#2a2a2a',
    borderRadius: 25,
    padding: 10,
    shadowColor: 'white',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  cardSubtitle: {
    fontSize: 18,
    color: 'white',
  },
  copyButton: {
    width: 30,
    height: 30,
    backgroundColor: '#2a2a2a',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    marginBottom: 20,
  },
  form: {
    width: '80%',
    marginTop: 20,
    marginBottom: 20,
    color: 'white',
  },
  formInput: {
    width: '80%',
    height: 50,
    backgroundColor: '#2a2a2a',
    borderRadius: 25,
    padding: 10,
    shadowColor: 'white',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 20,
    color: 'white',
  },
  
  formButton: {
    width: '100%',
    height: 40,
    backgroundColor: 'white',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    },
    formButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    },
});

export default OutputScreen;

