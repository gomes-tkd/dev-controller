import React from "react";
import Breadcrumb from "@/components/breadcrumb";

interface ContainerProps {
    children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
    return (
        <div className={"w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"}>
            <div className={"mt-6 mb-6"}>
                <Breadcrumb />
            </div>
            {children}
        </div>
    );
}