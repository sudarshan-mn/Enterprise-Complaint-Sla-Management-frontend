import { Routes, Route, Navigate } from "react-router-dom";

/* AUTH */
import Login from "./pages/Login";
import Register from "./pages/Register";

/* CUSTOMER */
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import CreateComplaint from "./pages/customer/CreateComplaint";
import MyComplaints from "./pages/customer/MyComplaints";
import ComplaintDetail from "./pages/customer/ComplaintDetail";

/* ADMIN */
import AdminAddUser from "./pages/admin/AdminAddUser";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminComplaints from "./pages/admin/AdminComplaints";
import AdminUnassignedComplaints from "./pages/admin/AdminUnassignedComplaints";
import AdminMetrics from "./pages/admin/AdminMetrics";

/* ENGINEER */
import EngineerDashboard from "./pages/engineer/EngineerDashboard";
import EngineerComplaints from "./pages/engineer/EngineerComplaints";

/* LEAD */
import LeadDashboard from "./pages/lead/LeadDashboard";
import LeadComplaints from "./pages/lead/LeadComplaints";
import LeadReassignComplaint from "./pages/lead/LeadReassignComplaint";

/* MANAGER */
import ManagerDashboard from "./pages/manager/ManagerDashboard";
import ManagerAllComplaints from "./pages/manager/ManagerAllComplaints";
import ManagerSlaBreached from "./pages/manager/ManagerSlaBreached";
import ManagerResolvedComplaints from "./pages/manager/ManagerResolvedComplaints";

/* SECURITY */
import ProtectedRoute from "./auth/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* DEFAULT */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* CUSTOMER */}
      <Route
        path="/customer"
        element={
          <ProtectedRoute allowedRoles={["CUSTOMER"]}>
            <CustomerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer/create"
        element={
          <ProtectedRoute allowedRoles={["CUSTOMER"]}>
            <CreateComplaint />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer/complaints"
        element={
          <ProtectedRoute allowedRoles={["CUSTOMER"]}>
            <MyComplaints />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer/complaints/:id"
        element={
          <ProtectedRoute allowedRoles={["CUSTOMER"]}>
            <ComplaintDetail />
          </ProtectedRoute>
        }
      />

      {/* ADMIN */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/complaints"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminComplaints />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/unassigned"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminUnassignedComplaints />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/metrics"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminMetrics />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users/create"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminAddUser />
          </ProtectedRoute>
        }
      />

      {/* ENGINEER */}
      <Route
        path="/engineer"
        element={
          <ProtectedRoute allowedRoles={["ENGINEER"]}>
            <EngineerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/engineer/complaints"
        element={
          <ProtectedRoute allowedRoles={["ENGINEER"]}>
            <EngineerComplaints />
          </ProtectedRoute>
        }
      />

      {/* LEAD */}
      <Route
        path="/lead"
        element={
          <ProtectedRoute allowedRoles={["LEAD"]}>
            <LeadDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/lead/complaints"
        element={
          <ProtectedRoute allowedRoles={["LEAD"]}>
            <LeadComplaints />
          </ProtectedRoute>
        }
      />
      <Route
        path="/lead/complaints/:id/reassign"
        element={
          <ProtectedRoute allowedRoles={["LEAD"]}>
            <LeadReassignComplaint />
          </ProtectedRoute>
        }
      />

      {/* MANAGER */}
      <Route
        path="/manager"
        element={
          <ProtectedRoute allowedRoles={["MANAGER"]}>
            <ManagerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/manager/complaints"
        element={
          <ProtectedRoute allowedRoles={["MANAGER"]}>
            <ManagerAllComplaints />
          </ProtectedRoute>
        }
      />
      <Route
        path="/manager/sla-breached"
        element={
          <ProtectedRoute allowedRoles={["MANAGER"]}>
            <ManagerSlaBreached />
          </ProtectedRoute>
        }
      />
      <Route
        path="/manager/resolved"
        element={
          <ProtectedRoute allowedRoles={["MANAGER"]}>
            <ManagerResolvedComplaints />
          </ProtectedRoute>
        }
      />

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
