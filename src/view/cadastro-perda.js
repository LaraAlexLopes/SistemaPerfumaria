import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import {BASE_URL_CPC} from '../config/bdCPC';
import {BASE_URL_FPP} from '../config/bdFPP';


function CadastroPerda() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL_CPC}/perdas`;

  const [id, setId] = useState('');
  const [idTipoPerda, setIdTipoPerda] = useState(0);
  const [idProduto, setIdProduto] = useState(0);
  const [codigoBarras, setCodigoBarras] = useState('');
  const [data, setData] = useState('');

  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setIdTipoPerda(0);
      setIdProduto(0);
      setCodigoBarras('');
      setData('');
    } else {
      setId(dados.id);
  
      setCodigoBarras(dados.codigoBarras);
      setData(dados.data);
      setIdProduto(dados.idProduto);
      setIdTipoPerda(dados.idTipoPerda);

    }
  }

  async function salvar() {
    let data = { id,codigoBarras,data,idProduto,idTipoPerda};
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
       setIdTipoPerda(dados.tipoPerda);
       setIdProduto(dados.produto);
       setCodigoBarras(dados.codigoBarras);
       setData(dados.data);

    }
  }

  const [dadosPerda, setDadosPerda] = React.useState(null);
  const [dadosTipoPerda, setDadosTipoPerda] = React.useState(null);
  const [dadosProduto, setDadosProduto] = React.useState(null);



  useEffect(() => {
    axios.get(`${BASE_URL_CPC}/perdas`).then((response) => {
      setDadosPerda(response.data);
    });
  }, []);
  useEffect(() => {
    axios.get(`${BASE_URL_FPP}/tipoPerdas`).then((response) => {
      setDadosTipoPerda(response.data);
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
  if (!dadosTipoPerda) return null;
  if (!dadosProduto) return null;

 

  return (
    <div className='container'>
      <Card title='Cadastro de Perdas'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
            <FormGroup label='Produto: *' htmlFor='selectProduto'>
                <select
                  className='form-select'
                  id='selectProduto'
                  name='idProduto'
                  value={idProduto}
                  onChange={(e) => setIdProduto(e.target.value)}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dados.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>
            <FormGroup label='Descrição: *' htmlFor='selectTipoPerda'>
                <select
                  className='form-select'
                  id='selectTipoPerda'
                  name='idTipoPerda'
                  value={idTipoPerda}
                  onChange={(e) => setIdTipoPerda(e.target.value)}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosTipoPerda.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.descricao}
                    </option>
                  ))}
                </select>
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
              <FormGroup label='Codigo de Barras: *' htmlFor='inputCodigoBarras'>
                <input
                  type='text'
                  id='inputCodigoBarras'
                  value={codigoBarras}
                  className='form-control'
                  name='codigoBarras'
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
