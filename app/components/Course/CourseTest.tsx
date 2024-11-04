import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGetCourseDetailsQuery } from '@/redux/features/courses/coursesApi';
import toast from 'react-hot-toast';

interface CourseTestData {
  question: string;
  correctOption: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
}

interface Props {
  id: string;
  user: any;
}

const CourseTest = ({ id, user }: Props) => {
  const { data: courseTestData } = useGetCourseDetailsQuery(id, { refetchOnMountOrArgChange: true });
  const course = courseTestData?.course;
  const router = useRouter();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(Array(course?.courseTestData?.length || 0).fill(''));

  const handleOptionChange = (option: string) => {
    const updatedSelections = [...selectedOptions];
    updatedSelections[currentQuestion] = option;
    setSelectedOptions(updatedSelections);
  };

  const nextQuestion = () => {
    if (currentQuestion < (course?.courseTestData.length || 0) - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    if (!course || !course.courseTestData) return;

    // Calculate the score
    const correctAnswers = course.courseTestData.reduce((acc: number, question: CourseTestData, index: number) => {
      return acc + (selectedOptions[index] === question.correctOption ? 1 : 0);
    }, 0);
    const score = (correctAnswers / course.courseTestData.length) * 100;

    if (score === 100) {
      toast.success("Congratulations! You scored 100%. Proceed to obtain your certificate...");
      router.push(`/certificate/${id}`);
    } else {
      toast.error("You didn't score 100%. Please, take the course again...");
      // Reset the test for retry
      setSelectedOptions(Array(course.courseTestData.length).fill(''));
      setCurrentQuestion(0);
      router.push(`/course-access/${id}`);
    }
  };

  const question = course?.courseTestData?.[currentQuestion];

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="absolute top-[150px] right-4 md:top-[130px] md:right-6 lg:top-[130px] lg:right-8 text-gray-600 dark:text-white">
        <span className="bg-blue-600 text-[#ffffff] px-4 py-2 text-lg md:text-xl lg:text-2xl rounded">
          {currentQuestion + 1} / {course?.courseTestData.length || 0}
        </span>
      </div>


      <div className="dark:text-[#ffffff] max-w-md w-full pl-[30px]">
        <div key={currentQuestion} className="mb-4">
          {question ? (
            <>
              <h3 className="text-[15px]">Question {currentQuestion + 1}: </h3>
              <h3 className="text-2xl pt-4 pb-4">{question.question}</h3>
              <ul>
                {["A", "B", "C", "D"].map((optionKey) => {
                  const optionValue = question[`option${optionKey}` as keyof CourseTestData];
                  const isSelected = selectedOptions[currentQuestion] === optionValue;

                  return (
                    <li key={optionKey} className="mb-4">
                      <label className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 flex items-center justify-center rounded-full border-2 
                        ${isSelected ? "bg-blue-600 text-white border-blue-600" : "border-gray-400"}`}
                          onClick={() => handleOptionChange(optionValue)}
                        >
                          {optionKey}
                        </div>
                        <span className="text-lg">{optionValue}</span>
                        <input
                          type="radio"
                          name={`question-${currentQuestion}`}
                          value={optionValue}
                          checked={isSelected}
                          onChange={() => handleOptionChange(optionValue)}
                          className="hidden"
                        />
                      </label>
                    </li>
                  );
                })}
              </ul>

            </>
          ) : (
            <p>Loading question...</p>
          )}
        </div>
        <div className="flex space-x-4 mt-4">
          {currentQuestion > 0 && (
            <button onClick={prevQuestion} className="px-4 py-2 bg-gray-600 text-white rounded">
              Previous
            </button>
          )}
          {currentQuestion < (course?.courseTestData.length || 0) - 1 ? (
            <button onClick={nextQuestion} className="px-4 py-2 bg-blue-600 text-white rounded">
              Next
            </button>
          ) : (
            <button onClick={handleSubmit} className="px-4 py-2 bg-green-600 text-white rounded">
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseTest;
