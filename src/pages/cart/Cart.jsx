import React, { useEffect, useState } from "react";
import './cart.scss'
import {countries} from '../../countries'
import { useNavigate } from "react-router-dom";
import { Card } from "@mui/material";

export default function Cart({userLoggedIn,cart,setCart,user,setUser,setSlideInNav}) {
    const [cartItems,setCartItems] = useState([])
    const [itemsPrice,setItemsPrice] = useState(0)
    const [slideIn,setSlideIn] = useState(false)
    const [checkout,setCheckout] = useState(false)
    const [country,setCountry] = useState('')
    const [city,setCity] = useState('')
    const [name,setName] = useState('')
    const [surname,setSurname] = useState('')
    const [phone,setPhone] = useState('')
    const [card,setCard] = useState('')
    const [adress,setAdress] = useState('')
    const [finished,setFinished] = useState(false)
    const countriesObj = countries[0]
    const navigate = useNavigate() 

    function removeItemFunc(id) {
        const filteredCartItems = cartItems.filter(item => item.id !== id)
        if(userLoggedIn) {
            const updatedUser = {...user, cart: filteredCartItems}
            setUser(updatedUser)
            storageFunc(updatedUser)
        } else {
            setCart(filteredCartItems)
        }
    }

    function clearCartFunc() {
        if(userLoggedIn) {
            const updatedUser = {...user,cart:[]}
            setUser(updatedUser)
            storageFunc(updatedUser)
        } else {
            setCart([])
        }
    }

    function storageFunc(updatedUser) {
        const storageUsers = JSON.parse(localStorage.getItem('storageUsers'))
        const updatedStorageUsers = storageUsers.map(user => {
            if(user.password === updatedUser.password) {
                return updatedUser
            } else {
                return user
            }
        })
        localStorage.setItem('storageUsers', JSON.stringify(updatedStorageUsers))
    }

    function ProcceedFunc() {
        if(!country) {
            alertFunc(setCountry,'Need to add country!','country')
            return
        }
        const countryUpperCase = country[0].toUpperCase() + country.slice(1,country.length).toLowerCase()
        if(!countriesObj[countryUpperCase]) {
            alertFunc(setCountry,'Country does not exist!','country')
            return
        }
        if(!city) {
            alertFunc(setCity,'Need to add city!','city')
            return
        }
        const cityUpperCase = city[0].toUpperCase() + city.slice(1,city.length).toLowerCase()
        console.log(cityUpperCase)
        if(!countriesObj[countryUpperCase].includes(cityUpperCase)) {
            alertFunc(setCity,'City does not exist in country!','city')
            return
        }
        if(!name) {
            alertFunc(setName,'Need to add name!','nameprocceed')
            return
        }
        if(!surname) {
            alertFunc(setSurname,'Need to add surname!','surnameprocceed')
            return
        }
        if(!phone) {
            alertFunc(setPhone,'Need to add Phone!','phone')
            return
        }
        const redExp = /[a-zA-Z]/g
        if(phone.length < 6) {
            alertFunc(setPhone, 'phone need at least 6 numbers!','phone')
        }
        if(redExp.test(phone)) {
            alertFunc(setPhone,'phone can not include letters!','phone')
            return
        }
        if(!card) {
            alertFunc(setCard,'Need to add card!','card')
            return
        }
        if(card.length < 9) {
            alertFunc(setCard, 'card need at least 9 numbers!', 'card')
            return
        }
        if(redExp.test(card)) {
            alertFunc(setCard,'card can not include letters!', 'card')
            return
        }
        if(!adress) {
            alertFunc(setAdress,'Need to add adress!','adress')
            return
        }
        setCheckout(false)
        setFinished(true)
        setTimeout(() => {
            navigate('/')
            setFinished(false)
        },1500)

        if(userLoggedIn) {
            const updatedUser = {...user,cart: []}
            setUser(updatedUser)
            const storageUsers = JSON.parse(localStorage.getItem('storageUsers'))
            const updatedUsers = storageUsers.map(user => {
                if(user.password === updatedUser.password) {
                    return updatedUser
                } else {
                    return user
                }
            })
            localStorage.setItem('storageUsers', JSON.stringify(updatedUsers))
            console.log(storageUsers)
        } else {
            setCart([])
        }
    }

    function alertFunc(func,text,id) {
        func(text)
        const targetEle = document.getElementById(id)
        targetEle.style.color = 'red'
        targetEle.disabled = true
        setTimeout(() => {
            func('')
            targetEle.style.color = 'black'
            targetEle.disabled = false
        }, 1500);
    }

    function checkOutFunc() {
        setCheckout(true)
        setSlideInNav(false)
    }

    useEffect(() => {
        const price = cartItems.reduce((acc,item) => acc + item.price,0)
        setItemsPrice(price)
    },[cartItems])

    useEffect(() => {
        if(card.length === 3) {
            const cardNum = card + '-'
            setCard(cardNum)
        } else if(card.length === 10) {
            const cardNum = card + '-'
            setCard(cardNum)
        }
    },[card])

    useEffect(() => {
        if(userLoggedIn) {
            const userItems = user.cart
            setCartItems(userItems)
        } else {
            setCartItems(cart)
        }
    },[cart,user,userLoggedIn])

    useEffect(() => {
        if(userLoggedIn) {
            setName(user.name)
            setSurname(user.surname)
        } else {
            setName('')
            setSurname('')
        }
        setCountry('')
        setCity('')
        setPhone('')
        setCard('')
        setAdress('')
    },[checkout])

    useEffect(() => {
        setSlideIn(true)
        setCheckout(false)
    },[])

    if(finished) {
        return (
            <div className="finished__cont">
                <div className="inner__cont">
                    <h3>Congratz!</h3>
                    <h5>Shopping is successfull!</h5>
                </div>
            </div>
        )
    }
    
    if(checkout) {
        return (
            <div className="checkout__cont">
                <div className="inner__cont">
                    <h3>Checkout</h3>
                    <div className="inputs__cont">
                        <div>
                            <label htmlFor="country">Country</label>
                            <input id="country" type="text" value={country} onChange={(e) => setCountry(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="city">City</label>
                            <input id="city" type="text" value={city} onChange={(e) => setCity(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="nameprocceed">Name</label>
                            <input id="nameprocceed" type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="surnamerocceed">Surname</label>
                            <input id="surnameprocceed" type="text" value={surname} onChange={(e) => setSurname(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="phone">Phone</label>
                            <input id="phone" type="text" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="card">Card</label>
                            <input id="card" type="text" value={card} onChange={(e) => setCard(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="adress">Adress</label>
                            <input id="adress" type="text" value={adress} onChange={(e) => setAdress(e.target.value)}/>
                        </div>
                    </div>
                    <div className="buttons__cont">
                        <button onClick={ProcceedFunc}>Procceed</button>
                        <button onClick={() => setCheckout(false)}>Back</button>
                    </div>
                </div>
            </div>
        )
    }

    if(!cartItems.length) {
        return (
            <div className={`page__cont cartPage__cont ${slideIn ? 'slideIn' : ''}`}>
                <h3 className="noItems">No items in cart!</h3>
            </div>
        )
    } else {
        return (
            <div className={`page__cont cartPage__cont ${slideIn ? 'slideIn' : ''}`}>
                <div className="total__cont">
                    <h3>Total: {itemsPrice}$</h3>
                    <div className="buttons__cont">
                        <button onClick={checkOutFunc}>Checkout</button>
                        <button onClick={clearCartFunc}>Clear cart</button>
                    </div>
                </div>
                <div className="cartItems__cont">
                    {cartItems.map(item => {
                        return (
                            <div className="cartItem__cont">
                                <div className="image__cont">
                                    <img src={item.image} alt="" />
                                </div>
                                <div className="info__cont">
                                    <div className="nameAndPrice__cont">
                                        <h4>{item.model}</h4>
                                        <h6 className="price">price: {item.price}$</h6>
                                        <h6 className="size">size: {item.size}</h6>
                                    </div>
                                    <div className="button__cont">
                                        <button onClick={() => removeItemFunc(item.id)}>Remove item</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}