import React from 'react';

import ListagemPedidos from './view/listagem-pedidos';
import ListagemFornecedores from './view/listagem-fornecedores';
import ListagemProdutos from './view/listagem-produtos';


import { Route, Routes, BrowserRouter } from 'react-router-dom';
import CadastroFornecedores from './view/cadastro-fornecedores';

function Rotas(props) {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/cadastro-fornecedores/:idParam?' element={<CadastroFornecedores />} />
        <Route path='/listagem-fornecedores' element={<ListagemFornecedores/>} />
        <Route path='/listagem-pedidos' element={<ListagemPedidos/>} />
        <Route path='/listagem-produtos' element={<ListagemProdutos/>} />
      </Routes>
    </BrowserRouter>
  );
}
export default Rotas;