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

const baseURL = `${BASE_URL_FPP}/pedidos`;
const fornecedoresURL = `${BASE_URL_FPP}/fornecedores`; // Supondo que você tenha um endpoint para fornecedores

function ListagemPedidos() {
  const navigate = useNavigate();
  
  const [dados, setDados] = React.useState(null);
  const [fornecedores, setFornecedores] = React.useState([]);

  const cadastrar = () => {
    navigate(`/cadastro-pedidos`);
  };

  const editar = (id) => {
    navigate(`/cadastro-pedidos/${id}`);
  };

  async function excluir(id) {
    let url = `${baseURL}/${id}`;
    console.log(url);
    await axios
      .delete(url, { headers: { 'Content-Type': 'application/json' } })
      .then(function (response) {
        mensagemSucesso(`Pedido excluído com sucesso!`);
        setDados(dados.filter((dado) => dado.id !== id));
      })
      .catch(function (error) {
        mensagemErro(`Erro ao excluir o pedido`);
      });
  }

  React.useEffect(() => {
    // Buscando a lista de pedidos
    axios.get(baseURL).then((response) => {
      setDados(response.data);
    });

    // Buscando a lista de fornecedores
    axios.get(fornecedoresURL).then((response) => {
      setFornecedores(response.data);
    });
  }, []);

  if (!dados || !fornecedores) return null;

  const obterNomeFornecedor = (idFornecedor) => {
    const fornecedor = fornecedores.find((fornecedor) => fornecedor.id === idFornecedor);
    return fornecedor ? fornecedor.nome : 'Desconhecido';
  };

  return (
    <div className='container'>
      <Card title='Pedidos'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button
                style={{ backgroundColor: 'black', color: 'white', borderColor: 'black', fontWeight: "500" }}
                type='button'
                className='btn btn-warning'
                onClick={() => cadastrar()}
              >
                Novo Pedido
              </button>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Fornecedor</th>
                    <th scope='col'>Data de Pedido</th>
                    <th scope='col'>Data de Entrega</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{obterNomeFornecedor(dado.idFornecedor)}</td>
                      <td>{new Date(dado['dataPedido']).toLocaleDateString()}</td>
                      <td>{new Date(dado['dataEntrega']).toLocaleDateString()}</td>
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
              </table>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ListagemPedidos;
