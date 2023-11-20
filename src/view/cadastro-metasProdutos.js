import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import {BASE_URL_M} from '../config/bdM';
import {BASE_URL_FPP} from '../config/bdFPP';

function CadastroMetasProdutos() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL_M}/metaVendasProdutos`;

  const [id, setId] = useState('');
  const [produto, setProduto] = useState(0);
  const [valorMetaMensal, setValorMetaMensal] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFinal, setDataFinal] = useState('');
  

  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
        setId('');
        setProduto(0);
        setValorMetaMensal('');
        setDataInicio('');
        setDataFinal('');
        
    } else {
        setId(dados.id);
        setValorMetaMensal(dados.valorMetaMensal);
        setProduto(dados.produto);
        setDataInicio(dados.dataInicio);
        setDataFinal(dados.dataFinal);
    }
  }

  async function salvar() {
    let data = { id, produto, valorMetaMensal, dataInicio, dataFinal};
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Meta cadastrada com sucesso!`);
          navigate(`/listagem-metasProdutos`);
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
          mensagemSucesso(`Meta alterada com sucesso!`);
          navigate(`/listagem-metasProdutos`);
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
      setValorMetaMensal(dados.valorMetaMensal);
      setDataInicio(dados.dataInicio);
      setDataFinal(dados.dataFinal);
    }
  }

  const [dadosProduto, setDadosProduto] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL_FPP}/produto`).then((response) => {
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
      <Card title='Cadastro de Metas'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              
              <FormGroup label='Produto: *' htmlFor='inputProduto'>
                <select
                id='inputProduto'
                value={produto}
                className='form-select'
                name='produto'
                onChange={(e) => setProduto(e.target.value)}
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
              <FormGroup label='Valor Da Meta: *' htmlFor='inputValorMetaMensal'>
                            <input
                            type='text'
                            id='inputValorMetaMensal'
                            value={valorMetaMensal}
                            className='form-control'
                            name='valorMetaMensal'
                            onChange={(e) => setValorMetaMensal(e.target.value)}
                            />
                            </FormGroup>
                            <FormGroup label='Data de Inicio da Meta: *' htmlFor='inputDataInicio'>
                            <input
                            type='date'
                            id='inputDataInicio'
                            value={dataInicio}
                            className='form-control'
                            name='dataInicio'
                            onChange={(e) => setDataInicio(e.target.value)}
                            />
                            </FormGroup>
                            <FormGroup label='Data Final da Meta *' htmlFor='inputDataFinal'>
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
export default CadastroMetasProdutos;