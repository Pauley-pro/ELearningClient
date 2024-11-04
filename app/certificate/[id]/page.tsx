'use client'
import Loader from '@/app/components/Loader/Loader';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import React, { useEffect, useState } from 'react';
import CourseTest from '@/app/components/Course/CourseTest';
import Header from '@/app/components/Header';
import Heading from '@/app/utils/Heading';
import { useSelector } from 'react-redux';
import Footer from '@/app/components/Footer';
import CourseCertificate from '@/app/components/Course/CourseCertificate';
import { useGetCourseDetailsQuery } from '@/redux/features/courses/coursesApi';

type Props = {
    params: any;
}

const Page = ({ params }: Props) => {
    const id = params.id;
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(5);
    const [route, setRoute] = useState("Login");
    const { user } = useSelector((state: any) => state.auth);
    const { data, isLoading } = useGetCourseDetailsQuery(id);



    return (
        <>
            {
                isLoading ? (
                    <Loader />
                ) : (
                    <div>
                        <Heading
                            title={`${user?.name} - Certificate `}
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
                        <CourseCertificate
                            id={id}
                            user={user}
                            data={data.course}
                            // courseTitle={}
                        />
                        <Footer />
                    </div>
                )
            }
        </>
    )
}

export default Page