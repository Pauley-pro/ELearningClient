'use client'
import Loader from '@/app/components/Loader/Loader';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import CourseContent from "../../components/Course/CourseContent";
import Header from '@/app/components/Header';

type Props = {
    params: any;
}

const Page = ({ params }: Props) => {
    const id = params.id;
    const { isLoading, error, data } = useLoadUserQuery(undefined, {});
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(2);
    const [route, setRoute] = useState("Login");

    useEffect(() => {
        if (data) {
            const isPurchased = data.user.courses.find((item: any) => item._id === id);
            if (!isPurchased) {
                redirect("/");
            }
            if (error) {
                redirect("/");
            }
        }
    }, [data, error, id]);

    return (
        <>
            {
                isLoading ? (
                    <Loader />
                ) : (
                    <div>
                        <Header
                            open={open}
                            setOpen={setOpen}
                            activeItem={activeItem}
                            route={route}
                            setRoute={setRoute}
                        />
                        <CourseContent id={id} user={data.user} />
                    </div>
                )
            }
        </>
    )
}

export default Page