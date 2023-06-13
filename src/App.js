import './App.scss';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/nav/Nav';
import Home from './pages/home/Home';
import Shop from './pages/shop/Shop';
import SignInUp from './components/signInUp/SignInUp';
import Cart from './pages/cart/Cart';

// localStorage.clear()

function App() {
  const [slideInNav,setSlideInNav] = useState(false)
  const [signIn,setSignIn] = useState(false)
  const [signUp,setSignUp] = useState(false)
  const [user,setUser] = useState({})
  const [userLoggedIn,setUserLoggedIn] = useState(false)
  const [searchedWord,setSearchedWord] = useState('')
  const [searchedItems,setSearchedItems] = useState([])
  const [cart,setCart] = useState([])

  return (
    <Router>
      <div className="App">
        <Nav 
          cart={cart}
          user={user}
          slideInNav={slideInNav}
          setSlideInNav={setSlideInNav}
          setSignIn={setSignIn}
          setSignUp={setSignUp}
          userLoggedIn={userLoggedIn} 
          setUserLoggedIn={setUserLoggedIn}
          searchedWord={searchedWord}
          setSearchedWord={setSearchedWord}
          setSearchedItems={setSearchedItems}/>
        <SignInUp 
          signIn={signIn} 
          signUp={signUp} 
          setSignIn={setSignIn} 
          setSignUp={setSignUp} 
          setUser={setUser}
          setUserLoggedIn={setUserLoggedIn}/>
        <Routes>
          <Route path='/' exact element={<Home />}/>
          <Route path='/shop' exact element={<Shop
          cart={cart} 
          setCart={setCart}
          searchedWord={searchedWord} 
          setSearchedWord={setSearchedWord} 
          searchedItems={searchedItems}
          setSearchedItems={setSearchedItems} 
          setSlideInNav={setSlideInNav} 
          userLoggedIn={userLoggedIn} 
          user={user}
          setUser={setUser}/>}/>
          <Route path='/cart' exact element={<Cart 
          setSlideInNav={setSlideInNav}
          userLoggedIn={userLoggedIn}
          cart={cart}
          setCart={setCart}
          user={user}
          setUser={setUser}/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
