"use client";
import React, { useState } from 'react';
import AdminSidebar from "../../components/Admin/sidebar/AdminSidebar";
import Heading from "../../../app/utils/Heading";
import CreateCourse from "../../components/Admin/Course/CreateCourse";
import DashboardHeader from '../../../app/components/Admin/DashboardHeader';

type Props = {}

const Page = (props: Props) => {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <Heading 
                title="ELearning - Admin"
                description="ELearning is a platform for students to learn and get help from teachers"
                keywords="Programming, MERN, Redux, Machine Learning"
            />
            <div className="flex">
                <div className="1500px:w-[16%] w-1/5">
                    {typeof window !== "undefined" && <AdminSidebar />}
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
