import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet, ScrollView } from 'react-native';
import { scheduleLanguageAlarm, cancelAllAlarms } from '../services/alarms';
import { getTodaysLesson } from '../services/lessons';
import DateTimePicker from '@react-native-community/datetime-picker';

export default function HomeScreen({ navigation }) {
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [language, setLanguage] = useState('es');

  const onChangeTime = (event, selectedDate) => {
    const currentDate = selectedDate || time;
    setShowPicker(false);
    setTime(currentDate);
  };

  const setAlarm = () => {
    const alarmTime = new Date();
    alarmTime.setHours(time.getHours());
    alarmTime.setMinutes(time.getMinutes());
    alarmTime.setSeconds(0);

    if (alarmTime < new Date()) {
      alarmTime.setDate(alarmTime.getDate() + 1);
    }

    scheduleLanguageAlarm(alarmTime, language);
    Alert.alert("Alarm Set!", `Daily language alarm at ${alarmTime.toLocaleTimeString()}`);
  };

  const previewToday = () => {
    const lesson = getTodaysLesson(language);
    navigation.navigate('AlarmRing', { language });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>WakeWord</Text>
      <Text style={styles.subtitle}>Learn a new word every morning</Text>

      <Text style={styles.label}>Alarm Time</Text>
      <Button title={time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} onPress={() => setShowPicker(true)} />
      {showPicker && (
        <DateTimePicker mode="time" value={time} onChange={onChangeTime} />
      )}

      <Text style={styles.label}>Language</Text>
      <View style={{ flexDirection: 'row', gap: 10, marginVertical: 20 }}>
        <Button title="Español" onPress={() => setLanguage('es')} color={language === 'es' ? '#4f46e5' : '#666'} />
        <Button title="Français" onPress={() => setLanguage('fr')} color={language === 'fr' ? '#4f46e5' : '#666'} />
      </View>

      <Button title="SET DAILY LANGUAGE ALARM" onPress={setAlarm} color="#4f46e5" />
      <Button title="Cancel All Alarms" onPress={cancelAllAlarms} color="#ef4444" />
      <Button title="Preview Today's Lesson" onPress={previewToday} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#f8fafc' },
  title: { fontSize: 42, fontWeight: 'bold', textAlign: 'center', color: '#1e293b' },
  subtitle: { fontSize: 18, textAlign: 'center', color: '#64748b', marginBottom: 40 },
  label: { fontSize: 18, marginTop: 20, marginBottom: 10, fontWeight: '600' }
});
