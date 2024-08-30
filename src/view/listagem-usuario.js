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
import { BASE_URL_FPP } from '../config/bdFPP';

const baseURL = `${BASE_URL_FPP}/usuarios`;

function ListagemUsuarios() {
  const navigate = useNavigate();
  const [dados, setDados] = React.useState([]);

  const cadastrar = () => {
    navigate(`/cadastro-usuario`);
  };

  const editar = (id) => {
    navigate(`/cadastro-usuario/${id}`);
  };

  async function excluir(id) {
    let url = `${baseURL}/${id}`;
    await axios
      .delete(url, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(function (response) {
        mensagemSucesso(`Usuário excluído com sucesso!`);
        setDados(dados.filter((dado) => dado.id !== id));
      })
      .catch(function (error) {
        mensagemErro(`Erro ao excluir o usuário`);
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
      <Card title='Listagem de Usuários'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button
                style={{ backgroundColor: 'black', color: 'white', borderColor: 'black', fontWeight: '500' }}
                type='button'
                className='btn btn-warning'
                onClick={cadastrar}
              >
                Novo Usuário
              </button>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Login</th>
                    <th scope='col'>CPF</th>
                    <th scope='col'>Admin</th>
                    <th scope='col'>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{dado.login}</td>
                      <td>{dado.cpf}</td>
                      <td>{dado.admin ? 'Sim' : 'Não'}</td>
                      <td>
                        <Stack spacing={1} padding={0} direction='row'>
                          <IconButton style={{ color: 'black' }} aria-label='edit' onClick={() => editar(dado.id)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton style={{ color: 'black' }} aria-label='delete' onClick={() => excluir(dado.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ListagemUsuarios;
