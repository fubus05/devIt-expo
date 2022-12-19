import {CountryPicker} from 'react-native-country-codes-picker';
import {
  TouchableOpacity,
  Text,
  View,
  TextInput,
  StyleSheet,
} from 'react-native';
import {useState, useRef} from 'react';

const CustomPhoneContainer = ({
  countryCode,
  setPhoneNumber,
  phoneNumber,
  setCountryCode,
  codeCheck,
  error,
}) => {
  const [show, setShow] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const firstInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourthInput = useRef();
  const [otp, setOtp] = useState({1: '', 2: '', 3: '', 4: ''});

  return (
    <View style={styles.phone_container}>
      <Text style={styles.text}>Phone Number</Text>
      <View style={styles.phone_number}>
        <TouchableOpacity
          onPress={() => setShow(true)}
          style={styles.country_input}>
          <Text style={styles.country_input_text}>{countryCode}</Text>
        </TouchableOpacity>
        <CountryPicker
          show={show}
          style={{
            modal: {
              height: 500,
            },
            backdrop: {
              backgroundColor: 'none',
            },
            textInput: {
              display: 'none',
            },
            line: {
              display: 'none',
            },
          }}
          pickerButtonOnPress={item => {
            setCountryCode(item.dial_code);
            setShow(false);
          }}
        />
        <TextInput
          style={styles.input}
          onChangeText={setPhoneNumber}
          value={phoneNumber}
          autoCapitalize="none"
          keyboardType="phone-pad"
        />
      </View>
      {error && (
        <Text style={{marginTop: 7, color: 'red', fontSize: 12}}>{error}</Text>
      )}
      {codeCheck && (
        <View>
          <Text style={styles.text}>Code</Text>
          <View style={styles.otpContainer}>
            <View style={styles.otpBox}>
              <TextInput
                style={styles.otpText}
                keyboardType="number-pad"
                maxLength={1}
                ref={firstInput}
                onFocus={() => setIsFocused(!isFocused)}
                onChangeText={text => {
                  setOtp({...otp, 1: text});
                  text && secondInput.current.focus();
                }}
              />
            </View>
            <View style={styles.otpBox}>
              <TextInput
                style={styles.otpText}
                keyboardType="number-pad"
                maxLength={1}
                ref={secondInput}
                onFocus={() => setIsFocused(!isFocused)}
                onChangeText={text => {
                  setOtp({...otp, 2: text});
                  text
                    ? thirdInput.current.focus()
                    : firstInput.current.focus();
                }}
              />
            </View>
            <View style={styles.otpBox}>
              <TextInput
                style={styles.otpText}
                keyboardType="number-pad"
                maxLength={1}
                ref={thirdInput}
                onFocus={() => setIsFocused(!isFocused)}
                onChangeText={text => {
                  setOtp({...otp, 3: text});
                  text
                    ? fourthInput.current.focus()
                    : secondInput.current.focus();
                }}
              />
            </View>
            <View style={styles.otpBox}>
              <TextInput
                style={styles.otpText}
                keyboardType="number-pad"
                maxLength={1}
                ref={fourthInput}
                onFocus={() => setIsFocused(!isFocused)}
                onChangeText={text => {
                  setOtp({...otp, 4: text});
                  !text && thirdInput.current.focus();
                }}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  phone_container: {
    width: '90%',
  },
  phone_number: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  country_input: {
    width: '15%',
    marginRight: 25,
    borderColor: '#D7D7D7',
    borderWidth: 1,
    borderRadius: 15,
  },
  input: {
    width: '50%',
    borderWidth: 1,
    borderColor: '#D7D7D7',
    borderRadius: 15,
    color: '#9795A4',
    fontSize: 16,
    paddingLeft: 12,
  },
  country_input_text: {
    color: '#9795A4',
    fontSize: 16,
    padding: 12,
  },
  text: {
    textTransform: 'capitalize',
    color: '#9795A4',
    fontSize: 14,
    marginBottom: 12,
    marginTop: 12,
  },
  otpContainer: {
    width: '60%',
    marginRight: 25,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  otpBox: {
    borderRadius: 15,
    borderColor: '#D7D7D7',
    borderWidth: 1,
  },
  focusOtpBox: {},
  otpText: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 17,
    paddingVertical: 10,
  },
});

export default CustomPhoneContainer;
