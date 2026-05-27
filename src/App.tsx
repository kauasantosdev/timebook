import { useState, useEffect } from 'react';
import { UserProfile, Booking, Client } from './types';
import { INITIAL_PROFILE, INITIAL_CLIENTS, INITIAL_BOOKINGS } from './mockData';
import LandingPage from './components/LandingPage';
import ProfessionalDashboard from './components/ProfessionalDashboard';
import OverviewSection from './components/OverviewSection';
import CalendarView from './components/CalendarView';
import BookingsList from './components/BookingsList';
import ClientsList from './components/ClientsList';
import SettingsView from './components/SettingsView';
import PublicBookingPage from './components/PublicBookingPage';

export default function App() {
  // Navigation states
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard' | 'public_booking'>('landing');
  const [activeDashboardTab, setActiveDashboardTab] = useState<string>('overview');

  // Core Simulation States
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('timebook_profile');
    return saved ? JSON.parse(saved) : INITIAL_PROFILE;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('timebook_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [clients, setClients] = useState<Client[]>(() => {
    const saved = localStorage.getItem('timebook_clients');
    return saved ? JSON.parse(saved) : INITIAL_CLIENTS;
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('timebook_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('timebook_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('timebook_clients', JSON.stringify(clients));
  }, [clients]);

  // Actions for State Manipulation
  const handleCancelBooking = (bookingId: string) => {
    setBookings(prev => prev.map(booking => {
      if (booking.id === bookingId) {
        return { ...booking, status: 'cancelled' };
      }
      return booking;
    }));
  };

  const handleConfirmBooking = (bookingId: string) => {
    setBookings(prev => prev.map(booking => {
      if (booking.id === bookingId) {
        return { ...booking, status: 'confirmed' };
      }
      return booking;
    }));
  };

  const handleAddBooking = (newBookingData: Omit<Booking, 'id' | 'createdAt'>) => {
    const newId = "b-" + Date.now();
    const newBooking: Booking = {
      ...newBookingData,
      id: newId,
      createdAt: new Date().toISOString()
    };

    setBookings(prev => [...prev, newBooking]);

    // Check if client email already exists. If not, add them as a client; if yes, increase their spent/bookings.
    setClients(prevClients => {
      const existingClient = prevClients.find(c => c.email.toLowerCase() === newBookingData.clientEmail.toLowerCase());
      if (existingClient) {
        return prevClients.map(c => {
          if (c.email.toLowerCase() === newBookingData.clientEmail.toLowerCase()) {
            return {
              ...c,
              totalBookings: c.totalBookings + 1,
              totalSpent: c.totalSpent + newBookingData.price
            };
          }
          return c;
        });
      } else {
        const colors = [
          'bg-indigo-100 text-indigo-700',
          'bg-purple-100 text-purple-700',
          'bg-fuchsia-100 text-fuchsia-700',
          'bg-rose-100 text-rose-700',
          'bg-teal-100 text-teal-700',
          'bg-amber-100 text-amber-700'
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const newClient: Client = {
          id: "c-" + Date.now(),
          name: newBookingData.clientName,
          email: newBookingData.clientEmail,
          phone: newBookingData.clientPhone,
          avatarColor: randomColor,
          totalBookings: 1,
          totalSpent: newBookingData.price
        };
        return [...prevClients, newClient];
      }
    });
  };

  const handleResetState = () => {
    if (confirm("Tens a certeza que desejas efetuar o reset total da demonstração? Todos os agendamentos personalizados criados serão apagados.")) {
      localStorage.removeItem('timebook_profile');
      localStorage.removeItem('timebook_bookings');
      localStorage.removeItem('timebook_clients');
      setProfile(INITIAL_PROFILE);
      setBookings(INITIAL_BOOKINGS);
      setClients(INITIAL_CLIENTS);
      alert("Demonstração redefinida para os valores padrão de fábrica!");
    }
  };

  const handleUpdateProfile = (updatedProfile: UserProfile) => {
    setProfile(updatedProfile);
  };

  // Rendering dashboard sub-tab based on state selection
  const renderDashboardTabContent = () => {
    switch(activeDashboardTab) {
      case 'overview':
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
      case 'calendar':
        return (
          <CalendarView 
            profile={profile}
            bookings={bookings}
            clients={clients}
            onAddManualBooking={handleAddBooking}
            onCancelBooking={handleCancelBooking}
          />
        );
      case 'bookings':
        return (
          <BookingsList 
            bookings={bookings}
            profile={profile}
            onCancelBooking={handleCancelBooking}
            onConfirmBooking={handleConfirmBooking}
          />
        );
      case 'clients':
        return (
          <ClientsList 
            clients={clients}
            profile={profile}
          />
        );
      case 'settings':
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
    <>
      {currentView === 'landing' && (
        <LandingPage 
          onEnterDashboard={() => {
            setCurrentView('dashboard');
            setActiveDashboardTab('overview');
          }}
          onEnterPublicBooking={() => {
            setCurrentView('public_booking');
          }}
          profile={profile}
          bookings={bookings}
        />
      )}

      {currentView === 'dashboard' && (
        <ProfessionalDashboard 
          profile={profile}
          bookings={bookings}
          clients={clients}
          activeTab={activeDashboardTab}
          setActiveTab={setActiveDashboardTab}
          onCancelBooking={handleCancelBooking}
          onConfirmBooking={handleConfirmBooking}
          onAddManualBooking={handleAddBooking}
          onNavigateToPublic={() => setCurrentView('public_booking')}
          onResetState={handleResetState}
        >
          {renderDashboardTabContent()}
        </ProfessionalDashboard>
      )}

      {currentView === 'public_booking' && (
        <PublicBookingPage 
          profile={profile}
          bookings={bookings}
          onAddBooking={handleAddBooking}
          onGoBack={() => {
            setCurrentView('landing');
          }}
        />
      )}
    </>
  );
}
