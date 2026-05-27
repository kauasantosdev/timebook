import { UserProfile, Client, Booking } from './types';

export const INITIAL_PROFILE: UserProfile = {
  username: "lucasdesign",
  name: "Lucas Vasconcelos",
  profession: "Product Designer & Brand Consultant",
  bio: "Ajudo startups a construir marcas memoráveis e interfaces de alta conversão. Reserve uma sessão estratégica de consultoria de 45 minutos.",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&h=256&auto=format&fit=crop",
  pricePerSession: 85,
  currency: "€",
  slotDuration: 45,
  workingHours: {
    start: "09:00",
    end: "18:00"
  },
  workingDays: [1, 2, 3, 4, 5] // Monday to Friday
};

export const INITIAL_CLIENTS: Client[] = [
  {
    id: "c1",
    name: "Ana Martins",
    email: "ana.martins@startup.pt",
    phone: "+351 912 345 678",
    avatarColor: "bg-indigo-100 text-indigo-700",
    totalBookings: 4,
    totalSpent: 340
  },
  {
    id: "c2",
    name: "Guilherme Santos",
    email: "g.santos@fintech.com",
    phone: "+351 934 567 890",
    avatarColor: "bg-purple-100 text-purple-700",
    totalBookings: 2,
    totalSpent: 170
  },
  {
    id: "c3",
    name: "Beatriz Costa",
    email: "beatriz.costa@creative.io",
    phone: "+351 922 888 777",
    avatarColor: "bg-fuchsia-100 text-fuchsia-700",
    totalBookings: 1,
    totalSpent: 85
  },
  {
    id: "c4",
    name: "Ricardo Oliveira",
    email: "ricardo.o@techgroup.pt",
    phone: "+351 915 555 123",
    avatarColor: "bg-teal-100 text-teal-700",
    totalBookings: 1,
    totalSpent: 85
  },
  {
    id: "c5",
    name: "Sofia Ribeiro",
    email: "sofia.ribeiro@vandal.com",
    phone: "+351 963 222 111",
    avatarColor: "bg-rose-100 text-rose-700",
    totalBookings: 3,
    totalSpent: 255
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: "b1",
    clientId: "c1",
    clientName: "Ana Martins",
    clientEmail: "ana.martins@startup.pt",
    clientPhone: "+351 912 345 678",
    date: "2026-05-25",
    time: "10:00",
    duration: 45,
    status: 'confirmed',
    notes: "Análise da UX/UI da nova landing page do produto SaaS.",
    createdAt: "2026-05-20T14:30:00Z",
    price: 85
  },
  {
    id: "b2",
    clientId: "c2",
    clientName: "Guilherme Santos",
    clientEmail: "g.santos@fintech.com",
    clientPhone: "+351 934 567 890",
    date: "2026-05-26",
    time: "14:30",
    duration: 45,
    status: 'confirmed',
    notes: "Desenho e fluxos de onboarding do utilizador.",
    createdAt: "2026-05-21T09:15:00Z",
    price: 85
  },
  // Upcoming Bookings for Today: May 27th, 2026
  {
    id: "b3",
    clientId: "c3",
    clientName: "Beatriz Costa",
    clientEmail: "beatriz.costa@creative.io",
    clientPhone: "+351 922 888 777",
    date: "2026-05-27",
    time: "09:30",
    duration: 45,
    status: 'confirmed',
    notes: "Revisão do Brand Book e paleta de cores para rebrand.",
    createdAt: "2026-05-24T18:00:00Z",
    price: 85
  },
  {
    id: "b4",
    clientId: "c4",
    clientName: "Ricardo Oliveira",
    clientEmail: "ricardo.o@techgroup.pt",
    clientPhone: "+351 915 555 123",
    date: "2026-05-27",
    time: "11:30",
    duration: 45,
    status: 'confirmed',
    notes: "Consultoria sobre design handoff com os developers.",
    createdAt: "2026-05-25T11:00:00Z",
    price: 85
  },
  // Upcoming Tomorrow: May 28th, 2026
  {
    id: "b5",
    clientId: "c5",
    clientName: "Sofia Ribeiro",
    clientEmail: "sofia.ribeiro@vandal.com",
    clientPhone: "+351 963 222 111",
    date: "2026-05-28",
    time: "15:00",
    duration: 45,
    status: 'confirmed',
    notes: "Alinhamento sobre design system comercial.",
    createdAt: "2026-05-26T16:20:00Z",
    price: 85
  },
  {
    id: "b6",
    clientId: "c1",
    clientName: "Ana Martins",
    clientEmail: "ana.martins@startup.pt",
    clientPhone: "+351 912 345 678",
    date: "2026-05-29",
    time: "11:00",
    duration: 45,
    status: 'confirmed',
    notes: "Acompanhamento geral e testes de usabilidade.",
    createdAt: "2026-05-26T10:00:00Z",
    price: 85
  }
];
