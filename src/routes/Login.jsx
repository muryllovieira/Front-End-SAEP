import React from 'react';
import '../styles/login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSenhaChange = (event) => {
    setSenha(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Faz uma solicitação GET para o serviço de login
      const response = await axios.get(
        `http://localhost:8080/v1/projeto-saep/professor/login?email=${email}&senha=${senha}`
      );

      const { status, professor } = response.data;

      if (status === 200) {
        // Login bem-sucedido
        console.log('Login bem-sucedido:', professor);
        let idProfessor = response.data.professor.id
        console.log(idProfessor);
        // Redirecionar para a página desejada (por exemplo, "/turmas")
        localStorage.setItem("idProfessor", idProfessor)
        navigate('/turmas');
      } else {
        // Exibe mensagem de erro
        console.error('Erro de login:', response.data.message);
      }
    } catch (error) {
      // Exibe mensagem de erro caso haja um erro na solicitação
      if (error) {
        alert('Por favor, insira um email e senha válidos.');
        return;
    }
    }
  };

  return (
    <>
      <div className="login-background">
        <div className="login-box">
          <h1>Bem-Vindo</h1>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="senha">Senha:</label>
              <input
                type="password"
                id="senha"
                name="senha"
                value={senha}
                onChange={handleSenhaChange}
                required
              />
            </div>
            <button type="submit">Entrar</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;