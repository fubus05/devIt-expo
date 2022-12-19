import { Text, StyleSheet } from "react-native";

const CustomTitle = ({ screenType }) => (
  <Text style={styles.screen_type}>{screenType} Woorkroom</Text>
);

const styles = StyleSheet.create({
  screen_type: {
    fontSize: 24,
    marginBottom: 50,
  },
});

export default CustomTitle;
