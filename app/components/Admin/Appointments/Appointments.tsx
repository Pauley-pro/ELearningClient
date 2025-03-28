import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography, MenuItem, Select, FormControl, InputLabel, SelectChangeEvent, Grid } from "@mui/material";
import { useTheme } from "next-themes";
import Loader from "../../Loader/Loader";
import { IoEye } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";
import Link from "next/link";
import { useGetAllAppointmentsQuery, useUpdateAppointmentMutation } from "@/redux/features/consultation/consultationApi";
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';


interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    reason: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, reason }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 max-w-full max-h-[80vh] overflow-y-auto relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
                    title="Close"
                >
                    <IoClose size={24} />
                </button>
                <h2 className="text-lg text-black font-semibold mb-4">Reason</h2>
                <p className="text-sm text-black">{reason}</p>
                <button
                    onClick={onClose}
                    className="mt-4 bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

const Appointments = () => {
    const { data, isLoading, refetch } = useGetAllAppointmentsQuery({}, { refetchOnMountOrArgChange: true });
    const [updateAppointment, { isSuccess, error }] = useUpdateAppointmentMutation();
    const [selectedStatus, setSelectedStatus] = useState<Record<string, string>>({});
    const [updatingAppId, setUpdatingAppId] = useState<string | null>(null);
    const [rescheduleDates, setRescheduleDates] = useState<Record<string, string>>({});


    const { theme } = useTheme();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalReason, setModalReason] = useState("");


    // State for filtering by status
    const [statusFilter, setStatusFilter] = useState("");

    // Handle modal open
    const handleOpenModal = ({ reason }: { reason: string }) => {
        setModalReason(reason);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setModalReason("");
    };

    // Handle status filter change
    const handleStatusFilterChange = (event: SelectChangeEvent<string>) => {
        setStatusFilter(event.target.value);
    };

    const handleStatusUpdate = async (appId: string) => {
        const newStatus = selectedStatus[appId];
        const rescheduledDate = rescheduleDates[appId];

        if (!newStatus) {
            toast.error("Please select a status to update.");
            return;
        }

        if (newStatus === "RESCHEDULED" && !rescheduledDate) {
            toast.error("Please select a new date and time for rescheduling.");
            return;
        }

        setUpdatingAppId(appId);

        try {
            const data = { status: newStatus, rescheduledDate };
            await updateAppointment({ id: appId, data }).unwrap();

            // Clear the dropdowns
            setSelectedStatus((prev) => ({ ...prev, [appId]: "" }));
            setRescheduleDates((prev) => ({ ...prev, [appId]: "" }));

            toast.success("Appointment status updated successfully.");
            refetch();
        } catch (error: any) {
            const errorMessage = error.data?.error || "Failed to update appointment status.";
            toast.error(errorMessage);
        } finally {
            setUpdatingAppId(null);
        }
    };

    /*useEffect(() => {
        if (isSuccess) {
            refetch();
            toast.success("Appointment status updated");
        }
        if (error) {
            if ("data" in error) {
                const errorMessage = error as any;
                toast.error(errorMessage.data.message);
            }
        }
    }, [isSuccess, error, refetch]);*/



    const columns = [
        {
            field: "id",
            headerName: "ID",
            flex: 0.05,
            minWidth: 50,
        },
        {
            field: "name",
            headerName: "Name",
            flex: 0.8,
            minWidth: 180,
            renderCell: (params: any) => {
                const name = params.row.name;
                const appId = params.row.appId;

                const truncatedName = name.length > 17 ? `${name.slice(0, 17)}...` : name;
                const truncatedAppId = appId.length > 17 ? `${appId.slice(0, 17)}...` : appId;

                return (
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <Typography
                            variant="body2"
                            title={name}
                            style={{ fontWeight: "bold" }}
                        >
                            {truncatedName}
                        </Typography>
                        <Typography
                            variant="caption"
                            title={appId}
                            style={{ color: "#6b7280" }}
                        >
                            ID: {truncatedAppId}
                        </Typography>
                    </div>
                );
            },
        },
        {
            field: "status",
            headerName: "Status",
            flex: 0.6,
            minWidth: 160,
            renderCell: (params: any) => {
                const status = params.row.status;
                const statusClasses =
                    status === "APPROVED"
                        ? "text-[#159a4f] bg-[#2E3A47]"
                        : status === "RESCHEDULED"
                            ? "text-[#D34053] bg-[#383342]"
                            : status === "PENDING"
                                ? "text-[#64748B] bg-[#2b3747]"
                                : "text-[#FFA70B] bg-[#3e3b3e]";

                return (
                    <div
                        className={`rounded-full text-sm font-medium px-2 py-1 text-center ${statusClasses}`}
                        style={{
                            display: "inline-block",
                        }}
                    >
                        {status}
                    </div>
                );
            },
        },
        { field: "date", headerName: "Date", flex: 0.7, minWidth: 150, },
        {
            field: "reason",
            headerName: "Reason",
            flex: 0.3,
            minWidth: 40,
            renderCell: (params: any) => (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                    }}
                    title="View Reason"
                    onClick={() => handleOpenModal({
                        reason: params.row.reason
                    })}
                >
                    <IoEye size={20} />
                </div>
            ),
        },
        {
            field: "updateStatus",
            headerName: "Update Appointment Status",
            flex: 1,
            minWidth: 200,
            renderCell: (params: any) => {
                const appId = params.row.appId;
                const currentStatus = params.row.status;

                const selected = selectedStatus[appId];

                if (currentStatus === "PENDING") {
                    return (
                        <div className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                            <div className="flex flex-col gap-2">
                                <select
                                    value={selected || ""}
                                    onChange={(e) => {
                                        setSelectedStatus({ ...selectedStatus, [appId]: e.target.value });
                                    }}
                                    className="border px-2 py-1 rounded"
                                >
                                    <option value="pending">PENDING</option>
                                    <option value="approved">APPROVED</option>
                                    <option value="rescheduled">RESCHEDULED</option>
                                </select>

                                {/* Show Datetime Picker only if RESCHEDULED is selected */}
                                {selected === "rescheduled" && (
                                    <div className="absolute z-10000">
                                        <Datetime
                                            onChange={(date: any) => {
                                                const formatted = new Date(date).toISOString();
                                                setRescheduleDates((prev) => ({ ...prev, [appId]: formatted }));
                                            }}
                                            inputProps={{
                                                placeholder: "Select new date/time",
                                                className: "bg-[#000] text-white p-2 w-full rounded"
                                            }}
                                        />
                                    </div>
                                )}

                                <button
                                    onClick={() => handleStatusUpdate(appId)}
                                    disabled={updatingAppId === appId}
                                    className="rounded bg-[#3c50e1] text-white px-3 py-1"
                                >
                                    {updatingAppId === appId ? "Updating..." : "Update"}
                                </button>
                            </div>
                        </div>
                    );
                }
                return null;
            }

        },
    ];

    // Filter rows based on status
    const filteredRows = data?.appointments
        ?.filter((appointment: any) => (statusFilter ? appointment.status === statusFilter : true))
        .map((appointment: any, index: number) => ({
            id: index + 1,
            appId: appointment._id,
            name: appointment.user?.name || "Unknown",
            date: new Date(appointment.date).toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            }),
            reason: appointment.reason,
            status: appointment.status.toUpperCase(),

        })) || [];

    return (
        <div className="mt-[100px]">
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Box
                    m="20px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    height="80vh"
                    sx={{
                        marginTop: "-20vh",
                    }}
                >
                    <Typography variant="h6" color={theme === "dark" ? "#fff" : "#000"}>
                        Failed to load appointment. Please try again later.
                    </Typography>
                </Box>
            ) : (
                <Box m="20px">
                    <br />

                    {/* Status Filter Dropdown */}
                    <FormControl
                        sx={{
                            mb: 2,
                            width: "250px", // Adjust the width here
                        }}
                    >
                        <InputLabel
                            sx={{
                                color: theme === "dark" ? "#fff" : "#000", // Label color
                                "&.Mui-focused": {
                                    color: theme === "dark" ? "#A4A9FC" : "#3e4396", // Focused label color
                                },
                            }}
                        >
                            Status
                        </InputLabel>
                        <Select
                            value={statusFilter}
                            onChange={handleStatusFilterChange}
                            label="Status"
                            sx={{
                                color: theme === "dark" ? "#fff" : "#000", // Text color
                                backgroundColor: theme === "dark" ? "#1F2A40" : "#fff", // Background color
                                "& .MuiSelect-icon": {
                                    color: theme === "dark" ? "#fff" : "#000", // Dropdown arrow color
                                },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: theme === "dark" ? "#A4A9FC" : "#ccc", // Border color
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: theme === "dark" ? "#A4A9FC" : "#3e4396", // Hover border color
                                },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: theme === "dark" ? "#A4A9FC" : "#3e4396", // Focused border color
                                },
                            }}
                            MenuProps={{
                                PaperProps: {
                                    sx: {
                                        backgroundColor: theme === "dark" ? "#2c3e50" : "#fff", // Dropdown background
                                        color: theme === "dark" ? "#fff" : "#000", // Dropdown text color
                                        "& .MuiMenuItem-root": {
                                            "&:hover": {
                                                backgroundColor: theme === "dark" ? "#34495e" : "#f0f0f0", // Hover background color
                                            },
                                        },
                                    },
                                },
                            }}
                        >
                            <MenuItem value="">ALL</MenuItem>
                            <MenuItem value="pending">PENDING</MenuItem>
                            <MenuItem value="approved">APPROVED</MenuItem>
                            <MenuItem value="rescheduled">RESCHEDULED</MenuItem>
                        </Select>
                    </FormControl>

                    {filteredRows.length === 0 ? (
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            height="50vh"
                        >
                            <Typography variant="h6" color={theme === "dark" ? "#fff" : "#000"}>
                                No Appointment {statusFilter ? `(${statusFilter.toLowerCase()})` : ""}
                            </Typography>
                        </Box>
                    ) : (
                        <Box
                            m="40px 0 0 0"
                            height="80vh"
                            sx={{
                                "& .MuiDataGrid-root": {
                                    border: "none",
                                },
                                "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                                    color: theme === "dark" ? "#fff" : "#000",
                                },
                                "& .MuiDataGrid-sortIcon": {
                                    color: theme === "dark" ? "#fff" : "#000",
                                },
                                "& .MuiDataGrid-row": {
                                    color: theme === "dark" ? "#fff" : "#000",
                                    borderBottom: theme === "dark" ? "1px solid #ffffff30" : "1px solid #ccc",
                                },
                                "& .MuiDataGrid-columnHeaders": {
                                    backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                                    color: theme === "dark" ? "#fff" : "#000",
                                },
                                "& .MuiDataGrid-virtualScroller": {
                                    backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
                                },
                                "& .MuiDataGrid-footerContainer": {
                                    backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                                    color: theme === "dark" ? "#fff" : "#000",
                                    "& .MuiTablePagination-root, & .MuiTablePagination-toolbar, & .MuiTablePagination-caption": {
                                        color: theme === "dark" ? "#fff" : "#000",
                                    },
                                    "& .MuiSelect-icon": {
                                        color: theme === "dark" ? "#fff" : "#000",
                                    },
                                    "& .MuiInputBase-root": {
                                        color: theme === "dark" ? "#fff" : "#000",
                                    },
                                    "& .MuiSvgIcon-root": {
                                        color: theme === "dark" ? "#fff" : "#000",
                                    },
                                },
                            }}
                        >
                            <DataGrid
                                rows={filteredRows}
                                columns={columns}
                                getRowHeight={() => 100} // Set custom row height to accommodate new content
                                sx={{
                                    "& .MuiDataGrid-row": {
                                        color: theme === "dark" ? "#fff" : "#000",
                                        borderBottom: theme === "dark" ? "1px solid #ffffff30" : "1px solid #ccc",
                                    },
                                    "& .MuiDataGrid-columnHeaders": {
                                        backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                                        color: theme === "dark" ? "#fff" : "#000",
                                    },
                                    "& .MuiDataGrid-virtualScroller": {
                                        backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
                                    },
                                    "& .MuiDataGrid-footerContainer": {
                                        backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                                        color: theme === "dark" ? "#fff" : "#000",
                                    },
                                }}
                            />
                        </Box>
                    )}
                </Box>
            )}

            {/* Modal for recommendation note */}
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                reason={modalReason}
            />
        </div>
    );
};

export default Appointments;
