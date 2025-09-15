import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#84eee3ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#06402b',
    fontSize: 40,
    marginBottom: 10,
  },
  startButton: {
    borderRadius: 20,
    backgroundColor: '#06402b',
    color: '#fff',
  },  
  startButtonText: {
    color: '#fff',
    fontSize: 30,
    padding: 10,
  },
  button: {
    height: 80,
    width: 80,
    backgroundColor: '#808080',
    borderRadius: 20,
  },
  buttonRow:{
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,
    paddingBottom: -5,
  },
  gameSpace: {
    backgroundColor: '#06402b',
    borderRadius: 20,
    width: 300,
    height: 300,
    paddingTop: 8,
  },
});

export default styles;