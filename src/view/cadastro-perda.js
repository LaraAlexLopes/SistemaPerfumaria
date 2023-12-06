import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import {BASE_URL_CPC} from '../config/bdCPC';

function CadastroPerda() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL_CPC}/perdaProduto`;

  const [id, setId] = useState('');
  const [idPerdaProduto, setIdPerdaProduto] = useState(0);
  const [codigoBarras, setCodigoDeBarras] = useState('');
  const [dataPerda, setData] = useState('');

  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setIdPerdaProduto(0);
      setCodigoDeBarras('');
      setData('');
    } else {
      setId(dados.id);
  
      setCodigoDeBarras(dados.codigoBarras);
      setData(dados.dataPerda);
    }
  }

  async function salvar() {
    let data = { id,codigoBarras,dataPerda};
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Perda cadastrado com sucesso!`);
          navigate(`/listagem-perdas`);
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
          mensagemSucesso(`Perda alterado com sucesso!`);
          navigate(`/listagem-perdas`);
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
       setIdPerdaProduto(dados.perdaProduto);
       setCodigoDeBarras(dados.codigoBarras);
       setData(dados.dataPerda);
    }
  }

  const [dadosPerda, setDadosPerda] = React.useState(null);
  const [dadosPerdaProduto, setDadosPerdaProduto] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL_CPC}/perdaProduto`).then((response) => {
      setDadosPerda(response.data);
    });
  }, []);
  useEffect(() => {
    axios.get(`${BASE_URL_CPC}/perdaProduto`).then((response) => {
      setDadosPerdaProduto(response.data);
    });
  }, []);

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;
  if (!dadosPerda) return null;
  if (!dadosPerdaProduto) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Perdas'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
            <FormGroup label='Descrição: *' htmlFor='selectPerdaProduto'>
                <select
                  className='form-select'
                  id='selectPerdaProduto'
                  name='idPerdaProduto'
                  value={idPerdaProduto}
                  onChange={(e) => setIdPerdaProduto(e.target.value)}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosPerdaProduto.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.descricaoPerda}
                    </option>
                  ))}
                </select>
              </FormGroup>

              <FormGroup label='Codigo de barras: *' htmlFor='inputCodigoDeBarras'>
                <select
                  className='form-select'
                  id='inputCodigoDeBarras'
                  name='codigoBarras'
                  value={codigoBarras}
                  onChange={(e) => setCodigoDeBarras(e.target.value)}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosPerdaProduto.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.codigoBarras}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <FormGroup label='Data: *' htmlFor='inputData'>
                <input
                  type='date'
                  id='inputData'
                  value={dataPerda}
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
export default CadastroPerda;
