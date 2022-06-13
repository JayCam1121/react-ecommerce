import { Home, Login, ProductDetail, Purchases } from './pages';
import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import {Container} from 'react-bootstrap';
import { LoadingScreen, NarBar, ProtectedRoutes } from './components';
import { useSelector } from 'react-redux';


function App() {

  const isLoading = useSelector(state => state.isLoading);

  return (
    <HashRouter>
      <NarBar />
      <Container>
        { isLoading && <LoadingScreen />}
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/product/:id" element={<ProductDetail />}/>
          <Route path="/login" element={<Login />}/>
          <Route element={<ProtectedRoutes />}>
            <Route path="/purchases" element={<Purchases />}/>
          </Route>
        </Routes>
      </Container>
    </HashRouter>
  );
}

export default App;
