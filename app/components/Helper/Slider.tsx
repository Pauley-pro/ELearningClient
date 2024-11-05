"use client"
import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SliderCard from './SliderCard';

const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1324 },
      items: 1,
      slidesToSlide: 1
    },
    tablet: {
      breakpoint: { max: 1324, min: 764 },
      items: 1,
      slidesToSlide: 1
    },
    mobile: {
      breakpoint: { max: 764, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };

const Slider = () => {
    return (
        <Carousel 
            additionalTransfrom={0} 
            arrows={true} 
            autoPlay={true} 
            autoPlaySpeed={5000} 
            centerMode={false}
            infinite responsive={responsive}
            itemClass="item"
        >
            <SliderCard 
                image="https://res.cloudinary.com/polad/image/upload/v1702565039/avatars/cwpuzbts9y3zjou4llxy.png"
                name="Jessica Doe"
                role="Web developer"
            />
            <SliderCard 
                image="https://res.cloudinary.com/polad/image/upload/v1702565039/avatars/cwpuzbts9y3zjou4llxy.png"
                name="John Doe"
                role="Data Analyst"
            />
            <SliderCard 
                image="https://res.cloudinary.com/polad/image/upload/v1702565039/avatars/cwpuzbts9y3zjou4llxy.png"
                name="Jonas Doe"
                role="Software Engineer"
            />
        </Carousel>
    )
}

export default Slider