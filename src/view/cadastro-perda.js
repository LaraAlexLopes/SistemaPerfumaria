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
  const [descricao, setDescricao] = useState('');
  const [codigoDeBarras, setCodigoDeBarras] = useState('');
  const [data, setData] = useState('');

  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setDescricao('');
      setCodigoDeBarras('');
      setData('');
    } else {
      setId(dados.id);
      setDescricao(dados.descricao);
      setCodigoDeBarras(dados.codigoDeBarras);
      setData(dados.data);
    }
  }

  async function salvar() {
    let data = { id, descricao,codigoDeBarras,data};
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Perda ${descricao} cadastrado com sucesso!`);
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
          mensagemSucesso(`Perda ${descricao} alterado com sucesso!`);
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
        setDescricao(dados.descricao);
    }
  }

  const [dadosPerda, setDadosPerda] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL_CPC}/perdaProduto`).then((response) => {
      setDadosPerda(response.data);
    });
  }, []);

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;
  if (!dadosPerda) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Perdas'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Descrição: *' htmlFor='inputDescricao'>
                <input
                  type='text'
                  id='inputDescricao'
                  value={descricao}
                  className='form-control'
                  name='descricao'
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Codigo de barras: *' htmlFor='inputCodigoDeBarras'>
                <input
                  type='text'
                  id='inputCodigoDeBarras'
                  value={codigoDeBarras}
                  className='form-control'
                  name='codigoDeBarras'
                  onChange={(e) => setCodigoDeBarras(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Data: *' htmlFor='inputData'>
                <input
                  type='date'
                  id='inputData'
                  value={data}
                  className='form-control'
                  name='data'
                  onChange={(e) => setData(e.target.value)}
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
export default CadastroPerda;