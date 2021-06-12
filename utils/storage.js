import { AsyncStorage } from "react-native";
export const STORAGE_KEY = "MY_STORAGE_KEY";

/* 
    {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}
*/

// getDecks: return all of the decks along with their titles, questions, and answers.
export const getDecks = async () => {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEY);
    if (value !== null) {
      // We have data!!
      return JSON.parse(value);
    }
  } catch (error) {
    // Error retrieving data
    console.log("Error retrieving all deck data" + error);
    return null;
  }
};
// getDeck: take in a single id argument and return the deck associated with that id.
export const getDeck = async (title) => {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEY);
    if (value !== null) {
      // We have data!!
      return JSON.parse(value)[title];
    }
  } catch (error) {
    // Error retrieving data
    console.log("Error retrieving all deck data" + error);
    return null;
  }
};
// saveDeckTitle: take in a single title argument and add it to the decks.
export const saveDeckTitle = async (title) => {
  try {
    let decks = await getDecks().then((value) => value);
    if (decks) {
      decks[title] = { title, questions: [] };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
    } else {
      decks = { [title]: { title, questions: [] } };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
    }
    return true;
  } catch (error) {
    // Error saving data
    console.log("Error saving deck title" + error);
    return false;
  }
};
// addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.
export const addCardToDeck = async (title, card) => {
  try {
    let decks = await getDecks().then((value) => value);
    decks[title] = {
      title: decks[title].title,
      questions: [...decks[title].questions, { ...card }],
    };
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
    return true;
  } catch (error) {
    // Error saving data
    console.log("Error saving card data" + error);
    return false;
  }
};
