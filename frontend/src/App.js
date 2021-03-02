import React from 'react';

import './global.css';

import Routes from './routes';

/**
 * JSX: quando o HTML eta integrado dentro do JavaScript
 * Componente: em react é uma função que retorna HTML, podemos dizer que App é um compomente.
 * Propriedade: passamos valores no compomente que podem ser mostrados no html, como o titulo.
 * Estado:é o comportamento da variavel, o estado toda vez que é alterado o componente é renderizado 
 * novamente para exibir as informações em tela.  
 * Imutabilidade: nunca podemos manipular o valor do estado de uma forma direta, precisamos sobrepor
 */
function App() {

  return (
   <Routes />
  );
}

export default App;
