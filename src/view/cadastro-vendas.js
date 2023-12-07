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
import {BASE_URL_CFV} from '../config/bdCFV';
import { BASE_URL_CPC } from '../config/bdCPC'; 
import { BASE_URL_FPP} from '../config/bdFPP'; 
import { BASE_URL_FT} from '../config/bdFT'; 


function CadastroVendas() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL_CFV}/vendas`;
  

  const [id, setId] = useState('');
  const [idNomeCliente, setIdNomeCliente] = useState(0);
  const [idNomeFuncionario, setIdNomeFuncionario] = useState(0);
  const [dataVenda, setData] = useState('');
  const [produto, setListaProdutos] = useState('');
  const [cupomDesconto, setCupomDesconto] = useState('');
  const [valor, setValor] = useState('');
  const [volume, setVolume] = useState('');
  const [formaPagamento, setFormaPagamento] = useState('');
  

  const [dados, setDados] = React.useState([]);
  const [tabela, setTabela] = useState([]);


  function inicializar() {
    if (idParam == null) {
      setId('');
      setIdNomeCliente(0);
      setIdNomeFuncionario(0);
      setData('');
      setListaProdutos('');
      setCupomDesconto('');
      setValor('');
      setFormaPagamento('');
      setVolume('');
      setTabela([]);
      
    } else {
      setId(dados.id);
      setIdNomeCliente(dados.idNomeCliente);
      setIdNomeFuncionario(dados.idNomeFuncionario);
      setData(dados.dataVenda);
      setListaProdutos(dados.produto);
      setCupomDesconto(dados.cupomDesconto);
      setValor(dados.valor);
      setFormaPagamento(dados.formaPagamento);
      setVolume(dados.volume);
      setTabela(dados.produto);
    }
  }

  async function salvar() {
    let data = { id,idNomeCliente,idNomeFuncionario,dataVenda,volume,produto,cupomDesconto,valor,formaPagamento }
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Venda ${produto} cadastrada com sucesso!`);
          navigate(`/listagem-vendas`);
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
          mensagemSucesso(`Venda ${produto} alterada com sucesso!`);
          navigate(`/listagem-vendas`);
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
      setIdNomeCliente(dados.nome);
      setIdNomeFuncionario(dados.nome);
      setData(dados.dataVenda);
      setListaProdutos(dados.produto);
      setCupomDesconto(dados.cupomDesconto);
      setValor(dados.valor);
      setFormaPagamento(dados.formaPagamento);
      setVolume(dados.volume);
      //setTabela(dados.produto)
    }
  }
  const [dadosClientes, setDadosClientes] = React.useState(null);
  const [dadosFuncionario, setDadosFuncionario] = React.useState(null);
  const [dadosCupom, setDadosCupom] = React.useState(null);
  const [dadosFormaPagamento, setDadosFormaPagamento] = React.useState(null);
  const [dadosListaProdutos, setDadosListaProdutos] = React.useState(null);
  const [dadosVolume, setDadosVolume] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL_CPC}/formaPagamento`).then((response) => {
      setDadosFormaPagamento(response.data);
    });
  }, []);
  useEffect(() => {
    axios.get(`${BASE_URL_CFV}/clientes`).then((response) => {
      setDadosClientes(response.data);
    });
  }, []);
  useEffect(() => {
    axios.get(`${BASE_URL_CFV}/funcionarios`).then((response) => {
      setDadosFuncionario(response.data);
    });
  }, []);
  useEffect(() => {
    axios.get(`${BASE_URL_FPP}/produto`).then((response) => {
      setDadosListaProdutos(response.data);
    });
  }, []);
  useEffect(() => {
    axios.get(`${BASE_URL_CPC}/cupomDesconto`).then((response) => {
      setDadosCupom(response.data);
    });
  }, []);
  useEffect(() => {
    axios.get(`${BASE_URL_FT}/tamanho`).then((response) => {
      setDadosVolume(response.data);
    });
  }, []);
  
  
  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

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
        valor : 0,
       
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
        <table className="table table-hover">
          <thead>
            <tr className="table-dark">
              <th scope="col">Produto</th>
              <th scope="col">Quantidade</th>
              <th scope="col">Tamanho</th>
              <th scope="col">Valor</th>
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
                  <input
                    type='text'
                    className='form-control'
                    value = {row.valor}
                    onChange={(e) => handleChange(row.id, 'valor', e.target.value)}>
                  </input>
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
  if (!dadosClientes) return null;
  if (!dadosFuncionario) return null;
  if (!dadosCupom) return null;
  if (!dadosFormaPagamento) return null;
  if (!dadosListaProdutos) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Vendas'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Nome do Cliente:  *' htmlFor='selectNomeCliente'>
                <select
                  className='form-select'
                  id='selectNomeCliente'
                  name='idNomeCliente'
                  value={idNomeCliente}
                  onChange={(e) => setIdNomeCliente(e.target.value)}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosClientes.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <FormGroup label='Nome do Funcionário:  *' htmlFor='selectNomeFuncionario'>
                <select
                  className='form-select'
                  id='selectNomeFuncionario'
                  name='idNomeFuncionario'
                  value={idNomeFuncionario}
                  onChange={(e) => setIdNomeFuncionario(e.target.value)}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosFuncionario.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <FormGroup label='Produto: *' htmlFor='inputListaProdutos'>
                <div class = "card">
                  <div class = "card-body">
                        <InteractiveTable/>
                  </div>
                </div>
              </FormGroup>
              <FormGroup label='Cupom De Desconto:' htmlFor='inputCupomDesconto'>
                <select
                id='inputCupomDesconto'
                value={cupomDesconto}
                className='form-select'
                name='cupomDesconto'
                onChange={(e) => setCupomDesconto(e.target.value)}
                >
                  <option key='0' value='0'>
                      {' '}
                    </option>
                    {dadosCupom.map((dado) => (
                      <option key={dado.id} value={dado.id}>
                        {dado.desconto}
                      </option>
                    ))}
                </select>
              </FormGroup>
              <FormGroup label='Valor Final: *' htmlFor='inputValorFinal'>
                <input
                  type='text'
                  id='inputValorFinal'
                  value={valor}
                  className='form-control'
                  name='valorFinal'
                  onChange={(e) => setValor(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Forma de Pagamento: *' htmlFor='inputFormapagamento'>
                <select
                  id='inputFormaPagamento'
                  value={formaPagamento}
                  className='form-select'
                  name='formaPagamento'
                  onChange={(e) => setFormaPagamento(e.target.value)}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosFormaPagamento.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.tipo}
                    </option>
                  ))}
              </select>
              </FormGroup>
              <FormGroup label='Data da Venda: *' htmlFor='inputData'>
                <input
                  type='date'
                  maxLength='18'
                  id='inputData'
                  value={dataVenda}
                  className='form-control'
                  name='dataVenda'
                  onChange={(e) => setData(e.target.value)}
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
export default CadastroVendas;
