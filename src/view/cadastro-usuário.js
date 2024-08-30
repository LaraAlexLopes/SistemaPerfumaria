import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Card from '../components/card';
import FormGroup from '../components/form-group';
import { mensagemSucesso, mensagemErro } from '../components/toastr';
import '../custom.css';
import axios from 'axios';
import { BASE_URL_FPP } from '../config/bdFPP';

function CadastroUsuario() {
  const { idParam } = useParams();
  const navigate = useNavigate();
  const baseURL = `${BASE_URL_FPP}/usuarios`;

  const [login, setLogin] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [admin, setAdmin] = useState(false);
  const [dados, setDados] = useState(null);

  function inicializar() {
    if (idParam == null) {
      setLogin('');
      setCpf('');
      setSenha('');
      setAdmin(false);
    } else {
      setLogin(dados.login);
      setCpf(dados.cpf);
      setSenha(dados.senha);
      setAdmin(dados.admin);
    }
  }

  async function salvar() {
    let data = { login, cpf, senha, admin };
    data = JSON.stringify(data);

    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Usuário cadastrado com sucesso!`);
          navigate(`/listagem-usuarios`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    } else {
      await axios
        .put(`${baseURL}/${idParam}`, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Usuário atualizado com sucesso!`);
          navigate(`/listagem-usuarios`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    }
  }

  async function buscar() {
    if (idParam != null) {
      await axios.get(`${baseURL}/${idParam}`).then((response) => {
        setDados(response.data);
      });
    }
  }

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [idParam]);

  useEffect(() => {
    if (dados) {
      setLogin(dados.login);
      setCpf(dados.cpf);
      setSenha(dados.senha);
      setAdmin(dados.admin);
    }
  }, [dados]);

  return (
    <div className='container'>
      <Card title='Cadastro de Usuário'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Login *' htmlFor='inputLogin'>
                <input
                  type='text'
                  id='inputLogin'
                  value={login}
                  className='form-control'
                  name='login'
                  onChange={(e) => setLogin(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='CPF *' htmlFor='inputCpf'>
                <input
                  type='text'
                  id='inputCpf'
                  value={cpf}
                  className='form-control'
                  name='cpf'
                  onChange={(e) => setCpf(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Senha *' htmlFor='inputSenha'>
                <input
                  type='password'
                  id='inputSenha'
                  value={senha}
                  className='form-control'
                  name='senha'
                  onChange={(e) => setSenha(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Admin' htmlFor='inputAdmin'>
                <input
                  type='checkbox'
                  id='inputAdmin'
                  checked={admin}
                  className='form-check-input'
                  name='admin'
                  onChange={(e) => setAdmin(e.target.checked)}
                />
              </FormGroup>
              <Stack spacing={1} padding={1} direction='row'>
                <button
                  style={{ backgroundColor: '#4AA228', color: 'white', borderColor: '#4AA228', fontWeight: '500' }}
                  onClick={salvar}
                  type='button'
                  className='btn btn-success'
                >
                  Salvar
                </button>
                <button
                  style={{ backgroundColor: 'red', color: 'white', borderColor: 'red', fontWeight: '500' }}
                  onClick={inicializar}
                  type='button'
                  className='btn btn-danger'
                >
                  Cancelar
                </button>
              </Stack>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default CadastroUsuario;
