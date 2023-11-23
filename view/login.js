// Login.js
import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleLogin = () => {
    const { username, password } = this.state;
    // Aqui você pode adicionar a lógica para verificar o nome de usuário e senha
    // Por enquanto, apenas um exemplo simples
    if (username === 'seuUsuario' && password === 'suaSenha') {
      // Login bem-sucedido, você pode redirecionar para a próxima página
      this.props.history.push('/listagem-cliente');
    } else {
      // Tratamento de erro ou exibição de mensagem de erro
      alert('Login falhou. Verifique seu nome de usuário e senha.');
    }
  }

  render() {
    return (
      <div>
        <h2>Login</h2>
        <input
          type="text"
          name="username"
          placeholder="Nome de usuário"
          value={this.state.username}
          onChange={this.handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={this.state.password}
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleLogin}>Entrar</button>
      </div>
    );
  }
}

export default Login;
