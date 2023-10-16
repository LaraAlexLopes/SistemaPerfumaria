import React from 'react';

import ListagemPedidos from './view/listagem-pedidos';
import ListagemFornecedores from './view/listagem-fornecedores';
import ListagemProdutos from './view/listagem-produtos';
import ListagemClassificao from './view/listagem-classificacoes';
import ListagemCupons from './view/listagem-cupons';
import ListagemPerdas from './view/listagem-perdas.js';
import ListagemFragancias from './view/listagem-fragancias';
import ListagemTamanhos from './view/listagem-tamanhos';

import { Route, Routes, BrowserRouter } from 'react-router-dom';
import CadastroFornecedores from './view/cadastro-fornecedores';
import CadastroPerda from './view/cadastro-perda';
import CadastroClassificação from './view/cadastro-classificacao';
import CadastroTamanho from './view/cadastro-tamanho';
import CadastroCupom from   './view/cadastro-cupom';
import CadastroFragancia from './view/cadastro-fragancia';
import CadastroProduto from './view/cadastro-produto';
import CadastroPedido from './view/cadastro-pedidos';


function Rotas(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/cadastro-fornecedores/:idParam?' element={<CadastroFornecedores />} />
        <Route path='/cadastro-perda/:idParam?' element={<CadastroPerda />} />
        <Route path='/cadastro-classificacao/:idParam?' element={<CadastroClassificação />} />
        <Route path='/cadastro-tamanho/:idParam?' element={<CadastroTamanho />} />
        <Route path='/cadastro-cupom/:idParam?' element={<CadastroCupom />} />
        <Route path='/cadastro-fragancia/:idParam?' element={<CadastroFragancia />} />
        <Route path='/cadastro-produto/:idParam?' element={<CadastroProduto/>} />
        <Route path='/cadastro-pedidos/:idParam?' element={<CadastroPedido/>} />
        <Route path='/listagem-fornecedores' element={<ListagemFornecedores/>} />
        <Route path='/listagem-pedidos' element={<ListagemPedidos/>} />
        <Route path='/listagem-produtos' element={<ListagemProdutos/>} />
        <Route path='/listagem-cupons' element={<ListagemCupons/>} />
        <Route path='/listagem-perdas' element={<ListagemPerdas/>} />
        <Route path='/listagem-classificacoes' element={<ListagemClassificao/>} />
        <Route path='/listagem-tamanhos' element={<ListagemTamanhos/>} />
        <Route path='/listagem-fragancias' element={<ListagemFragancias/>} />
      </Routes>
    </BrowserRouter>
  );
}
export default Rotas;