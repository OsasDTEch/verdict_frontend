import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Home from './pages/Home';
import About from './pages/About'
import Contact from './pages/Contact'

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <Link to ='/'>Home</Link> | {" "}
          <Link to ='/contact'>Contact</Link> | {" "}
          <Link to ='/about'>About</Link> | {" "}
        </nav>

        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path= '/contact' element={<Contact/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='*' element={<h2>404 Page not found</h2>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App