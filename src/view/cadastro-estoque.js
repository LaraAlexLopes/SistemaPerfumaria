import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import {BASE_URL_C} from '../config/bdC';
import {BASE_URL_FPP} from '../config/bdFPP';

function CadastroEstoque() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL_C}/estoques`;

  const [id, setId] = useState('');
  const [idProduto, setIdProduto] = useState('');
  const [capacidadeMaxima, setCapacidadeMaxima] = useState('');
  const [capacidadeMinima, setCapacidadeMinima] = useState('');
  const [pontoDeRessuprimento, setPontoDeRessuprimento] = useState('');
  const [quantidade, setQuantidade] = useState('');
 
  
  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
        setId('');
        setIdProduto('');
        setPontoDeRessuprimento('');
        setCapacidadeMaxima('');
        setCapacidadeMinima('');
        setQuantidade('');
        
    } else {
        setId(dados.id);
        setIdProduto(dados.idProduto);
        setPontoDeRessuprimento(dados.pontoDeRessuprimento);
        setCapacidadeMaxima(dados.capacidadeMaxima);
        setCapacidadeMinima(dados.capacidadeMinima);
        setQuantidade(dados.quantidade);
    }
  }

  async function salvar() {
    let data = { id, idProduto,capacidadeMaxima,capacidadeMinima,pontoDeRessuprimento,quantidade};
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Produtos ${idProduto} cadastrado no estoque com sucesso!`);
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
          mensagemSucesso(`Produto ${idProduto.nome} alterado no estoque com sucesso!`);
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
        setIdProduto(dados.idProduto);
        setQuantidade(dados.quantidade);
        setPontoDeRessuprimento(dados.pontoDeRessuprimento);
        setCapacidadeMaxima(dados.capacidadeMaxima);
        setCapacidadeMinima(dados.capacidadeMinima);
    }
  }

  const [dadosProduto, setDadosProduto] = React.useState(null);
  

  useEffect(() => {
    axios.get(`${BASE_URL_C}/estoques`).then((response) => {
      setDadosProduto(response.data);
    });
  }, []);
  useEffect(() => {
    axios.get(`${BASE_URL_FPP}/produtos`).then((response) => {
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
            <FormGroup label='Produto: *' htmlFor='selectProduto'>
                <select
                id='selectProduto'
                value={idProduto}
                className='form-select'
                name='idProduto'
                onChange={(e) => setIdProduto(e.target.value)}
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
             
              <FormGroup label='Capacidade Máxima: *' htmlFor='inputCapacidadeMaxima'>
                <input
                  type='text'
                  id='inputCapacidadeMaxima'
                  value={capacidadeMaxima}
                  className='form-control'
                  name='capacidadeMaxima'
                  onChange={(e) => setCapacidadeMaxima(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Capacidade Mínima: *' htmlFor='inputCapacidadeMinima'>
                <input
                  type='text'
                  id='inputCapacidadeMinima'
                  value={capacidadeMinima}
                  className='form-control'
                  name='capacidadeMinima'
                  onChange={(e) => setCapacidadeMinima(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Ponto de Ressuprimento: *' htmlFor='inputPontoDeRessuprimento'>
                <input
                  type='text'
                  id='inputPontoDeRessuprimento'
                  value={pontoDeRessuprimento}
                  className='form-control'
                  name='pontoDeRessuprimento'
                  onChange={(e) => setPontoDeRessuprimento(e.target.value)}
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
