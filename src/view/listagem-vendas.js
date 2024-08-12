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

const baseURL = `${BASE_URL_CFV}/vendas`;
const clientesURL = `${BASE_URL_CFV}/clientes`; // Supondo que você tenha um endpoint para clientes

function ListagemVendas() {
  const navigate = useNavigate();
  
  const [dados, setDados] = React.useState(null);
  const [clientes, setClientes] = React.useState([]);

  const cadastrar = () => {
    navigate(`/cadastro-vendas`);
  };

  const editar = (id) => {
    navigate(`/cadastro-vendas/${id}`);
  };

  const listagemMetasProdutos = (id) => {
    navigate(`/listagem-metasProdutos`);
  };

  const listagemCupons = (id) => {
    navigate(`/listagem-cupons`);
  };

  async function excluir(id) {
    let url = `${baseURL}/${id}`;
    console.log(url);
    await axios
      .delete(url, { headers: { 'Content-Type': 'application/json' } })
      .then(function (response) {
        mensagemSucesso(`Venda excluída com sucesso!`);
        setDados(dados.filter((dado) => dado.id !== id));
      })
      .catch(function (error) {
        mensagemErro(`Erro ao excluir a venda`);
      });
  }

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setDados(response.data);
    });

    // Buscando a lista de clientes
    axios.get(clientesURL).then((response) => {
      setClientes(response.data);
    });
  }, []);

  if (!dados || !clientes) return null;

  const obterNomeCliente = (idCliente) => {
    const cliente = clientes.find((cliente) => cliente.id === idCliente);
    return cliente ? cliente.nome : 'Desconhecido';
  };

  return (
    <div className='container'>
      <Card title='Vendas'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button
                style={{ backgroundColor: 'black', color: 'white', borderColor: 'black', fontWeight: "500" }}
                type='button'
                className='btn btn-warning'
                onClick={() => cadastrar()}
              >
                Nova Venda
              </button>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Cliente</th>
                    <th scope='col'>Valor</th>
                    <th scope='col'>Data de Venda</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{obterNomeCliente(dado.idCliente)}</td>
                      <td>{dado.valor_total}</td>
                      <td>{new Date(dado['data']).toLocaleDateString()}</td>
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

export default ListagemVendas;
