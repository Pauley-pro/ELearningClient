'use client';
import React, { useState } from 'react';
import Heading from '../utils/Heading';
import Header from '../components/Header';
import About from './About';
import Footer from '../components/Footer';

type Props = {}

const Page = (props: Props) => {
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(2);
    const [route, setRoute] = useState("Login");

    return (
        <div>
            <Heading
                title="About us - Mindzyte"
                description="Mindzyte is a platform for students to learn and get help from teachers"
                keywords="Programming, MERN, Redux, Machine Learning"
            />
            <Header
                open={open}
                setOpen={setOpen}
                activeItem={activeItem}
                route={route}
                setRoute={setRoute}
            />
            <About />
            <Footer />
        </div>
    )
}

export default Page