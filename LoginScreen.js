import React, { useState } from 'react';
import { auth } from './firebase.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [showPassword, setShowPassword] = useState(false); // State for showing/hiding password

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User successfully signed in
        const user = userCredential.user;
        navigation.navigate('MainScreen'); // Navigate to the main screen or wherever you want to go after login
      })
      .catch((error) => {
        // Handle login errors
        setShowErrorMessage(true);
        setLoginAttempts(prevAttempts => prevAttempts + 1);
      });
  };

  const handleCancel = () => {
    setEmail('');
    setPassword('');
    setShowErrorMessage(false);
    setLoginAttempts(0);
  };

  const handleSignupNow = () => {
    navigation.navigate('SignupScreen');
  };

  return (
    <ImageBackground
      source={require('./assets/pharmacy_background.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Pharmacy Management</Text>
        <View style={[styles.inputContainer, showErrorMessage && styles.errorContainer]}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
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
          {showErrorMessage && <Text style={styles.errorMessage}>Incorrect Password</Text>}
          {loginAttempts >= 2 && (
            <TouchableOpacity onPress={() => console.log("Forget Password")}>
              <Text style={[styles.signUpText, styles.underlinedText]}>Forget Password</Text>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>New user? </Text>
          <TouchableOpacity onPress={handleSignupNow}>
            <Text style={[styles.signUpText, styles.underlinedText]}>Sign up now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', // Adjust width as needed
    height: '50%', // Adjust height as needed
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
  loginButton: {
    width: 300,
    height: 40,
    backgroundColor: '#43ed64',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  cancelButton: {
    width: 300,
    height: 40,
    backgroundColor: '#dc3545',
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
  signUpContainer: {
    flexDirection: 'row',
  },
  signUpText: {
    color: '#7f8ccb',
    fontSize: 16,
  },
  underlinedText: {
    color: '#43ed64',
    textDecorationLine: 'underline',
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
  },
});

export default LoginScreen;
