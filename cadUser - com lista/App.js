import { StatusBar } from "expo-status-bar";
import {
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  Keyboard,
} from "react-native";
import styles from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

import showPwd from "./assets/showPwd.png";
import hidePwd from "./assets/hidePwd.png";

import Titulo from "./componentes/Titulo";
import * as Validacao from "./Validacao";
import Botao from "./componentes/Botao";
import CardUsuario from "./componentes/CardUsuario";



export default function App() {
  const chaveStorage = "@lista_usuarios";
  const [codigo, setCodigo] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [exibeSenha, setExibeSenha] = useState(false);
  const [lista, setLista] = useState([]);

  useEffect(() => {
    console.log("useeffect");
    carregaDados();
  }, []);


 useEffect(() => {
    console.log(`useeffect ref. exibir senha ${exibeSenha}`);    
  }, [exibeSenha]);


  async function salvaDados() {
    if (!validaCampos()) return;

    try {
      let obj = {
        codigo ,
        nome ,
        email,
        senha,
      };

      let index = lista.findIndex((u) => u.codigo == codigo);
      if (index == -1) {
        lista.push(obj);
      }
      else {
        lista[index] = obj;
      }

      let objString = JSON.stringify(lista);
      await AsyncStorage.setItem(chaveStorage, objString);
      Alert.alert("Salvo com sucesso!!!");
      Keyboard.dismiss();

      await carregaDados();
    } catch (e) {
      Alert.alert(e.toString());
    }
  }

  
  function validaCampos() {
    if (codigo.length == 0 || codigo <= 0) {
      Alert.alert("Código deve ser maior que zero.");
      return false;
    }

    if (nome.length == 0) {
      Alert.alert("Informe o nome.");
      return false;
    }

    if (!Validacao.validateEmail(email)) {
      Alert.alert("Informe um e-mail válido!");
      return false;
    }

    //var regex = /^(?=(?:.*?[A-Z]){1})(?=(?:.*?[0-9]){1})/;
   if (!Validacao.validaSenha(senha))
   {
     Alert.alert("Senha não atende os requisitos mínimos");
     return false;
   }

  

    if (senha !== confirmaSenha) {
      Alert.alert("Senha está diferente da confirmação de senha");
      return false;
    }

    return true;
  }

 
  async function carregaDados() {
    try {
      let objString = await AsyncStorage.getItem(chaveStorage);

      if (objString != null) {
        let obj = JSON.parse(objString);
        setLista(obj);
      } else {
        setLista([]);
      }
    } catch (e) {
      Alert.alert(e.toString());
    }
  }

  function limparCampos() {
    setCodigo("");
    setNome("");
    setEmail("");
    setSenha("");
    setConfirmaSenha("");
  }

  function removerRegistro(identificador) {
    Alert.alert("Atenção", "Confirma a remoção do registro?", [
      {
        text: "Sim",
        onPress: () => efetivaRemoverRegistro(identificador),
      },
      {
        text: "Não",
        style: "cancel",
      },
    ]);
  }

  async function efetivaRemoverRegistro(identificador) {
    try {
      const aux = lista.filter((u) => u.codigo != identificador);
      const jsonValue = JSON.stringify(aux);
      await AsyncStorage.setItem(chaveStorage, jsonValue);
      Keyboard.dismiss();
      Alert.alert("Registro apagado com sucesso!!!");
      limparCampos();
      await carregaDados();
    } catch (e) {
      Alert.alert(e.toString());
    }
  }

  function editaRegistro(identificador) {
    const obj = lista.find((u) => u.codigo == identificador);

    if (obj) {
      setCodigo(obj.codigo);
      setNome(obj.nome);
      setEmail(obj.email);
      setSenha(obj.senha);
      setConfirmaSenha(obj.senha);
    } else {
      alert.Alert("Registro não localizado!");
    }
  }

  return (
    <View style={styles.container}>
      <Titulo />

      <View style={styles.areaCodigoENome}>
        <View style={styles.areaCodigo}>
          <Text style={styles.labelCampo}>Código</Text>
          <TextInput
            style={[styles.campoEdicao, styles.sombra]}
            keyboardType="numeric"
            onChangeText={(texto) => setCodigo(texto)}
            value={codigo}
          />
        </View>

        <View style={styles.areaNome}>
          <Text style={styles.labelCampo}>Nome</Text>
          <TextInput
            style={[styles.campoEdicao, styles.sombra]}
            onChangeText={(texto) => setNome(texto)}
            value={nome}
          />
        </View>
      </View>

      <Text style={styles.labelCampo}>E-mail</Text>
      <TextInput
        style={[styles.campoEdicao, styles.sombra]}
        keyboardType="email-address"
        onChangeText={(texto) => setEmail(texto)}
        value={email}
      />

      <View style={styles.areaSenhas}>
        <View style={styles.areaSenha}>
          <Text style={styles.labelCampo}>Senha</Text>
          <View style={styles.areaSenha}>
            <View style={styles.areaSenhaEVerSenha}>
              <TextInput
                style={[styles.campoEdicao, styles.sombra, styles.campoSenha]}
                secureTextEntry={!exibeSenha}
                onChangeText={(texto) => setSenha(texto)}
                value={senha}
              />
              <TouchableOpacity onPress={() => setExibeSenha(!exibeSenha)}>
                <Image
                  source={exibeSenha ? hidePwd : showPwd}
                  style={styles.imgExibeSenha}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.areaConfirmacaoSenha}>
          <Text style={styles.labelCampo}>Confirmação de senha</Text>
          <TextInput
            style={[styles.campoEdicao, styles.sombra]}
            secureTextEntry={!exibeSenha}
            onChangeText={(texto) => setConfirmaSenha(texto)}
            value={confirmaSenha}
          />
        </View>
      </View>

      <View style={styles.areaBotao}>
        <Botao textoBotao={"Salvar"} funcaobotao={salvaDados} />
        <Botao textoBotao={"Limpar"} funcaobotao={limparCampos} />        
      </View>

      <ScrollView style={[styles.listaUsuarios]}>
        {
          lista.map((usuario, index) => (
             <CardUsuario usuario={usuario} editaRegistro={editaRegistro}
                          removerRegistro={removerRegistro} 
                          key={index.toString()} />
        ))}
      </ScrollView>

      <StatusBar style="auto" />
    </View>
  );
}
