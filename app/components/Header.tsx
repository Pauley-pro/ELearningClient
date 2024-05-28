'use client';
import Link from 'next/link';
import React, { FC, useEffect, useState } from 'react';
import NavItems from "../utils/NavItems";
import { ThemeSwitcher } from "../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import CustomModal from "../utils/CustomModal";
import Login from "../components/Auth/Login";
import Signup from "../components/Auth/SignUp";
import Verification from "../components/Auth/Verification";
import Image from 'next/image';
import avatar from "../../public/images/noavatar.jpg";
import { useSession } from "next-auth/react";
import { useLogOutQuery, useSocialAuthMutation } from '@/redux/features/auth/authApi';
import toast from 'react-hot-toast';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import Loader from "./Loader/Loader";

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    activeItem: number;
    route: string;
    setRoute: (route: string) => void;
};

const Header: FC<Props> = ({ activeItem, setOpen, route, open, setRoute }) => {
    const [active, setActive] = useState(false);
    const [openSidebar, setOpenSidebar] = useState(false);
    const { data: userData, isLoading, refetch } = useLoadUserQuery(undefined, {});
    const { data: sessionData } = useSession();
    const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();
    const [logout, setLogout] = useState(false);
    const { } = useLogOutQuery(undefined, {
        skip: !logout ? true : false,
    });

    useEffect(() => {
        console.log("Loading state:", isLoading);
        console.log("Session data:", sessionData);
        console.log("User data:", userData);

        if (!isLoading) {
            if (!userData && sessionData) {
                socialAuth({
                    email: sessionData.user.email,
                    name: sessionData.user.name,
                    avatar: sessionData.user.image,
                }).then(() => {
                    refetch();
                });
            }
        }
        
        if (!sessionData && isSuccess) {
            toast.success("Login Successfully");
        }

        if (!sessionData && !isLoading && !userData) {
            setLogout(true);
        }
    }, [sessionData, userData, isLoading, isSuccess, refetch, socialAuth]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 85) {
                setActive(true);
            } else {
                setActive(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleClose = (e: any) => {
        if (e.target.id === "screen") {
            setOpenSidebar(false);
        }
    };

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div className="w-full relative">
                    <div className={`${active ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-x1 transition duration-500"
                        : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow"}`}>
                        <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
                            <div className="w-full h-[80px] flex items-center justify-between p-3">
                                <div>
                                    <Link href={"/"} className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}>
                                        ELearning
                                    </Link>
                                </div>
                                <div className="flex items-center">
                                    <NavItems activeItem={activeItem} isMobile={false} />
                                    <ThemeSwitcher />
                                    <div className="800px:hidden">
                                        <HiOutlineMenuAlt3 size={25} className="cursor-pointer dark:text-white text-black" onClick={() => setOpenSidebar(true)} />
                                    </div>
                                    {userData ? (
                                        <Link href={"/profile"}>
                                            <Image
                                                src={userData.user.avatar ? userData.user.avatar.url : avatar}
                                                alt="User Avatar"
                                                width={30}
                                                height={30}
                                                className="w-[30px] h-[30px] rounded-full cursor-pointer"
                                                style={{ border: activeItem === 5 ? "2px solid #37a39a" : "none" }}
                                            />
                                        </Link>
                                    ) : (
                                        <>
                                            <HiOutlineUserCircle
                                                size={25}
                                                className="block 800px:hidden cursor-pointer dark:text-white text-black"
                                                onClick={() => setOpen(true)}
                                            />
                                            <HiOutlineUserCircle
                                                size={25}
                                                className="hidden 800px:block cursor-pointer dark:text-white text-black"
                                                onClick={() => setOpen(true)}
                                            />
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        {openSidebar && (
                            <div className="fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024]" onClick={handleClose} id="screen">
                                <div className="w-[62%] fixed z-[999999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0">
                                    <NavItems activeItem={activeItem} isMobile={true} />
                                    {userData ? (
                                        <Link href={"/profile"}>
                                            <Image
                                                src={userData.user.avatar ? userData.user.avatar.url : avatar}
                                                alt="User Avatar"
                                                width={30}
                                                height={30}
                                                className="w-[30px] h-[30px] rounded-full ml-[20px] cursor-pointer"
                                                style={{ border: activeItem === 5 ? "2px solid #37a39a" : "none" }}
                                            />
                                        </Link>
                                    ) : (
                                        <>
                                            <HiOutlineUserCircle
                                                size={25}
                                                className="block 800px:hidden cursor-pointer dark:text-white text-black"
                                                onClick={() => setOpen(true)}
                                            />
                                            <HiOutlineUserCircle
                                                size={25}
                                                className="hidden 800px:block cursor-pointer dark:text-white text-black"
                                                onClick={() => setOpen(true)}
                                            />
                                        </>
                                    )}
                                    <br />
                                    <br />
                                    <p className="text-[16px] px-2 pl-5 text-black dark:text-white">
                                        Copyright &copy; 2023 ELearning
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                    {route === "Login" && open && (
                        <CustomModal
                            open={open}
                            setOpen={setOpen}
                            setRoute={setRoute}
                            activeItem={activeItem}
                            component={Login}
                            refetch={refetch}
                        />
                    )}
                    {route === "Sign-Up" && open && (
                        <CustomModal
                            open={open}
                            setOpen={setOpen}
                            setRoute={setRoute}
                            activeItem={activeItem}
                            component={Signup}
                        />
                    )}
                    {route === "Verification" && open && (
                        <CustomModal
                            open={open}
                            setOpen={setOpen}
                            setRoute={setRoute}
                            activeItem={activeItem}
                            component={Verification}
                        />
                    )}
                </div>
            )}
        </>
    );
};

export default Header;