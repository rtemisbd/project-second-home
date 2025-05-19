import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import SignUp from "../pages/SignUp/SignUp";
import Success from "../pages/Success/Success";
import Profile from "../pages/Profile/Profile";
import Contact from "../pages/Contact/Contact";
import About from "../pages/About/About";
import SignIn from "../pages/SignUp/SignIn";

import List from "../pages/List/List";
import PrivateRoute from "./PrivateRoute";
import PersonalInfo from "../pages/Booking/PersonalInfo";
import BookNow from "../pages/Booking/BookNow";
import Invoice from "../pages/Invoice/Invoice";

import PromoList from "../pages/Promo/PromoList";
import Privacy from "../pages/Privacy/Privacy";
import Terms from "../pages/Terms/Terms";

import AllRecomonded from "../components/home/AllRecomonded";
import FaqQuestions from "../pages/Faq/FaqQuestion";
import Business from "../pages/new/Business";

import Partner from "../pages/new/Partner";
import Collaberation from "../pages/new/Collaberation";
import PshPartner from "../pages/PshPartner/PshPartner";
import LeaseProperty from "../pages/LeaseProperty/LeaseProperty";
import ExtraForm from "../pages/ExtraForm/ExtraForm";
import PromoDetails from "../pages/Promo/PromoDetails";
import Community from "../pages/Community/Community";
import Stories from "../pages/Stories/Stories";
import NotFound from "../pages/NotFound/NotFound";
import EventDetails from "../pages/Details/EventDetails";
import ForgotPasswordForm from "../pages/ForgotPasswordForm";
import ResetPasswordForm from "../pages/ResetPasswordForm";
import StudySpace from "../pages/StudySpace/StudySpace";
import UserAuthentication from "../pages/SignUp/UserAuthentication";
import RoomDetails from "../pages/Details/RoomDetails";
import Home from "../pages/Home/Home";
import PaymentPage from "../components/payment/payment2";
import VillaDetails from "../pages/villa/VillaDetails";
import VillaBookingForm from "../pages/Booking/VillaBookingForm";
import VillaBookingConfirmation from "../pages/Booking/VillaBookingConfirmation";
import ResortDetail from "../pages/resorts/ResortDetail";
import VillaInvoice from "../pages/Invoice/VillaInvoice";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/payment",
        element: <PaymentPage></PaymentPage>,
      },
      {
        path: "/contact-us",
        element: <Contact></Contact>,
      },
      {
        path: "/about-us",
        element: <About></About>,
      },
      {
        path: `/branch/:name`,
        element: <List></List>,
      },
      {
        path: "/lease-property",
        element: <LeaseProperty />,
      },
      {
        path: "/:category/:room/:id",
        element: <RoomDetails />,
      },
      {
        path: "/villa/:id",
        element: <VillaDetails />,
      },
      {
        path: "/resort/:id",
        element: <ResortDetail />,
      },
      {
        path: "/event/:id",
        element: <EventDetails></EventDetails>,
      },
      {
        path: "/promo",
        element: <PromoList></PromoList>,
      },
      {
        path: "/recomended",
        element: <AllRecomonded></AllRecomonded>,
      },
      {
        path: "/promo/:id",
        element: <PromoDetails></PromoDetails>,
      },

      // {
      //   path: "/signin",
      //   element: <SignIn></SignIn>,
      // },
      // {
      //   path: "/signup",
      //   element: <SignUp></SignUp>,
      // },

      {
        path: "/profile",
        element: <Profile></Profile>,
      },
      {
        path: "/forgot-password",
        element: <ForgotPasswordForm></ForgotPasswordForm>,
      },
      {
        path: "/reset_password/:id",
        element: <ResetPasswordForm></ResetPasswordForm>,
      },
      {
        path: "/success",
        element: <Success></Success>,
      },
      {
        path: "/booking-confirmation",
        element: <VillaBookingConfirmation />,
      },
      {
        path: "/invoice",
        element: <Invoice />,
      },
      {
        path: "/invoice/:id",
        element: <VillaInvoice />,
      },
      {
        path: "/privacy",
        element: <Privacy />,
      },
      {
        path: "/terms",
        element: <Terms />,
      },
      {
        path: "/corporate-housing",
        element: <Business />,
      },
      {
        path: "/community",
        element: <Community />,
      },
      {
        path: "/stories",
        element: <Stories />,
      },

      {
        path: "/faq-question",
        element: <FaqQuestions />,
      },
      {
        path: "/partner-registration",
        element: <PshPartner />,
      },
      {
        path: "/study-space",
        element: <StudySpace />,
      },
      {
        path: "/register-property",
        element: <Partner />,
      },
      {
        path: "/collaberation",
        element: <Collaberation />,
      },
      {
        path: "/extra-form",
        element: <ExtraForm />,
      },
    ],
  },
  {
    path: "/authentication",
    element: <UserAuthentication />,
  },
  {
    path: "*",
    element: <NotFound />,
  },

  {
    path: "/personal-info",
    element: (
      <PrivateRoute>
        <PersonalInfo></PersonalInfo>
      </PrivateRoute>
    ),

    children: [
      {
        path: "/personal-info",
        element: <PersonalInfo></PersonalInfo>,
      },
    ],
  },
  {
    path: "/book-villa",
    element: (
      <PrivateRoute>
        <VillaBookingForm />
      </PrivateRoute>
    ),

    children: [
      {
        path: "/book-villa",
        element: <VillaBookingForm />,
      },
    ],
  },
  {
    path: "/booking-now",
    element: (
      <PrivateRoute>
        <BookNow></BookNow>
      </PrivateRoute>
    ),

    children: [
      {
        path: "/booking-now",
        element: <BookNow></BookNow>,
      },
    ],
  },
  {
    path: "/invoice",
    element: (
      <PrivateRoute>
        <Invoice></Invoice>
      </PrivateRoute>
    ),

    children: [
      {
        path: "/invoice",
        element: <Invoice></Invoice>,
      },
    ],
  },
  {
    path: "/profile",
    element: (
      <PrivateRoute>
        <Profile></Profile>
      </PrivateRoute>
    ),

    children: [
      {
        path: "/profile",
        element: <Profile></Profile>,
      },
    ],
  },
]);
