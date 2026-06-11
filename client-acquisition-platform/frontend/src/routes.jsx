import { Navigate, createBrowserRouter } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import LeadHunter from './pages/LeadHunter';
import MapDiscovery from './pages/MapDiscovery';
import LeadDetail from './pages/LeadDetail';
import Pipeline from './pages/Pipeline';
import Proposals from './pages/Proposals';
import Settings from './pages/Settings';
export const router = createBrowserRouter([{ path: '/', element: <AppLayout/>, children: [
  { index: true, element: <Navigate to="/dashboard" replace/> }, { path: 'onboarding', element: <Onboarding/> }, { path: 'dashboard', element: <Dashboard/> }, { path: 'leads', element: <LeadHunter/> }, { path: 'map', element: <MapDiscovery/> }, { path: 'lead/:id', element: <LeadDetail/> }, { path: 'pipeline', element: <Pipeline/> }, { path: 'proposals', element: <Proposals/> }, { path: 'settings', element: <Settings/> }
]}]);
