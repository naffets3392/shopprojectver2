import React, { useState } from "react";
import './itemInfo.scss'
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai'

export default function ItemInfo({itemInfo,setItemInfo,user, setUser, userLoggedIn,cart,setCart}) {
    const [num,setNum] = useState(0)
    const [showSizes,setShowSizes] = useState(false)
    const [selectedSize,setSelectedSize] = useState('')
    const [sizeAlert,setSizeAlert] = useState({text: '', color: '',callAlert: false})
    const images = itemInfo.images

    function plusFunc() {
        if(num === images.length -1) {
            setNum(0)
        } else {
            setNum(num + 1)
        }
    }

    function minusFunc() {
        if(num === 0) {
            setNum(images.length -1)
        } else {
            setNum(num - 1)
        }
    }

    function setSizeAlertFunc(text,color,callAlert) {
        setSizeAlert({text: text, color: color,callAlert: callAlert})
        setTimeout(() => {
            setSizeAlert({text: '', color: '',callAlert: false})
        },1000)
    }

    function addSizeFunc() {
        if(!selectedSize) {
            setSizeAlertFunc('select size!','red',true)
        } else {
            setSizeAlertFunc('item added to cart!','blue',true)
            const {model,price,images,} = itemInfo
            const itemObj = {model: model, price: price, image: images[0],size: selectedSize, id: Math.floor(Math.random() * 100000)}
            if(userLoggedIn) {
                const updatedUser = {...user, cart: [...user.cart, itemObj]}
                setUser(updatedUser)
                const storageUsers = JSON.parse(localStorage.getItem('storageUsers'))
                const updatedUsers = storageUsers.map(storageuser => {
                    if(storageuser.password === user.password && storageuser.name === user.name) {
                        return updatedUser
                    } else {
                        return storageuser
                    }
                })
                console.log(updatedUsers)
                localStorage.setItem('storageUsers', JSON.stringify(updatedUsers))
            } else {
                setCart([...cart,itemObj])
            }
            setSelectedSize('')
        }
    }

    function selectSizeFunc(size,event) {
        const siblings = Array.from(event.target.parentNode.children)
        siblings.forEach(sibling => {
            sibling.className = ''
        })
        event.target.className = 'selectedSize'
        setSelectedSize(size)
    }

    return (
        <div className="itemInfo__cont">
            <div className="inner__cont">
                <div className="image__cont">
                    <img src={images[num]} alt="" />
                    <div className="buttons__cont">
                        <AiOutlineArrowLeft className="arrowIcon" onClick={minusFunc} />
                        <AiOutlineArrowRight className="arrowIcon" onClick={plusFunc} />
                    </div>
                </div>
                <div className="info__cont">
                    <div className="nameAndPrice">
                        <h3>{itemInfo.model}</h3>
                        <h5>Price: {itemInfo.price}$</h5>
                    </div>
                    {sizeAlert.callAlert && <p className={`alert ${sizeAlert.color === 'blue' ? 'blue' : ''} ${sizeAlert.color === 'red' ? 'red' : ''}`}>{sizeAlert.text}</p>}
                    {!sizeAlert.callAlert && <div className="sizes__cont">
                        <div className="arrow__cont">
                            <h5>Sizes</h5>
                            {!showSizes && <AiOutlineArrowDown className="arrowIcon" onClick={() => setShowSizes(true)}/>}
                            {showSizes && <AiOutlineArrowUp className="arrowIcon" onClick={() => setShowSizes(false)}/>}
                        </div>
                        <div className={`innerSizes__cont ${showSizes ? 'show' : ''}`}>
                            {itemInfo.sizes.map(size => {
                                return (
                                    <h6 onClick={(event) => selectSizeFunc(size,event)}>{size}</h6>
                                )
                            })}
                        </div>
                    </div>}
                    <div className="buttons__cont">
                        <button onClick={addSizeFunc}>Add to cart</button>
                        <button onClick={() => setItemInfo(null)}>Back</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

