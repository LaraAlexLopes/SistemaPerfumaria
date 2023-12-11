import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import {BASE_URL_FPP} from '../config/bdFPP';
import {BASE_URL_C} from '../config/bdC';
import { BASE_URL_FT} from '../config/bdFT'; 

function CadastroPedido() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL_FPP}/pedido`;

  const [id, setId] = useState('');
  const [idFornecedor, setIdFornecedor] = useState(0);
  const [produto, setListaPedidos] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [lote, setLote] = useState('');
  const [validade, setValidade] = useState('');
  const [valor, setValor] = useState('');
  const [volume, setVolume] = useState('');
  const [dataEntrega, setDataEntrega] = useState('');
  const [dataPedido, setDataPedido] = useState('');
  

  const [dados, setDados] = React.useState([]);
  const [tabela, setTabela] = useState([]);

  function inicializar() {
    if (idParam == null) {
        setId('');
        setIdFornecedor(0);
        setListaPedidos('');
        setValor('');
        setQuantidade('');
        setLote('');
        setValidade('');
        setDataEntrega('');
        setDataPedido('');
        setVolume('');
      setTabela([])
    } else {
        setId(dados.id);
        setListaPedidos(dados.produto);
        setValor(dados.valor);
        setQuantidade(dados.quantidade);
        setLote(dados.lote);
        setValidade(dados.validade);
        setDataEntrega(dados.dataEntrega);
        setDataPedido(dados.dataPedido);
        setVolume(dados.volume);
    }
  }

  async function salvar() {
    let data = { id, produto, dataPedido, valor, dataEntrega, quantidade,lote,validade, volume};
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Pedido ${produto} cadastrado com sucesso!`);
          navigate(`/listagem-pedidos`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    } else {
      await axios
        .put(`${baseURL}/${idParam}`, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Pedido ${produto} alterado com sucesso!`);
          navigate(`/listagem-pedidos`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    }
  }

  async function buscar() {
    if(idParam != null){
      await axios.get(`${baseURL}/${idParam}`).then((response) => {
        setDados(response.data);
      });
        setId(dados.id);
        setIdFornecedor(dados.fornecedor);
        setValor(dados.valor);
        setListaPedidos(dados.produto);
        setQuantidade(dados.quantidade);
        setLote(dados.lote);
        setValidade(dados.validade);
        setDataEntrega(dados.dataEntrega);
        setDataPedido(dados.dataPedido);
        setVolume(dados.volume);
    }
  }

  const [dadosFornecedores, setDadosFornecedores] = React.useState(null);
  const [dadosEstoque, setDadosEstoque] = React.useState(null);
  const [dadosProdutos, setDadosProdutos] = React.useState(null);
  const [dadosListaProdutos, setDadosListaProdutos] = React.useState(null);
  const [dadosListaPedidos, setDadosListaPedidos] = React.useState(null);
  const [dadosVolume, setDadosVolume] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL_FPP}/fornecedores`).then((response) => {
      setDadosFornecedores(response.data);
    });
  }, []);
  useEffect(() => {
    axios.get(`${BASE_URL_C}/estoque`).then((response) => {
      setDadosEstoque(response.data);
    });
  }, []);
  useEffect(() => {
    axios.get(`${BASE_URL_FPP}/produto`).then((response) => {
      setDadosProdutos(response.data);
    });
  }, []);
  useEffect(() => {
    axios.get(`${BASE_URL_FT}/tamanho`).then((response) => {
      setDadosVolume(response.data);
    });
  }, []);
  useEffect(() => {
    axios.get(`${BASE_URL_FPP}/produto`).then((response) => {
      setDadosListaProdutos(response.data);
    });
  }, []);
  useEffect(() => {
    axios.get(`${BASE_URL_FT}/listaPedido`).then((response) => {
      setDadosListaPedidos(response.data);
    });
  }, []);

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);
  

  const InteractiveTable = () => {
    // const [tableData, setTableData] = useState([]);
    //setTableData = var16;
    const addRow = () => {
  
      const newRow = {
        id: tabela.length + 1,
        produto: "",
        quantidade: 0,
        volume : 0,
        lote:0,
        validade:0,
       
      };
  
      setTabela([...tabela, newRow]);
    };
  
    const removeRow = (id) => {
  
      const updatedTabela = tabela.filter(row => row.id !== id);
  
      setTabela(updatedTabela);
    };
  
    const handleChange = (id, column, value) => {
      const updatedRows = tabela.map((row) =>
        row.id === id ? { ...row, [column]: value } : row
      );
      setTabela(updatedRows);
    };
  
    if (!tabela) return null;
    return (
      <div>
        <table className="table table-hover" >
          <thead>
            <tr className="table-dark">
              <th scope="col">Produto</th>
              <th scope="col">Validade</th>
              <th scope="col">Lote</th>
              <th scope="col">Quantidade</th>
              <th scope="col">Tamanho</th>
              <th scope="col">Valor Unitário</th>
            </tr>
          </thead>
          <tbody>
            {tabela.map(row => (
              <tr key={row.id} className="table-light">
                <td>
                  <select
                    className='form-select'
                    value={row.produto}
                    onChange={(e) => handleChange(row.id, 'produto', e.target.value)}
                  >
                    <option key='0' value='0'>
                      {' '}
                    </option>
                    {dadosListaProdutos.map((dado) => (
                      <option key={dado.id} value={dado.id}>
                        {dado.produto}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    type='month'
                    className='form-control'
                    value = {row.validade}
                    onChange={(e) => handleChange(row.id, 'validade', e.target.value)}>
                  </input>
                </td>
                <td>
                  <input
                    type='text'
                    className='form-control'
                    value = {row.lote}
                    onChange={(e) => handleChange(row.id, 'lote', e.target.value)}>
                  </input>
                </td>
                <td>
                  <input
                    type='number'
                    className='form-control'
                    value = {row.quantidade}
                    onChange={(e) => handleChange(row.id, 'quantidade', e.target.value)}>
                  </input>
                </td>
                <td>
                  <select
                    className='form-select'
                    value={row.volume}
                    onChange={(e) => handleChange(row.id, 'volume', e.target.value)}
                  >
                    <option key='0' value='0'>
                      {' '}
                    </option>
                    {dadosVolume.map((dado) => (
                      <option key={dado.id} value={dado.id}>
                        {dado.volume}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    className='form-select'
                    value={row.listaPedido}
                    onChange={(e) => handleChange(row.id, 'listaPedido', e.target.value)}
                  >
                    <option key='0' value='0'>
                      {' '}
                    </option>
                    {dadosListaPedidos.map((dado) => (
                      <option key={dado.id} value={dado.id}>
                        {dado.valor}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <IconButton
                    aria-label='delete'
                    onClick={() => removeRow(row.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
          <IconButton
            aria-label='add'
            onClick={() => addRow()}
          >
            <AddBoxIcon />
          </IconButton>
      </div>
    );
  };
  if (!dados) return null;
  if (!dadosFornecedores) return null;
  if (!dadosProdutos) return null;
  if (!dadosEstoque) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Pedidos'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
           
            <FormGroup label='Fornecedor: *' htmlFor='selectFornecedor'>
                <select
                  className='form-select'
                  id='selectFornecedor'
                  name='idFornecedor'
                  value={idFornecedor}
                  onChange={(e) => setIdFornecedor(e.target.value)}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosFornecedores.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <FormGroup label='Produto: *' htmlFor='inputListaProdutos'>
                {/* <select
                id='inputListaProdutos'
                value={produto}
                className='form-select'
                name='produto'
                onChange={(e) => setListaProdutos(e.target.value)}
                >
                  <option key='0' value='0'>
                      {' '}
                    </option>
                    {dadosListaProdutos.map((dado) => (
                      <option key={dado.id} value={dado.id}>
                        {dado.produto}
                      </option>
                    ))}
                </select> */}
                <div class = "card">
                  <div class = "card-body">
                        <InteractiveTable/>
                  </div>
                </div>
              </FormGroup>
              <FormGroup label='Valor Total: *' htmlFor='inputValor'>
                <input
                  type='text'
                  id='inputValor'
                  value={valor}
                  className='form-control'
                  name='valor'
                  onChange={(e) => setValor(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Data de Pedido: *' htmlFor='inputDataPedido'>
                <input
                  type='date'
                  id='inputDataPedido'
                  value={dataPedido}
                  className='form-control'
                  name='dataPedido'
                  onChange={(e) => setDataPedido(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Data de Entrega: *' htmlFor='inputDataEntrega'>
                <input
                  type='date'
                  id='inputDataEntrega'
                  value={dataEntrega}
                  className='form-control'
                  name='dataEntrega'
                  onChange={(e) => setDataEntrega(e.target.value)}
                />
              </FormGroup>
              <Stack spacing={1} padding={1} direction='row'>
                <button style={{ backgroundColor: '#4AA228', color: 'white',borderColor : '#4AA228', fontWeight : "500" }}
                  onClick={salvar}
                  type='button'
                  className='btn btn-success'
                >
                  Salvar
                </button>
                <button style={{ backgroundColor: 'red', color: 'white',borderColor : 'red', fontWeight : "500" }}
                  onClick={inicializar}
                  type='button'
                  className='btn btn-danger'
                >
                  Cancelar
                </button>
                
              </Stack>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
export default CadastroPedido;
