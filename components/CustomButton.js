import {Text, StyleSheet, TouchableOpacity} from 'react-native';

const CustomButton = ({text, pressFunc}) => (
  <TouchableOpacity style={styles.button} onPress={pressFunc}>
    <Text style={styles.text}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    textTransform: 'capitalize',
  },
  button: {
    width: '90%',
    height: 62,
    marginBottom: 35,
    backgroundColor: '#FFC612',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
});

export default CustomButton;
