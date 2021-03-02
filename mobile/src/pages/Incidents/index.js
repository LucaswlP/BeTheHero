import React, { useState ,useEffect } from  'react'; //import do react
import { Feather } from '@expo/vector-icons'; //importando os icones do feather icons.
import { useNavigation }from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native'; //imports para trabalhar com os elementos da tela.
import api from '../../services/api';

import logoImg from '../../assets/logo.png'; // nosso logo

import styles from './styles'; // css

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();


  //navega para a tela de detalhes
  function navigateToDetail(incident){
    navigation.navigate('Detail', { incident });
  }

  //carrega os incidents
  async function loadIncidents(){
    //se ja carregou, n precisa carregar mais
    if (loading) {
      return;
    }

    //se ja atingiu o total, nao precisa carregar mais
    if (total > 0 && incidents.length === total) {
      return;
    }

    //carregando
    setLoading(true);

    //mando a pagina na rota
    const response = await api.get('/incidents', {
      params: {page}
    });

    //mostro os incidents
    setIncidents([...incidents, ...response.data]);

    //mostro o total
    setTotal(response.headers['x-total-count'])

    //proxima pagina
    setPage(page + 1);

    //paro de caregar
    setLoading(false);
  }


  //effect é chamado sempre que entramos na pagina
  useEffect(() => {
    loadIncidents();
  }, []);
  
  return (
    //nosso container
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg}/>
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
        </Text>
      </View>
      <Text style={styles.title}>Bem Vindo!</Text>
      <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia!</Text>

      <FlatList 
        data={incidents}
        style={styles.incidentList}
        keyExtractor={incident => String(incident.id)}
        showsVerticalScrollIndicator={false}// tira o scroll
        onEndReached={loadIncidents}// carrega loadIncidents denovo quando chegar no final da lista
        onEndReachedThreshold={0.2}// tem que estar a 20% da lista para carregar novos itens
        renderItem={({ item: incident })=> (
          <View style={styles.incident}>
          <Text style={styles.incidentProperty}>ONG:</Text>
          <Text style={styles.incidentValue}>{incident.name}</Text>

          <Text style={styles.incidentProperty}>CASO:</Text>
          <Text style={styles.incidentValue}>{incident.title}</Text>

          <Text style={styles.incidentProperty}>VALOR:</Text>
          <Text style={styles.incidentValue}>
            {Intl.NumberFormat('pt-BR', { 
              style: 'currency', 
              currency: 'BRL'
            }).format(incident.value)}
          </Text>

          <TouchableOpacity 
            style={styles.detailsButton} 
            onPress={() => navigateToDetail(incident)}>
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color="#E02041"/>
          </TouchableOpacity>
        </View>
        )}
      />

    </View> 
  );
}