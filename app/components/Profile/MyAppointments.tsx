import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Dialog, MenuItem, Tab, Tabs, TextField, Typography } from "@mui/material";
import { useTheme } from "next-themes";
import Loader from "../Loader/Loader";
import { useSearchParams } from "next/navigation";
import { useGetUserAppointmentQuery } from "@/redux/features/consultation/consultationApi";
import { IoClose, IoEye, IoEyeSharp } from "react-icons/io5";

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

const MyAppointments = () => {
    const { theme } = useTheme();
    const { data, isLoading, refetch } = useGetUserAppointmentQuery({}, { refetchOnMountOrArgChange: true });
    const appointments = data?.appointments || [];
    const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
    const searchParams = useSearchParams();
    const appId = searchParams?.get('appId') || '';
    const [open, setOpen] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalReason, setModalReason] = useState("");

    const handleOpenModal = ({ reason }: { reason: string }) => {
        setModalReason(reason);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setModalReason("");
    };

    const columns = [
        { field: "number", headerName: "#", flex: 0.2, minWidth: 50, },
        { field: "appId", headerName: "App ID", flex: 1, minWidth: 150, },
        {
            field: "reason",
            headerName: "Reason",
            flex: 0.3,
            minWidth: 120,
            renderCell: (params: any) => (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                    }}
                    title="View Reason"
                    onClick={() => handleOpenModal({ reason: params.row.reason })}
                >
                    <IoEye size={20} />
                </div>
            ),
        },
        // { field: "reason", headerName: "Reason", flex: 1, minWidth: 150, },
        { field: "date", headerName: "Date", flex: 1, minWidth: 150, },
        {
            field: "status",
            headerName: "Status",
            flex: 0.8,
            minWidth: 180,
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
                        style={{ display: "inline-block" }}
                    >
                        {status}
                    </div>
                );
            },
        },
    ];

    const rows = appointments.map((appointment: any, index: number) => ({
        id: index + 1,
        number: index + 1,
        appId: appointment._id,
        reason: appointment.reason,
        date: new Date(appointment.date).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        }),
        status: appointment.status.toUpperCase(),
    }));

    return (
        <div className="mt-[-40px]">
            {isLoading ? (
                <Loader />
            ) : appointments.length === 0 ? (
                <Box display="flex" alignItems="center" justifyContent="center" height="80vh">
                    <Typography variant="h6" className="dark:text-[#fff]">
                        You don&apos;t have any appointment
                    </Typography>
                </Box>
            ) : (
                <Box m="20px">
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
                                    color: theme === "dark" ? "#fff" : "#000", // Adjust arrow icon colors
                                },
                            },
                        }}
                    >
                        <DataGrid rows={rows} columns={columns} />
                    </Box>
                </Box>
            )}

            {/* Modal for reason */}
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                reason={modalReason}
            />
        </div>
    );
};

export default MyAppointments;
