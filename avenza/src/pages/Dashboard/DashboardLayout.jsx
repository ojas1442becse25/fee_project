import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, User, Bookmark, LogOut, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import './Dashboard.css';

// DashboardLayout
// ---------------
// Layout for the protected /dashboard section. Acts as the parent in a
// nested route: it renders a sidebar of links and an <Outlet/> where the
// active child route (DashboardHome / ProfilePage / SavedCareers) mounts.
const DashboardLayout = () => {
  const { user, logout } = useAuth();

  useDocumentTitle('Dashboard | Avenza');

  const navItems = [
    { to: '/dashboard', end: true, label: 'Overview', icon: LayoutDashboard },
    { to: '/dashboard/profile', label: 'My Profile', icon: User },
    { to: '/dashboard/saved-careers', label: 'Saved Careers', icon: Bookmark },
  ];

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <div className="sidebar-brand">
            <Sparkles size={22} className="sidebar-logo" />
            <span className="sidebar-title">Dashboard</span>
          </div>

          {/* Rendered with .map() */}
          <nav className="sidebar-nav">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  isActive ? 'sidebar-link sidebar-link-active' : 'sidebar-link'
                }
              >
                <item.icon size={19} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="sidebar-footer">
            <div className="sidebar-user">
              <span className="sidebar-user-name">{user?.name || 'User'}</span>
              <span className="sidebar-user-email">{user?.email || 'No email'}</span>
            </div>
            <button className="sidebar-logout" onClick={logout}>
              <LogOut size={18} />
              <span>Log Out</span>
            </button>
          </div>
        </aside>

        {/* Content area - child route mounts here */}
        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;