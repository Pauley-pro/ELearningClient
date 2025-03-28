"use client"
import React, { useState } from 'react';
import AdminSidebar from "../../../components/Admin/sidebar/AdminSidebar";
import Heading from "../../../../app/utils/Heading";
import DashboardHeader from '../../../../app/components/Admin/DashboardHeader';
import EditCourse from "../../../components/Admin/Course/EditCourse";


type Props = {}

const Page = ({params}:any) => {
    const id = params?.id;
    const [open, setOpen] = useState(false);

    return (
        <div>
            <Heading 
                title="Mindzyte - Admin"
                description="Mindzyte is a platform for students to learn and get help from teachers"
                keywords="Programming, MERN, Redux, Machine Learning"
            />
            <div className="flex">
                <div className="1500px:w-[16%] w-1/5">
                    <AdminSidebar />
                </div>
                <div className="w-[85%]">
                    <DashboardHeader open={open} setOpen={setOpen} />
                    <EditCourse id={id} />
                </div>
            </div>
        </div>
    )
}

export default Page;