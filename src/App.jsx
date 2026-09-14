import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Inicio from './pages/Inicio.jsx'
import DetalhesTitulo from './pages/DetalhesTitulo.jsx'
import MinhasListas from './pages/MinhasListas.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Inicio />} />
        <Route path="titulo/:id" element={<DetalhesTitulo />} />
        <Route path="minhas-listas" element={<MinhasListas />} />
      </Route>
    </Routes>
  )
}

export default App
