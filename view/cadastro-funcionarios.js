import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import {BASE_URL_CFV} from '../config/bdCFV';
import {BASE_URL_C} from '../config/bdC';

function CadastroFuncionarios() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL_CFV}/funcionarios`;

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [email, setEmail] = useState('');
  const [numeroTelefone, setNumeroTelefone] = useState('');
  const [idCargo, setIdCargo] = useState(0);
  const [salario, setSalario] = useState('');
  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');

  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setNome('');
      setCpf('');
      setDataNascimento('');
      setEmail('');
      setNumeroTelefone('');
      setIdCargo(0);
      setSalario('');
      setCep('');
      setLogradouro('');
      setNumero('');
      setComplemento('');
      setBairro('');
      setCidade('');
      setEstado('');
    } else {
      setId(dados.id);
      setNome(dados.nome);
      setCpf(dados.cpf);
      setDataNascimento(dados.dataNascimento);
      setEmail(dados.email);
      setEmail(dados.email);
      setNumeroTelefone(dados.numeroTelefone);
      setIdCargo(dados.idCargo);
      setSalario(dados.salario);
      setCep(dados.cep);
      setLogradouro(dados.logradouro);
      setNumero(dados.numero);
      setComplemento(dados.complemento);
      setBairro(dados.bairro);
      setCidade(dados.cidade);
      setEstado(dados.estado);
    }
  }

  async function salvar() {
    let data = { id,nome,cpf,dataNascimento,email,numeroTelefone,idCargo,salario,cep,logradouro, numero, complemento, bairro, cidade, estado };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Funcionario ${nome} cadastrado com sucesso!`);
          navigate(`/listagem-funcionarios`);
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
          mensagemSucesso(`Funcionario ${nome} alterado com sucesso!`);
          navigate(`/listagem-funcionarios`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    }
  }

  async function buscar() {
    if(idParam != null){
      await axios.get(`${baseURL}/${idParam}`).then((response) => {
        setDados(response.data);
      });
        setId(dados.id);
        setNome(dados.nome);
        setCpf(dados.cpf);
        setDataNascimento(dados.dataNascimento);
        setEmail(dados.email);
        setNumeroTelefone(dados.numeroTelefone);
        setIdCargo(dados.cargo);
        setSalario(dados.salario);
        setCep(dados.cep);
        setLogradouro(dados.logradouro);
        setNumero(dados.numero);
        setComplemento(dados.complemento);
        setBairro(dados.bairro);
        setCidade(dados.cidade);
        setEstado(dados.estado);
    }
  }

  const [dadosCargo, setDadosCargo] = React.useState(null);
  const [dadosEstado, setDadosEstado] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL_C}/cargo`).then((response) => {
      setDadosCargo(response.data);
    });
  }, []);
  useEffect(() => {
    axios.get(`${BASE_URL_C}/estado`).then((response) => {
      setDadosEstado(response.data);
    });
  }, []);

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;
  if (!dadosCargo) return null;
  if (!dadosEstado) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Funcionários'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Nome: *' htmlFor='inputNome'>
                <input
                  type='text'
                  id='inputNome'
                  value={nome}
                  className='form-control'
                  name='nome'
                  onChange={(e) => setNome(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='CPF: *' htmlFor='inputCpf'>
                <input
                  type='text'
                  maxLength='18'
                  id='inputCpf'
                  value={cpf}
                  className='form-control'
                  name='cpf'
                  onChange={(e) => setCpf(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Data de Nascimento: *' htmlFor='inputDataNascimento'>
                <input
                  type='date'
                  id='inputDataNascimento'
                  value={dataNascimento}
                  className='form-control'
                  name='dataNascimento'
                  onChange={(e) => setDataNascimento(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Email: *' htmlFor='inputEmail'>
                <input
                  type='email'
                  id='inputEmail'
                  value={email}
                  className='form-control'
                  name='email'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Telefone: *' htmlFor='inputNumeroTelefone'>
                <input
                  type='text'
                  id='inputNumeroTelefone'
                  value={numeroTelefone}
                  className='form-control'
                  name='numeroTelefone'
                  onChange={(e) => setNumeroTelefone(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Cargo: *' htmlFor='selectCargo'>
                <select
                  className='form-select'
                  id='selectCargo'
                  name='idCargo'
                  value={idCargo}
                  onChange={(e) => setIdCargo(e.target.value)}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosCargo.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.cargo}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <FormGroup label='Salário: *' htmlFor='inputSalario'>
                <input
                  type='text'
                  id='inputSalario'
                  value={salario}
                  className='form-control'
                  name='salario'
                  onChange={(e) => setSalario(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Cep: *' htmlFor='inputCep'>
                <input
                  type='text'
                  id='inputCep'
                  value={cep}
                  className='form-control'
                  name='cep'
                  onChange={(e) => setCep(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Logradouro: *' htmlFor='inputLogradouro'>
                <input
                  type='text'
                  id='inputLogradouro'
                  value={logradouro}
                  className='form-control'
                  name='logradouro'
                  onChange={(e) => setLogradouro(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Número: *' htmlFor='inputNumero'>
                <input
                  type='text'
                  id='inputNumero'
                  value={numero}
                  className='form-control'
                  name='numero'
                  onChange={(e) => setNumero(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Complemento: *' htmlFor='inputComplemento'>
                <input
                  type='text'
                  id='inputComplemento'
                  value={complemento}
                  className='form-control'
                  name='complemento'
                  onChange={(e) => setComplemento(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Bairro: *' htmlFor='inputBairro'>
                <input
                  type='text'
                  id='inputBairro'
                  value={bairro}
                  className='form-control'
                  name='bairro'
                  onChange={(e) => setBairro(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Cidade: *' htmlFor='inputCidade'>
                <input
                  type='text'
                  id='inputCidade'
                  value={cidade}
                  className='form-control'
                  name='cidade'
                  onChange={(e) => setCidade(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Estado: *' htmlFor='inputEstado'>
                <select
                id='inputEstado'
                value={estado}
                className='form-select'
                name='estado'
                onChange={(e) => setEstado(e.target.value)}
                >
                  <option key='0' value='0'>
                      {' '}
                    </option>
                    {dadosEstado.map((dado) => (
                      <option key={dado.id} value={dado.id}>
                        {dado.nome}
                      </option>
                    ))}
                </select>
              </FormGroup>
              
              <Stack spacing={1} padding={1} direction='row'>
                <button style={{ backgroundColor: '#4AA228', color: 'white',borderColor : '#4AA228', fontWeight : "500" }}
                  onClick={salvar}
                  type='button'
                  className='btn btn-success'
                >
                  Salvar
                </button>
                <button style={{ backgroundColor: 'red', color: 'white',borderColor : 'red', fontWeight : "500" }}
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
export default CadastroFuncionarios;
