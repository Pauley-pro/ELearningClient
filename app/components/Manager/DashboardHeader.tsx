'use client';
import { ThemeSwitcher } from '@/app/utils/ThemeSwitcher';
import { format } from 'timeago.js';
import React, { FC, useEffect, useState, useCallback } from 'react';

type Props = {
    open: boolean;
    setOpen?: any;
}

const DashboardHeader: FC<Props> = ({ open, setOpen }) => {
    


    return (
        <div className="w-full flex items-center justify-end p-6 fixed top-0 right-0 bg-[#fff] shadow-xl dark:bg-[#0e121e] z-[80]">
            <ThemeSwitcher />
        </div>
    );
};

export default DashboardHeader;
