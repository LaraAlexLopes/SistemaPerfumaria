import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import {BASE_URL_C} from '../config/bdC';

function CadastroEstoque() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL_C}/estoque`;

  const [id, setId] = useState('');
  const [produto, setProduto] = useState('');
  const [codigoBarras, setCodigoBarras] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [lote, setLote] = useState('');
  const [validade, setValidade] = useState('');
  const [capacidadeMaxima, setCapacidadeMaxima] = useState('');
  const [capacidadeMinima, setCapacidadeMinima] = useState('');
  const [PontoRessuprimento, setPontoRessuprimento] = useState('');
  const [metaMensal, setMetaMensal] = useState('');
  const [dataInicial, setDataInicial] = useState('');
  const [dataFinal, setDataFinal] = useState('');
  

  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
        setId('');
        setProduto('');
        setCodigoBarras('');
        setQuantidade('');
        setLote('');
        setValidade('');
        setCapacidadeMaxima('');
        setCapacidadeMinima('');
        setPontoRessuprimento('');
        setMetaMensal('');
        setDataInicial('');
        setDataFinal('');
    } else {
        setId(dados.id);
        setProduto(dados.produto);
        setCodigoBarras(dados.codigoBarras);
        setQuantidade(dados.quantidade);
        setLote(dados.lote);
        setValidade(dados.validade);
        setCapacidadeMaxima(dados.capacidadeMaxima);
        setCapacidadeMinima(dados.capacidadeMinima);
        setPontoRessuprimento(dados.PontoRessuprimento);
        setMetaMensal(dados.metaMensal);
        setDataInicial(dados.dataInicial);
        setDataFinal(dados.dataFinal);
    }
  }

  async function salvar() {
    let data = { id, produto, codigoBarras, quantidade,lote,validade,capacidadeMaxima,capacidadeMinima,PontoRessuprimento,metaMensal,dataInicial, dataFinal};
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Produtos ${produto} cadastrado com sucesso!`);
          navigate(`/listagem-estoque`);
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
          mensagemSucesso(`Produto ${produto} alterado com sucesso!`);
          navigate(`/listagem-estoque`);
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
        setCodigoBarras(dados.codigoBarras);
        setQuantidade(dados.quantidade);
        setLote(dados.lote);
        setValidade(dados.validade);
        setCapacidadeMaxima(dados.capacidadeMaxima);
        setCapacidadeMinima(dados.capacidadeMinima);
        setPontoRessuprimento(dados.PontoRessuprimento);
        setMetaMensal(dados.metaMensal);
        setDataInicial(dados.dataInicial);
        setDataFinal(dados.dataFinal);
    }
  }

  const [dadosProduto, setDadosProduto] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL_C}/estoque`).then((response) => {
      setDadosProduto(response.data);
    });
  }, []);

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;
  if (!dadosProduto) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Produtos no Estoque'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Nome: *' htmlFor='inputNome'>
                <input
                  type='text'
                  id='inputNome'
                  value={produto}
                  className='form-control'
                  name='nome'
                  onChange={(e) => setProduto(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Codigo de Barras: *' htmlFor='inputCodigoBarras'>
                <input
                  type='text'
                  id='inputCodigoBarras'
                  value={codigoBarras}
                  className='form-control'
                  name='codigoBarras'
                  onChange={(e) => setCodigoBarras(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Quantidade : *' htmlFor='inputQuantidade'>
                <input
                  type='text'
                  id='inputQuantidade'
                  value={quantidade}
                  className='form-control'
                  name='quantidade'
                  onChange={(e) => setQuantidade(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Lote: *' htmlFor='inputLote'>
                <input
                  type='text'
                  id='inputLote'
                  value={lote}
                  className='form-control'
                  name='lote'
                  onChange={(e) => setLote(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Validade: *' htmlFor='inputValidade'>
                <input
                  type='text'
                  id='inputValidade'
                  value={validade}
                  className='form-control'
                  name='validade'
                  onChange={(e) => setValidade(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Capacidade Maxima: *' htmlFor='inputCapacidadeMaxima'>
                <input
                  type='text'
                  id='inputCapacidadeMaxima'
                  value={capacidadeMaxima}
                  className='form-control'
                  name='capacidadeMaxima'
                  onChange={(e) => setCapacidadeMaxima(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Capacidade Minima: *' htmlFor='inputCapacidadeMinima'>
                <input
                  type='text'
                  id='inputCapacidadeMinima'
                  value={capacidadeMinima}
                  className='form-control'
                  name='capacidadeMinima'
                  onChange={(e) => setCapacidadeMinima(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Ponto de Ressuprimento: *' htmlFor='inputPontoRessuprimento'>
                <input
                  type='text'
                  id='inputPontoRessuprimento'
                  value={PontoRessuprimento}
                  className='form-control'
                  name='pontoRessuprimento'
                  onChange={(e) => setPontoRessuprimento(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Meta Mensal: *' htmlFor='inputMetaMensal'>
                <input
                  type='text'
                  id='inputMetaMensal'
                  value={metaMensal}
                  className='form-control'
                  name='metaMensal'
                  onChange={(e) => setMetaMensal(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Data Inicial da Meta Mensal: *' htmlFor='inputDataInicial'>
                <input
                  type='date'
                  id='inputDataInicial'
                  value={dataInicial}
                  className='form-control'
                  name='dataInicial'
                  onChange={(e) => setDataInicial(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Data Final da Meta Mensal: *' htmlFor='inputDataFinal'>
                <input
                  type='date'
                  id='inputDataFinal'
                  value={dataFinal}
                  className='form-control'
                  name='dataFinal'
                  onChange={(e) => setDataFinal(e.target.value)}
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
export default CadastroEstoque;