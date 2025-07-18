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

const routes = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
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