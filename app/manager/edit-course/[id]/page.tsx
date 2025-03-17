"use client"
import React, { useState } from 'react';
import Heading from "../../../../app/utils/Heading";
import ManagerSidebar from '@/app/components/Manager/sidebar/ManagerSidebar';
import EditCourse from '@/app/components/Manager/Course/EditCourse';
import DashboardHeader from '@/app/components/Manager/DashboardHeader';


type Props = {}

const Page = ({params}:any) => {
    const id = params?.id;
    const [open, setOpen] = useState(false);

    return (
        <div>
            <Heading 
                title="Mindzyte - Manager"
                description="Mindzyte is a platform for students to learn and get help from teachers"
                keywords="Programming, MERN, Redux, Machine Learning"
            />
            <div className="flex">
                <div className="1500px:w-[16%] w-1/5">
                    <ManagerSidebar />
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