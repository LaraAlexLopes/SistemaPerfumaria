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
import {BASE_URL_FPP} from '../config/bdFPP';

const baseURL = `${BASE_URL_FPP}/produto`;

function ListagemProdutos() {
  const navigate = useNavigate();

  const cadastrar = () => {
    navigate(`/cadastro-produto`);
  };
  const verEstoque= () => {
    navigate(`/listagem-estoque`);
  };
  const maisVendidos= () => {
    navigate(`/listagem-produtos-mais-vendidos`);
  };
  const editar = (id) => {
    navigate(`/cadastro-produto${id}`);
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
      <Card title='Produtos'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button style={{ backgroundColor: '#4AA228', color: 'white',borderColor : '#4AA228', fontWeight : "500" }}
                type='button'
                className='btn btn-warning'
                onClick={() => cadastrar()}
              >
                Novo Produto
              </button>   
              &nbsp;
              <button  style={{ backgroundColor: '#4AA228', color: 'white',borderColor : '#4AA228', fontWeight : "500" }}
                  type='button'
                  className='btn btn-warning'
                  onClick={() => maisVendidos()}
                >
                 Mais Vendidos
                </button>
              <button  style={{ backgroundColor: '#4AA228', color: 'white',borderColor : '#4AA228', fontWeight : "500" }}
                  type='button'
                  className='btn btn-warning'
                  onClick={() => verEstoque()}
                >
                 Ver Estoque
                </button> 
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th style={{ backgroundColor: '#0c0c0c', color: 'white' }} scope='col'>Produto</th>
                    <th style={{ backgroundColor: '#0c0c0c', color: 'white' }} scope='col'>Classificação</th>
                    <th style={{ backgroundColor: '#0c0c0c', color: 'white' }} scope='col'>Fragrancia</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td style={{ backgroundColor: '#0c0c0c', color: 'white' }}>{dado.produto}</td>
                      <td style={{ backgroundColor: '#0c0c0c', color: 'white' }}>{dado.classificacao}</td>
                      <td style={{ backgroundColor: '#0c0c0c', color: 'white' }}>{dado.fragrancia}</td>
                      <td style={{ backgroundColor: '#0c0c0c', color: 'white' }}>
                        <Stack spacing={1} padding={0} direction='row' style={{ backgroundColor: '#0c0c0c', color: 'white' }}>
                          <IconButton style={{ backgroundColor: '#0c0c0c', color: '#4AA228' }}
                            aria-label='edit'
                            onClick={() => editar(dado.id)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton style={{ backgroundColor: '#0c0c0c', color: '#4AA228' }}
                            aria-label='delete'
                            onClick={() => excluir(dado.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>{' '}
            </div>
          </div>
        </div>
     
      </Card>
      
    </div>
  );
}

export default ListagemProdutos;