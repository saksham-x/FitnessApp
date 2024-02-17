import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Chatbot = () => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      text: 'How was the workout?',
      options: ['Good', 'Bad', 'Average'],
      selectedOption: null,
    },
    {
      id: 2,
      text: 'How many days a week do you exercise?',
      options: ['1-2 days', '3-4 days', '5 or more days'],
      selectedOption: null,
    },
  ]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleOptionSelect = (questionId, option) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.id === questionId ? { ...q, selectedOption: option } : q
      )
    );

    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrev = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  return (
    <View style={styles.container}>
      {currentQuestionIndex < questions.length ? (
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>
            {questions[currentQuestionIndex].text}
          </Text>
          <View style={styles.optionsContainer}>
            {questions[currentQuestionIndex].options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  questions[currentQuestionIndex].selectedOption === option &&
                    styles.selectedOption,
                ]}
                onPress={() =>
                  handleOptionSelect(
                    questions[currentQuestionIndex].id,
                    option
                  )
                }
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ) : (
        <Text>Thank you for answering all the questions</Text>
      )}
      {currentQuestionIndex >= 1 && currentQuestionIndex < questions.length ? (
        <TouchableOpacity style={styles.prevButton} onPress={handlePrev}>
          <Text style={styles.prevButtonText}>Prev</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ccc',
  },
  questionContainer: {
    marginBottom: 16,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  optionsContainer: {
    flexWrap: 'wrap',
  },
  optionButton: {
    backgroundColor: '#3498DB',
    padding: 8,
    borderRadius: 8,
    margin: 4,
  },
  selectedOption: {
    backgroundColor: '#2ECC71',
  },
  optionText: {
    color: '#FFFFFF',
  },
  prevButton: {
    backgroundColor: '#3498DB',
    padding: 10,
    borderRadius: 8,
    marginTop: 20, 
  },
  prevButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default Chatbot;
