import {redirect} from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

interface ProtectedProps{
    children: React.ReactNode;
}


export default function ManagerProtected({children}: ProtectedProps) {
    const {user} = useSelector((state:any) => state.auth);
    const isManager = user?.role === "manager"

    return isManager ? children : redirect("/");
}