import { useGetUsersAllCoursesQuery } from '@/redux/features/courses/coursesApi';
import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react'

type Props = {}

const Categories = (props: Props) => {
    const searchParams = useSearchParams();
    const { data: categoriesData } = useGetHeroDataQuery("Categories", {});
    const [category, setCategory] = useState("All");



    const categories = categoriesData?.layout.categories;


    return (
        <div>
            <h1 className="dark:text-[#ffffff] text-center text-[60px]">Categories</h1>
            <br />
            <div className="w-full flex justify-center items-center flex-wrap">
                {categories && categories.map((item: any, index: number) => (
                    <div key={index}>
                        <div
                            className={`h-[35px] ${category === item.title ? "bg-[crimson]" : "bg-[#5050cb]"} m-3 px-3 rounded-[30px] text-[#fff] flex items-center justify-center font-Poppins cursor-pointer`}
                            onClick={() => setCategory(item.title)}
                        >
                            {item.title}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Categories