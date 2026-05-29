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
import MostrarImoveis from "./pages/pages-Imoveis/MostrarImoveis"
import CadastrarImoveis from "./pages/pages-Imoveis/CadastrarImoveis"
import AtualizarImoveis from "./pages/pages-Imoveis/AtualizarImoveis"
import DeletarImoveis from "./pages/pages-Imoveis/DeletarImoveis"


import Vendas from "./pages/Vendas"
import MostrarVendas from "./pages/pages-Vendas/MostrarVendas"
import CadastrarVendas from "./pages/pages-Vendas/CadastrarVendas"
import AtualizarVendas from "./pages/pages-Vendas/AtualizarVendas"
import DeletarVendas from "./pages/pages-Vendas/DeletarVendas"

import Locacoes from "./pages/Locacoes"
import MostrarLocacoes from "./pages/pages-Locacoes/MostrarLocacoes"
import CadastrarLocacoes from "./pages/pages-Locacoes/CadastrarLocacoes"
import AtualizarLocacoes from "./pages/pages-Locacoes/AtualizarLocacoes"
import DeletarLocacoes from "./pages/pages-Locacoes/DeletarLocacoes"



import Visitas from "./pages/Visitas"
import MostrarVisitas from "./pages/pages-Visitas/MostrarVisitas"
import CadastrarVisitas from "./pages/pages-Visitas/CadastrarVisitas"
import AtualizarVisitas from "./pages/pages-Visitas/AtualizarVisitas"
import DeletarVisitas from "./pages/pages-Visitas/DeletarVisitas"


import Carros from "./pages/Carros"
import MostrarCarros from "./pages/pages-Carros/MostrarCarros" 
import CadastrarCarros from "./pages/pages-Carros/CadastrarCarros"
import AtualizarCarros from "./pages/pages-Carros/AtualizarCarros"
import DeletarCarros from "./pages/pages-Carros/DeletarCarros"


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
          <Route path="/proprietarios/atualizar-proprietarios/:id" element={<AtualizarProprietarios/>}></Route>
          <Route path="/proprietarios/deletar-proprietarios/:id" element={<DeletarProprietarios/>}></Route>

          <Route path="/imoveis" element={<Imoveis />} />
          <Route path="/imoveis/mostrar-imoveis" element={<MostrarImoveis/>}></Route>
          <Route path="/imoveis/cadastrar-imoveis" element={<CadastrarImoveis/>}></Route>
          <Route path="/imoveis/atualizar-imoveis/:id" element={<AtualizarImoveis/>}></Route>
          <Route path="/imoveis/deletar-imoveis/:id" element={<DeletarImoveis/>}></Route>


          <Route path="/vendas" element={<Vendas />} />
          <Route path="/vendas/mostrar-vendas" element={<MostrarVendas/>}></Route>
          <Route path="/vendas/cadastrar-vendas/:id" element={<CadastrarVendas/>}></Route>
          <Route path="/vendas/atualizar-vendas/:id" element={<AtualizarVendas/>}></Route>
          <Route path="/vendas/deletar-vendas/:id" element={<DeletarVendas/>}></Route>



          <Route path="/locacoes" element={<Locacoes />} />
          <Route path="/locacoes/mostrar-locacoes" element={<MostrarLocacoes/>}></Route>
          <Route path="/locacoes/cadastrar-locacoes/:id" element={<CadastrarLocacoes/>}></Route>
          <Route path="/locacoes/atualizar-locacoes/:id" element={<AtualizarLocacoes/>}></Route>
          <Route path="/locacoes/deletar-locacoes/:id" element={<DeletarLocacoes/>}></Route>


          <Route path="/visitas" element={<Visitas />} />
          <Route path="/visitas/mostrar-visitas" element={<MostrarVisitas/>}></Route>
          <Route path="/visitas/cadastrar-visitas/" element={<CadastrarVisitas/>}></Route>
          <Route path="/visitas/atualizar-visitas/:id" element={<AtualizarVisitas/>}></Route>
          <Route path="/visitas/deletar-visitas/:id" element={<DeletarVisitas/>}></Route>



          <Route path="/carros" element={<Carros />} />
          <Route path="/carros/mostrar-carros" element={<MostrarCarros/>}></Route>
          <Route path="/carros/cadastrar-carros" element={<CadastrarCarros/>}></Route>
          <Route path="/carros/atualizar-carros/:id" element={<AtualizarCarros/>}></Route>
          <Route path="/carros/deletar-carros/:id" element={<DeletarCarros/>}></Route>

          <Route path="/contratos" element={<Contratos />} />

        </Routes>

      </main>

    </div>

  )

}

export default App
