import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import AppShell from './components/layout/AppShell'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import FeedPage from './pages/FeedPage'
import NewEntryPage from './pages/NewEntryPage'
import EntryDetailPage from './pages/EntryDetailPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    element: <AppShell />,
    children: [
      { path: '/journal', element: <FeedPage /> },
      { path: '/new', element: <NewEntryPage /> },
      { path: '/entry/:id', element: <EntryDetailPage /> },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
