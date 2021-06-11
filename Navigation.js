import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DeckListView from "./views/DeckListView";
import IndividualDeckView from "./views/IndividualDeckView";
import NewDeckView from "./views/NewDeckView";
import NewQuestionView from "./views/NewQuestionView";
import QuizView from "./views/QuizView";

export default StackNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="DeckList">
      <Stack.Screen name="DeckList" component={DeckListView} />
      <Stack.Screen name="IndividualDeck" component={IndividualDeckView} />
      <Stack.Screen name="NewDeck" component={NewDeckView} />
      <Stack.Screen name="NewQuestion" component={NewQuestionView} />
      <Stack.Screen name="Quiz" component={QuizView} />
    </Stack.Navigator>
  );
};
