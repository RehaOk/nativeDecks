import * as React from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TextInput,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { StackActions, useIsFocused } from "@react-navigation/native";
import { getDeck } from "../../utils/storage";

const IndividualDeckView = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const [questionCount, setQuestionCount] = React.useState(0);

  React.useEffect(() => {
    const getCurrentQuestionNumber = async () => {
      try {
        const deck = await getDeck(route.params.title);
        if (deck) {
          setQuestionCount(deck.questions ? deck.questions.length : 0);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCurrentQuestionNumber();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text>{route.params.title}</Text>
        <Text>Number of cards: {questionCount}</Text>
      </View>
      <TouchableOpacity
        style={styles.buttonWhite}
        onPress={() => {
          const pushAction = StackActions.push("NewQuestion", {
            deckTitle: route.params.title,
          });
          navigation.dispatch(pushAction);
        }}
      >
        <Text style={{ color: "black" }}>Add Card</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonBlack}
        onPress={() => {
          const pushAction = StackActions.push("Quiz", {
            deckTitle: route.params.title,
          });
          navigation.dispatch(pushAction);
        }}
      >
        <Text style={{ color: "white" }}>Start Quiz</Text>
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
  textContainer: {
    marginTop: "25%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 100,
  },
  buttonWhite: {
    marginBottom: 10,
    alignItems: "center",
    backgroundColor: "#fff",
    width: 300,
    padding: 10,
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

export default IndividualDeckView;
