import { Routes, Route, Link } from "react-router-dom"
import "../App.css"
import Navbar from "../components/Navbar"

import Funcionarios from "./Funcionarios"
import MostrarFuncionarios from "./pages-Funcionarios/MostrarFuncionarios"
import CadastrarFuncionarios from "./pages-Funcionarios/CadastrarFuncionarios"
import AtualizarFuncionarios from "./pages-Funcionarios/AtualizarFuncionarios"
import DeletarFuncionario from "./pages-Funcionarios/DeletarFuncionarios"

import Clientes from "./Clientes"
import MostrarClientes from "./pages-Clientes/MostrarClientes"
import CadastrarClientes from "./pages-Clientes/CadastrarClientes"
import AtualizarClientes from "./pages-Clientes/AtualizarClientes"
import DeletarClientes from "./pages-Clientes/DeletarClientes"

import Proprietarios from "./Proprietarios"
import MostrarProprietarios from "./pages-Proprietarios/MostrarProprietarios"
import CadastrarProprietarios from "./pages-Proprietarios/CadastrarProprietarios"
import AtualizarProprietarios from "./pages-Proprietarios/AtualizarProprietarios"
import DeletarProprietarios from "./pages-Proprietarios/DeletarProprietarios"

import Imoveis from "./Imoveis"
import MostrarImoveis from "./pages-Imoveis/MostrarImoveis"
import DetalhesImoveis from "./pages-Imoveis/DetalhesImoveis"
import CadastrarImoveis from "./pages-Imoveis/CadastrarImoveis"
import AtualizarImoveis from "./pages-Imoveis/AtualizarImoveis"
import DeletarImoveis from "./pages-Imoveis/DeletarImoveis"

import Vendas from "./Vendas"
import MostrarVendas from "./pages-Vendas/MostrarVendas"
import CadastrarVendas from "./pages-Vendas/CadastrarVendas"
import DeletarVendas from "./pages-Vendas/DeletarVendas"

import Locacoes from "./Locacoes"
import MostrarLocacoes from "./pages-Locacoes/MostrarLocacoes"
import CadastrarLocacoes from "./pages-Locacoes/CadastrarLocacoes"
import DeletarLocacoes from "./pages-Locacoes/DeletarLocacoes"

import Visitas from "./Visitas"
import MostrarVisitas from "./pages-Visitas/MostrarVisitas"
import CadastrarVisitas from "./pages-Visitas/CadastrarVisitas"
import AtualizarVisitas from "./pages-Visitas/AtualizarVisitas"
import DeletarVisitas from "./pages-Visitas/DeletarVisitas"

import Carros from "./Carros"
import MostrarCarros from "./pages-Carros/MostrarCarros"
import CadastrarCarros from "./pages-Carros/CadastrarCarros"
import AtualizarCarros from "./pages-Carros/AtualizarCarros"
import DeletarCarros from "./pages-Carros/DeletarCarros"
import AtualizarUsoCarro from "./pages-Carros/AtualizarUsoCarro"
import CadastrarUsoCarro from "./pages-Carros/CadastrarUsoCarro"

import Contratos from "./Contratos"
import MostrarContratos from "./pages-Contratos/MostrarContratos"
import DetalhesContratos from "./pages-Contratos/DetalhesContratos"
import DeletarContratos from "./pages-Contratos/DeletarContratos"

