'use client'
import Loader from '@/app/components/Loader/Loader';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import CourseContent from "../../components/Course/CourseContent";
import CourseTest from '@/app/components/Course/CourseTest';
import Header from '@/app/components/Header';
import Heading from '@/app/utils/Heading';
import { useSelector } from 'react-redux';
import Footer from '@/app/components/Footer';

type Props = {
    params: any;
}

const Page = ({ params }: Props) => {
    const id = params.id;
    const { isLoading, error, data } = useLoadUserQuery(undefined, {});
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(5);
    const [route, setRoute] = useState("Login");
    const {user} = useSelector((state:any) => state.auth);

    /*useEffect(() => {
        if (data){
            const isPurchased = data.user.courses.find((item:any) => item._id === id);
            if (!isPurchased){
                redirect("/");
            }
            if (error){
                redirect("/");
            }
        }
    },[data, error, id]);*/

    return (
        <>
            {
                isLoading ? (
                    <Loader />
                ) : (
                    <div>
                        <Heading
                            title={`${user?.name} - Test `}
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
                        <CourseTest id={id} user={data.user} />
                        <Footer />
                    </div>
                )
            }
        </>
    )
}

export default Page