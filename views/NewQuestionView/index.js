import * as React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { StackActions } from "@react-navigation/native";
import { addCardToDeck } from "../../utils/storage";

const NewQuestionView = ({ navigation, route }) => {
  const [question, setQuestion] = React.useState("");
  const [answer, setAnswer] = React.useState("");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setQuestion}
        value={question}
        placeholder=" Enter Question"
      />
      <TextInput
        style={styles.input}
        onChangeText={setAnswer}
        value={answer}
        placeholder=" Enter Answer"
      />
      <TouchableOpacity
        style={styles.buttonBlack}
        onPress={async () => {
          await addCardToDeck(route.params.deckTitle, {
            question,
            answer,
          });
          const popAction = StackActions.pop(1);
          navigation.dispatch(popAction);
        }}
      >
        <Text style={{ color: "white" }}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
  },
  buttonBlack: {
    alignItems: "center",
    backgroundColor: "#000",
    width: 300,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default NewQuestionView;
