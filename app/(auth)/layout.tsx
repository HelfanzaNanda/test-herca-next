import React from "react";
import "@/styles/global.css";
import NavbarComponent from "./components/common/Navbar";
import { ToastContainer } from "react-toastify";

export default function RootLayout({ children, }: { children: React.ReactNode; }) {
    
    return (
        <>
            <NavbarComponent/>
            <div className="p-6">
                <div className="mt-5">
                    {children}
                    <ToastContainer />
                </div>
            </div>
        </>


    );
}
