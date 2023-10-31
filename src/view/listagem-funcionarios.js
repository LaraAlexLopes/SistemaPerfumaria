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
import {BASE_URL_CFV} from '../config/bdCFV';

const baseURL = `${BASE_URL_CFV}/funcionarios`;

function ListagemFuncionarios() {
  const navigate = useNavigate();

  const cadastrar = () => {
   navigate(`/cadastro-funcionarios`);
  };

  const editar = (id) => {
   navigate(`/cadastro-funcionarios/${id}`);
  };
  const verMelhoresFuncionarios= () => {
    navigate(`/listagem-metas`);
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
        mensagemSucesso(`Funcionario excluído com sucesso!`);
        setDados(
          dados.filter((dado) => {
            return dado.id !== id;
          })
        );
      })
      .catch(function (error) {
        mensagemErro(`Erro ao excluir o funcionario`);
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
      <Card title=' Funcionários'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button style={{ backgroundColor: '#4AA228', color: 'white' ,borderColor : '#4AA228', fontWeight : "500"}}
                type='button'
                className='btn btn-warning'
                onClick={() => cadastrar()}
              >
                Novo Funcionário
              </button>
              <button style={{ backgroundColor: '#4AA228', color: 'white',borderColor : '#4AA228', fontWeight : "500" }}
                type='button'
                className='btn btn-warning'
                onClick={() => verMelhoresFuncionarios()}
              >
                Melhores Funcionários
              </button>
              <table className='table table-hover'>
                <thead>
                  <tr >
                    <th style={{ backgroundColor: '#0c0c0c', color: 'white' }}scope='col'>Nome</th>
                    <th style={{ backgroundColor: '#0c0c0c', color: 'white' }}scope='col'>CPF</th>
                    <th style={{ backgroundColor: '#0c0c0c', color: 'white' }}scope='col'>Email</th>
                    <th style={{ backgroundColor: '#0c0c0c', color: 'white' }}scope='col'>Numero</th>
                    <th style={{ backgroundColor: '#0c0c0c', color: 'white' }}cope='col'>Cargo</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td style={{ backgroundColor: '#0c0c0c', color: 'white' }}>{dado.nome}</td>
                      <td style={{ backgroundColor: '#0c0c0c', color: 'white' }}>{dado.cpf}</td>
                      <td style={{ backgroundColor: '#0c0c0c', color: 'white' }}>{dado.email}</td>
                      <td style={{ backgroundColor: '#0c0c0c', color: 'white' }}>{dado.numeroTelefone}</td>
                      <td style={{ backgroundColor: '#0c0c0c', color: 'white' }}>{dado.cargo}</td>
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

export default ListagemFuncionarios;