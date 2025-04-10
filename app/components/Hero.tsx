import React, { FC, useState } from "react";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import Image from "next/image";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";
import Loader from "./Loader/Loader";
import { useRouter } from "next/navigation";

type Props = {}

const Hero: FC<Props> = (props) => {
    const { data, isLoading } = useGetHeroDataQuery("Banner", {});
    const [search, setSearch] = useState("");
    const router = useRouter();

    const handleSearch = () => {
        if (search === "") {
            return
        } else {
            router.push(`/courses?title=${search}`);
        }
    }

    return (
        <>
            {
                isLoading ? (
                    <Loader />
                ) : (
                    <div className="flex flex-col md:flex-row items-center justify-between px-8 md:px-24 min-h-[90vh]">
                        <div className="pt-[100px] lg:pt-0 grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
                            <div className="text-left">
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#000] dark:text-[#fff]">
                                    {data?.layout?.banner?.title}
                                </h1>
                                <br />
                                <p className="text-[#000] dark:text-[#fff] dark:text-opacity-60 text-base md:text-lg">
                                    {data?.layout?.banner?.subTitle}
                                </p>

                                <div className="mt-6 flex flex-col md:flex-row gap-4 lg:justify-start">
                                    <Link href="/courses">
                                        <button className="bg-[#5051cc] hover:bg-blue-600 transition duration-300 px-6 py-3 rounded-full text-white font-medium">
                                            Explore Now
                                        </button>
                                    </Link>
                                </div>
                            </div>

                            <div className="absolute hidden lg:block top-[100px] md:top-[unset] lg:h-[650px] lg:w-[650px] 1100px:h-[550px] 1100px:w-[550px] h-[40vh] lg:right-20 w-[40vh] hero_animation rounded-[50%]"></div>
                            {/* Image Section */}
                            <div className="lg:flex justify-center lg:justify-end mt-10 lg:mt-0">
                                <Image
                                    src={data?.layout?.banner?.image?.url}
                                    alt="hero"
                                    width={500}
                                    height={500}
                                    className="rounded-lg object-cover"
                                />
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default Hero;

{/*<div className="w-full 1000px:flex items-center">
                        <div className="absolute top-[100px] 1000px:top-[unset] 1500px:h-[650px] 1500px:w-[650px] 1100px:h-[550px] 1100px:w-[550px] h-[40vh] left-5 w-[40vh] hero_animation rounded-[50%] 1100px:left-8 1500px:left-14"></div>

                        <div className="1000px:w-[40%] flex 1000px:min-h-screen items-center justify-end pt-[70px] 1000px:pt-[0] z-10">
                            <Image
                                src={data?.layout?.banner?.image?.url}
                                width={400}
                                height={400}
                                alt=""
                                className="object-contain 1100px:max-w-[90%] w-[90%] 1500px:max-w-[85%] h-[auto] z-[10]"
                            />
                        </div>
                        <div className="1000px:w-[60%] flex flex-col items-center 1000px:mt-[0px] text-center 1000px:text-left mt-[150px]">
                            <h2 className="dark:text-white text-[#000000c7] text-[24px] px-3 w-[70%] 1000px:text-[48px] font-[400] font-Josefin py-2 1000px:leading-[60px] 1500px:w-[50%] 1100px:w-[65%]">
                                {data?.layout?.banner?.title}
                                </h2 >
                        
                                                    <p className="dark:text-[#edfff4] text-[#000000ac] font-Josefin font-[600] text-[18px] 1500px:w-[40%] 1100px:w-[60%] w-[80%]">
                                                        {data?.layout?.banner?.subTitle}
                                                    </p>
                                                    <br />
                                                    <div className="1500px:w-[40%] 1100px:w-[60%] w-[80%] h-[50px] bg-transparent relative">
                                                        <input
                                                            type="search"
                                                            placeholder="Search Courses..."
                                                            value={search}
                                                            onChange={(e) => setSearch(e.target.value)}
                                                            className="bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-2 w-full h-full outline-none text-[#0000004e] dark:text-[#ffffffe6] text-[20px] font-[500] font-Josefin"
                                                        />
                                                        <div
                                                            className="absolute flex items-center justify-center w-[50px] cursor-pointer h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px]"
                                                            onClick={handleSearch}
                                                        >
                                                            <BiSearch className="text-white" size={30} />
                                                        </div>
                                                    </div>
                                                    <br />
                                                    <div className="1500px:w-[40%] 1100px:w-[60%] w-[80%] flex items-center">
                                                        <Image src={require("../../public/images/client-1.jpg")} alt="" className="rounded-full" />
                                                        <Image src={require("../../public/images/client-2.jpg")} alt="" className="rounded-full ml-[-20px]" />
                                                        <Image src={require("../../public/images/client-3.jpg")} alt="" className="rounded-full ml-[-20px]" />
                                                        <p className="font-Josefin dark:text-[#edfff4] text-[#000000b3] 1000px:pl-3 text-[18px] font-[600]">
                                                            500k+ People already trusted us.{" "}
                                                            <Link href="/courses" className="dark:text-[#46e256] text-[crimson]">View Courses</Link>{" "}
                                                        </p>
                                                    </div>
                        
                                                    <br />
                                                </div >
                                            </div >*/}