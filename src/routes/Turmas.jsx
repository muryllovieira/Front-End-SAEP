import React, { useState } from 'react';
import Lista from '../components/Lista';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'
import '../styles/global.css'

const Turmas = () => {

    const navigate = useNavigate();

    const [dados, setDados] = useState([
        { numero: 1, nome: 'Item 1' },
        { numero: 2, nome: 'Item 2' },
        { numero: 3, nome: 'Item 3' },
        // Adicione mais dados conforme necessário
    ]);

    const handleVisualizar = (item) => {
        // Lógica para visualizar o item
        console.log('Visualizar:', item);
        navigate('/atividades')
    };

    const handleExcluir = (numero) => {
        // Lógica para excluir o item com o número específico
        setDados((prevDados) => prevDados.filter((item) => item.numero !== numero));
    };

    const nome = "Nome do Professor"
    const button_nome = "Sair"

    return (
        <div>
            <Header nome = {nome} button_nome = {button_nome}></Header>
            <button type="submit" className='cadastrar_atividade'>Cadastrar turma</button>
            <h1>Turmas</h1>
            <Lista dados={dados} onVisualizar={handleVisualizar} onExcluir={handleExcluir} />
        </div>
    );
};

export default Turmas;