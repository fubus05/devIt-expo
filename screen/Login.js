import {useState} from 'react';
import {StyleSheet, SafeAreaView, TouchableOpacity, Text} from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import CustomText from '../components/CustomTextLink';
import Logo from '../assets/Logo';
import CustomTitle from '../components/CustomTitle';
import * as SQLite from 'expo-sqlite';
import {useNavigation} from '@react-navigation/native';

const db = SQLite.openDatabase('users.db');

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState();
  const [errors, setErrors] = useState();
  const navigation = useNavigation();

  const onLogin = () => {
    if (email === '' || password === '') {
      setErrors('Please enter your username and password!');
      return;
    }
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM users WHERE email='${email}'`,
        [],
        (tx, results) => {
          const len = results.rows.length;
          if (!len) {
            setErrors('This account does not exist!');
          } else {
            const row = results.rows.item(0);
            if (password === row.password) {
              navigation.navigate('Profile', {currentEmail: email});
              setErrors('');
              setEmail(''), setPassword('');
              return;
            }
            setErrors(`Something incorrect let's try again!`);
          }
        },
      );
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Logo style={styles.logo_style} />
      <CustomTitle screenType="Log In" />
      {errors && (
        <Text style={{marginTop: 7, color: 'red', fontSize: 12}}>{errors}</Text>
      )}
      <CustomInput
        setVal={setEmail}
        vals={email}
        type="email-address"
        name="your email"
      />
      <CustomInput setVal={setPassword} vals={password} name="password" />
      <TouchableOpacity style={styles.forgot_password}>
        <Text style={styles.text}>Forgot Password?</Text>
      </TouchableOpacity>
      <CustomButton text="log in" pressFunc={onLogin} />
      <CustomText
        firstPart="New User?"
        secondPart="Create Account"
        typeNav="Register"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    textTransform: 'capitalize',
    color: '#9795A4',
    fontSize: 14,
  },
  forgot_password: {
    width: '90%',
    alignItems: 'flex-end',
    marginTop: 20,
    marginBottom: 50,
  },
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#F5F5F5',
  },
  logo_style: {
    marginBottom: 100,
  },
});

export default Login;
