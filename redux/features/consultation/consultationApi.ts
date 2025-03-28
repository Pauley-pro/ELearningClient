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
        getAllAppointments: builder.query({
            query: () => ({
                url: "get-all-appointments",
                method: "GET",
                credentials: "include" as const,
            })
        }),
        updateAppointment: builder.mutation({
            query: ({ id, data }) => ({
                url: `update-appointment-status/${id}`,
                method: "PUT",
                body: data,
                credentials: "include",
            }),
        }),
    })
})

export const {
    useBookAppointmentMutation,
    useGetUserAppointmentQuery,
    useGetAllAppointmentsQuery,
    useUpdateAppointmentMutation
} = connsultationApi;