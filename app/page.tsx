'use client'
import React, {FC, useState} from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Courses from "./components/Route/Courses";
import Reviews from "./components/Route/Reviews";
import FAQ from "./components/FAQ/FAQ";
import Footer from "./components/Footer";
import Heading from "./utils/Heading";
import Categories from "./components/Categories/Categories";


interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(5);
  const [route, setRoute] = useState("Login");
  
  return (
    <div>
      <Heading 
        title="ELearning"
        description="ELearning is a platform for students to learn and get help from teachers"
        keywords="Programming, MERN, Redux, Machine Learning"
      />
      <Header 
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
      <Hero />
      <Categories />
      {/*<Courses />*/}
      <Reviews />
      <br />
      <br />
      <FAQ />
      <Footer />
    </div>
  )
};

export default Page;