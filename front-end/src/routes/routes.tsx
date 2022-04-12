import { Route, Routes as ParentRoutes } from "react-router";
import PrivateRoute from "../middlewares/private-route";
import { AdminDashboard } from "../pages/admin-dashboard/";
import { Dashboard } from "../pages/dashboard/";
import { ErrorPage } from "../pages/error/";
import { LandingPage } from "../pages/landing";
import { ProfilePage } from "../pages/profile";
import { InstituteDashboard } from "../pages/institute-dashboard";
import { AddPage } from "../pages/institute-dashboard/components/add";
import { AddPage as AdminAddPage } from "../pages/admin-dashboard/components/";
import { useAuthContext } from "../contexts/auth-context";
import { EntityDetails } from "../pages/entity-details/";
import Loader from "../components/loader";

function Routes() {
  const {
    state: {
      userDetails: { type },
      loading,
    },
  } = useAuthContext();

  if (loading) {
    return <Loader />;
  }
  return (
    <ParentRoutes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/*" element={<ErrorPage />} />
      <Route element={<PrivateRoute />}>
        <Route
          path="/dashboard"
          element={
            <>
              {type === "customer" && <Dashboard />}
              {type === "admin" && <AdminDashboard />}
              {type === "institution" && <InstituteDashboard />}
            </>
          }
        />
        <Route path="/profile" element={<ProfilePage />} />
        <Route
          path="/dashboard/add"
          element={
            <>{type === "institution" ? <AddPage /> : <AdminAddPage />}</>
          }
        />
        <Route
          path="/:id"
          element={<>{type === "institution" && <EntityDetails />}</>}
        />
      </Route>
    </ParentRoutes>
  );
}

export default Routes;
