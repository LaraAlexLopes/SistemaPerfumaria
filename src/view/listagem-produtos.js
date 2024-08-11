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
const classificacoesURL = `${BASE_URL_FPP}/classificacoes`;
const fragranciasURL = `${BASE_URL_FPP}/fragrancias`;

function ListagemProdutos() {
  const navigate = useNavigate();
  const [dados, setDados] = React.useState(null);
  const [classificacoes, setClassificacoes] = React.useState([]);
  const [fragrancias, setFragrancias] = React.useState([]);

  const cadastrar = () => {
    navigate(`/cadastro-produto`);
  };

  const editar = (id) => {
    navigate(`/cadastro-produto/${id}`);
  };

  const maisVendidos = () => {
    navigate(`/listagem-produtos-mais-vendidos`);
  };

  async function excluir(id) {
    let url = `${baseURL}/${id}`;
    await axios
      .delete(url)
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

    axios.get(classificacoesURL).then((response) => {
      setClassificacoes(response.data);
    });

    axios.get(fragranciasURL).then((response) => {
      setFragrancias(response.data);
    });
  }, []);

  if (!dados) return null;

  const obterNomeClassificacao = (idClassificacao) => {
    const classificacao = classificacoes.find((c) => c.id === idClassificacao);
    return classificacao ? classificacao.descricao : 'Desconhecido';
  };

  const obterNomeFragrancia = (idFragrancia) => {
    const fragrancia = fragrancias.find((f) => f.id === idFragrancia);
    return fragrancia ? fragrancia.descricao : 'Desconhecido';
  };

  return (
    <div className='container'>
      <Card title='Produtos'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button
                style={{ backgroundColor: 'black', color: 'white', borderColor: 'black', fontWeight: '500' }}
                type='button'
                className='btn btn-warning'
                onClick={() => cadastrar()}
              >
                Novo Produto
              </button>
              &nbsp;
              <button
                style={{ backgroundColor: 'black', color: 'white', borderColor: 'black', fontWeight: '500' }}
                type='button'
                className='btn btn-warning'
                onClick={() => maisVendidos()}
              >
                Mais Vendidos
              </button>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Produto</th>
                    <th scope='col'>Classificação</th>
                    <th scope='col'>Fragrância</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{dado.produto}</td>
                      <td>{obterNomeClassificacao(dado.idClassificacao)}</td>
                      <td>{obterNomeFragrancia(dado.idFragrancia)}</td>
                      <td>
                        <Stack spacing={1} padding={0} direction='row' style={{ color: 'white' }}>
                          <IconButton
                            style={{ color: 'black' }}
                            aria-label='edit'
                            onClick={() => editar(dado.id)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            style={{ color: 'black' }}
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
