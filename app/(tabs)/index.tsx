import { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function HomeScreen() {
  const [goalText, setGoalText] = useState<string>('');
  const [goals, setGoals] = useState<{ text: string; id: string }[]>([]);

  function addGoalHandler() {
    if (goalText.trim().length === 0) return;

    setGoals((currentGoals) => [
      ...currentGoals,
      { text: goalText, id: Math.random().toString() },
    ]);

    setGoalText('');
  }

  function deleteGoalHandler(id: string) {
    setGoals((currentGoals) =>
      currentGoals.filter((goal) => goal.id !== id)
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My To-Do List</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your goal"
          placeholderTextColor="#C2185B"
          value={goalText}
          onChangeText={setGoalText}
        />

        <TouchableOpacity style={styles.button} onPress={addGoalHandler}>
          <Text style={styles.buttonText}>ADD</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={goals}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <TouchableOpacity
            onPress={() => deleteGoalHandler(itemData.item.id)}
          >
            <View style={styles.goalItem}>
              <Text style={styles.goalText}>
                {itemData.item.text}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: '#FFF0F6',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
    color: '#FF69B4',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  textInput: {
    borderWidth: 1.5,
    borderColor: '#FF69B4',
    padding: 10,
    flex: 1,
    marginRight: 10,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    color: '#5A2A3A',
  },
  button: {
    backgroundColor: '#FF69B4',
    paddingHorizontal: 18,
    justifyContent: 'center',
    borderRadius: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  goalItem: {
    backgroundColor: '#FFB6C1',
    padding: 14,
    marginVertical: 8,
    borderRadius: 15,
    shadowColor: '#FF69B4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  goalText: {
    color: '#5A2A3A',
    fontWeight: '600',
  },
});