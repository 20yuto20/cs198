import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AnimeDetail from './pages/AnimeDetail';
import MyList from './pages/MyList';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/anime/:id" element={<AnimeDetail />} />
            <Route path="/mylist" element={<MyList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
