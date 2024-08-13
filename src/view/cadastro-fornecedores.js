import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import {BASE_URL_FPP} from '../config/bdFPP';
import { BASE_URL_C } from '../config/bdC';

function CadastroFornecedores() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL_FPP}/fornecedores`;

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [email, setEmail] = useState('');
  const [numeroTelefone, setNumeroTelefone] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [cep, setCep] = useState('');

  const [dados, setDados] = React.useState([]);
  const [tabela, setTabela] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setNome('');
      setCnpj('');
      setEmail('');
      setNumeroTelefone('');
      setLogradouro('');
      setNumero('');
      setComplemento('');
      setBairro('');
      setCidade('');
      setEstado('');
      setCep('');
      setTabela([]);
    } else {
      setId(dados.id);
      setNome(dados.nome);
      setCnpj(dados.cnpj);
      setEmail(dados.email);
      setNumeroTelefone(dados.numeroTelefone);
      setLogradouro(dados.logradouro);
      setNumero(dados.numero);
      setComplemento(dados.complemento);
      setBairro(dados.bairro);
      setCidade(dados.cidade);
      setEstado(dados.estado);
      setCep(dados.cep);
    }
  }

  async function salvar() {
    let data = { id,  nome, cnpj, email, numeroTelefone, logradouro, cep,numero, complemento, bairro, cidade, estado };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Fornecedor ${nome} cadastrado com sucesso!`);
          navigate(`/listagem-fornecedores`);
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
          mensagemSucesso(`Fornecedor ${nome} alterado com sucesso!`);
          navigate(`/listagem-fornecedores`);
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
        setCnpj(dados.cnpj);
        setEmail(dados.email);
        setNumeroTelefone(dados.numeroTelefone);
        setLogradouro(dados.logradouro);
        setNumero(dados.numero);
        setComplemento(dados.complemento);
        setBairro(dados.bairro);
        setCidade(dados.cidade);
        setEstado(dados.estado);
        setCep(dados.cep);
   }
  }

  const [dadosFornecedores, setDadosFornecedores] = React.useState(null);
  

  useEffect(() => {
    axios.get(`${BASE_URL_FPP}/fornecedores`).then((response) => {
      setDadosFornecedores(response.data);
    });
  }, []);

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);
  const InteractiveTable = () => {
    const addRow = () => {
      const newRow = {
        id: tabela.length + 1,
        produto: "null",
      };
  
      setTabela([...tabela, newRow]);
    };
  
    const removeRow = (id) => {
  
      const updatedTabela = tabela.filter(row => row.id !== id);
      setTabela(updatedTabela);
    };
  
    const handleChange = (id, column, value) => {
      const updatedRows = tabela.map((row) =>
        row.id === id ? {...row, [column]: value } : row
      );
      setTabela(updatedRows);
    };
  
    if (!tabela) return null;
    return (
      <div>
        <table className="table table-hover">
          <thead>
            <tr className="table-dark">
              <th scope="col">Produtos</th>
            </tr>
          </thead>
          <tbody>
            {tabela.map(row => (
              <tr key={row.id} className="table-light">
                <td>
              
                </td>
                <td>
                  <IconButton
                    aria-label='delete'
                    onClick={() => removeRow(row.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
          <IconButton
            aria-label='add'
            onClick={() => addRow()}
          >
            <AddBoxIcon />
          </IconButton>
      </div>
    );
  };
  if (!dados) return null;
  if (!dadosFornecedores) return null;
 

  return (
    <div className='container'>
      <Card title='Cadastro de Fornecedores'>
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
              <FormGroup label='CNPJ: *' htmlFor='inputCnpj'>
                <input
                  type='text'
                  maxLength='18'
                  id='inputCnpj'
                  value={cnpj}
                  className='form-control'
                  name='cnpj'
                  onChange={(e) => setCnpj(e.target.value)}
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
              <FormGroup label='Número de Telefone: *' htmlFor='inputNumeroTelefone'>
                <input
                  type='text'
                  id='inputNumeroTelefone'
                  value={numeroTelefone}
                  className='form-control'
                  name='numeroTelefone'
                  onChange={(e) => setNumeroTelefone(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Logradouro: ' htmlFor='inputLogradouro'>
                <input
                  type='text'
                  id='inputLogradouro'
                  value={logradouro}
                  className='form-control'
                  name='logradouro'
                  onChange={(e) => setLogradouro(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Número: ' htmlFor='inputNumero'>
                <input
                  type='text'
                  id='inputNumero'
                  value={numero}
                  className='form-control'
                  name='numero'
                  onChange={(e) => setNumero(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Complemento: ' htmlFor='inputComplemento'>
                <input
                  type='text'
                  id='inputComplemento'
                  value={complemento}
                  className='form-control'
                  name='complemento'
                  onChange={(e) => setComplemento(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Bairro: ' htmlFor='inputBairro'>
                <input
                  type='text'
                  id='inputBairro'
                  value={bairro}
                  className='form-control'
                  name='bairro'
                  onChange={(e) => setBairro(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Cidade: ' htmlFor='inputCidade'>
                <input
                  type='text'
                  id='inputCidade'
                  value={cidade}
                  className='form-control'
                  name='cidade'
                  onChange={(e) => setCidade(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Estado: ' htmlFor='inputEstado'>
              <input
                id='inputEstado'
                value={estado}
                className='form-control'
                  name='estado'
                  onChange={(e) => setEstado(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='CEP: ' htmlFor='inputCep'>
                <input
                type='text'
                  id='inputCep'
                  value={cep}
                  className='form-control'
                  name='cep'
                  onChange={(e) => setCep(e.target.value)}
                />
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
export default CadastroFornecedores;
