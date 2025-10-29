import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import ProjectManagement from "../pages/ProjectManagement";
import SkillsManagement from "../pages/SkillsManagement";
import CertificationsManagement from "../pages/CertificationsManagement";
import Messages from "../pages/Messages";
import EducationManagement from "../pages/EducationManagement";
import ProfileSettings from "../pages/ProfileSettings";
import AdminDashboard from "../pages/AdminDashboard";
import ExperienceManagement from "../pages/ExperienceManagement";
import ServiceManagement from "../pages/ServiceManagement";
import ErrorPage from "../pages/ErrorPage";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/manage-projects",
                element: <ProjectManagement />
            },
            {
                path: "/manage-skills",
                element: <SkillsManagement />
            },
            {
                path: "/manage-certifications",
                element: <CertificationsManagement />
            },
            {
                path: "/messages",
                element: <Messages />
            },
            {
                path: "/manage-education",
                element: <EducationManagement />
            },
            {
                path: "/manage-experience",
                element: <ExperienceManagement />
            },
            {
                path: "/manage-services",
                element: <ServiceManagement />
            },
            {
                path: "/profile-settings",
                element: <ProfileSettings />
            },
            {
                path: "/admin-dashboard",
                element: <AdminDashboard />
            }
        ]
    }
])


export default routes;