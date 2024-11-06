
import React from 'react'
import { BsQuote } from 'react-icons/bs'
import Slider from '../Helper/Slider'

type Props = {}

const Review = (props: Props) => {
    return (
        <div className="pt-[125px] pb-16 dark:bg-transparent">
            <h1 className="dark:text-[#ffffff] text-center text-[60px]">Testimonials</h1>
            <div className="w-[85%] mx-auto grid grid-cols-1 xl:grid-cols-3 items-center gap-20">
                <div className="xl:col-span-1 mt-6">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-rose-600 rounded-full flex items-center justify-center flex-col">
                            <BsQuote className="h-6 w-6 text-white" />
                        </div>
                        <h1 className="text-xl dark:text-white font-semibold">Student feedback</h1>
                    </div>
                    <h1 className="text-2xl md:text-3xl lg:text-4xl mt-8 font-bold md:leading-[3rem] lg:leading-[3.3rem] xl:leading-[3.6rem] dark:text-white">
                        Trusted by genius people.
                    </h1>
                    <p className="text-base dark:text-white dark:text-opacity-50  text-black mt-6">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio 
                        aspernatur adipisci mollitia, possimus nam impedit.
                    </p>
                    <div className="flex items-center space-x-10 mt-8">
                        <p className="dark:text-white font-bold text-5xl">99%</p>
                        <p className="dark:text-white text-base">Student&apos;s complete <br /> Course Successfully</p>
                    </div>
                </div>
                <div className="xl:col-span-2 rounded-lg overflow-hidden shadow-lg dark:bg-white dark:shadow-none">
                    <Slider />
                </div>
            </div>
        </div>
    )
}

export default Review