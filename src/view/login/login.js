import React, { useState } from 'react';
import './login.css'; // Importe o arquivo CSS
import Navbar from '../../components/navbar.js';
import { useHistory } from 'react-router-dom';

function Login() {
  const [cpf, setCPF] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const allowedUsers = [
      { cpf: "111.111.111-11", senha: "1234", role: "vendedor" },
      { cpf: "222.222.222-22", senha: "1234", role: "supervisor"},
      { cpf: "333.333.333-33", senha: "1234", role: "gerente"},
    ]
    const user = allowedUsers.find(user => user.cpf === cpf && user.senha === password);
    if (user) {
      if (user.role === "vendedor") {
        // Redirecionar para a tela do usuário
        history.push('/listagem-clientes');
        alert("Bem-vindo, usuário!");
      } else if (user.role === "supervisor") {
        // Redirecionar para a tela do funcionário
        <Navbar />
        alert("Bem-vindo, funcionário!");
      }else if (user.role === "gerente") {
        // Redirecionar para a tela do funcionário
        <Navbar />
        alert("Bem-vindo, funcionário!");
      }else {
      // CPF ou senha incorretos
      alert("CPF ou senha incorretos. Tente novamente.");
    }
  }
  };

  return (
    <div className="main-login">
      <div className="right-login">
        <div className="card-login">
          <h1>Login</h1>
          <form>
            <div className="textfield">
              <label>CPF:</label>
              <input
                type="cpf"
                value={cpf}
                onChange={(e) => setCPF(e.target.value)}
              />
            </div>
            <div className="textfield">
              <label>Senha:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="button" onClick={handleLogin} className="btn-login">
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
