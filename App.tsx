/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, {useState, useEffect} from 'react';
import {Button, TextInput, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';

const App = () => {
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);

  // verification code (OTP - One-Time-Passcode)
  const [code, setCode] = useState('');
  const [number, setNumber] = useState('');
  const [fNumber, setFNumber] = useState('');
  const [buttonD, setButtonD] = useState(true);
  // Handle login
  function onAuthStateChanged(user) {
    if (user) {
      // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
      // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
      // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
      // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }

  function confirmCode() {
    if (confirm.confirm(code)) {
      Alert.alert('Code is correct');
    } else {
      Alert.alert('Code is wrong');
    }
  }

  const checkFormat = () => {
    // +63 936-937-9796
    const n1 = number.substring(1);
    const n2 = '+63 ' + n1;
    const n3 = n2.slice(0, 7) + '-' + n2.slice(7);
    const n4 = n3.slice(0, 11) + '-' + n3.slice(11);
    setFNumber(n4);
    signInWithPhoneNumber(n4);
    // Alert.alert('Number: ', n4);
  };
  const handleTextChange = text => {
    setNumber(text);
    // Enable the button only if the length of the entered number is 11
    if (text.length === 11) {
      setButtonD(false);
    } else {
      setButtonD(true);
    }
  };
  if (!confirm) {
    return (
      <>
        <TextInput
          placeholder="09........."
          value={number}
          onChangeText={text => handleTextChange(text)}
          keyboardType="numeric"
        />
        <Button
          title="Phone Number Sign In"
          // onPress={() => signInWithPhoneNumber('+63 936-937-9796')}
          // onPress={() => signInWithPhoneNumber(fNumber)}
          onPress={() => checkFormat()}
          disabled={buttonD}
        />
      </>
    );
  }

  return (
    <>
      <TextInput value={code} onChangeText={text => setCode(text)} />
      <Button title="Confirm Code" onPress={() => confirmCode()} />
    </>
  );
};

export default App;
