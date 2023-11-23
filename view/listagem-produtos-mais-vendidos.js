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

const baseURL = `${BASE_URL_C}/estoque`;

function ListagemProdutosMaisVendido() {
  const navigate = useNavigate();

  const verProduto= () => {
    navigate(`/listagem-produtos`);
  };
  
  const editar = (id) => {
    navigate(`/cadastro-produto${id}`);
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
      <Card title='Produtos Mais Vendidos'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>   
              &nbsp;
              <button style={{ backgroundColor: 'black', color: 'white',borderColor : 'black', fontWeight : "500" }}  
                  type='button'
                  className='btn btn-warning'
                  onClick={() => verProduto()}
                >
                 Ver Produtos
                </button> 
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th  scope='col'>Posição</th>
                    <th  scope='col'>Produto</th>
                    <th  scope='col'>Código de Barras</th>
                    <th  scope='col'>Preço</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td >{dado.id}</td>
                      <td>{dado.produto}</td>
                      <td>{dado.codigoBarras}</td>
                      <td>{dado.preco}</td>
                      <td>
                        
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

export default ListagemProdutosMaisVendido;