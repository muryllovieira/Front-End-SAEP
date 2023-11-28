import React, { useState, useEffect } from 'react';
import Tabela from '../components/Tabela';
import Lista from '../components/Lista';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import '../styles/global.css';
import axios from 'axios';

const nomeProfessor = localStorage.getItem("nome");

// ... (importações e código anterior)

function Atividades() {
  const idTurma = localStorage.getItem("id_turma");
  console.log(idTurma);

  const [dados, setDados] = useState([]);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [nomeTurma, setNomeTurma] = useState('');

  useEffect(() => {
    console.log(idTurma);
    carregarDados(idTurma);
  }, []);

  const carregarDados = (idTurma) => {
    axios.get(`http://localhost:8080/v1/projeto-saep/atividade/turma/${idTurma}`)
      .then(response => {
        let atividades = response.data.atividades;
        setDados(atividades);
        setNomeTurma(response.data.atividades[0].nome_turma);
      })
      .catch(error => {
        console.error('Erro ao obter dados da API:', error);

        setDados([]);
        setNomeTurma('');
      });
  };

  const handleCadastrarAtividades = () => {
    if (!nome.trim() || !descricao.trim()) {
      alert('Por favor, insira nome e descrição para a atividade.');
      return;
    }

    axios.post('http://localhost:8080/v1/projeto-saep/atividade', {
      nome: nome,
      descricao: descricao,
      id_turma: idTurma
    })
      .then(response => {
        console.log('Resposta do servidor:', response.data);

        setNome('');
        setDescricao('');
        carregarDados(idTurma);
      })
      .catch(error => {
        console.error('Erro ao cadastrar atividade:', error);
      });
  };

  const handleNomeChange = (event) => {
    setNome(event.target.value);
  };

  const handleDescricaoChange = (event) => {
    setDescricao(event.target.value);
  };

  const button_nome = "Sair";

  return (
    <div>
      <Header nome_professor={nomeProfessor} button_nome={button_nome}></Header>
      <div className="container">
        <p>Nome da Turma: {nomeTurma}</p>
        <h1>Atividades</h1>

        <form onSubmit={(e) => handleSubmit(e)}>
          <div className='adicionar_atividades'>
            <div className="form-group">
              <label htmlFor="nome">Nome:</label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={nome}
                onChange={handleNomeChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="descricao">Descrição:</label>
              <input
                type="text"
                id="descricao"
                name="descricao"
                value={descricao}
                onChange={handleDescricaoChange}
                required
              />
            </div>
          </div>
        </form>

        <button type="submit" className='cadastrar_atividade' onClick={handleCadastrarAtividades}>
          Cadastrar atividade
        </button>

        {dados.length === 0 ? (
          <p>Não há atividades cadastradas para esta turma.</p>
        ) : (
          <Tabela dados={dados} />
        )}
      </div>
    </div>
  );
}

export default Atividades;
