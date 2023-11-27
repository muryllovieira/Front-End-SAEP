import React from 'react'
import '../styles/global.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

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

    const handleSubmit = (event) => {
        // Lógica para lidar com o envio do formulário (pode ser adicionada aqui)
        event.preventDefault();
        console.log('Email:', email);
        console.log('Senha:', senha);
        navigate('/turmas')

    };

    return (
        <>
            <div className="login-screen">
                <h1>Bem-Vindo</h1>
                <div>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div>
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
                        <div>
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
    )
}

export default Login