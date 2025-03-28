import React, { FC, useEffect, useState } from 'react';
import { styles } from "@/app/styles/style";
import toast from 'react-hot-toast';
import { useBookAppointmentMutation } from '@/redux/features/consultation/consultationApi';
import { useFormik } from 'formik';
import * as Yup from "yup";
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

type Props = {}

const schema = Yup.object().shape({
    date: Yup.string().required("Please, enter the date of appointment"),
    reason: Yup.string().required("Please, state the reason for the appointment!")
});

const BookAppointment: FC<Props> = (props) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [bookAppointment, { isLoading, data, error, isSuccess }] = useBookAppointmentMutation();

    const formik = useFormik({
        initialValues: { date: "", reason: "" },
        validationSchema: schema,
        onSubmit: async (values, { resetForm }) => {
            try {
                await bookAppointment(values).unwrap();
                toast.success("Appointment submitted successfully!");
                resetForm();
            } catch (err: any) {
                console.error("Error submitting appointment:", err);
                const errorMessage = err?.data?.error || "Appointment submission failed. Please try again.";
                toast.error(errorMessage);
            }
        },
    });

    const { values, handleChange, handleSubmit, errors, touched, setFieldValue } = formik;

    const handleDateChange = (date: moment.Moment | string) => {
        const dateObj = typeof date === 'string' ? new Date(date) : date.toDate();
        if (!isNaN(dateObj.getTime())) {
            setFieldValue("date", dateObj.toISOString());
        } else {
            setFieldValue("date", "");
        }
    };



    return (
        <div className="w-full pl-7 px-2 800px:px-5 800px:pl-0">
            <h1 className="block text-[25px] 800px:text-[30px] font-Poppins text-center font-[500] text-black dark:text-[#fff] pb-2">
                Book Appointment
            </h1>
            <div className="w-full">
                <form onSubmit={handleSubmit} className="flex flex-col items-center">
                    <div className="w-[100%] 800px:w-[60%] mt-2">
                        <label className="block pb-2 text-black dark:text-[#fff]">Pick a date</label>
                        <div className={`${styles.input}`}>
                            <Datetime
                                onChange={handleDateChange}
                                inputProps={{
                                    placeholder: "Select date and time",
                                    className: `${errors.date && touched.date && "border-[#0f1421]"} w-[100%] mt-[7px] border-none`,
                                }}
                            />
                        </div>
                        {errors.date && touched.date && (
                            <div className="text-red-500 text-sm mt-1">{errors.date}</div>
                        )}
                    </div>

                    <div className="w-[100%] 800px:w-[60%] mt-2">
                        <label className="block pb-2 text-black dark:text-[#fff]">What is the reason for this Appointment</label>
                        <textarea
                            id="reason"
                            name="reason"
                            placeholder="State your reason....."
                            value={values.reason}
                            onChange={handleChange}
                            required
                            className={`${errors.reason && touched.reason && "border-red-500"} ${styles.textArea}`}
                        ></textarea>
                        {errors.reason && touched.reason && (
                            <div className="text-red-500 text-sm mt-1">{errors.reason}</div>
                        )}
                    </div>

                    {/*<input
                        className={`w-full 800px:w-[250px] h-[40px] border border-[#37a39a] text-center dark:text-[#fff] text-black rounded-[3px] mt-8 cursor-pointer`}
                        required
                        value="Update"
                        type="submit"
                    />*/}

                    <div className="w-[100%] 800px:w-[60%] mt-2">
                        <button
                            type="submit"
                            className={`w-full 800px:w-[250px] h-[40px] border border-[#37a39a] text-center dark:text-[#fff] text-black rounded-[3px] mt-8 cursor-pointer ${isLoading ? "opacity-50 cursor-not-allowed" : "flex flex-row justify-center items-center py-3 px-3 cursor-pointer min-h-[45px] w-full text-[16px] text-[#ffffff] font-Poppins font-semibold"
                                }`}
                            disabled={isLoading}
                        >
                            {isLoading ? "Loading..." : "Book Appointment"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default BookAppointment;