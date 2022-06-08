import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
    title: string;
}

export const Header = ({ title }: Props) => {
    const { canGoBack, goBack } = useNavigation();

    return (
        <View style={styles.container}>
            {
                canGoBack ?
                    <TouchableOpacity style={styles.goBack} onPress={goBack}>
                        <Text style={styles.goBackText}>Go back</Text>
                    </TouchableOpacity> :
                    null
            }
            <Text style={styles.title}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        position: "relative",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    goBack: {
        position: "absolute",
        left: 10,
    },
    goBackText: {
        color: "white",
        fontSize: 16,
    },
    title: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        padding: 10,
    },
  });
