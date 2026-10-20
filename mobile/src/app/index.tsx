import { useState } from 'react';
import { ActivityIndicator, Button, Text, View } from 'react-native';
import axios from 'axios';

const API_URL = 'http://10.0.0.36:3000';

export default function Index() {
  const [resultado, setResultado] = useState('Ainda não testado');
  const [carregando, setCarregando] = useState(false);

  async function testarConexao() {
    setCarregando(true);
    try {
      const resposta = await axios.get(`${API_URL}/health`, { timeout: 5000 });
      setResultado(`Conectado: ${resposta.data.status}`);
    } catch (erro) {
      setResultado('Falha ao conectar com o back-end');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: '700' }}>ELA</Text>
      <Button title="Testar conexão" onPress={testarConexao} />
      {carregando ? <ActivityIndicator /> : <Text>{resultado}</Text>}
    </View>
  );
}