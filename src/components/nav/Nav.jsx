import react, { useEffect, useState } from "react";
import './nav.scss'
import { FaAngrycreative } from 'react-icons/fa'
import { AiOutlineSearch } from 'react-icons/ai'
import { HiMenuAlt3 } from 'react-icons/hi'
import { RxCross2 } from 'react-icons/rx'
import { BsCart } from 'react-icons/bs'
import { Link } from "react-router-dom";
import { data } from "../../data";

export default function Nav({cart, user, slideInNav,setSlideInNav,setSignIn,setSignUp,userLoggedIn,setUserLoggedIn, searchedWord, setSearchedWord,setSearchedItems}) {
    const [showNav,setShowNav] = useState(false)
    const [cartItems,setCartItems] = useState(0)
    const [active,setActive] = useState('home')

    function signInFunc() {
        setSignUp(false)
        setSignIn(true)
    }

    function signUpFunc() {
        setSignIn(false)
        setSignUp(true)
    }

    function searchItemsFunc() {
        const searchedWordLowerCase = searchedWord.toLowerCase()
        const searchedItemsArr = data.filter(item => {
            const itemBrand = item.brand.toLowerCase()
            const itemModel = item.model.toLowerCase()
            if(itemBrand.includes(searchedWordLowerCase) 
            || itemModel.includes(searchedWordLowerCase)) {
                return item
            }
        })
        setSearchedItems(searchedItemsArr)
        if(window.innerWidth < 550) {
            setSlideInNav(false)
        }
    }

    useEffect(() => {
        if(userLoggedIn) {
            const userItems = user.cart.length
            setCartItems(userItems)
        } else {
            setCartItems(cart.length)
        }
    })

    useEffect(() => {
        setTimeout(() => {
            setShowNav(true)
        },0)
    },[])

    return (
        <nav>
            <Link to='/'><FaAngrycreative className="logoIcon"/></Link>
            <div className={`linksAndSearch__cont ${slideInNav ? 'showNav' : ''}`}>
                <ul className="links__cont">
                    <li className={`${window.innerWidth < 550 ? 'mobile' : ''} ${slideInNav ? 'homeAni' : ''}`}><Link onClick={() => setSlideInNav(false)} className="link active" to='/'>Home</Link></li>
                    <li className={`${window.innerWidth < 550 ? 'mobile' : ''} ${slideInNav ? 'shopAni' : ''}`}><Link onClick={() => setSlideInNav(false)} className="link" to='/shop'>Shop</Link></li>
                    <li className={`${window.innerWidth < 550 ? 'mobile' : ''} ${slideInNav ? 'cartAni' : ''}`}><Link onClick={() => setSlideInNav(false)} className="link" to='/cart'>Cart</Link></li>
                </ul>
                <div className={`search__cont ${window.innerWidth < 550 ? 'mobile' : ''} ${slideInNav ? 'searchAni' : ''}`}>
                    <input type="text" placeholder="search..." value={searchedWord} onChange={(e) => setSearchedWord(e.target.value)}/>
                    <Link to='/shop'><AiOutlineSearch onClick={searchItemsFunc} className="searchIcon"/></Link>
                </div>
            </div>
            <div className="user__cont">
                {!userLoggedIn && <button onClick={signInFunc}>Sign In</button>}
                {!userLoggedIn &&  <button onClick={signUpFunc}>Sign Up</button>}
                {userLoggedIn &&  <button onClick={() => setUserLoggedIn(false)}>Sign Out</button>}
                
            </div>
            <Link to='/cart'>
                <div className="cart__cont">
                    <BsCart className="cartIcon"/>
                    {cartItems !== 0 && <p>{cartItems}</p>}
                </div>
            </Link>   
            <div className="hamburger__cont">
                {!slideInNav && <HiMenuAlt3 onClick={() => setSlideInNav(true)} className="hamburgerIcon"/>}
                {slideInNav && <RxCross2 onClick={() => setSlideInNav(false)} className="hamburgerIcon"/>}
            </div>
        </nav>
    )
}