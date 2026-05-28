import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import { UserProfile, Booking, Client } from "./types";
import { INITIAL_PROFILE, INITIAL_CLIENTS, INITIAL_BOOKINGS } from "./mockData";

import LandingPage from "./components/LandingPage";
import ProfessionalDashboard from "./components/ProfessionalDashboard";
import OverviewSection from "./components/OverviewSection";
import CalendarView from "./components/CalendarView";
import BookingsList from "./components/BookingsList";
import ClientsList from "./components/ClientsList";
import SettingsView from "./components/SettingsView";
import PublicBookingPage from "./components/PublicBookingPage";
import AuthPage from "./components/AuthPage";

export default function App() {
  const navigate = useNavigate();

  // Dashboard tab (continua necessário)
  const [activeDashboardTab, setActiveDashboardTab] =
    useState<string>("overview");

  // Core states
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem("timebook_profile");
    return saved ? JSON.parse(saved) : INITIAL_PROFILE;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem("timebook_bookings");
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [clients, setClients] = useState<Client[]>(() => {
    const saved = localStorage.getItem("timebook_clients");
    return saved ? JSON.parse(saved) : INITIAL_CLIENTS;
  });

  const [authInitialMode, setAuthInitialMode] = useState<'login' | 'register'>('login');
  const [authDefaultEmail, setAuthDefaultEmail] = useState('');

  // Sync localStorage
  useEffect(() => {
    localStorage.setItem("timebook_profile", JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem("timebook_bookings", JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem("timebook_clients", JSON.stringify(clients));
  }, [clients]);

  // Actions
  const handleCancelBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: "cancelled" } : b))
    );
  };

  const handleConfirmBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: "confirmed" } : b))
    );
  };

  const handleAddBooking = (
    newBookingData: Omit<Booking, "id" | "createdAt">
  ) => {
    const newBooking: Booking = {
      ...newBookingData,
      id: "b-" + Date.now(),
      createdAt: new Date().toISOString(),
    };

    setBookings((prev) => [...prev, newBooking]);

    setClients((prevClients) => {
      const existing = prevClients.find(
        (c) =>
          c.email.toLowerCase() === newBookingData.clientEmail.toLowerCase()
      );

      if (existing) {
        return prevClients.map((c) =>
          c.email.toLowerCase() === newBookingData.clientEmail.toLowerCase()
            ? {
                ...c,
                totalBookings: c.totalBookings + 1,
                totalSpent: c.totalSpent + newBookingData.price,
              }
            : c
        );
      }

      const colors = [
        "bg-indigo-100 text-indigo-700",
        "bg-purple-100 text-purple-700",
        "bg-fuchsia-100 text-fuchsia-700",
        "bg-rose-100 text-rose-700",
        "bg-teal-100 text-teal-700",
        "bg-amber-100 text-amber-700",
      ];

      return [
        ...prevClients,
        {
          id: "c-" + Date.now(),
          name: newBookingData.clientName,
          email: newBookingData.clientEmail,
          phone: newBookingData.clientPhone,
          avatarColor: colors[Math.floor(Math.random() * colors.length)],
          totalBookings: 1,
          totalSpent: newBookingData.price,
        },
      ];
    });
  };

  const handleResetState = () => {
    if (confirm("Reset total da demo?")) {
      localStorage.clear();
      setProfile(INITIAL_PROFILE);
      setBookings(INITIAL_BOOKINGS);
      setClients(INITIAL_CLIENTS);
    }
  };

  const handleUpdateProfile = (updated: UserProfile) => {
    setProfile(updated);
  };

  // 🔥 DASHBOARD TAB SYSTEM (continua necessário)
  const renderDashboardTabContent = () => {
    switch (activeDashboardTab) {
      case "overview":
        return (
          <OverviewSection
            profile={profile}
            bookings={bookings}
            clients={clients}
            onCancelBooking={handleCancelBooking}
            onConfirmBooking={handleConfirmBooking}
            setActiveTab={setActiveDashboardTab}
          />
        );

      case "calendar":
        return (
          <CalendarView
            profile={profile}
            bookings={bookings}
            clients={clients}
            onAddManualBooking={handleAddBooking}
            onCancelBooking={handleCancelBooking}
          />
        );

      case "bookings":
        return (
          <BookingsList
            bookings={bookings}
            profile={profile}
            onCancelBooking={handleCancelBooking}
            onConfirmBooking={handleConfirmBooking}
          />
        );

      case "clients":
        return <ClientsList clients={clients} profile={profile} />;

      case "settings":
        return (
          <SettingsView
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Routes>
      {/* 🟢 LANDING */}
      <Route
        path="/"
        element={
          <LandingPage
            profile={profile}
            bookings={bookings}
            onEnterDashboard={() => {
              setActiveDashboardTab("overview");
              navigate("/dashboard");
            }}
            onEnterPublicBooking={() => navigate("/booking")}
            onEnterAuth={() => navigate("/auth")}
          />
        }
      />

      {/* 🔵 DASHBOARD */}
      <Route
        path="/dashboard"
        element={
          <ProfessionalDashboard
            profile={profile}
            bookings={bookings}
            clients={clients}
            activeTab={activeDashboardTab}
            setActiveTab={setActiveDashboardTab}
            onCancelBooking={handleCancelBooking}
            onConfirmBooking={handleConfirmBooking}
            onAddManualBooking={handleAddBooking}
            onNavigateToPublic={() => navigate("/booking")}
            onResetState={handleResetState}
          >
            {renderDashboardTabContent()}
          </ProfessionalDashboard>
        }
      />

      {/* 🟣 PUBLIC BOOKING */}
      <Route
        path="/booking"
        element={
          <PublicBookingPage
            profile={profile}
            bookings={bookings}
            onAddBooking={handleAddBooking}
            onGoBack={() => navigate("/")}
          />
        }
      />


     <Route
        path="/auth"
        element={
          <AuthPage
            initialMode={authInitialMode}
            defaultEmail={authDefaultEmail}
            onBack={() => navigate('/')}
            onSuccess={()=> navigate('/dashboard')}
          />
        }
      />
    </Routes>

  );
}
