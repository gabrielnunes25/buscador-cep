import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './styles.css';
import api from './services/api';
import { MdCopyright } from 'react-icons/md';

function App() {
    const [input, setInput] = useState('');
    const [cep, setCep] = useState({});

    const handleKeyUp = e => {
        if (e.code === 'Enter' || e.code === 'NumpadEnter') {
            handleSearch();
        }
    };

    async function handleSearch() {
        if (input === '' || input.length < 8) {
            alert('CEP incorreto!');
            setInput('');
            return;
        }

        try {
            const response = await api.get(`${input}/json`);
            if (!response.data.erro) {
                console.log(response.data);
                console.log('ecisite');
                setCep(response.data);
            } else {
                alert('Esse CEP não existe!');
            }
        } catch {
            alert('Erro ao buscar...');
            setCep({});
        }
        setInput('');
    }

    return (
        <div className="container">
            <h1 className="title">Buscador CEP</h1>

            <div className="containerInput">
                <input
                    type="text"
                    placeholder="Digite o seu CEP..."
                    value={input}
                    onChange={e => {
                        setInput(e.target.value);
                    }}
                    maxLength="8"
                    onKeyUp={handleKeyUp}
                />

                <button className="buttonSearch" onClick={handleSearch}>
                    <FiSearch size={25} color="#fff" />
                </button>
            </div>

            {Object.keys(cep).length > 0 && (
                <main className="main">
                    <h2>CEP: {cep.cep}</h2>

                    <span>{cep.logradouro}</span>
                    <span>Complemento: {cep.complemento}</span>
                    <span> {cep.bairro}</span>
                    <span>
                        {cep.localidade} - {cep.uf}
                    </span>
                </main>
            )}
            <footer>
                <MdCopyright color="#fff" /> Direitos Reservados a
                <a
                    href="https://github.com/gabrielnunes25"
                    target="_blank"
                    rel="noreferrer"
                >
                    Gabriel Nunes
                </a>
            </footer>
        </div>
    );
}

export default App;
