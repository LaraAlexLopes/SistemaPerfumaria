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

const baseURL = `${BASE_URL_C}/estoques`;

function ListagemEstoque() {
  const navigate = useNavigate();

  const cadastrar = () => {
    navigate(`/cadastro-estoque`);
  };
  const verProdutos = () => {
    navigate(`/listagem-produtos`);
  };

  const editar = (id) => {
    navigate(`/cadastro-estoque/${id}`);
  };
  const verPerdas = () => {
    navigate(`/listagem-perdas`);
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
        mensagemSucesso(`Produto excluído do Estoque com sucesso!`);
        setDados(
          dados.filter((dado) => {
            return dado.id !== id;
          })
        );
      })
      .catch(function (error) {
        mensagemErro(`Erro ao excluir  produto`);
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
      <Card title='Estoque'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button style={{ backgroundColor: 'black', color: 'white',borderColor : 'black', fontWeight : "500" }}
                type='button'
                className='btn btn-warning'
                onClick={() => cadastrar()}
              >
                Novo Produto no Estoque
              </button>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th  scope='col'>Produto</th>
                    <th  scope='col'>Capacidade Máxima</th>
                    <th  scope='col'>Capacidade Mínima</th>
                    <th  scope='col'>Ponto de Ressuprimento</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td >{dado.idProduto}</td>
                      <td >{dado.capacidadeMaxima}</td>
                      <td >{dado.capacidadeMinima}</td>
                      <td >{dado.pontoDeRessuprimento}</td>
                      <td >
                        <Stack spacing={1} padding={0} direction='row' style={{color: '#4AA228' }}>
                          <IconButton style={{color: 'black' }}
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

export default ListagemEstoque;
