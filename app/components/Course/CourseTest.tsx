import Heading from '@/app/utils/Heading';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

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
  const [courseTestData, setCourseTestData] = useState<CourseTestData[]>([]);


  useEffect(() => {
    const fetchCourseTestData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/get-course-content/${id}`);
        const fetchedCourseTestData = response.data.courseTestData || [];
        setCourseTestData(fetchedCourseTestData);

        // Console log the fetched courseTestData
        console.log("Fetched Course Test Data:", fetchedCourseTestData);
      } catch (error) {
        console.error("Error fetching course test data:", error);
      }
    };

    fetchCourseTestData();
  }, [id]);

  return (
    <div className="dark:text-[#ffffff]">
      <Heading
        title={"ELearning - take test"}
        description={
          "ELearning is a programming community which is developed by Apostle Pauley for helping programmers"
        }
        keywords="Take test for your course"
      />
      {/*{courseTestData.map((question, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <h2>{question.question}</h2>
          <label>
            <input
              type="radio"
              name={`question-${index}`}
              value="A"
              onChange={() => handleAnswerChange(index, 'A')}
            />
            {question.optionA}
          </label>
          <br />
          <label>
            <input
              type="radio"
              name={`question-${index}`}
              value="B"
              onChange={() => handleAnswerChange(index, 'B')}
            />
            {question.optionB}
          </label>
          <br />
          <label>
            <input
              type="radio"
              name={`question-${index}`}
              value="C"
              onChange={() => handleAnswerChange(index, 'C')}
            />
            {question.optionC}
          </label>
          <br />
          <label>
            <input
              type="radio"
              name={`question-${index}`}
              value="D"
              onChange={() => handleAnswerChange(index, 'D')}
            />
            {question.optionD}
          </label>
          <br />
          <p>
            {checkedAnswers[index] === true ? (
              <span style={{ color: 'green' }}>Correct!</span>
            ) : checkedAnswers[index] === false ? (
              <span style={{ color: 'red' }}>Incorrect</span>
            ) : (
              ''
            )}
          </p>
        </div>
      ))}*/}
    </div>
  );
}

export default CourseTest;