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
import {BASE_URL_CFV} from '../config/bdCFV';
import { BASE_URL_CPC } from '../config/bdCPC'; 
import { BASE_URL_FPP} from '../config/bdFPP'; 
import { BASE_URL_FT} from '../config/bdFT'; 


function CadastroVendas() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL_CFV}/vendas`;
  

  const [id, setId] = useState('');
  const [idCliente, setIdCliente] = useState(0);
  const [idFuncionario, setIdFuncionario] = useState(0);
  const [data, setData] = useState('');
  const [idCupom, setIdCupom] = useState(0);
  const [valor_total, setValor_total] = useState('');
  const [formaPagamento, setFormaPagamento] = useState('');
  

  const [dados, setDados] = React.useState([]);
  const [tabela, setTabela] = useState([]);


  function inicializar() {
    if (idParam == null) {
      setId('');
      setIdCliente(0);
      setIdFuncionario(0);
      setData('');
      setIdCupom(0);
      setValor_total('');
      setFormaPagamento('');
      setTabela([]);
      
    } else {
      setId(dados.id);
      setData(dados.data);
      setValor_total(dados.valor_total);
      setFormaPagamento(dados.formaPagamento);
    }
  }

  async function salvar() {
    let data = { id,idCliente,idFuncionario,data,idCupom,valor_total,formaPagamento }
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Venda  cadastrada com sucesso!`);
          navigate(`/listagem-vendas`);
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
          mensagemSucesso(`Venda  alterada com sucesso!`);
          navigate(`/listagem-vendas`);
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
      setIdCliente(dados.cliente);
      setIdFuncionario(dados.funcionario);
      setData(dados.data);
      setIdCupom(dados.cupom);
      setValor_total(dados.valor_total);
      setFormaPagamento(dados.formaPagamento);
      //setTabela(dados.produto)
    }
  }
  const [dadosClientes, setDadosClientes] = React.useState(null);
  const [dadosFuncionarios, setDadosFuncionarios] = React.useState(null);
  const [dadosCupons, setDadosCupons] = React.useState(null);


  useEffect(() => {
    axios.get(`${BASE_URL_CFV}/clientes`).then((response) => {
      setDadosClientes(response.data);
    });
  }, []);
  useEffect(() => {
    axios.get(`${BASE_URL_CFV}/funcionarios`).then((response) => {
      setDadosFuncionarios(response.data);
    });
  }, []);
 
  useEffect(() => {
    axios.get(`${BASE_URL_CPC}/cupons`).then((response) => {
      setDadosCupons(response.data);
    });
  }, []);
  
  
  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;
  if (!dadosClientes) return null;
  if (!dadosFuncionarios) return null;
  if (!dadosCupons) return null;


  return (
    <div className='container'>
      <Card title='Cadastro de Vendas'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Nome do Cliente:  *' htmlFor='selectCliente'>
                <select
                  className='form-select'
                  id='selectCliente'
                  name='idCliente'
                  value={idCliente}
                  onChange={(e) => setIdCliente(e.target.value)}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosClientes.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <FormGroup label='Nome do Funcionário:  *' htmlFor='selectFuncionario'>
                <select
                  className='form-select'
                  id='selectFuncionario'
                  name='idFuncionario'
                  value={idFuncionario}
                  onChange={(e) => setIdFuncionario(e.target.value)}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosFuncionarios.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>
           
              <FormGroup label='Cupom De Desconto:' htmlFor='inputCupom'>
                <select
                id='inputCupom'
                value={idCupom}
                className='form-select'
                name='idCupom'
                onChange={(e) => setIdCupom(e.target.value)}
                >
                  <option key='0' value='0'>
                      {' '}
                    </option>
                    {dadosCupons.map((dado) => (
                      <option key={dado.id} value={dado.id}>
                        {dado.desconto}
                      </option>
                    ))}
                </select>
              </FormGroup>
              <FormGroup label='Valor Total: *' htmlFor='inputValor_total'>
                <input
                  type='text'
                  id='inputValor_total'
                  value={valor_total}
                  className='form-control'
                  name='valor_total'
                  onChange={(e) => setValor_total(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Forma de Pagamento: *' htmlFor='inputFormaPagamento'>
              <input
                  type='text'
                  id='inputFormaPagamento'
                  value={formaPagamento}
                  className='form-control'
                  name='formaPagamento'
                  onChange={(e) => setFormaPagamento(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Data da Venda: *' htmlFor='inputData'>
                <input
                  type='text'
                  id='inputData'
                  value={data}
                  className='form-control'
                  name='data'
                  onChange={(e) => setData(e.target.value)}
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
export default CadastroVendas;
