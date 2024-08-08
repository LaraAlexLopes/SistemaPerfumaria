import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import {BASE_URL_FPP} from '../config/bdFPP';

function CadastroTipoPerda(){
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL_FPP}/tipoPerdas`;

  const [id, setId] = useState('');
  const [descricao, setDescricao] = useState('');
  
  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setDescricao('');
    } else {
      setId(dados.id);
      setDescricao(dados.descricao);
    }
  }

  async function salvar() {
    let data = { id,descricao};
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Perda cadastrada com sucesso!`);
          navigate(`/listagem-tipo-perda`);
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
          mensagemSucesso(`Perda alterada com sucesso!`);
          navigate(`/listagem-tipo-perda`);
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

  }}
  const [dadosTipoPerda, setDadosTipoPerda] = React.useState(null);
  
  useEffect(() => {
    axios.get(`${BASE_URL_FPP}/tipoPerdas`).then((response) => {
      setDadosTipoPerda(response.data);
    });
  }, []);
  
  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Descrição de Perda'>
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
export default CadastroTipoPerda;
