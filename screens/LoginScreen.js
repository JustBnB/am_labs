import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';


function LoginScreen({ navigation }) {
    const [login, setLogin] = useState('');
    const [pass, setPass] = useState('');
  
    const handleLogin = async () => {
      try {
        const response = await axios.get(`http://192.168.8.121:8080/users`, {
          params: {
            username: login,
            password: pass,
          },
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
    
        if (response.status === 200) {
          const data = response.data;
    
          if (data.length > 0) {
            navigation.navigate('Home');
          } else {
            alert('Nieprawidłowy login lub hasło');
          }
        } else {
          throw new Error('Network response was not ok');
        }
      } catch (error) {
        console.error('Error during login:', error);
        alert('Wystąpił problem podczas logowania');
      }
    };
  
  
    return (
      <View style={styles.container}>
        <Text>Login:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setLogin}
          value={login}
          placeholder="Wprowadź login"
        />
        <Text>Hasło:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPass}
          value={pass}
          secureTextEntry={true}
          placeholder="Wprowadź hasło"
        />
        <Button title="Login" onPress={handleLogin} />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
      padding: 20, 
    },
    label: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    input: {
      borderWidth: 1,
      borderColor: 'gray',
      width: 300,
      marginBottom: 15,
      padding: 10,
      borderRadius: 8,
    },
  });
  export default LoginScreen;
  