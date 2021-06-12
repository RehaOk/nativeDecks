import * as React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { saveDeckTitle } from "../../utils/storage";
import { TabActions } from "@react-navigation/native";

const NewDeckView = ({ navigation }) => {
  const jumpToActionDecks = TabActions.jumpTo("Decks");
  const [title, onChangeTitle] = React.useState("");
  const onPress = async () => {
    await saveDeckTitle(title);
    navigation.dispatch(jumpToActionDecks);
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerInner}>
        <Text>What is the title of your new deck?</Text>
        <SafeAreaView>
          <TextInput
            style={styles.input}
            onChangeText={onChangeTitle}
            value={title}
            placeholder=" Deck Title"
          />
          <TouchableOpacity style={styles.buttonWhite} onPress={onPress}>
            <Text style={{ color: "black" }}>Submit</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  containerInner: {
    marginTop: "25%",
    alignItems: "center",
  },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
  },
  buttonWhite: {
    margin: 12,
    alignItems: "center",
    backgroundColor: "#fff",
    width: 300,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default NewDeckView;
