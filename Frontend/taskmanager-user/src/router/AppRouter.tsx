import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainPage } from "../Components/MainPage/MainPage";
import { UserAuth } from "../Components/Auth/UserAuth";
import { UserSignup } from "../Components/Auth/UserSignup";
import { UserDashboard } from "Components/Dashboard/User-Dashboard";
import ProtectedRoute from "Components/Auth/ProtectedRoute";
import { AddTeams } from "Components/Teams/AddTeams";
import { Layout } from "Components/Layout/Layout";
import { ProfileSettingsPage } from "Components/ProfileSettings/ProfileSettingsPage";
import { TaskDetailModal } from "Components/Task/TaskDetailModal";

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="login" element={<UserAuth />} />
        <Route path="Signup" element={<UserSignup />} />
        <Route element={<ProtectedRoute />}>
          <Route path="profile-settings" element={<ProfileSettingsPage />} />
          <Route path="task/:id" element={<TaskDetailModal/>}/>
          <Route element={<Layout />}>
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="teams" element={<AddTeams />} />

          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
