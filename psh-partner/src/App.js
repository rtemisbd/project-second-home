import "bootstrap-4-react";
import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";

import Orders from "./pages/Orders";
import AddProperty from "./pages/AddProperty";
import Promo from "./pages/Promo";
import AddPromo from "./pages/AddPromo";
import PrivateRoute from "./Routes/PrivateRoute/PrivateRoute";
import AdminRoute from "./Routes/AdminRoute/AdminRoute";

import Issue from "./pages/issue";

import AdminOrders from "./pages/AdminOrders";
import Issues from "./pages/Issues";

import Invoice from "./pages/details/Invoice";
import PartnerPropertyList from "./components/Property/PartnerPropertyList";

import TransactionManager from "./pages/Transaction/TransactionManager";

import "./App.css";

import AdjustmentList from "./components/Promo/AdjustmentList";
import UsedPromoList from "./components/Promo/UsedPromoList";
import Homes from "./components/Homes/Homes";
import RoomRent from "./pages/RoomRent/RoomRent";
import RoomVisit from "./pages/RoomVisit/RoomVisit";
import RoomVisitAdmin from "./pages/RoomVisit/RoomVisitAdmin";
import PropertyReports from "./components/Property/PropertyReports";
import AdminIssueList from "./components/Issue/AdminIssueList";
import FeaturedRoom from "./pages/Featured/FeaturedRoom";
import Subscription from "./pages/Subscription/Subscription";
import SubscriptionOrder from "./pages/Subscription/SubscriptionOrder";
import SubscriptionHistory from "./pages/Subscription/SubscriptionHistory";

function App() {
  return (
    <div className="">
      <Routes>
        <Route element={<SignIn />}>
          <Route path="/signup" element={<SignIn />} />
        </Route>

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Homes />} />
        </Route>
        <Route path="/" element={<AdminRoute />}>
          <Route path="/" element={<Homes />} />

          <Route path="add_property" element={<AddProperty />} />

          <Route path="property_list_p" element={<PartnerPropertyList />} />

          <Route path="property-report" element={<PropertyReports />} />
          <Route path="add_promo" element={<AddPromo />} />
          <Route path="promo_list" element={<Promo />} />
          <Route path="adjustmen-list" element={<AdjustmentList />} />

          <Route path="used-promo" element={<UsedPromoList />} />

          <Route path="orders_m" element={<Orders />} />
          <Route path="orders" element={<AdminOrders />} />

          <Route path="transaction-m" element={<TransactionManager />} />
          <Route path="featured" element={<FeaturedRoom />} />
          <Route path="subscription" element={<Subscription />} />
          <Route path="buy-subscription" element={<SubscriptionOrder />} />
          <Route path="subscription-list" element={<SubscriptionHistory />} />
          <Route path="housing" element={<RoomRent />} />
          <Route path="visitingRequest-a" element={<RoomVisitAdmin />} />
          <Route path="visitingRequest" element={<RoomVisit />} />

          {/* <Route path="issue" element={<Issue />} /> */}
          <Route path="issues_m" element={<Issues />} />
          {/* <Route path="issues" element={<AdminIssueList />} /> */}

          <Route path="invoice/:id" element={<Invoice />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
