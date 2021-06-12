import * as React from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StackActions, useIsFocused } from "@react-navigation/native";

import NewDeckView from "../NewDeckView";
import { getDecks } from "../../utils/storage";

const DeckListViewIndex = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [decks, setDecks] = React.useState({});

  React.useEffect(() => {
    console.log(JSON.stringify(navigation));
    /* const unsubscribe = navigation.addListener("tabPress", (e) => { */
    const retriveDecks = async () => {
      const deckInfo = await getDecks();
      setDecks(deckInfo);
    };
    retriveDecks();
    /* }); */
    /* return unsubscribe; */
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {decks &&
          Object.keys(decks).map((deckTitle) => {
            console.log("decks: " + JSON.stringify(decks));
            return (
              <TouchableOpacity
                key={deckTitle}
                style={styles.listButton}
                onPress={() => {
                  const pushAction = StackActions.push("IndividualDeck", {
                    title: deckTitle,
                    questionNumber: decks?.[deckTitle]?.questions
                      ? decks?.[deckTitle]?.questions.length
                      : 0,
                  });
                  navigation.dispatch(pushAction);
                }}
              >
                <Text>{`${deckTitle} - ${
                  decks?.[deckTitle]?.questions
                    ? decks?.[deckTitle]?.questions.length
                    : 0
                } Cards`}</Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </SafeAreaView>
  );
};

const Tab = createMaterialTopTabNavigator();

export default function DeckListView() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Decks" component={DeckListViewIndex} />
      <Tab.Screen name="New Deck" component={NewDeckView} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listButton: {
    padding: 20,
    backgroundColor: "gray",
    borderBottomWidth: 1,
    borderColor: "black",
  },
});
