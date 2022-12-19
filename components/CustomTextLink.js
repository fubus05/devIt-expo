import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const CustomText = ({ firstPart, secondPart, typeNav }) => {
    const navigation = useNavigation();

    const onContinuePress = () => {
        navigation.navigate(`${typeNav}`);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.first_part}>{firstPart} </Text>
            <TouchableOpacity onPress={onContinuePress}>
                <Text style={styles.second_part}>{secondPart}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        fontSize: 14
    },
    first_part: {
        color: "#9795A4"
    },
    second_part: {
        color: "#FFC612"
    }
});

export default CustomText;
