'use client'
import React from 'react'
import Heading from '../utils/Heading';
import ManagerSidebar from "../components/Manager/sidebar/ManagerSidebar";
import ManagerProtected from '../hooks/managerProtected';
import DashboardHero from '../components/Manager/DashboardHero';

type Props = {}

const page = (props: Props) => {
    return (
        <div>
            <ManagerProtected>
                <Heading
                    title="ELearning - Manager"
                    description="ELearning is a platform for students to learn and get help from teachers"
                    keywords="Programming, MERN, Redux, Machine Learning"
                />
                <div className="flex h-[200vh]">
                    <div className="1500px:w-[16%] w-1/5">
                        <ManagerSidebar />
                    </div>
                    <div className="w-[85%]">
                        <DashboardHero isDashboard={true} />
                    </div>
                </div>
            </ManagerProtected>
        </div>
    )
}

export default page