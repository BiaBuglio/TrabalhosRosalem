import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import styles from './styles';
import iconX from './assets/x-icon.png';
import iconO from './assets/circle-icon.png';

export default function App() {

  const [player, setPlayer] = useState("");
  const [b1l1, setb1l1] = useState("");
  const [b2l1, setb2l1] = useState("");
  const [b3l1, setb3l1] = useState("");
  const [b1l2, setb1l2] = useState("");
  const [b2l2, setb2l2] = useState("");
  const [b3l2, setb3l2] = useState("");
  const [b1l3, setb1l3] = useState("");
  const [b2l3, setb2l3] = useState("");
  const [b3l3, setb3l3] = useState("");
  const [gameResult, setGameResult] = useState("");

  function changePlayerTurn() {
    if (player == 1) {
      setPlayer(player[1]);
    } else {
      setPlayer(player[0]);
    }
  }

  function showWinner() {
    setGameResult(`Jogador [ ${player} ] vence!`);
  }

  function showTie() {
    setGameResult("Deu velha!");
  }

  Array.prototype.sample = function () {
    return this[Math.floor(Math.random() * this.length)];
  }

  function setFirstPlayer() {
    playerOptions = [1, 2]
    setPlayer(playerOptions.sample());
  }

  function buttonPress(fncBotao, buttonText) {

    //só permita cliques em botões ainda não clicados e em um jogo em curso.
    if (buttonText.length == 0 && gameResult.length == 0) {
      fncBotao(player);
      //verificaGanhador();
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jogo da Velha</Text>
      <TouchableOpacity style={styles.startButton} onPress={() => setFirstPlayer()}>
        <Text style={styles.startButtonText}>Iniciar partida</Text>
      </TouchableOpacity>
      <View style={styles.gameSpace}>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={() => buttonPress(setb1l1, b1l1)}>
            <Image></Image> -> adicionar if aqui dentro
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => buttonPress(setb2l1, b2l1)}>
            <Image ></Image>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => buttonPress(setb3l1, b3l1)}>
            <Image></Image>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={() => buttonPress(setb1l2, b1l2)}>
            <Image></Image>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => buttonPress(setb2l2, b2l2)}>
            <Image></Image>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => buttonPress(setb3l2, b3l2)}>
            <Image></Image>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={() => buttonPress(setb1l3, b1l3)}>
            <Image></Image>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => buttonPress(setb2l3, b2l3)}>
            <Image></Image>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => buttonPress(setb3l3, b3l3)}>
            <Image></Image>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.title}>{player}</Text>
      <StatusBar style="auto" />
    </View>
  );
}