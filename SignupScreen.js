import React, { useState } from 'react';
import { auth } from './firebase.js';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo

const SignupScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for showing/hiding password

  const handleSignup = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Assuming createUserWithEmailAndPassword also saves other user info
        // If not, you'd need to save additional info separately
        // For example, you might use Firestore to save additional user data.
        const user = userCredential.user;
        Alert.alert("Message", "Successfully created user with email and password.");
        setFirstName('');
        setLastName('');
        setPassword('');
        setEmail('');
        setContactNo('');
        setShowErrorMessage(false);
        // add navigation here, for example using React Navigation
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          setShowErrorMessage(true);
        } else {
          console.log(error.message);
        }
      });
  };

  return (
   // <ImageBackground
     // source={require('./assets/signupbg.png')}
     // style={styles.backgroundImage}
    //>  
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstName}
            onChangeText={text => setFirstName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastName}
            onChangeText={text => setLastName(text)}
          />
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              secureTextEntry={!showPassword} // Hides or shows password based on state
              onChangeText={text => setPassword(text)}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
              <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="#777" />
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Contact No"
            value={contactNo}
            onChangeText={text => setContactNo(text)}
          />
          {showErrorMessage && <Text style={styles.errorMessage}>This Email is already registered</Text>}
        </View>
        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={[styles.loginText, styles.underlinedText]}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    //</ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#072dee',
    marginBottom: 30,
    textAlign: 'center',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    width: 300,
    height: 40,
    borderWidth: 1,
    borderColor: '#87CEEB', // Light blue color
    borderRadius: 5,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  passwordContainer: {
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  signupButton: {
    width: 300,
    height: 40,
    backgroundColor: '#43ed64',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
  },
  loginText: {
    color: '#7f8ccb',
    fontSize: 16,
  },
  underlinedText: {
    textDecorationLine: 'underline',
    color: 'red',
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
  },
});

export default SignupScreen;
