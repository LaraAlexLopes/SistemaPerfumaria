import React, { useState } from 'react';
import { useAuth } from './authContext';
import { useNavigate } from 'react-router-dom';
import 'bootswatch/dist/minty/bootstrap.css';
import Stack from '@mui/material/Stack';
import Card from '../components/card';
import FormGroup from '../components/form-group';
import { mensagemSucesso, mensagemErro } from '../components/toastr';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '70vh',
  },
  cardContainer: {
    width: '100%',
    maxWidth: '400px',
  },
};

function Login() {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const { login: loginUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    // Verifica se as credenciais são válidas
    const success = loginUser(login, senha);

    if (success) {
      mensagemSucesso(`Usuário ${login} logado com sucesso!`);
      navigate('/index'); // Redireciona para uma página existente após login
    } else {
      mensagemErro('Credenciais inválidas. Tente novamente.');
    }
  };

  const handleCancel = () => {
    setLogin('');
    setSenha('');
  };

  return (
    <div style={styles.container}>
      <div style={styles.cardContainer}>
        <Card title='Acesso'>
          <div className='row'>
            <div className='bs-component'>
              <FormGroup label='Login: *' htmlFor='inputLogin'>
                <input
                  type='text'
                  id='inputLogin'
                  value={login}
                  className='form-control'
                  name='login'
                  onChange={(e) => setLogin(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Senha: *' htmlFor='inputSenha'>
                <input
                  type='password'
                  id='inputSenha'
                  value={senha}
                  className='form-control'
                  name='senha'
                  onChange={(e) => setSenha(e.target.value)}
                />
              </FormGroup>
              <Stack spacing={1} padding={1} direction='row'>
                <button
                  onClick={handleLogin}
                  type='button'
                  className='btn btn-success'
                >
                  Entrar
                </button>
                <button
                  onClick={handleCancel}
                  type='button'
                  className='btn btn-danger'
                >
                  Cancelar
                </button>
              </Stack>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Login;
