import React, { useState, useEffect } from 'react';
import Lista from '../components/Lista';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import axios from 'axios';  // Importe o axios
import '../styles/turmas.css';

const idProfessor = sessionStorage.getItem("idProfessor")
const Turmas = () => {
    const [dados, setDados] = useState([]);
    const [nomeProfessor, setNomeProfessor] = useState('');
    const [text, setText] = useState('')
    const [selectedItemId, setSelectedItemId] = useState(null);

    useEffect(() => {
        carregarDados(idProfessor);
    }, []);

    const carregarDados = (idProfessor) => {
        // Realiza uma solicitação de GET para trazer todas as turmas daquele professor
        axios.get(`http://localhost:8080/v1/projeto-saep/turma/professor/${idProfessor}`)
            .then(response => {
                let turmas = response.data.turmas;
                let nomeProfessor = response.data.nome_professor;
                setDados(turmas);
                sessionStorage.setItem("nome", nomeProfessor)
                setNomeProfessor(response.data.nome_professor);
            })
            .catch(error => {
                console.error('Erro ao obter dados da API:', error);
            });
    };

    const handleCadastrarTurma = () => {
        if (!text.trim()) {
            alert('Por favor, insira um nome para a turma.');
            return;
        }

        // Realiza a solicitação POST para cadastrar a turma
        axios.post('http://localhost:8080/v1/projeto-saep/turma', {
            nome: text,
            id_professor: idProfessor
        })
            .then(response => {
                console.log('Resposta do servidor:', response.data);

                setText('');
                carregarDados(idProfessor);
            })
            .catch(error => {
                console.error('Erro ao cadastrar turma:', error);
            });
    };

    const handleConfirmExcluir = () => {
        // Confirma a exclusão e faz a solicitação DELETE
        axios.delete(`http://localhost:8080/v1/projeto-saep/turma/${selectedItemId}`)
            .then(response => {
                console.log('Turma excluída com sucesso:', response.data);
                carregarDados(idProfessor);
                setSelectedItemId(null);
            })
            .catch(error => {
                if (error) {
                    alert('Não pode apagar uma turma com atividade cadastrada.');
                    return;
                  }
                setSelectedItemId(null);
            });
    };

    const handleCancelarExcluir = () => {
        // Cancela a exclusão, limpa o item selecionado
        setSelectedItemId(null);
    };

    const navigate = useNavigate();

    const handleVisualizar = (item) => {
        sessionStorage.setItem("id_turma", item.id)
        console.log(item.id);
        console.log('Visualizar:', item);
        
        navigate('/atividades');
    };

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    const handleExcluir = (id) => {
        setSelectedItemId(id);
    };

    const button_nome = "Sair";

    return (
        <div>
            <Header nome_professor={nomeProfessor} button_nome={button_nome}></Header>
            <div className="container">
                <h1>Turmas</h1>
                <div className='adicionar_turma'>
                    <label htmlFor="text">Adicionar Turma :</label>
                    <span style={{ marginLeft: '10px' }}></span>
                    <input
                        type="text"
                        id="text"
                        name="text"
                        value={text}
                        onChange={handleTextChange}
                        required
                    />
                    <span style={{ marginLeft: '20px' }}></span>
                    <button type="submit" className='cadastrar_atividade' onClick={handleCadastrarTurma}>
                        Cadastrar turma
                    </button>
                </div>
            </div>
            <Lista dados={dados} onVisualizar={handleVisualizar} onExcluir={handleExcluir} />
            {/* Modal de confirmação */}
            {selectedItemId !== null && (
                <div className="modal">
                    <p>Deseja realmente excluir esta turma?</p>
                    <button onClick={handleConfirmExcluir}>Confirmar</button>
                    <button onClick={handleCancelarExcluir}>Cancelar</button>
                </div>
            )}
        </div>
    );
};

export default Turmas;
