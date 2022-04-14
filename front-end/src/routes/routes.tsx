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
import { Role } from "../repository";
import { BankDetails } from "../pages/dashboard/components/bank-details";
import { BankProfilePage } from "../pages/institute-dashboard/components";

function Routes() {
  const {
    state: {
      userDetails: { role },
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
              {role === Role.Customer && <Dashboard />}
              {role === Role.Admin && <AdminDashboard />}
              {role === Role.Bank && <InstituteDashboard />}
            </>
          }
        />
        {(role === Role.Customer || role === Role.Bank) && (
          <Route
            path="/profile"
            element={
              <>
                {role === Role.Customer && <ProfilePage />}
                {role === Role.Bank && <BankProfilePage />}
              </>
            }
          />
        )}
        <Route
          path="/dashboard/add"
          element={<>{role === Role.Bank ? <AddPage /> : <AdminAddPage />}</>}
        />
        <Route
          path="/:id"
          element={
            <>{role === Role.Bank ? <EntityDetails /> : <BankDetails />}</>
          }
        />
      </Route>
    </ParentRoutes>
  );
}

export default Routes;
