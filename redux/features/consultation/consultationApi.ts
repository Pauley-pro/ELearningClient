import { apiSlice } from "../api/apiSlice";

export const connsultationApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        bookAppointment: builder.mutation({
            query: (data) => ({
                url: "book-appointment",
                method: "POST",
                body: data,
                credentials: "include" as const,
            }),
        }),
        getUserAppointment: builder.query({
            query: () => ({
                url: "get-user-appointments",
                method: "GET",
                credentials: "include" as const,
            })
        }),
    })
})

export const {
    useBookAppointmentMutation,
    useGetUserAppointmentQuery
} = connsultationApi;