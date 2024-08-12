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
import {BASE_URL_CPC} from '../config/bdCPC';
import {BASE_URL_FPP} from '../config/bdFPP';


const baseURL = `${BASE_URL_CPC}/perdas`;
const tipoPerdasURL = `${BASE_URL_FPP}/tipoPerdas`;

function ListagemPerdas() {
  const navigate = useNavigate();
  const [dados, setDados] = React.useState(null);
  const [tipoPerdas, setTipoPerdas] = React.useState([]);

  const cadastrar = () => {
   navigate(`/cadastro-perda`);
  };
  const verCadastro = () => {
    navigate(`/cadastro-tipo-perda`);
   };

  const editar = (id) => {
   navigate(`/cadastro-perda/${id}`);
  };

  async function excluir(id) {
    let data = JSON.stringify({ id });
    let url = `${baseURL}/${id}`;
    console.log(url);
    await axios
      .delete(url, data, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(function (response) {
        mensagemSucesso(`Perda excluída com sucesso!`);
        setDados(
          dados.filter((dado) => {
            return dado.id !== id;
          })
        );
      })
      .catch(function (error) {
        mensagemErro(`Erro ao excluir o perda`);
      });
  }

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setDados(response.data);
    });
 
  axios.get(tipoPerdasURL).then((response) => {
    setTipoPerdas(response.data);
  });

}, []);

  if (!dados) return null;

  const obterNomePerda = (idTipoPerda) => {
    const tipoPerda = tipoPerdas.find((tp) => tp.id === idTipoPerda);
    return tipoPerda ? tipoPerda.descricao : 'Desconhecido';
  };


  return (
    <div className='container'>
      <Card title='Perdas'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
            <button style={{ backgroundColor: 'black', color: 'white',borderColor : 'black', fontWeight : "500" }}
                className='btn btn-warning'
                onClick={() => cadastrar()}
              >
                Nova Perda
              </button>
              <button style={{ backgroundColor: 'black', color: 'white',borderColor : 'black', fontWeight : "500" }}
                type='button'
                className='btn btn-warning'
                onClick={() => verCadastro()}
              >
                Cadastro
              </button>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Codigo de Barras</th>
                    <th scope='col'>Data de Perda</th>
                    <th scope='col'>Descrição da Perda</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{dado.codigoBarras}</td>
                      <td>{dado.data}</td>
                      <td>{obterNomePerda(dado.descricao)}</td>
                      <td>
                        <Stack spacing={1} padding={0} direction='row'>
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

export default ListagemPerdas;