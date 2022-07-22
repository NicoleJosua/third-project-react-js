import { useEffect, useState } from 'react';
import Header from './components/Header';
import api from './services/api';


import './App.css';
import backgroundImage from './assets/background.png';

/**
 * // Conceitos importantes:
 * // Componente
 * // Propriedade
 * // Imutabilidade
 */


export default function App(){
  const [ users, setUsers ] = useState([]);
  
  // useState retorna um array com 2 posicoes
  // 
  // 1. variavel com seu valor inicial 
  // 2. função para atualizacao deste valor 

  useEffect(() => {
    api.get('users').then(response => {
      setUsers(response.data);
    });
  }, []);

  async function addNewUser() {
    const response = await api.post('users', {
      name: `Novo Projeto ${Date.now()}`,
      email: "Rubens Guimarães"
    });

    const user = response.data;

    console.log(user);

    setUsers([...users, user]); // spread operator
	
	// Logo abaixo, dentro do return temos o exemplo do fragment <>

  }

  return (
    <>
      <img width={200} src={backgroundImage} />
      <Header name="Users">
        <ul>
          {users.map(user => <li key={user.id}>{user.name}</li>)}
        </ul>
      </Header>
      <button type="button" onClick={addNewUser}>Adicionar Projeto</button>
    </>
  );
}