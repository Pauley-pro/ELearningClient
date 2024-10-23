import { styles } from '@/app/styles/style';
import React, { FC, useEffect } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineDelete, AiOutlinePlusCircle } from 'react-icons/ai';

type Question = {
    question: string;
    correctOption: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
};

type Props = {
    courseTestData: Question[];
    setCourseTestData: (courseTestData: Question[]) => void;
    active: number;
    setActive: (active: number) => void;
};

const CourseTest: FC<Props> = ({ courseTestData, setCourseTestData, active, setActive }) => {

    const handleOptions = () => {
        const lastQuestion = courseTestData[courseTestData.length - 1];

        if (
            lastQuestion.question === "" ||
            lastQuestion.correctOption === "" ||
            lastQuestion.optionA === "" ||
            lastQuestion.optionB === "" ||
            lastQuestion.optionC === "" ||
            lastQuestion.optionD === ""
        ) {
            toast.error("Section cannot be empty!");
        } else {
            setActive(active + 1);
        }
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setActive(active + 1);
    };

    const prevButton = () => {
        setActive(active - 1);
    };

    const addQuestion = () => {
        const newQuestion: Question = {
            question: '',
            correctOption: '',
            optionA: '',
            optionB: '',
            optionC: '',
            optionD: '',
        };

        setCourseTestData([...courseTestData, newQuestion]);
    };

    const deleteQuestion = (index: number) => {
        const updatedQuestions = courseTestData.filter((_, i) => i !== index);
        setCourseTestData(updatedQuestions);
    };

    const handleInputChange = (index: number, field: keyof Question, value: string) => {
        const updatedQuestions = [...courseTestData];
        updatedQuestions[index][field] = value;
        setCourseTestData(updatedQuestions);
    };

    return (
        <div className="w-[80%] m-auto mt-24">
            <form onSubmit={handleSubmit} className={`${styles.label}`}>
                {courseTestData.map((question, index) => (
                    <div key={index}>
                        <div>
                            <label htmlFor="">Question</label>
                            <input
                                type="text"
                                required
                                value={question.question}
                                onChange={(e: any) =>
                                    handleInputChange(index, 'question', e.target.value)
                                }
                                placeholder="Enter question"
                                className={`${styles.input}`}
                            />
                        </div>
                        <br />
                        <div>
                            <label htmlFor="">Correct Option</label>
                            <input
                                type="text"
                                required
                                value={question.correctOption}
                                onChange={(e: any) =>
                                    handleInputChange(index, 'correctOption', e.target.value)
                                }
                                placeholder="Correct option"
                                className={`${styles.input}`}
                            />
                        </div>
                        <br />
                        <div className="w-full flex justify-between">
                            <div className="w-[45%]">
                                <label className={`${styles.label}`}>Option A</label>
                                <input
                                    type="text"
                                    required
                                    value={question.optionA}
                                    onChange={(e: any) =>
                                        handleInputChange(index, 'optionA', e.target.value)
                                    }
                                    placeholder="Option A"
                                    className={`${styles.input}`}
                                />
                            </div>
                            <div className="w-[50%]">
                                <label className={`${styles.label}`}>Option B</label>
                                <input
                                    type="text"
                                    required
                                    value={question.optionB}
                                    onChange={(e: any) =>
                                        handleInputChange(index, 'optionB', e.target.value)
                                    }
                                    placeholder="Option B"
                                    className={`${styles.input}`}
                                />
                            </div>
                        </div>
                        <br />
                        <div className="w-full flex justify-between">
                            <div className="w-[45%]">
                                <label className={`${styles.label}`}>Option C</label>
                                <input
                                    type="text"
                                    required
                                    value={question.optionC}
                                    onChange={(e: any) =>
                                        handleInputChange(index, 'optionC', e.target.value)
                                    }
                                    placeholder="Option C"
                                    className={`${styles.input}`}
                                />
                            </div>
                            <div className="w-[50%]">
                                <label className={`${styles.label}`}>Option D</label>
                                <input
                                    type="text"
                                    required
                                    value={question.optionD}
                                    onChange={(e: any) =>
                                        handleInputChange(index, 'optionD', e.target.value)
                                    }
                                    placeholder="Option D"
                                    className={`${styles.input}`}
                                />
                            </div>
                        </div>
                        <br />
                        <div
                            className="flex items-center text-[20px] dark:text-white text-black cursor-pointer"
                            onClick={() => deleteQuestion(index)}
                        >
                            <AiOutlineDelete className="mr-2" /> Delete Question
                        </div>
                        <br />
                    </div>
                ))}

                <div
                    className="flex items-center text-[20px] dark:text-white text-black cursor-pointer"
                    onClick={addQuestion}
                >
                    <AiOutlinePlusCircle className="mr-2" /> Add New Question
                </div>
                <br />
            </form>
            <br />
            <div className="w-full flex items-center justify-between">
                <div
                    className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
                    onClick={prevButton}
                >
                    Prev
                </div>

                <div
                    className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
                    onClick={handleOptions}
                >
                    Next
                </div>
            </div>
            <br />
            <br />
            <br />
        </div>
    );
};

export default CourseTest;
