import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import ProjectManagement from "../pages/ProjectManagement";
import SkillsManagement from "../pages/SkillsManagement";
import CertificationsManagement from "../pages/CertificationsManagement";

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
            }
        ]
    }
])


export default routes;