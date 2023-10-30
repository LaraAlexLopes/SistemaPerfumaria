import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import {BASE_URL_CFV} from '../config/bdCFV';
import { BASE_URL_CPC } from '../config/bdCPC'; 
import { BASE_URL_FPP} from '../config/bdFPP'; 

function CadastroVendas() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL_CFV}/vendas`;

  const [id, setId] = useState('');
  const [idNomeCliente, setIdNomeCliente] = useState(0);
  const [dataVenda, setData] = useState('');
  const [listaProdutos, setListaProdutos] = useState('');
  const [cupomDesconto, setCupomDesconto] = useState('');
  const [valorFinal, setValorFinal] = useState('');
  const [formaPagamento, setFormaPagamento] = useState('');
  

  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setIdNomeCliente(0);
      setData('');
      setListaProdutos('');
      setCupomDesconto('');
      setValorFinal('');
      setFormaPagamento('');
      
    } else {
      setId(dados.id);
      setIdNomeCliente(dados.idNomeCliente);
      setData(dados.dataVenda);
      setListaProdutos(dados.listaProdutos);
      setCupomDesconto(dados.cupomDesconto);
      setValorFinal(dados.valorFinal);
      setFormaPagamento(dados.formaPagamento);
      
      
    }
  }

  async function salvar() {
    let data = { id,idNomeCliente,dataVenda,listaProdutos,cupomDesconto,valorFinal,formaPagamento }
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Venda ${listaProdutos} cadastrada com sucesso!`);
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
          mensagemSucesso(`Venda ${listaProdutos} alterada com sucesso!`);
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
      setIdNomeCliente(dados.nome);
      setData(dados.dataVenda);
      setListaProdutos(dados.listaProdutos);
      setCupomDesconto(dados.cupomDesconto);
      setValorFinal(dados.valorFinal);
      setFormaPagamento(dados.formaPagamento);
    }
  }
  const [dadosClientes, setDadosClientes] = React.useState(null);
  const [dadosCupom, setDadosCupom] = React.useState(null);
  const [dadosFormaPagamento, setDadosFormaPagamento] = React.useState(null);
  const [dadosProduto, setDadosProduto] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL_CPC}/formaPagamento`).then((response) => {
      setDadosFormaPagamento(response.data);
    });
  }, []);
  useEffect(() => {
    axios.get(`${BASE_URL_FPP}/produto`).then((response) => {
      setDadosProduto(response.data);
    });
  }, []);
  useEffect(() => {
    axios.get(`${BASE_URL_CFV}/clientes`).then((response) => {
      setDadosClientes(response.data);
    });
  }, []);
  useEffect(() => {
    axios.get(`${BASE_URL_CPC}/cupomDesconto`).then((response) => {
      setDadosCupom(response.data);
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
  if (!dadosCupom) return null;
  if (!dadosFormaPagamento) return null;
  if (!dadosProduto) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Vendas'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              
              <FormGroup label='Nome do Cliente:  *' htmlFor='selectNomeCliente'>
                <select
                  className='form-select'
                  id='selectNomeCliente'
                  name='idNomeCliente'
                  value={idNomeCliente}
                  onChange={(e) => setIdNomeCliente(e.target.value)}
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
              <FormGroup label='Data: *' htmlFor='inputData'>
                <input
                  type='date'
                  maxLength='18'
                  id='inputData'
                  value={dataVenda}
                  className='form-control'
                  name='dataVenda'
                  onChange={(e) => setData(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Produto: *' htmlFor='inputListaProdutos'>
                <select
                id='inputListaProdutos'
                value={listaProdutos}
                className='form-select'
                name='listaProdutos'
                onChange={(e) => setListaProdutos(e.target.value)}
                >
                  <option key='0' value='0'>
                      {' '}
                    </option>
                    {dadosProduto.map((dado) => (
                      <option key={dado.id} value={dado.id}>
                        {dado.produto}
                      </option>
                    ))}
                </select>
              </FormGroup>
              <FormGroup label='Cupom De Desconto:' htmlFor='inputCupomDesconto'>
                <select
                id='inputCupomDesconto'
                value={cupomDesconto}
                className='form-select'
                name='cupomDesconto'
                onChange={(e) => setCupomDesconto(e.target.value)}
                >
                  <option key='0' value='0'>
                      {' '}
                    </option>
                    {dadosCupom.map((dado) => (
                      <option key={dado.id} value={dado.id}>
                        {dado.desconto}
                      </option>
                    ))}
                </select>
              </FormGroup>
              <FormGroup label='Valor Final: *' htmlFor='inputValorFinal'>
                <input
                  type='text'
                  id='inputValorFinal'
                  value={valorFinal}
                  className='form-control'
                  name='valorFinal'
                  onChange={(e) => setValorFinal(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Forma de Pagamento: *' htmlFor='inputFormapagamento'>
                <select
                  id='inputFormaPagamento'
                  value={formaPagamento}
                  className='form-select'
                  name='formaPagamento'
                  onChange={(e) => setFormaPagamento(e.target.value)}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosFormaPagamento.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.tipo}
                    </option>
                  ))}
              </select>
              </FormGroup>
              
              <Stack spacing={1} padding={1} direction='row'>
                <button
                  onClick={salvar}
                  type='button'
                  className='btn btn-success'
                >
                  Salvar
                </button>
                <button
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