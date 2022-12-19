import {useState, useEffect} from 'react';
import {Keyboard, ScrollView, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import CustomText from '../components/CustomTextLink';
import Logo from '../assets/Logo';
import CustomTitle from '../components/CustomTitle';
import * as SQLite from 'expo-sqlite';
import CustomPhoneContainer from '../components/CustomPhoneContainer';
import {useNavigation} from '@react-navigation/native';

const db = SQLite.openDatabase('users.db');

const Register = () => {
  const [data, setData] = useState([]);
  const [countryCode, setCountryCode] = useState('+1');
  const [errors, setErrors] = useState({});
  const [currentName, setCurrentName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');
  const navigation = useNavigation();
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS users ( id INTEGER PRIMARY KEY AUTOINCREMENT, phone TEXT, email TEXT, name TEXT, password TEXT, position TEXT, skype TEXT )',
      );
    });
  }, []);

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!email) {
      handleError('Please input email', 'email');
      isValid = false;
    } else if (!email.match(/\S+@\S+\.\S+/)) {
      handleError('Please input a valid email', 'email');
      isValid = false;
    } else {
      db.transaction(tx => {
        tx.executeSql(
          `SELECT email FROM users WHERE email='${email}'`,
          [],
          (tx, results) => {
            const row = results.rows.item(0);
            row?.email === email &&
              handleError('This email was already registered', 'email');
            isValid = false;
          },
          (tx, error) => console.log(error),
        );
      });
      errors.email && setErrors('email', '');
    }

    if (!currentName) {
      handleError('Please input fullname', 'currentName');
      isValid = false;
    } else {
      errors.currentName && setErrors('currentName', '');
    }

    if (!phoneNumber) {
      handleError('Please input phone number', 'phoneNumber');
      isValid = false;
    } else {
      errors.phoneNumber && setErrors('phoneNumber', '');
    }
    if (!password) {
      handleError('Please input password', 'password');
      isValid = false;
    } else if (password.length < 8) {
      handleError('Min password length of 8', 'password');
      isValid = false;
    } else if (password.search(/[a-zA-Z]/) < 0) {
      handleError('Password must contain at least one letter', 'password');
      isValid = false;
    } else if (password.search(/[0-9]/) < 0) {
      handleError('Password must contain at least one digit', 'password');
      isValid = false;
    } else if (password.search(/[^a-zA-Z0-9\-\!\_\$]/) != -1) {
      handleError('Special characters may only include: - ! _ # $', 'password');
      isValid = false;
    } else if (password !== secondPassword) {
      handleError('Password should be same', 'password');
      isValid = false;
    } else {
      errors.password && setErrors('password', '');
    }

    if (isValid) {
      registerNewUser();
      navigation.navigate('Login');
    }
  };

  const registerNewUser = () => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO users (phone, name, email, password) VALUES (?, ?, ?, ?)',
        [countryCode + phoneNumber, currentName, email, password],
        (txObj, resultSet) => {
          let existingNames = [...data];
          existingNames.push({
            id: resultSet.insertId,
            phone: countryCode + phoneNumber,
            email: email,
            name: currentName,
            password: password,
          });
          setData(existingNames);
        },
        (txObj, error) => console.log(error),
      );
    });
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  return (
    <ScrollView>
      <KeyboardAwareScrollView
        resetScrollToCoords={{x: 0, y: 0}}
        contentContainerStyle={styles.container}
        scrollEnabled={false}>
        <Logo style={styles.logo_style} />
        <CustomTitle screenType="Sign Up To" />
        <CustomPhoneContainer
          countryCode={countryCode}
          setPhoneNumber={setPhoneNumber}
          phoneNumber={phoneNumber}
          setCountryCode={setCountryCode}
          codeCheck={true}
          error={errors.phoneNumber}
        />
        <CustomInput
          setVal={setCurrentName}
          vals={currentName}
          name="your name"
          error={errors.currentName}
        />
        <CustomInput
          setVal={setEmail}
          vals={email}
          name="your email"
          error={errors.email}
        />
        <CustomInput
          setVal={setPassword}
          vals={password}
          name="password"
          error={errors.password}
        />
        <CustomInput
          setVal={setSecondPassword}
          vals={secondPassword}
          name="confirm password"
          error={errors.password}
        />
        <CustomButton text="next" pressFunc={validate} />
        <CustomText
          firstPart="Have Account?"
          secondPart="Log In"
          typeNav="Login"
          style={styles.bottom_text}
        />
      </KeyboardAwareScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
    marginBottom: 80,
  },
  logo_style: {
    marginVertical: 100,
  },
});

export default Register;
