import "./App.css"

import { Routes, Route, Link } from "react-router-dom"

import Navbar from "./components/Navbar"

import Funcionarios from "./pages/Funcionarios"
import MostrarFuncionarios from "./pages/pages-Funcionarios/MostrarFuncionarios"
import CadastrarFuncionarios from "./pages/pages-Funcionarios/CadastrarFuncionarios"
import AtualizarFuncionarios from "./pages/pages-Funcionarios/AtualizarFuncionarios"
import DeletarFuncionario from "./pages/pages-Funcionarios/DeletarFuncionarios"

import Clientes from "./pages/Clientes"
import Proprietarios from "./pages/Proprietarios"
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
          <Route path = "/funcionarios/mostrar-funcionarios" element={<MostrarFuncionarios/>}></Route>
          <Route path = "/funcionarios/atualizar-funcionarios/:id" element={<AtualizarFuncionarios/>}></Route>
          <Route path = "/funcionarios/cadastrar-funcionarios" element={<CadastrarFuncionarios/>}></Route>
          <Route path = "/funcionarios/deletar-funcionarios/:id" element={<DeletarFuncionario/>}></Route>

          <Route path="/clientes" element={<Clientes />} />

          <Route path="/proprietarios" element={<Proprietarios />} />

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
