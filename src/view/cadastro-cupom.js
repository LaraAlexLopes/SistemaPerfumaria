import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import {BASE_URL_CPC} from '../config/bdCPC';

function CadastroCupom() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL_CPC}/cupons`;

  const [id, setId] = useState('');
  const [desconto, setDesconto] = useState('');
  const [dataExpiracao, setDataExpiracao] = useState('');
  const [codigo, setCodigo] = useState('');

  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setDesconto('');
      setDataExpiracao('');
      setCodigo('');
    } else {
      setId(dados.id);
      setDesconto(dados.desconto);
      setDataExpiracao(dados.dataExpiracao)
      setCodigo(dados.codigo)
    }
  }

  async function salvar() {
    let data = { id, desconto,dataExpiracao,codigo};
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Cupom ${desconto} cadastrado com sucesso!`);
          navigate(`/listagem-cupons`);
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
          mensagemSucesso(`Cupom ${desconto} alterado com sucesso!`);
          navigate(`/listagem-cupons`);
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
        setDesconto(dados.desconto);
        setDataExpiracao(dados.dataExpiracao);
        setCodigo(dados.codigo);
    }
  }

  const [dadosCupom, setDadosCupom] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL_CPC}/cupomDesconto`).then((response) => {
      setDadosCupom(response.data);
    });
  }, []);

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;
  if (!dadosCupom) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Cupom'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
            <FormGroup label='Código: *' htmlFor='inputCodigo'>
                <select
                  className='form-select'
                  id='inputCodigo'
                  name='codigo'
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosCupom.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.codigo}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <FormGroup label='Desconto: *' htmlFor='inputDesconto'>
                <input
                  type='text'
                  id='inputDesconto'
                  value={desconto}
                  className='form-control'
                  name='desconto'
                  onChange={(e) => setDesconto(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Data de Expiração: *' htmlFor='inputDataExpiracao'>
                <input
                  type='text'
                  id='inputDataExpiracao'
                  value={dataExpiracao}
                  className='form-control'
                  name='dataExpiracao'
                  onChange={(e) => setDataExpiracao(e.target.value)}
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
export default CadastroCupom;
