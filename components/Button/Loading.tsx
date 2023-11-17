import React from "react";
import { twMerge } from "tailwind-merge";
import Spinner from "../Common/Spinner";

type LoadingButtonProps = {
    loading: boolean;
    btnColor?: string;
    textColor?: string;
    disabled?: boolean;
    children: React.ReactNode;
};

export const LoadingButton: React.FC<LoadingButtonProps> = ({ textColor = "text-white", btnColor = "bg-indigo-600", disabled = false, children, loading = false, }) => {
    return (
        <button
            disabled={disabled || loading}
            type="submit"
            className={twMerge(
                `flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`,
                `${btnColor} ${loading && "bg-[#ccc]"}`
            )}
        >
            {loading ? (
                <div className="flex items-center gap-3">
                    <Spinner />
                    <span className="text-slate-500 inline-block">Loading...</span>
                </div>
            ) : (
                <span className={`${textColor}`}>{children}</span>
            )}
        </button>
    );
};