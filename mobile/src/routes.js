import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator(); //aqui vamos cadastrar as nossas rotas;

import Incidents from './pages/Incidents';
import Detail from './pages/Detail';

export default function Routes() {
  return (
    // o Navigation sempre vai por volta de todas as rotas;
    // o AppStack é como se estivessimos declatando as rotas;
    // e no Scream chamamos as rotas importadas acima.
    // screenOptions={{ headerShown: false }}: remove cabeçalho criado automaticamente.
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{ headerShown: false }}>
        <AppStack.Screen name="Incidents" component={Incidents} />
        <AppStack.Screen name="Detail" component={Detail} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}