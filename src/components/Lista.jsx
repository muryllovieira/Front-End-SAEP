import React from 'react';

const Lista = ({ dados, onVisualizar, onExcluir }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Número</th>
          <th>Nome</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {dados.map((item) => (
          <tr key={item.numero}>
            <td>{item.numero}</td>
            <td>{item.nome}</td>
            <td>
              <button onClick={() => onVisualizar(item)}>Visualizar</button>
              <button onClick={() => onExcluir(item.numero)}>Excluir</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Lista;