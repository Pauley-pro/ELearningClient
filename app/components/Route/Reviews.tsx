import React, { useEffect, useState } from "react";
import Image from "next/image";
import { styles } from "@/app/styles/style";
import ReviewCard from "../Review/ReviewCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import NextBtn from "@/app/utils/PreviousBtn";
import PreviousBtn from "@/app/utils/NextBtn";

type Props = {}

export const reviews = [
    {
        name: "Gene Bates",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        profession: "Student | Cambridge University",
        comment: "I had the pleasure of exploring ELearning, a website that provides an extensive range of courses on various tech-related topics. I was thoroughly impressed with my experience, as the website offers a comprehensive selection of courses that cater to different skill levels and interests. If you're looking to enhance your knowledge and skills in the tech industry, I highly recommend checking out ELearning!",
    },
    {
        name: "Verna Santos",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        profession: "Full Stack developer | Quarter ltd",
        comment: "Thanks for your amazing programming tutorial channel! Your teaching style is outstanding, and the quality of your tutorials is top-notch. Your ability to break down complex topics into manageable parts, and cover diverse programming languages and topics is truly impressive. The practical applications and real-world examples you incorporate reinforce the theoretical knowledge and provide valuable insights. Your engagement with the audience fosters a supportive learning environment. Thank you for your dedication, expertise, and passion for teaching programming, and keep up the fantastic work!",
    },
    {
        name: "Jay Gibbs",
        avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        profession: "Computer syatems engineering student | Zimbabwe",
        comment: "Thanks for your amazing programming tutorial channel! Your teaching style is outstanding, and the quality of your tutorials is top-notch. Your ability to break down complex topics into manageable parts, and cover diverse programming languages and topics is truly impressive. The practical applications and real-world examples you incorporate reinforce the theoretical knowledge and provide valuable insights. Your engagement with the audience fosters a supportive learning environment. Thank you for your dedication, expertise, and passion for teaching programming, and keep up the fantastic work!",
    },
    {
        name: "Mina Davidson",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        profession: "Junior Web Developer | Indonesia",
        comment: "I had the pleasure of exploring ELearning, a website that provides an extensive range of courses on various tech-related topics. I was thoroughly impressed with my experience",
    },
    {
        name: "Rosemary Smith",
        avatar: "https://randomuser.me/api/portraits/women/3.jpg",
        profession: "Full Stack developer | Algeria",
        comment: "Join ELearning! ELearning focuses on practical applications rather than just teaching the theory behind programming languages or frameworks. I took a lesson on creating a web marketplace using React JS, and it was very helpful in teaching me the different stages involved in creating a project from start to finish. Overall, I highly recommend ELearning to anyone looking to improve their programming skills and build practical projects. ELearning is a great resource that will help you take your skills to the next level.",
    },
    {
        name: "Laura Mckenzie",
        avatar: "https://randomuser.me/api/portraits/women/4.jpg",
        profession: "Full Stack developer | Canada",
        comment: "Join ELearning! ELearning focuses on practical applications rather than just teaching the theory behind programming languages or frameworks. I took a lesson on creating a web marketplace using React JS, and it was very helpful in teaching me the different stages involved in creating a project from start to finish. Overall, I highly recommend ELearning to anyone looking to improve their programming skills and build practical projects. ELearning is a great resource that will help you take your skills to the next level.",
    },
]

const Reviews = (props: Props) => {
    const settings = {
        dots: true,
        fade: true,
        autoplay: true,
        infinite: true,
        speed: 500,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextBtn icon={IoIosArrowForward} />,
        prevArrow: <PreviousBtn icon={IoIosArrowBack} />,
        appendDots: (dots: any) => <ul>{dots}</ul>,
        customPaging: (i: any) => (
            <div className="ft-slick__dots--custom">
                <div className="loading" />
            </div>
        )
    };

    return (
        <div className="w-[90%] 800px:w-[85%] m-auto">
            <div className="w-full 800px:flex items-center">
                <div className="800px:w-[50%] w-full">
                    <Image
                        src={require("../../../public/images/business-img.png")}
                        alt="business"
                        width={600}
                        height={600}
                    />
                </div>
                <div className="800px:w-[50%] w-full">
                    <h3 className={`${styles.title} 800px:!text-[40px]`}>
                        Our Students Are <span className="text-gradient">Our Strength</span>{" "}<br />See What They Say About Us
                    </h3>
                    <br />
                    <p className={styles.label}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque unde
                        voluptatum dignissimos, nulla perferendis dolorem voluptate nemo
                        possimus magni deleniti natus accusamus officiis quasi nihil
                        commodi, praesentium quidem, quis doloribus?
                    </p>
                </div>
                <br />
                <br />
            </div>
            <br />
            <br />
            <div className="flex justify-center">
                <div className="w-[80%] max-w-[1200px] px-4 mx-auto">
                    <Slider {...settings}>
                        {
                            reviews && reviews.map((i, index) => <ReviewCard item={i} key={index} />)
                        }
                    </Slider>
                </div>
            </div>

        </div>
    )
}

export default Reviews;