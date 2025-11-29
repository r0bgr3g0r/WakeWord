import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { getTodaysLesson } from '../services/lessons';

export default function AlarmRingScreen({ route, navigation }) {
  const language = route.params?.language || 'es';
  const lesson = getTodaysLesson(language);
  const [input, setInput] = useState('');

  const checkAnswer = () => {
    if (input.trim().toLowerCase() === lesson.translation.toLowerCase()) {
      Alert.alert("Correct!", "¡Perfecto! Alarm stopped", [
        { text: "Dismiss", onPress: () => navigation.replace('Home') }
      ]);
    } else {
      Alert.alert("Nope!", "Try again! Hint: it's a common greeting", [{ text: "OK" }]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.word}>{lesson.word}</Text>
      <Text style={styles.pronunciation}>{lesson.pronunciation}</Text>
      
      <Text style={styles.instruction}>
        Type the English translation to stop the alarm:
      </Text>

      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder="Your answer..."
        autoFocus
        onSubmitEditing={checkAnswer}
      />

      <Button title="STOP ALARM" onPress={checkAnswer} color="#10b981" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1e293b', justifyContent: 'center', padding: 30 },
  word: { fontSize: 70, color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  pronunciation: { fontSize: 28, color: '#94a3b8', textAlign: 'center', marginVertical: 20 },
  instruction: { fontSize: 20, color: '#e2e8f0', textAlign: 'center', marginVertical: 40 },
  input: { backgroundColor: '#fff', padding: 20, borderRadius: 12, fontSize: 24, marginVertical: 30 }
});
