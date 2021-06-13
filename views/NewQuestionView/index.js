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
  const [error, setError] = React.useState(false);
  return (
    <View style={styles.container}>
      {error && (
        <Text style={{ color: "red" }}>
          Please enter both question and an answer
        </Text>
      )}
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
        disable={!question.trim() || !answer.trim()}
        onPress={async () => {
          if (!!question.trim() && !!answer.trim()) {
            await addCardToDeck(route.params.deckTitle, {
              question,
              answer,
            });
            setError(false);
            const popAction = StackActions.pop(1);
            navigation.dispatch(popAction);
          } else {
            setError(true);
          }
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
