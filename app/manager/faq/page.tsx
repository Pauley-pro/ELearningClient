"use client"
import React from 'react';
import Heading from '@/app/utils/Heading';
import ManagerSidebar from '@/app/components/Manager/sidebar/ManagerSidebar';
import ManagerProtected from '@/app/hooks/managerProtected';
import DashboardHero from '@/app/components/Manager/DashboardHero';
import EditFaq from '@/app/components/Manager/Customization/EditFaq';

type Props = {}

const Page = (props: Props) => {
    return (
        <div>
            <ManagerProtected>
                <Heading
                    title="ELearning - Admin"
                    description="ELearning is a platform for students to learn and get help from teachers"
                    keywords="Programming, MERN, Redux, Machine Learning"
                />
                <div className="flex min-h-screen">
                    <div className="1500px:w-[16%] w-1/5">
                        <ManagerSidebar />
                    </div>
                    <div className="w-[85%]">
                        <DashboardHero />
                        <EditFaq />
                    </div>
                </div>
            </ManagerProtected>
        </div>
    )
}

export default Page;