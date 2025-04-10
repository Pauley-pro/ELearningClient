import React, { FC } from "react";
import CoursePlayer from "../../../utils/CoursePlayer"
import { styles } from "@/app/styles/style";
import Ratings from "@/app/utils/Ratings";
import { IoCheckmarkDoneOutline } from "react-icons/io5"

type Props = {
    active: number;
    setActive: (active: number) => void;
    courseData: any;
    handleCourseCreate: any;
    isEdit?: boolean
}

const CoursePreview: FC<Props> = ({
    courseData,
    handleCourseCreate,
    setActive,
    active,
    isEdit
}) => {
    console.log(courseData);
    const discountPercentage = ((courseData?.estimatedPrice - courseData?.price) / courseData?.estimatedPrice) * 100;

    const discountPercentagePrice = discountPercentage.toFixed(0);

    const prevButton = () => {
        setActive(active - 1);
    }

    const CreateCourse = () => {
        handleCourseCreate();
    }

    return (
        <div className="w-[90%] m-auto py-5 mb-5">
            <div className="w-full relative">
                <div className="w-full mt-10">
                    <CoursePlayer
                        videoUrl={courseData?.demoUrl}
                        title={courseData?.title}
                    />
                </div>
                <div className="flex items-center ">
                    <h1 className="pt-5 text-[25px] dark:text-white text-black">
                        {courseData?.price === 0 ? "Free" : courseData?.price + "$"}
                    </h1>
                    <h5 className="pl-3 text-[20px] mt-2 line-through opacity-80 dark:text-white text-black">
                        {courseData?.estimatedPrice}$
                    </h5>
                    <h4 className="pl-5 pt-4 text-[22px] dark:text-white text-black">
                        {discountPercentagePrice}% off
                    </h4>
                </div>
                <div className="flex items-center">
                    <div className={`${styles.button} !w-[180px] my-3 font-Poppins !bg-[crimson] cursor-not-allowed`}>
                        Buy Now {courseData?.price}$
                    </div>
                </div>
                <div className="flex items-center">
                    <input
                        type="text"
                        name=""
                        id=""
                        placeholder="Discount code..."
                        className={`${styles.input} 1500px:!w-[50%] 1100px:w-[60%] ml-3 !mt-0`}
                    />
                    <div className={`${styles.button} !w-[120px] my-3 ml-4 font-Poppins cursor-pointer`}>
                        Apply
                    </div>
                </div>
                <p className="pb-1 dark:text-white text-black">. Source code included</p>
                <p className="pb-1 dark:text-white text-black">. Full lifetime access</p>
                <p className="pb-1 dark:text-white text-black">. Certificate of return</p>
                <p className="pb-3 dark:text-white text-black">. Premium support</p>
            </div>
            <div className="w-full">
                <div className="w-full 800px:pr-5">
                    <h1 className="text-[25px] font-Poppins font-[600] dark:text-white text-black">
                        {courseData?.name}
                    </h1>
                    <div className="flex items-center justify-between pt-3">
                        <div className="flex items-center">
                            <Ratings rating={0} />
                            <h5 className="dark:text-white text-black">0 Reviews</h5>
                        </div>
                        <h5 className="dark:text-white text-black">0 Students</h5>
                    </div>
                    <br />
                    <h1 className="text-[25px] font-Poppins font-[600] dark:text-white text-black">
                        What you will learn from this course?
                    </h1>
                </div>
                {courseData?.benefits?.map((item: any, index: number) => (
                    <div className="w-full flex 800px:items-center py-2" key={index}>
                        <div className="w-[15px] mr-1">
                            <IoCheckmarkDoneOutline size={20} className="dark:text-white text-black" />
                        </div>
                        <p className="pl-2 dark:text-white text-black">{item.title}</p>
                    </div>
                ))}
                <br />
                <br />
                <h1 className="text-[25px] font-Poppins font-[600] dark:text-white text-black">
                    What are the prerequisites for starting this course?
                </h1>
                {courseData?.prerequisites?.map((item: any, index: number) => (
                    <div className="w-full flex 800px:items-center py-2" key={index}>
                        <div className="w-[15px] mr-1">
                            <IoCheckmarkDoneOutline size={20} className="dark:text-white text-black" />
                        </div>
                        <p className="pl-2 dark:text-white text-black">{item.title}</p>
                    </div>
                ))}
                <br />
                <br />
                {/* Course description */}
                <div className="w-full">
                    <h1 className="text-[25px] font-Poppins font-[600] dark:text-white text-black">
                        Course Details
                    </h1>
                    <p className="text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden dark:text-white text-black">
                        {courseData?.description}
                    </p>
                </div>
                <br />
                <br />
                <div className="w-full mt-5">
                    <h1 className="text-[25px] font-Poppins font-[600] dark:text-white text-black">
                        Course Questions
                    </h1>
                    {courseData?.courseTestData?.map((test: any, index: number) => (
                    <div key={index} className="my-4">
                        <h2 className="dark:text-white text-black text-[20px]">{index + 1}. {test.question}</h2>
                        <ul>
                            <li className="dark:text-white text-black">A: {test.optionA}</li>
                            <li className="dark:text-white text-black">B: {test.optionB}</li>
                            <li className="dark:text-white text-black">C: {test.optionC}</li>
                            <li className="dark:text-white text-black">D: {test.optionD}</li>
                        </ul>
                        <p className="text-[#FF0000]">Correct Answer: {test.correctOption}</p>
                    </div>
                ))}
                </div>
            </div>
            <div className="w-full flex items-center justify-between">
                <div className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer" onClick={() => prevButton()}>
                    Prev
                </div>
                <div className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer" onClick={() => CreateCourse()}>
                    {
                        isEdit ? 'Update' : 'Create'
                    }
                </div>
            </div>
        </div>
    )
}

export default CoursePreview;