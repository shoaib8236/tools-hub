// Routes.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import TaskManager from "./screens/task-manager/task-manager";

const AppRoutes = () => {
  const routes = [
    {
      path: "/task-manager",
      element: <TaskManager />,
    },
  ];

  return (
    <div className="flex flex-col overflow-hidden h-[100svh]">
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </div>
  );
};

export default AppRoutes;
