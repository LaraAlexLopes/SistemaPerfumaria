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
const cargosURL = `${BASE_URL_CFV}/cargos`;

function ListagemFuncionarios() {
  const navigate = useNavigate();
  
  const [dados, setDados] = React.useState(null);
  const [cargos, setCargos] = React.useState([]);

  const cadastrar = () => {
    navigate(`/cadastro-funcionarios`);
  };

  const editar = (id) => {
    navigate(`/cadastro-funcionarios/${id}`);
  };

  const verMelhoresFuncionarios= () => {
    navigate(`/listagem-melhoresFuncionarios`);
  }; 
  

  async function excluir(id) {
    let url = `${baseURL}/${id}`;
    console.log(url);
    await axios
      .delete(url)
      .then(function (response) {
        mensagemSucesso(`Funcionário excluído com sucesso!`);
        setDados(
          dados.filter((dado) => {
            return dado.id !== id;
          })
        );
      })
      .catch(function (error) {
        mensagemErro(`Erro ao excluir funcionário, tem uma venda vinculada a ele.`);
      });
  }

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setDados(response.data);
    });

    axios.get(cargosURL).then((response) => {
      setCargos(response.data);
    });
  }, []);

  if (!dados) return null;

  const obterNomeCargo = (idCargo) => {
    const cargo = cargos.find((cargo) => cargo.id === idCargo);
    return cargo ? cargo.cargo : 'Desconhecido';
  };

  return (
    <div className='container'>
      <Card title='Funcionários'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button style={{ backgroundColor: 'black', color: 'white' ,borderColor : 'black', fontWeight : "500"}}
                type='button'
                className='btn btn-warning'
                onClick={() => cadastrar()}
              >
                Novo Funcionário
                 </button>
          
              <table className='table table-hover'>
                <thead>
                  <tr >
                    <th scope='col'>Nome</th>
                    <th scope='col'>CPF</th>
                    <th scope='col'>E-mail</th>
                    <th scope='col'>Número de Telefone</th>
                    <th scope='col'>Cargo</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{dado.nome}</td>
                      <td >{dado.cpf}</td>
                      <td >{dado.email}</td>
                      <td >{dado.numeroTelefone}</td>
                      <td >{obterNomeCargo(dado.idCargo)}</td>
                      <td> 
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

export default ListagemFuncionarios;
