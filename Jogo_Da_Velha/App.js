import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import styles from './styles';

export default function App() {

  const [player, setPlayer] = useState([1, 2]);

  function changePlayerTurn() {
    if (player == 1) {
      setPlayer(player[1]);
    } else {
      setPlayer(player[0]);
    }
  }

  Array.prototype.sample = function () {
    return this[Math.floor(Math.random() * this.length)];
  }

  function setFirstPlayer() {
    setPlayer(player.sample());
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jogo da Velha</Text>
      <TouchableOpacity style={styles.startButton}>
        <Text style={styles.startButtonText}>Iniciar partida</Text>
      </TouchableOpacity>
      <View style={styles.gameSpace}>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button}>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button}>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button}>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.title}>{player}</Text>
      <StatusBar style="auto" />
    </View>
  );
}