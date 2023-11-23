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


function ListagemMelhoresFuncionarios() {
  const navigate = useNavigate();

  
  const verFuncionarios= () => {
    navigate(`/listagem-funcionarios`);
  };

  const [dados, setDados] = React.useState(null);

 
  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setDados(response.data);
    });
  }, []);

  if (!dados) return null;

  return (
    <div className='container'>
      <Card title=' Melhores Funcionários'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button style={{ backgroundColor: 'black', color: 'white',borderColor : 'black', fontWeight : "500" }}
                type='button'
                className='btn btn-warning'
                onClick={() => verFuncionarios()}
              >
                Funcionários
              </button>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Posição</th>
                    <th scope='col'>Nome</th>
                    <th scope='col'>Quantidade de Vendas</th>
                    <th scope='col'>Data de Inicio</th>
                    <th scope='col'>Data de Fim</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{dado.id}</td>
                      <td>{dado.nome}</td>
                      <td>{dado.quantidadeVendas}</td>
                      <td>{new Date(dado['dataInicioMelhorFuncionario']).toLocaleDateString()}</td>
                      <td>{new Date(dado['dataFimMelhorFuncionario']).toLocaleDateString()}</td>
                      <td>
                        <Stack spacing={1} padding={0} direction='row' style={{ color: 'white' }}>
                         
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

export default ListagemMelhoresFuncionarios;