import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import {BASE_URL_FPP} from '../config/bdFPP';

function CadastroPedido() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL_FPP}/pedido`;

  const [id, setId] = useState('');
  const [produto, setProduto] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [valor, setValor] = useState('');
  const [dataEntrega, setDataEntrega] = useState('');
  const [dataPedido, setDataPedido] = useState('');
  

  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
        setId('');
        setProduto('');
        setQuantidade('');
        setValor('');
        setDataEntrega('');
        setDataPedido('');
    } else {
        setId(dados.id);
        setProduto(dados.produto);
        setQuantidade(dados.quantidade);
        setValor(dados.valor);
        setDataEntrega(dados.dataEntrega);
        setDataPedido(dados.dataPedido);
    }
  }

  async function salvar() {
    let data = { id, produto, quantidade, dataPedido, valor, dataEntrega};
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Pedido ${produto} cadastrado com sucesso!`);
          navigate(`/listagem-pedidos`);
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
          mensagemSucesso(`Pedido ${produto} alterado com sucesso!`);
          navigate(`/listagem-pedidos`);
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
        setProduto(dados.produto);
        setValor(dados.valor);
        setQuantidade(dados.quantidade);
        setDataEntrega(dados.dataEntrega);
        setDataPedido(dados.dataPedido);
    }
  }

  const [dadosPedido, setDadosPedido] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL_FPP}/pedido`).then((response) => {
      setDadosPedido(response.data);
    });
  }, []);

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;
  if (!dadosPedido) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Pedidos'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Produto: *' htmlFor='inputProduto'>
                <input
                  type='text'
                  id='inputProduto'
                  value={produto}
                  className='form-control'
                  name='produto'
                  onChange={(e) => setProduto(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Quantidade: *' htmlFor='inputQuantidade'>
                <input
                  type='text'
                  id='inputQuantidade'
                  value={quantidade}
                  className='form-control'
                  name='quantidade'
                  onChange={(e) => setQuantidade(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Valor : *' htmlFor='inputValor'>
                <input
                  type='text'
                  id='inputValor'
                  value={valor}
                  className='form-control'
                  name='valor'
                  onChange={(e) => setValor(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Data de Pedido: *' htmlFor='inputDataPedido'>
                <input
                  type='text'
                  id='inputDataPedido'
                  value={dataPedido}
                  className='form-control'
                  name='dataPedido'
                  onChange={(e) => setDataPedido(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Data de Entrega: *' htmlFor='inputDataEntrega'>
                <input
                  type='text'
                  id='inputDataEntrega'
                  value={dataEntrega}
                  className='form-control'
                  name='dataEntrega'
                  onChange={(e) => setDataEntrega(e.target.value)}
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
export default CadastroPedido;