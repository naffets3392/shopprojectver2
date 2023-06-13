import React, { useEffect, useState } from "react";
import './shop.scss'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {data} from '../../data'
import Shopitem from "../../components/shopItem/ShopItem";
import ItemInfo from "../../components/itemInfo/ItemInfo";

export default function Shop({cart, setCart, searchedWord, setSearchedWord, searchedItems, setSearchedItems , setSlideInNav,userLoggedIn,user, setUser}) {
    const [dataItems,setDataItems] = useState([])
    const [brand,setBrand] = useState('')
    const [gender,setGender] = useState('')
    const [category,setCategory] = useState('')
    const [slideInShop, setSlideInShop] = useState(false)
    const [itemInfo,setItemInfo] = useState(null)

    const  handleBrandFunc = (event) => {
        setSlideInNav(false)
        setSearchedWord('')
        setBrand(event.target.value)
    }

    const  handleGenderFunc = (event) => {
        setSlideInNav(false)
        setSearchedWord('')
        setGender(event.target.value)
    }

    const  handleCategoryFunc = (event) => {
        setSlideInNav(false)
        setSearchedWord('')
        setCategory(event.target.value)
    }

    const brandsArr = ['All', ... new Set(data.map(obj => obj.brand))]
    const genderArr = ['All', ... new Set(data.map(obj => obj.gender))].map(x => {
        return x[0].toUpperCase() + x.slice(1,x.length)
    })

    const categoryArr = ['All', ... new Set(data.map(obj => obj.category))].map(x => {
        return x[0].toUpperCase() + x.slice(1,x.length)
    })

    useEffect(() => {
        if(!searchedWord.length) {
            const dataNewItems = data.filter(item => {
                if((item.brand === brand || brand === '' || brand === 'All') && ((item.category.toLowerCase() === category.toLowerCase() || category === '' || category === 'All')) && ((item.gender.toLowerCase() === gender.toLowerCase() || gender === '' || gender === 'All'))) {
                    return item 
                }
            })
            setDataItems(dataNewItems)
            setSearchedItems([])
        }
    },[brand,gender,category])

    useEffect(() => {
        if(!searchedItems.length && searchedWord.length) {
            setDataItems([])
            return
        }

        if(searchedItems.length) {
            setDataItems(searchedItems)
            setBrand('')
            setGender('')
            setCategory('')
        }
    },[searchedItems])

    useEffect(() => {
        setSlideInShop(true)
    },[])

    if(itemInfo) {
        return (
            <ItemInfo itemInfo={itemInfo} setItemInfo={setItemInfo} user={user} cart={cart} setCart={setCart} setUser={setUser} userLoggedIn={userLoggedIn}/>
        )
    } else {
        return (
            <div className={`page__cont shop__cont ${slideInShop ? 'slideIn' : ''}`}>
                <div className="selects__cont">
                    <div className="select__cont brand__cont">
                        <FormControl fullWidth>
                            <InputLabel>Brand</InputLabel>
                                <Select
                                    value={brand}
                                    label="Brand"
                                    onChange={handleBrandFunc}
                                >
                                 {brandsArr.map(brand => {
                                    return  <MenuItem value={brand}>{brand}</MenuItem>
                                 })}   
                                </Select>
                        </FormControl>
                    </div>
                    <div className="select__cont gender__cont">
                        <FormControl fullWidth>
                            <InputLabel>Gender</InputLabel>
                                <Select
                                    value={gender}
                                    label="Gender"
                                    onChange={handleGenderFunc}
                                >
                                 {genderArr.map(gender => {
                                    return  <MenuItem value={gender}>{gender}</MenuItem>
                                 })} 
                                </Select>
                        </FormControl>
                    </div>
                    <div className="select__cont category__cont">
                        <FormControl fullWidth>
                            <InputLabel>Category</InputLabel>
                                <Select
                                    value={category}
                                    label="Category"
                                    onChange={handleCategoryFunc}
                                >
                                     {categoryArr.map(category => {
                                    return  <MenuItem value={category}>{category}</MenuItem>
                                 })} 
                                </Select>
                        </FormControl>
                    </div>
                </div>
                {!dataItems.length && <h3 className="noProducts">No products!</h3>}
                <div className="shopItems__cont">
                    {dataItems.map(item => {
                        return (
                           <Shopitem item={item} setItemInfo={setItemInfo} setSlideInNav={setSlideInNav}/>
                        )
                    })}
                </div>
            </div>
        )
    }
}