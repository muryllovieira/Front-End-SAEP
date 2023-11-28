import React from 'react';
import '../styles/global.css'

const Tabela = ({ dados}) => {
  return (
    <table className='tabela'>
      <thead>
        <tr>
          <th>Número</th>
          <th>Nome</th>
          <th>Descrição</th>
        </tr>
        <tr className="linha-separadora"><td colSpan="3"></td></tr>
      </thead>
      <tbody>
        {dados.map((item) => (
          <React.Fragment key={item.id}>
            <tr>
              <td>{item.id}</td>
              <td>{item.nome}</td>
              <td>{item.descricao}</td>
            </tr>
            <tr className="linha-separadora"><td colSpan="3"></td></tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default Tabela;