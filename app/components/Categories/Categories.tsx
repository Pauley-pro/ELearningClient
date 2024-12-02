import { useGetUsersAllCoursesQuery } from '@/redux/features/courses/coursesApi';
import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader';
import CourseCard from '../Course/CourseCard';
import { styles } from '@/app/styles/style';
import Link from 'next/link';

type Props = {}

const Categories = (props: Props) => {
    const searchParams = useSearchParams();
    const { data: categoriesData } = useGetHeroDataQuery("Categories", {});
    const [category, setCategory] = useState("All");
    const search = searchParams?.get('title');
    const { data, isLoading } = useGetUsersAllCoursesQuery(undefined, {});
    const [route, setRoute] = useState("Login");
    const [open, setOpen] = useState(false);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        if (category === "All") {
            setCourses(data?.courses);
        }
        if (category !== "All") {
            setCourses(data?.courses.filter((item: any) => item.categories === category));
        }
        if (search) {
            setCourses(data?.courses.filter((item: any) => item.name.toLowerCase().includes(search.toLowerCase()))
            );
        }
    }, [data, category, search]);

    const categories = categoriesData?.layout.categories;

    if (isLoading) {
        return <Loader />;
    }


    return (
        <div>
            <h1 className="text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-4xl lg:text-4xl dark:text-white 800px:!leading-[60px] text-[#000] font-[700] tracking-tight">
                Expand Your Career {" "}
                <span className="text-gradient">Opportunity</span> <br />
                Opportunity with Our Courses
            </h1>
            <br />
            <div className="w-[95%] 800px-w-[85%] m-auto min-h-[70vh]">
                <div className="w-full flex items-center flex-wrap">
                    <div
                        className={`h-[35px] ${category === "All" ? "bg-[crimson]" : "bg-[#5050cb]"} m-3 px-3 rounded-[30px] text-[#fff] flex items-center justify-center font-Poppins cursor-pointer`}
                        onClick={() => setCategory("All")}
                    >
                        All
                    </div>
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
                {courses && courses.length === 0 && (
                    <p className={`${styles.label} justify-center min-h-[50vh] flex items-center`}>
                        {search ? "No courses found!" : "No courses found in this category. Please try another one!"}
                    </p>
                )}
                <br />
                <br />
                <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
                    {courses &&
                        courses.slice(0, 6).map((item: any, index: number) => (
                            <CourseCard item={item} key={index} />
                        ))}
                </div>
                {courses && courses.length > 6 && (
                    <div className="flex justify-center">
                        <Link href="/courses">
                            <button className="bg-rose-600 w-[350px] h-[60px] rounded-full text-[#ffffff]">See More Courses</button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Categories