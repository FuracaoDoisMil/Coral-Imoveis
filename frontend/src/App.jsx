import "./App.css"

import { Routes, Route, Link } from "react-router-dom"

import Navbar from "./components/Navbar"

import Funcionarios from "./pages/Funcionarios"
import MostrarFuncionarios from "./pages/pages-Funcionarios/MostrarFuncionarios"
import CadastrarFuncionarios from "./pages/pages-Funcionarios/CadastrarFuncionarios"
import AtualizarFuncionarios from "./pages/pages-Funcionarios/AtualizarFuncionarios"
import DeletarFuncionario from "./pages/pages-Funcionarios/DeletarFuncionarios"

import Clientes from "./pages/Clientes"
import MostrarClientes from "./pages/pages-Clientes/MostrarClientes"
import CadastrarClientes from "./pages/pages-Clientes/CadastrarClientes"
import AtualizarClientes from "./pages/pages-Clientes/AtualizarClientes"
import DeletarClientes from "./pages/pages-Clientes/DeletarClientes"


import Proprietarios from "./pages/Proprietarios"
import MostrarProprietarios from "./pages/pages-Proprietarios/MostrarProprietarios"
import CadastrarProprietarios from "./pages/pages-Proprietarios/CadastrarProprietarios"
import AtualizarProprietarios from "./pages/pages-Proprietarios/AtualizarProprietarios"
import DeletarProprietarios from "./pages/pages-Proprietarios/DeletarProprietarios"

import Imoveis from "./pages/Imoveis"
import Vendas from "./pages/Vendas"
import Locacoes from "./pages/Locacoes"
import Visitas from "./pages/Visitas"
import Carros from "./pages/Carros"
import Contratos from "./pages/Contratos"

function App() {

  return (

    <div className="app">

      <Navbar />

      <main className="conteudo">

        <Routes>

          <Route path="/" element={

            <div>

              <h2>
                Sistema Administrativo
              </h2>

              <div className="caixinhas">

                <Link to="/funcionarios" className="caixinha">
                  <h3>Funcionários</h3>
                  <p>Gerenciar equipe</p>
                </Link>

                <Link to="/clientes" className="caixinha">
                  <h3>Clientes</h3>
                  <p>Gerenciar clientes</p>
                </Link>

                <Link to="/proprietarios" className="caixinha">
                  <h3>Proprietários</h3>
                  <p>Gerenciar proprietários</p>
                </Link>

                <Link to="/imoveis" className="caixinha">
                  <h3>Imóveis</h3>
                  <p>Gerenciar imóveis</p>
                </Link>

                <Link to="/vendas" className="caixinha">
                  <h3>Vendas</h3>
                  <p>Gerenciar vendas</p>
                </Link>

                <Link to="/locacoes" className="caixinha">
                  <h3>Locações</h3>
                  <p>Gerenciar locações</p>
                </Link>

                <Link to="/visitas" className="caixinha">
                  <h3>Visitas</h3>
                  <p>Gerenciar visitas</p>
                </Link>

                <Link to="/carros" className="caixinha">
                  <h3>Carros</h3>
                  <p>Gerenciar carros</p>
                </Link>

                <Link to="/contratos" className="caixinha">
                  <h3>Contratos</h3>
                  <p>Gerenciar contratos</p>
                </Link>

              </div>

            </div>

          } />

          <Route path = "/funcionarios" element={<Funcionarios />} />
          <Route path = "/funcionarios/cadastrar-funcionarios" element={<CadastrarFuncionarios/>}></Route>
          <Route path = "/funcionarios/mostrar-funcionarios" element={<MostrarFuncionarios/>}></Route>
          <Route path = "/funcionarios/atualizar-funcionarios/:id" element={<AtualizarFuncionarios/>}></Route>
          <Route path = "/funcionarios/deletar-funcionarios/:id" element={<DeletarFuncionario/>}></Route>

          <Route path="/clientes" element={<Clientes />} />
          <Route path="/clientes/mostrar-clientes" element={<MostrarClientes/>}></Route>
          <Route path="/clientes/cadastrar-clientes" element={<CadastrarClientes/>}></Route>
          <Route path="/clientes/atualizar-clientes/:id" element={<AtualizarClientes/>}></Route>
          <Route path="/clientes/deletar-clientes/:id" element={<DeletarClientes/>}></Route>

          <Route path="/proprietarios" element={<Proprietarios />} />
          <Route path="/proprietarios/mostrar-proprietarios" element={<MostrarProprietarios/>}></Route>
          <Route path="/proprietarios/cadastrar-proprietarios" element={<CadastrarProprietarios/>}></Route>
          <Route path="/proprietarios/atualizar-proprietarios" element={<AtualizarProprietarios/>}></Route>
          <Route path="/proprietarios/deletar-proprietarios" element={<DeletarProprietarios/>}></Route>

          <Route path="/imoveis" element={<Imoveis />} />

          <Route path="/vendas" element={<Vendas />} />

          <Route path="/locacoes" element={<Locacoes />} />

          <Route path="/visitas" element={<Visitas />} />

          <Route path="/carros" element={<Carros />} />

          <Route path="/contratos" element={<Contratos />} />

        </Routes>

      </main>

    </div>

  )

}

export default App
