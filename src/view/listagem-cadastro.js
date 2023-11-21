import React from 'react';
import Card from '../components/card';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import axios from 'axios';
import {BASE_URL_C} from '../config/bdC';

const baseURL = `${BASE_URL_C}/estoque`;

function ListagemCadastro() {
  const navigate = useNavigate();

  const cadastrar = () => {
    navigate(`/cadastro-estoque`);
  };
  
  const verPerdas = () => {
    navigate(`/listagem-perdas`);
  };
  const verFragancia = () => {
    navigate(`/listagem-fragancias`);
  };
  const verTamanho = () => {
    navigate(`/listagem-tamanhos`);
  };
  const verClassificacao = () => {
    navigate(`/listagem-classificacoes`);
  };

  const [dados, setDados] = React.useState(null);

  async function excluir(id) {
    let data = JSON.stringify({ id });
    let url = `${baseURL}/${id}`;
    console.log(url);
    await axios
      .delete(url, data, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(function (response) {
        mensagemSucesso(`Produto excluído com sucesso!`);
        setDados(
          dados.filter((dado) => {
            return dado.id !== id;
          })
        );
      })
      .catch(function (error) {
        mensagemErro(`Erro ao excluir o produto`);
      });
  }

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setDados(response.data);
    });
  }, []);

  if (!dados) return null;

  return (
    <div className='container'>
      <Card title='Cadastros'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button style={{ backgroundColor: 'black', color: 'white',borderColor : 'black', fontWeight : "500" }}
                type='button'
                className='btn btn-warning'
                onClick={() => verClassificacao()}
              >
                Classificações
              </button>
              <button style={{ backgroundColor: 'black', color: 'white',borderColor : 'black', fontWeight : "500" }}
                type='button'
                className='btn btn-warning'
                onClick={() => verFragancia()}
              >
                Fragâncias
              </button>
              <button style={{ backgroundColor: 'black', color: 'white',borderColor : 'black', fontWeight : "500" }}
                type='button'
                className='btn btn-warning'
                onClick={() => verTamanho()}
              >
                Tamanhos
              </button>
              <button style={{ backgroundColor: 'black', color: 'white',borderColor : 'black', fontWeight : "500" }}
                type='button'
                className='btn btn-warning'
                onClick={() => verPerdas()}
              >
              Perdas
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ListagemCadastro;