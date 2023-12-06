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
import { BASE_URL_CFV } from '../config/bdCFV';

const baseURL = `${ BASE_URL_CFV }/clientes`;

function ListagemMelhoresClientes() {
  const navigate = useNavigate();


  const [dados, setDados] = React.useState(null);




  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setDados(response.data);
    });
  }, []);

  if (!dados) return null;

  return (
    <div className='container'>
      <Card title='Melhores Clientes'>
        <div className='row'>
          <div className='col-lg-12' >
            <div className='bs-component' >
             
              
              <table className='table table-hover'>
                <thead>
                  <tr>
                  <th scope='col'>Posição</th>
                    <th scope='col'>Nome</th>
                    <th scope='col'>E-mail</th>
                    <th scope='col'>Número de Telefone</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{dado.id}</td>
                      <td>{dado.nome}</td>
                      <td>{dado.email}</td>
                      <td>{dado.numeroTelefone}</td>
                      <td>
                        <Stack spacing={1} padding={0} direction='row'>
                          
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

export default ListagemMelhoresClientes;
