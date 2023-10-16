import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import {BASE_URL_CFV} from '../config/bdCFV';

function CadastroVendas() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL_CFV}/vendas`;

  const [id, setId] = useState('');
  const [nomeCliente, setNomeCliente] = useState('');
  const [data, setData] = useState('');
  const [listaProdutos, setListaProdutos] = useState('');
  const [cupomDesconto, setCupomDesconto] = useState('');
  const [valorFinal, setValorFinal] = useState('');
  const [formaPagamento, setFormaPagamento] = useState('');
  

  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setNomeCliente('');
      setData('');
      setListaProdutos('');
      setCupomDesconto('');
      setValorFinal('');
      setFormaPagamento('');
      
    } else {
      setId(dados.id);
      setNomeCliente(dados.nomeCliente);
      setData(dados.data);
      setListaProdutos(dados.listaProdutos);
      setCupomDesconto(dados.cupomDesconto);
      setValorFinal(dados.valorFinal);
      setFormaPagamento(dados.formaPagamento);
      
      
    }
  }

  async function salvar() {
    let data = { id,nomeCliente,data,listaProdutos,cupomDesconto,valorFinal,formaPagamento }
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
    await axios.get(`${baseURL}/${idParam}`).then((response) => {
      setDados(response.data);
    });
    setId(dados.id);
    setNomeCliente(dados.nomeCliente);
    setData(dados.data);
    setListaProdutos(dados.listaProdutos);
    setCupomDesconto(dados.cupomDesconto);
    setValorFinal(dados.valorFinal);
    setFormaPagamento(dados.formaPagamento);
  }
  const [dadosVendas, setDadosVendas] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL_CFV}/vendas`).then((response) => {
      setDadosVendas(response.data);
    });
  }, []);

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;
  if (!dadosVendas) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Vendas'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Nome do cliente: *' htmlFor='inputNomeCliente'>
                <input
                  type='text'
                  id='inputNomeCliente'
                  value={nomeCliente}
                  className='form-control'
                  name='nomeCliente'
                  onChange={(e) => setNomeCliente(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Data: *' htmlFor='inputData'>
                <input
                  type='text'
                  maxLength='18'
                  id='inputData'
                  value={data}
                  className='form-control'
                  name='data'
                  onChange={(e) => setData(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Lista Produtos: *' htmlFor='inputListaProdutos'>
                <input
                  type='text'
                  id='inputListaProdutos'
                  value={listaProdutos}
                  className='form-control'
                  name='listaProdutos'
                  onChange={(e) => setListaProdutos(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Cupom De Desconto:' htmlFor='inputCupomDesconto'>
                <input
                  type='text'
                  id='inputCupomDesconto'
                  value={cupomDesconto}
                  className='form-control'
                  name='cupomDesconto'
                  onChange={(e) => setCupomDesconto(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Valor Final:' htmlFor='inputValorFinal'>
                <input
                  type='text'
                  id='inputValorFinal'
                  value={valorFinal}
                  className='form-control'
                  name='valorFinal'
                  onChange={(e) => setValorFinal(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Forma de Pagamento:' htmlFor='inputFormapagamento'>
                <input
                  type='text'
                  id='inputFormaPagemnto'
                  value={formaPagamento}
                  className='form-control'
                  name='formaPagamento'
                  onChange={(e) => setFormaPagamento(e.target.value)}
                />
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