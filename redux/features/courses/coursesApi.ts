import { apiSlice } from "../api/apiSlice";

export const courseApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCourse: builder.mutation({
            query: (data) => ({
                url: "create-course",
                method: "POST",
                body: data,
                credentials: "include" as const,
            }),
        }),
        createCourseManager: builder.mutation({
            query: (data) => ({
                url: "create-course-manager",
                method: "POST",
                body: data,
                credentials: "include" as const,
            }),
        }),       
        getAllCourses: builder.query({
            query: () => ({
                url: "get-admin-courses",
                method: "GET",
                credentials: "include" as const,
            })
        }),
        getAllCoursesManager: builder.query({
            query: () => ({
                url: "get-manager-courses",
                method: "GET",
                credentials: "include" as const,
            })
        }),
        deleteCourse: builder.mutation({
            query: (id) => ({
                url: `delete-course/${id}`,
                method: "DELETE",
                credentials: "include" as const,
            })
        }),
        deleteCourseManager: builder.mutation({
            query: (id) => ({
                url: `delete-course-manager/${id}`,
                method: "DELETE",
                credentials: "include" as const,
            })
        }),
        editCourse: builder.mutation({
            query: ({ id, data }) => ({
                url: `edit-course/${id}`,
                method: "PUT",
                body: data,
                credentials: "include" as const,
            })
        }),
        editCourseManager: builder.mutation({
            query: ({ id, data }) => ({
                url: `edit-course-manager/${id}`,
                method: "PUT",
                body: data,
                credentials: "include" as const,
            })
        }),
        getUsersAllCourses: builder.query({
            query: () => ({
                url: "get-courses",
                method: "GET",
                credentials: "include" as const,
            }),
        }),
        getCourseDetails: builder.query({
            query: (id) => ({
                url: `get-course/${id}`,
                method: "GET",
                credentials: "include" as const,
            }),
        }),
        getCourseContent: builder.query({
            query: (id) => ({
                url: `get-course-content/${id}`,
                method: "GET",
                credentials: "include" as const,
            }),
        }),
        addNewQuestion: builder.mutation({
            query: ({ question, courseId, contentId }) => ({
                url: 'add-question',
                body: {
                    question,
                    courseId,
                    contentId,
                },
                method: "PUT",
                credentials: "include" as const,
            }),
        }),
        addAnswerInQuestion: builder.mutation({
            query: ({ answer, courseId, contentId, questionId }) => ({
                url: "add-answer",
                body: {
                    answer, courseId, contentId, questionId
                },
                method: "PUT",
                credentials: "include" as const,
            }),
        }),
        addReviewInCourse: builder.mutation({
            query: ({ review, rating, courseId }: any) => ({
                url: `add-review/${courseId}`,
                body: {
                    review,
                    rating
                },
                method: "PUT",
                credentials: 'include' as const,
            }),
        }),
        addReplyInReview: builder.mutation({
            query: ({ comment, coursId, reviewId }: any) => ({
                url: "add-reply",
                body: {
                    comment, coursId, reviewId,
                },
                method: "PUT",
                credentials: 'include' as const,
            })
        }),
    }),
});

export const {
    useCreateCourseMutation,
    useCreateCourseManagerMutation,
    useGetAllCoursesQuery,
    useGetAllCoursesManagerQuery,
    useDeleteCourseMutation,
    useDeleteCourseManagerMutation,
    useEditCourseMutation,
    useEditCourseManagerMutation,
    useGetUsersAllCoursesQuery,
    useGetCourseDetailsQuery,
    useGetCourseContentQuery,
    useAddNewQuestionMutation,
    useAddAnswerInQuestionMutation,
    useAddReviewInCourseMutation,
    useAddReplyInReviewMutation } = courseApi;