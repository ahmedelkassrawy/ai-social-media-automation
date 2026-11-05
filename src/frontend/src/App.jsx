import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import ClientsPage from "./pages/ClientsPage";
import DashboardPage from "./pages/DashboardPage";
import ContentCalendarPage from "./pages/ContentCalendarPage";
import InboxPage from "./pages/InboxPage";
import ContentBuilderPage from "./pages/ContentBuilderPage";
import CaptionStudioPage from "./pages/CaptionStudioPage";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/" element={<AppLayout />}>
          <Route index element={<ClientsPage />} />
          <Route path="calendar" element={<ContentCalendarPage />} />
          <Route path="inbox" element={<InboxPage />} />
          <Route path="content" element={<ContentBuilderPage />} />
          <Route path="caption-studio" element={<CaptionStudioPage />} />
          <Route path="reports" element={<DashboardPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
