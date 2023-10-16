import React from 'react';

import ListagemPedidos from './view/listagem-pedidos';
import ListagemFornecedores from './view/listagem-fornecedores';
import ListagemProdutos from './view/listagem-produtos';
import ListagemClientes from './view/listagem-clientes';
import ListagemFuncionarios from './view/listagem-funcionarios';
import ListagemVendas from './view/listagem-vendas';


import { Route, Routes, BrowserRouter } from 'react-router-dom';
import CadastroFornecedores from './view/cadastro-fornecedores';
import CadastroClientes from './view/cadastro-clientes';
import CadastroFuncionarios from './view/cadastro-funcionarios';
import CadastroVendas from './view/cadastro-vendas';

function Rotas(props) {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/cadastro-fornecedores/:idParam?' element={<CadastroFornecedores />} />
      <Route path='/cadastro-clientes/:idParam?' element={<CadastroClientes />} />
      <Route path='/cadastro-funcionarios/:idParam?' element={<CadastroFuncionarios />} />
      <Route path='/cadastro-vendas/:idParam?' element={<CadastroVendas />} />
        <Route path='/listagem-fornecedores' element={<ListagemFornecedores/>} />
        <Route path='/listagem-pedidos' element={<ListagemPedidos/>} />
        <Route path='/listagem-produtos' element={<ListagemProdutos/>} />
        <Route path='/listagem-clientes' element={<ListagemClientes/>} />
        <Route path='/listagem-funcionarios' element={<ListagemFuncionarios/>} />
        <Route path='/listagem-vendas' element={<ListagemVendas/>} />
      </Routes>
    </BrowserRouter>
  );
}
export default Rotas;