function Home() {

  const funcionario = JSON.parse(localStorage.getItem("funcionario"))
  const tipo = funcionario?.tipo_funcionario

  return (

    <div className="app">

      <Navbar />

      <main className="conteudo">

        <Routes>

          <Route index element={

            <div>

              <h2>Sistema Administrativo</h2>

              <div className="caixinhas">

                
                <Link to="clientes" className="caixinha">
                  <h3>Clientes</h3>
                  <p>Gerenciar clientes</p>
                </Link>

                <Link to="imoveis" className="caixinha">
                  <h3>Imóveis</h3>
                  <p>Gerenciar imóveis</p>
                </Link>

                {/* Corretor e Gerente */}
                {(tipo === "Corretor" || tipo === "Gerente") && (
                  <>
                    <Link to="vendas" className="caixinha">
                      <h3>Vendas</h3>
                      <p>Gerenciar vendas</p>
                    </Link>

                    <Link to="locacoes" className="caixinha">
                      <h3>Locações</h3>
                      <p>Gerenciar locações</p>
                    </Link>
                  </>
                )}

      
                <Link to="visitas" className="caixinha">
                  <h3>Visitas</h3>
                  <p>Gerenciar visitas</p>
                </Link>

                <Link to="carros" className="caixinha">
                  <h3>Carros</h3>
                  <p>Gerenciar carros</p>
                </Link>

                
              
                <Link to="proprietarios" className="caixinha">
                  <h3>Proprietários</h3>
                    <p>Gerenciar proprietários</p>
                </Link>

                <Link to="funcionarios" className="caixinha">
                  <h3>Funcionários</h3>
                    <p>Gerenciar equipe</p>
                </Link>
                
                {(tipo === "Gerente" || tipo === "Corretor") && (
                  <Link to="contratos" className="caixinha">
                    <h3>Contratos</h3>
                    <p>Gerenciar contratos</p>
                  </Link>
                )}

              </div>

            </div>

          } />

          <Route path="funcionarios" element={<Funcionarios />} />
          <Route path="funcionarios/cadastrar-funcionarios" element={<CadastrarFuncionarios />} />
          <Route path="funcionarios/mostrar-funcionarios" element={<MostrarFuncionarios />} />
          <Route path="funcionarios/atualizar-funcionarios/:id" element={<AtualizarFuncionarios />} />
          <Route path="funcionarios/deletar-funcionarios/:id" element={<DeletarFuncionario />} />

          <Route path="clientes" element={<Clientes />} />
          <Route path="clientes/mostrar-clientes" element={<MostrarClientes />} />
          <Route path="clientes/cadastrar-clientes" element={<CadastrarClientes />} />
          <Route path="clientes/atualizar-clientes/:id" element={<AtualizarClientes />} />
          <Route path="clientes/deletar-clientes/:id" element={<DeletarClientes />} />

          <Route path="proprietarios" element={<Proprietarios />} />
          <Route path="proprietarios/mostrar-proprietarios" element={<MostrarProprietarios />} />
          <Route path="proprietarios/cadastrar-proprietarios" element={<CadastrarProprietarios />} />
          <Route path="proprietarios/atualizar-proprietarios/:id" element={<AtualizarProprietarios />} />
          <Route path="proprietarios/deletar-proprietarios/:id" element={<DeletarProprietarios />} />

          <Route path="imoveis" element={<Imoveis />} />
          <Route path="imoveis/mostrar-imoveis" element={<MostrarImoveis />} />
          <Route path="imoveis/detalhes-imoveis/:id" element={<DetalhesImoveis />} />
          <Route path="imoveis/cadastrar-imoveis" element={<CadastrarImoveis />} />
          <Route path="imoveis/atualizar-imoveis/:id" element={<AtualizarImoveis />} />
          <Route path="imoveis/deletar-imoveis/:id" element={<DeletarImoveis />} />

          <Route path="vendas" element={<Vendas />} />
          <Route path="vendas/mostrar-vendas" element={<MostrarVendas />} />
          <Route path="vendas/cadastrar-vendas/:id" element={<CadastrarVendas />} />
          <Route path="vendas/deletar-vendas/:id" element={<DeletarVendas />} />

          <Route path="locacoes" element={<Locacoes />} />
          <Route path="locacoes/mostrar-locacoes" element={<MostrarLocacoes />} />
          <Route path="locacoes/cadastrar-locacoes/:id" element={<CadastrarLocacoes />} />
          <Route path="locacoes/deletar-locacoes/:id" element={<DeletarLocacoes />} />

          <Route path="visitas" element={<Visitas />} />
          <Route path="visitas/mostrar-visitas" element={<MostrarVisitas />} />
          <Route path="visitas/cadastrar-visitas/:id" element={<CadastrarVisitas />} />
          <Route path="visitas/atualizar-visitas/:id" element={<AtualizarVisitas />} />
          <Route path="visitas/deletar-visitas/:id" element={<DeletarVisitas />} />

          <Route path="carros" element={<Carros />} />
          <Route path="carros/mostrar-carros" element={<MostrarCarros />} />
          <Route path="carros/cadastrar-carros" element={<CadastrarCarros />} />
          <Route path="carros/atualizar-carros/:id" element={<AtualizarCarros />} />
          <Route path="carros/deletar-carros/:id" element={<DeletarCarros />} />
          <Route path="carros/retorno-carro/:id" element={<AtualizarUsoCarro />} />
          <Route path="carros/usar-carro/:id" element={<CadastrarUsoCarro />} />

          <Route path="contratos" element={<Contratos />} />
          <Route path="contratos/mostrar-contratos" element={<MostrarContratos />} />
          <Route path="contratos/detalhes-contratos/:id" element={<DetalhesContratos />} />
          <Route path="contratos/deletar-contratos/:id" element={<DeletarContratos />} />

        </Routes>

      </main>

    </div>

  )

}

export default Home
