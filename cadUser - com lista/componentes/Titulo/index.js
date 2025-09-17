import {
    Text,
    View,
} from "react-native";
import stylesTitulo from './styles'
import styles from "../../styles";


export default function Titulo() {
    return (
        <View style={stylesTitulo.areaTitulo}>
            <Text style={stylesTitulo.titulo}>Cadastro de Usuários</Text>
            {/* <Text style={styles.labelCampo}>TESTE</Text> */}
        </View>
    );
}