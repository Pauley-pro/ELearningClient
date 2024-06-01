import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { data } from "./data";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import NextBtn from "@/app/utils/PreviousBtn";
import PreviousBtn from "@/app/utils/NextBtn";
import Card from "./Card";

function cards(data: any) {
  return (
    <Card
      avatar={data.avatar}
      name={data.name}
      profession={data.profession}
      comment={data.comment}
    />
  );
}
function Testimonials() {
  const settings = {
    dots: true,
    fade: true,
    autoplay: true,
    infinite: true,
    speed: 500,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextBtn icon={ArrowForwardIos} />,
    prevArrow: <PreviousBtn icon={ArrowBackIos} />,
    appendDots: (dots: any) => <ul>{dots}</ul>,
    customPaging: (i: any) => (
      <div className="ft-slick__dots--custom">
        <div className="loading" />
      </div>
    )
  };
  return (
    <div className="testimonial">
      <div style={{ width: "80%" }}>
        <h1 className="heading">Testimonial Slider</h1>
        <Slider {...settings}>{data.map(cards)}</Slider>
      </div>
    </div>
  );
}
export default Testimonials;
