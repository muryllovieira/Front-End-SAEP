
import React, { useState, useEffect } from 'react';
import '../styles/header.css'
import { useNavigate } from 'react-router-dom';

function Header({ nome_professor, button_nome, link }) {
  const navigate = useNavigate();

  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleLogout = () => {
    sessionStorage.clear();

    navigate('/');
  };

  const handleCancelarExcluir = () => {
    setSelectedItemId(null);
  };
  return (
    <div className="header">
      <h1 className='nome_professor'>Bem Vindo, Professor {nome_professor}</h1>
      <button className='sair' onClick={() => setSelectedItemId(selectedItemId === 'sair' ? null : 'sair')}>
        <span>{button_nome}</span>
      </button>

      {/* Modal de confirmação */}
      {selectedItemId !== null && (
        <div className="modal">
          <p>Deseja realmente sair do sistema?</p>
          <button onClick={handleLogout}>Confirmar</button>
          <button onClick={handleCancelarExcluir}>Cancelar</button>
        </div>
      )}
    </div>
  );
}

export default Header;