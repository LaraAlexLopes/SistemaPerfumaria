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

const baseURL = `${BASE_URL_FPP}/produtos`;

function ListagemProdutos() {
  const navigate = useNavigate();

  const cadastrar = () => {
    navigate(`/cadastro-produto`);
  };
  const editar = (id) => {
    navigate(`/cadastro-produto/${id}`);
  };
  const maisVendidos= () => {
    navigate(`/listagem-produtos-mais-vendidos`);
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
              <button style={{ backgroundColor: 'black', color: 'white',borderColor : 'black', fontWeight : "500" }}
                type='button'
                className='btn btn-warning'
                onClick={() => cadastrar()}
              >
                Novo Produto
              </button>   
              &nbsp;
              <button  style={{ backgroundColor: 'black', color: 'white',borderColor : 'black', fontWeight : "500" }}
                  type='button'
                  className='btn btn-warning'
                  onClick={() => maisVendidos()}
                >
                 Mais Vendidos
                </button>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th  scope='col'>Produto</th>
                    <th  scope='col'>Classificação</th>
                    <th scope='col'>Fragrância</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td >{dado.nome}</td>
                      <td >{dado.idClassificacao}</td>
                      <td >{dado.idFagrancia}</td>
                      <td >
                        <Stack spacing={1} padding={0} direction='row' style={{ color: 'white' }}>
                          <IconButton style={{ color: 'black' }}
                            aria-label='edit'
                            onClick={() => editar(dado.id)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton style={{ color: 'black' }}
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