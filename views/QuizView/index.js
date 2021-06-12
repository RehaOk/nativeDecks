import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import CardFlip from "react-native-card-flip";
import { useIsFocused } from "@react-navigation/native";
import { getDeck } from "../../utils/storage";

let questions = [];
let currentQuestionIndex = 0;
let totalNumberOfQuestions = 0;
let correctAnswerCount = 0;
let incorrectAnswerCount = 0;
const QuizView = ({ navigation, route }) => {
  const cardRef = React.useRef(null);
  const isFocused = useIsFocused();
  const [currentQuestion, setCurrentQuestion] = React.useState({});
  const [renderFinalCard, setRenderFinalCard] = React.useState(false);
  const [finalCardText, setFinalCardText] = React.useState("");
  const [cardSide, setCardSide] = React.useState(true); // true === front && false === back
  React.useEffect(() => {
    const obtainDeck = async () => {
      const deck = await getDeck(route.params.deckTitle);
      questions = deck.questions;
      if (questions.length !== 0) {
        totalNumberOfQuestions = questions.length;
        setCurrentQuestion(questions[currentQuestionIndex]);
      } else {
        // set final page
      }
    };
    obtainDeck();
  }, [isFocused]);

  const onButtonPress = (buttonType) => {
    switch (buttonType) {
      case "correct":
        correctAnswerCount += 1;
        if (questions.length - 1 > currentQuestionIndex) {
          currentQuestionIndex = currentQuestionIndex + 1;
          setCurrentQuestion(questions[currentQuestionIndex]);
        } else {
          setFinalCardText(
            `Correct Answer Percentage: ${
              (correctAnswerCount / totalNumberOfQuestions) * 100
            }%`
          );
          setRenderFinalCard(true);
          // reset values
          currentQuestionIndex = 0;
          correctAnswerCount = 0;
          incorrectAnswerCount = 0;
        }
        break;
      case "incorrect":
        incorrectAnswerCount += 1;
        if (questions.length - 1 > currentQuestionIndex) {
          currentQuestionIndex = currentQuestionIndex + 1;
          setCurrentQuestion(questions[currentQuestionIndex]);
        } else {
          setFinalCardText(
            `Correct Answer Percentage: ${
              (correctAnswerCount / totalNumberOfQuestions) * 100
            }%`
          );
          setRenderFinalCard(true);
          // reset values
          currentQuestionIndex = 0;
          correctAnswerCount = 0;
          incorrectAnswerCount = 0;
        }
        break;
      default:
        break;
    }
  };

  return (
    <>
      {renderFinalCard ? (
        <View style={styles.finalContainer}>
          <Text>{finalCardText}</Text>
        </View>
      ) : (
        <>
          <View style={styles.cardTracker}>
            <Text style={{ marginLeft: 10 }}>
              {currentQuestionIndex}/{totalNumberOfQuestions}
            </Text>
          </View>
          <View style={styles.container}>
            <CardFlip style={styles.cardContainer} ref={cardRef}>
              <TouchableOpacity
                style={styles.card}
                onPress={() => {
                  setCardSide(!cardSide);
                  cardRef.current.flip();
                }}
              >
                <Text style={styles.cardText}>{currentQuestion.question}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.card}
                onPress={() => {
                  setCardSide(!cardSide);
                  cardRef.current.flip();
                }}
              >
                <Text style={styles.cardText}>{currentQuestion.answer}</Text>
              </TouchableOpacity>
            </CardFlip>
            <View>
              <TouchableOpacity
                style={styles.buttonWhite}
                onPress={() => {
                  if (!cardSide) {
                    // flip duration default: 1000
                    cardRef.current.flip();
                    setCardSide(true);
                    setTimeout(() => {
                      onButtonPress("correct");
                    }, 1000);
                  } else {
                    onButtonPress("correct");
                  }
                }}
              >
                <Text style={{ color: "black" }}>Correct</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonBlack}
                onPress={() => {
                  if (!cardSide) {
                    // flip duration default: 1000
                    cardRef.current.flip();
                    setCardSide(true);
                    setTimeout(() => {
                      onButtonPress("incorrect");
                    }, 1000);
                  } else {
                    onButtonPress("incorrect");
                  }
                }}
              >
                <Text style={{ color: "white" }}>Incorrect</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  finalContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  cardTracker: {
    height: 50,
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#fff",
  },
  cardContainer: {
    width: "70%",
    height: 400,
    backgroundColor: "#f00",
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    borderRadius: 5,
  },
  card: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cardText: {
    fontSize: 20,
    color: "white",
    ...Platform.select({
      ios: { fontFamily: "Arial" },
      android: { fontFamily: "Roboto" },
    }),
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

export default QuizView;
