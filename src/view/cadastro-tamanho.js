import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import {BASE_URL_FT} from '../config/bdFT';

function CadastroTamanho() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL_FT}/tamanho`;

  const [id, setId] = useState('');
  const [volume, setVolume] = useState('');

  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setVolume('');
    } else {
      setId(dados.id);
      setVolume(dados.volume);
    }
  }

  async function salvar() {
    let data = { id, volume};
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Tamanho ${volume} cadastrado com sucesso!`);
          navigate(`/listagem-tamanhos`);
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
          mensagemSucesso(`Tamanho ${volume} alterado com sucesso!`);
          navigate(`/listagem-tamanhos`);
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
        setVolume(dados.volume);
    }
  }

  const [dadosTamanho, setDadosVolume] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL_FT}/tamanho`).then((response) => {
      setDadosVolume(response.data);
    });
  }, []);

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;
  if (!dadosTamanho) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Tamanhos'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Volume: *' htmlFor='inputVolume'>
                <input
                  type='text'
                  id='inputVolume'
                  value={volume}
                  className='form-control'
                  name='volume'
                  onChange={(e) => setVolume(e.target.value)}
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
export default CadastroTamanho;