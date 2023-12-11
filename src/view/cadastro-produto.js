import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import {BASE_URL_FPP} from '../config/bdFPP';
import { BASE_URL_FT } from '../config/bdFT';

function CadastroProduto() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL_FPP}/produto`;

  const [id, setId] = useState('');
  const [produto, setProduto] = useState('');
  const [codigoBarras, setCodigoBarras] = useState('');
  const [classificacao, setClassificacao] = useState('');
  const [tamanho, setTamanho] = useState('');
  const [fragrancia, setFragrancia] = useState('');
  

  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
        setId('');
        setProduto('');
        setCodigoBarras('');
        setClassificacao('');
        setTamanho('');
        setFragrancia('');
       
    } else{
        setId(dados.id);
        setProduto(dados.produto);
        setCodigoBarras(dados.codigoBarras);
        setClassificacao(dados.classificacao);
        setTamanho(dados.tamanho);
        setFragrancia(dados.fragrancia);     
    }
  }

  async function salvar() {
    let data = { id, produto, codigoBarras, classificacao,tamanho,fragrancia};
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`$ Produto {produto} cadastrado com sucesso!`);
          navigate(`/listagem-produtos`);
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
         navigate(`/listagem-produtos`);
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
        setClassificacao(dados.classificacao);
        setTamanho(dados.tamanho);
        setFragrancia(dados.fragrancia);
        
    }
  }
  const [dadosProduto, setDadosProduto] = React.useState(null);
  const [dadosFragrancia, setDadosFragancia] = React.useState(null);
  const [dadosTamanho, setDadosTamanho] = React.useState(null);
  const [dadosClassificacao, setDadosClassificacao] = React.useState(null);
  

  useEffect(() => {
    axios.get(`${BASE_URL_FPP}/produto`).then((response) => {
      setDadosProduto(response.data);
    });
  }, []);
  useEffect(() => {
    axios.get(`${BASE_URL_FT}/fragrancia`).then((response) => {
      setDadosFragancia(response.data);
    });
  }, []);
  useEffect(() => {
    axios.get(`${BASE_URL_FT}/tamanho`).then((response) => {
      setDadosTamanho(response.data);
    });
  }, []);
  useEffect(() => {
    axios.get(`${BASE_URL_FT}/classificacao`).then((response) => {
      setDadosClassificacao(response.data);
    });
  }, []);

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;
  if (!dadosProduto) return null;
  if (!dadosClassificacao) return null;
  if (!dadosFragrancia) return null;
  if (!dadosTamanho) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Produtos'>
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
              <FormGroup label='Código de Barras: *' htmlFor='inputCodigoBarras'>
                <input
                  type='text'
                  id='inputCodigoBarras'
                  value={codigoBarras}
                  className='form-control'
                  name='codigoBarras'
                  onChange={(e) => setCodigoBarras(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Classificação : *' htmlFor='inputClassificao'>
                <select
                id='inputClassificao'
                value={classificacao}
                className='form-select'
                name='classificacao'
                onChange={(e) => setClassificacao(e.target.value)}
                >
                  <option key='0' value='0'>
                      {' '}
                    </option>
                    {dadosClassificacao.map((dado) => (
                      <option key={dado.id} value={dado.id}>
                        {dado.classificacao}
                      </option>
                    ))}
                </select>
              </FormGroup>
              <FormGroup label='Fragrância: *' htmlFor='inputFragrancia'>
                <select
                id='inputFragrancia'
                value={fragrancia}
                className='form-select'
                name='fragrancia'
                onChange={(e) => setFragrancia(e.target.value)}
                >
                  <option key='0' value='0'>
                      {' '}
                    </option>
                    {dadosFragrancia.map((dado) => (
                      <option key={dado.id} value={dado.id}>
                        {dado.descricao}
                      </option>
                    ))}
                </select>
              </FormGroup>
              <FormGroup label='Tamanho: *' htmlFor='inputTamanho'>
                <select
                id='inputTamanho'
                value={tamanho}
                className='form-select'
                name='tamanho'
                onChange={(e) => setTamanho(e.target.value)}
                >
                  <option key='0' value='0'>
                      {' '}
                    </option>
                    {dadosTamanho.map((dado) => (
                      <option key={dado.id} value={dado.id}>
                        {dado.volume}
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
export default CadastroProduto;
