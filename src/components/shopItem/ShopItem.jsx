import './shopItem.scss'
import React, { useEffect, useRef, useState } from "react";

export default function Shopitem({item,setItemInfo,setSlideInNav}) {
    const itemRef = useRef(null)
    const [slideItem,setSlideItem] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setSlideItem(entry.isIntersecting)
        },{rootMargin:'-35px 0px', threshold:0})

        observer.observe(itemRef.current)

    },[itemRef])

    function setItemInfoFunc() {
        setItemInfo(item)
        setSlideInNav(false)
    }

    return (
        <div onClick={setItemInfoFunc} ref={itemRef} className={`shopItem__cont ${window.innerWidth < 550 ? 'mobile' : ''} ${slideItem && window.innerWidth < 550 ? 'slideLeft' : ''}`}>
            <img src={item.images[0]} />
            <h4>{item.model}</h4>
        </div>
    )
}