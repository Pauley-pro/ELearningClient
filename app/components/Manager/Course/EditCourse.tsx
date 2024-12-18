'use client'
import React, { FC, useEffect, useState } from 'react';
import CourseInformation from "./CourseInformation";
import CourseOptions from "./CourseOptions";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import { useEditCourseManagerMutation, useGetAllCoursesManagerQuery } from '@/redux/features/courses/coursesApi';
import toast from 'react-hot-toast';
import { redirect, useParams } from "next/navigation"
import CourseTest from './CourseTest';

type Props = {
  id: string;
};

const EditCourse: FC<Props> = ({ id }) => {
  const [editCourse, { isSuccess, error }] = useEditCourseManagerMutation();
  const { data, refetch } = useGetAllCoursesManagerQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const editCourseData = data && data.courses.find((i: any) => i._id === id);


  useEffect(() => {
    if (isSuccess) {
      toast.success("Course updated successfully"),
        redirect("/manager/courses");
    } if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error]);




  const [active, setActive] = useState(0);
  useEffect(() => {
    if (editCourseData) {
      setCourseInfo({
        name: editCourseData.name,
        description: editCourseData.description,
        price: editCourseData.price,
        estimatedPrice: editCourseData?.estimatedPrice,
        tags: editCourseData.tags,
        level: editCourseData.level,
        demoUrl: editCourseData.demoUrl,
        thumbnail: editCourseData?.thumbnail?.url,
      })
      setBenefits(editCourseData.benefits);
      setPrerequisites(editCourseData.prerequisites);
      setCourseContentData(editCourseData.courseData);
      setCourseTestData(editCourseData.courseTestData);
    }
  }, [editCourseData]);


  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    demoUrl: "",
    thumbnail: "",
  });

  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
  const [courseContentData, setCourseContentData] = useState([{
    videoUrl: "",
    title: "",
    description: "",
    videoSection: "Untitled Section",
    videoLength: "",
    links: [
      {
        title: "",
        url: "",
      },
    ],
    suggestion: "",
  }]);
  const [courseTestData, setCourseTestData] = useState([
    {
      question: '',
      correctOption: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
    },
  ]);
  console.log("The updated test questions are as follows:", courseTestData);
  
  const [courseData, setCourseData] = useState({});
  const handleSubmit = async () => {
    // format benefits array 
    const formattedBenefits = benefits.map((benefit) => ({ title: benefit.title }));
    // format prerequisite array
    const formattedPrerequisites = prerequisites.map((prerequisite) => ({ title: prerequisite.title }));
    // format course content array
    const formattedCourseContentData = courseContentData.map((courseContent) => ({
      videoUrl: courseContent.videoUrl,
      title: courseContent.title,
      description: courseContent.description,
      videoLength: courseContent.videoLength,
      videoSection: courseContent.videoSection,
      links: courseContent.links.map((link) => ({
        title: link.title,
        url: link.url,
      })),
      suggestion: courseContent.suggestion,
    }));

    // prepare our data object
    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      tags: courseInfo.tags,
      thumbnail: courseInfo.thumbnail,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      totalVideos: courseContentData.length,
      benefits: formattedBenefits,
      prerequisites: formattedPrerequisites,
      courseData: formattedCourseContentData,
      courseTestData
    };
    setCourseData(data);
  };
  const handleCourseCreate = async (e: any) => {
    const data = courseData;
    await editCourse({ id: editCourseData?._id, data });
  }

  return (
    <div className="w-full flex min-h-screen">
      <div className="w-[80%]">
        {
          active === 0 && (
            <CourseInformation
              courseInfo={courseInfo}
              setCourseInfo={setCourseInfo}
              active={active}
              setActive={setActive}
            />
          )
        }

        {
          active === 1 && (
            <CourseData
              benefits={benefits}
              setBenefits={setBenefits}
              prerequisites={prerequisites}
              setPrerequisites={setPrerequisites}
              active={active}
              setActive={setActive}
            />
          )
        }

        {
          active === 2 && (
            <CourseContent
              active={active}
              setActive={setActive}
              courseContentData={courseContentData}
              setCourseContentData={setCourseContentData}
              handleSubmit={handleSubmit}
            />
          )
        }

        {
          active === 3 && (
            <CourseTest
              active={active}
              setActive={setActive}
              courseTestData={courseTestData}
              setCourseTestData={setCourseTestData}
              handleSubmit={handleSubmit}
            />
          )
        }

        {
          active === 4 && (
            <CoursePreview
              active={active}
              setActive={setActive}
              courseData={courseData}
              handleCourseCreate={handleCourseCreate}
              isEdit={true}
            />
          )
        }
      </div>
      <div className="w-[20%] mt-[100px] h-screen fixed z-[1] top-18 right-0">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  )
}

export default EditCourse;