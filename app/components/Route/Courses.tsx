import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import React, { useEffect, useState } from "react";
import CourseCard from "../Course/CourseCard"
import Link from "next/link";

type Props = {}

const Courses = (props: Props) => {
    const { data, isLoading } = useGetUsersAllCoursesQuery({});
    const [courses, setCourses] = useState<any[]>([]);

    useEffect(() => {
        setCourses(data?.courses);
    }, [data])
    return (
        <div>
            <div className={`w-[90%] mt-[120px] 800px:w-[80%] m-auto`}>
                <h1 className="text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-4xl lg:text-4xl dark:text-white 800px:!leading-[60px] text-[#000] font-[700] tracking-tight">
                    Expand Your Career {" "}
                    <span className="text-gradient">Opportunity</span> <br />
                    Opportunity with Our Courses
                </h1>
                <br />
                <br />
                <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
                    {courses &&
                        courses.slice(0, 6).map((item: any, index: number) => (
                            <CourseCard
                                item={item}
                                key={index}
                            />
                        ))
                    }

                    {/*{courses && 
                        courses.map((item:any, index:number) => (
                            <CourseCard 
                                item={item}
                                key={index}
                            />
                        ))
                    }*/}
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

export default Courses;