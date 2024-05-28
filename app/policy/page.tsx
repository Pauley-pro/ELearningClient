'use client';
import React, { useState } from 'react';
import Heading from '../utils/Heading';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Policy from './Policy';

type Props = {}

const Page = (props: Props) => {
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(3);
    const [route, setRoute] = useState("Login");

    return (
        <div className="min-h-screen">
            <Heading
                title="Policy - ELearning"
                description="ELearning is a platform for students to learn and get help from teachers"
                keywords="Programming, MERN, Redux, Machine Learning"
            />
            <Header
                open={open}
                setOpen={setOpen}
                activeItem={activeItem}
                route={route}
                setRoute={setRoute}
            />
            <Policy />
            <Footer />
        </div>
    )
}

export default Page