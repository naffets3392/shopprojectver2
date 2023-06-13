import React, { useEffect, useRef, useState } from "react";
import './home.scss'
import stussy1 from '../../homeimages/stussy1home.jpg'
import stussy2 from '../../homeimages/stussy2home.jpg'
import stussy3 from '../../homeimages/stussy3home.jpg'
import stussy4 from '../../homeimages/stussy4home.jpg'
import stussy5 from '../../homeimages/stussy5home.jpg'

const imagesOne = [stussy1,stussy2,stussy3]
const imagesTwo = [stussy4,stussy5]

export default function Home() {
    const [onLoad,setOnLoad] = useState(false)
    const [slideLeft,setSlideLeft] = useState(false)
    const [slideRight,setSlideRight] = useState(false)
    const imagesTwoRef = useRef(null)
    const imagesOneRef = useRef(null)

    const imagesArr = [imagesOneRef,imagesTwoRef]

   useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
        const entry = entries[0]
        console.log(entry)
        if(entry.target.className.includes('imagesOne__cont')) {
            setSlideLeft(entry.isIntersecting)
        } else if(entry.target.className.includes('imagesTwo__cont')){
            setSlideRight(entry.isIntersecting)
        }
    },{rootMargin:'-170px 0px',threshold: 0})

    imagesArr.forEach(image => {
        observer.observe(image.current)
    })

   },[imagesArr])

    return (
        <div className="home__cont page__cont">
            <div ref={imagesOneRef} className={`imagesOne__cont ${slideLeft ? 'slideLeft' : ''}`}>
                {imagesOne.map(image => {
                    return (
                        <div>
                            <img src={image} alt="" />
                        </div>
                    )
                })}
            </div>
            <div ref={imagesTwoRef} className={`imagesTwo__cont ${slideRight ? 'slideRight' : ''}`}>
            {imagesTwo.map(image => {
                    return (
                        <div>
                            <img src={image} alt="" />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}