import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import HomePage from "./pages/HomePage";
import AuthCallbackPage from "./pages/AuthCallbackPage";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/auth-callback" element={<AuthCallbackPage />} />
            <Route path="/" element={<Layout><HomePage /></Layout>} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}

export default AppRoutes;