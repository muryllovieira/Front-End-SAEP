import React from 'react'
import '../styles/header.css'
import { useNavigate } from 'react-router-dom';

function Header({ nome_professor, button_nome, link }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Limpe os dados da sessão, por exemplo, remova o token de autenticação
    // Você pode adicionar mais lógica aqui conforme necessário
    sessionStorage.clear();

    // Redirecione para a página de login ou qualquer outra página apropriada
    navigate('/');
  };

  return (
    <div className="header">
      <h1 className='nome_professor'>Bem Vindo, Professor {nome_professor}</h1>
      <button className='sair' onClick={handleLogout}>
        <span>{button_nome}</span>
      </button>
    </div>
  );
}

export default Header;