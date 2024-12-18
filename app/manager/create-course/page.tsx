"use client";
import React, { useState } from 'react';
import Heading from "../../../app/utils/Heading";
import ManagerSidebar from '@/app/components/Manager/sidebar/ManagerSidebar';
import CreateCourse from '@/app/components/Manager/Course/CreateCourse';
import DashboardHeader from '@/app/components/Manager/DashboardHeader';

type Props = {}

const Page = (props: Props) => {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <Heading 
                title="ELearning - Manager"
                description="ELearning is a platform for students to learn and get help from teachers"
                keywords="Programming, MERN, Redux, Machine Learning"
            />
            <div className="flex">
                <div className="1500px:w-[16%] w-1/5">
                    {typeof window !== "undefined" && <ManagerSidebar />}
                </div>
                <div className="w-[85%]">
                    {typeof window !== "undefined" && <DashboardHeader open={open} setOpen={setOpen} />}
                    {typeof window !== "undefined" && <CreateCourse />}
                </div>
            </div>
        </div>
    )
}

export default Page;
