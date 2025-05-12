import { Header } from "Components/Header/Header";
import React from "react";
import { Outlet } from "react-router-dom";

export const Layout : React.FC = () => {
    return (
        <>
        <Header/>
        <main style={{ padding: '20px' }}>
        <Outlet/>
        </main>
        </>
    )
}