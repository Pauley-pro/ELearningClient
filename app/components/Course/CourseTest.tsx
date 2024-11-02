import React, { useState } from 'react';
import { useGetCourseDetailsQuery } from '@/redux/features/courses/coursesApi';
import axios from 'axios';
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

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(Array(course?.courseTestData?.length || 0).fill(''));

  // Handle option selection
  const handleOptionChange = (option: string) => {
    const updatedSelections = [...selectedOptions];
    updatedSelections[currentQuestion] = option;
    setSelectedOptions(updatedSelections);
  };

  // Navigate to next or previous question
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

  // Submit test answers
  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/v1/evaluate-test', {
        courseId: id,
        userAnswers: selectedOptions,
      });

      toast.success(response.data.message);

      if (!response.data.passed) {
        // Reset the test if the user didn't pass
        setSelectedOptions(Array(course.courseTestData.length).fill(''));
        setCurrentQuestion(0);
      } else {
        // Handle successful submission (e.g., navigate to certificate page)
      }
    } catch (error) {
      console.error("Error submitting test:", error);
      toast.error("There was an error submitting the test. Please try again.");
    }
  };

  // Ensure the question is defined
  const question = course?.courseTestData?.[currentQuestion];

  return (
    <div className="dark:text-[#ffffff]">
      <h2>Course Test Questions</h2>
      <div key={currentQuestion} className="mb-4">
        {question ? (
          <>
            <h3 className="font-bold">Question {currentQuestion + 1}: {question.question}</h3>
            <ul>
              {["A", "B", "C", "D"].map((optionKey) => {
                const optionValue = question[`option${optionKey}` as keyof CourseTestData];
                return (
                  <li key={optionKey}>
                    <label>
                      <input
                        type="radio"
                        name={`question-${currentQuestion}`}
                        value={optionValue}
                        checked={selectedOptions[currentQuestion] === optionValue}
                        onChange={() => handleOptionChange(optionValue)}
                      />
                      {optionKey}. {optionValue}
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
  );
};

export default CourseTest;
