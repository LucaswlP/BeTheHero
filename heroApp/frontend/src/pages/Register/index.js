import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Register(){
  //dados que vem do nosso formulario
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity]         = useState('');
  const [uf, setUf]             = useState('');


  const history = useHistory();
  /**
   * função responsável por fazer o cadastro do usuário
   * é disparada assim que o usuário der submit.
   */
  async function handleRegister(e){
    //previni o comportamento padrao do formulario e ele n atualiza a pagina.
    e.preventDefault();

    //dados do formulario
    const data = {
      name,
      email,
      whatsapp,
      city,
      uf,
    };

    try{
      const response = await api.post('ongs', data); //inseri os dados da tabela ongs usando a rota http://192.168.0.161:3333/ongs
      alert(`Seu ID de acesso: ${response.data.id}`);// retorna o id que é gerado randomicamente = dado de acesso
      history.push('/');// redireciona para a pagina de login
    }catch(err){
      alert('Erro no cadastro, tente novamente.')
    }
  }

  /**
   * HTML DA PAGINA DE REGISTRO.
   */
  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero"/>
          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os cados de sua ONG.</p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041"/>
            Voltar para o Logon
          </Link>
        </section>
        <form onSubmit={handleRegister}>
            <input 
              placeholder="Nome da ONG"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <input 
              type="email" 
              placeholder="E-mail"
              value={email}
              onChange={e => setEmail(e.target.value)} 
            />
            <input 
              placeholder="Whatsapp"
              value={whatsapp}
              onChange={e => setWhatsapp(e.target.value)}
            />
            <div className="input-group">
              <input 
                placeholder="Cidade"
                value={city}
                onChange={e => setCity(e.target.value)}
              />
              <input 
                placeholder="Uf" 
                style={{ width:80 }}
                value={uf}
                onChange={e => setUf(e.target.value)}/>
            </div>
            <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}