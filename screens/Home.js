import { ScrollView, Text, StyleSheet, StatusBar, TouchableOpacity, SafeAreaView } from 'react-native';

const TextGenrationComponent = ({title, bio, navigation}) => {
  
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Output', {title, }
        );
      }}
      style={styles.template}>
      <Text style={styles.templateTitle}>{title}</Text>
      <Text style={styles.templateBio}>{bio}</Text>
    </TouchableOpacity>
  );
};

const HomeScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.templatesText}>Text Generation</Text>
      <ScrollView style={styles.scrollView}>
        <TextGenrationComponent
          title="Lyrics Generator"
          bio="Enter the name of an artist and generate lyrics"
          navigation={navigation}
        />
        <TextGenrationComponent
          title='Conversation Starters'
          bio='Generate a conversation starter'
          navigation={navigation}
        />
        <TextGenrationComponent
          title='Rizzler'
          bio='Help you get laid'
          navigation={navigation}
        />
        <TextGenrationComponent
          title='Poetry'
          bio='Generate a poem'
          navigation={navigation}
        />
        <TextGenrationComponent
        title='Movies Recommendation'
        bio='Generate movies recommendations'
        navigation={navigation}
        />
        <TextGenrationComponent
          title='Movie Scripts'
          bio='Generate a movie script'
          navigation={navigation}
        />
        <TextGenrationComponent
          title='Blog Post'
          bio='Generate a blog post'
          navigation={navigation}
        />
        <TextGenrationComponent
          title='Twitter Post'
          bio='Generate a twitter post'
          navigation={navigation}
        />
        <TextGenrationComponent
          title='Email'
          bio='Generate an email'
          navigation={navigation}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
    flex: 1,
  },
  templatesText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 10,
    color: 'black',
  },
  scrollView: {
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 25,
    backgroundColor: '#eee',
  },
  template: {
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 20,
    marginBottom: 10,
    color: 'black',
  },
  templateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  templateBio: {
    fontSize: 14,
    color: 'black',
  },
});

export default HomeScreen;