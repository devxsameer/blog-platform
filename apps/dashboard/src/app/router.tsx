// web/src/app/router.tsx
import HomePage from "@/pages/Home";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />
    }
])