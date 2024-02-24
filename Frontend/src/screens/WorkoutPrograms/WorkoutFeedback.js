import React, { useState } from 'react';
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { default_ip_address } from '../../constant/constant'

const WorkoutFeedback = () => {
    const route = useRoute();
    const navigation =useNavigation()
    const [feedback, setFeedback] = useState(null);
    // const [intensity, setIntensity] = useState(route.params.intensity)
    let intensity=route.params.intensity
    const handleFeedback =async (value) => {
        setFeedback(value);
        if(value==='low'){
            intensity=intensity+1
        }
        else if (value ==='medium'){
            intensity = intensity

        }
        else if (value ==='high'){
            intensity = intensity - 1
        }
        let user_data = await AsyncStorage.getItem('user')
        let parsed_data = JSON.parse(user_data)
        let user_id = parsed_data._id
        let data_result = await fetch(`${default_ip_address}/generate_workout?id=${user_id}&intensity=${intensity}`, {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            }
        })
        data_result = await data_result.json()
        console.log(data_result)
        if(data_result.success===true){
            navigation.navigate('HomeScreen')
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>How was the workout intensity?</Text>
            <TouchableOpacity
                style={[styles.button, feedback === 'low' && styles.selected]}
                onPress={() => handleFeedback('low')}
            >
                <Text style={styles.buttonText}>Low</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, feedback === 'medium' && styles.selected]}
                onPress={() => handleFeedback('medium')}
            >
                <Text style={styles.buttonText}>Medium</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, feedback === 'high' && styles.selected]}
                onPress={() => handleFeedback('high')}
            >
                <Text style={styles.buttonText}>High</Text>
            </TouchableOpacity>
            {feedback && (
                <Text style={styles.feedbackText}>
                    Thanks for your feedback! You selected <Text style={{ fontWeight: 'bold' }}>{feedback}</Text> intensity.
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#181818'
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
        color: '#fff'
    },
    button: {
        backgroundColor: '#3498db',
        padding: 10,
        margin: 5,
        borderRadius: 5,
        width: 120,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center'
    },
    selected: {
        backgroundColor: '#2c3e50',
    },
    feedbackText: {
        marginTop: 20,
        fontSize: 16,
        color: '#fff'
    },
});

export default WorkoutFeedback;