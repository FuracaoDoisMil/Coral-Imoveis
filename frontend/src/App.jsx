import { Link, Routes, Route } from "react-router-dom"
import Admin from "./pages/Home"

function PaginaInicial() {
  return (
    <div className="home">
      <h1>Coral Imóveis</h1>
      <p>Bem-vindo ao sistema</p>

      <Link to="/admin" className="botao-admin">
        Ir para o Sistema Administrativo
      </Link>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<PaginaInicial />} />
      <Route path="/admin/*" element={<Admin />} />
    </Routes>
  )
}

export default App
