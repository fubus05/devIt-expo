import {TextInput, StyleSheet, View, Text} from 'react-native';

const CustomInput = ({setVal, vals, name, error}) => (
  <View style={styles.container}>
    <Text style={styles.text}>{name}</Text>
    <TextInput
      style={styles.input}
      onChangeText={setVal}
      value={vals}
      autoCapitalize="none"
      autoCorrect={false}
    />
    {error && (
      <Text style={{marginTop: 7, color: 'red', fontSize: 12}}>{error}</Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  text: {
    textTransform: 'capitalize',
    color: '#9795A4',
    fontSize: 14,
  },
  container: {
    float: 'left',
    width: '90%',
    margin: 12,
  },
  input: {
    marginTop: 12,
    borderWidth: 0,
    borderColor: '#D7D7D7',
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CustomInput;
