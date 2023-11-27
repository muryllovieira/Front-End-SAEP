import React from 'react'
import '../styles/header.css'

function Header({
    nome, button_nome, link
}) {
    return (
        <div className="header">
            <h1 className='nome_professor'>{nome}</h1>
            <a href= {link} className='sair'>
                <span>{button_nome}</span>
            </a>
        </div>
    )
}

export default Header