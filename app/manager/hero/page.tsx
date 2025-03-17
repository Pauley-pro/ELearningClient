"use client"
import React from 'react';
import Heading from '@/app/utils/Heading';
import ManagerSidebar from '@/app/components/Manager/sidebar/ManagerSidebar';
import ManagerProtected from '@/app/hooks/managerProtected';
import EditHero from '@/app/components/Manager/Customization/EditHero';
import DashboardHero from '@/app/components/Manager/DashboardHero';

type Props = {}

const page = (props: Props) => {
    return (
        <div>
            <ManagerProtected>
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
                        <DashboardHero />
                        <EditHero />
                    </div>
                </div>
            </ManagerProtected>
        </div>
    )
}

export default page;