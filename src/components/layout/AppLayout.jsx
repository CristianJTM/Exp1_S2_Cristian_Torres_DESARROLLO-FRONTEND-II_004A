import { Outlet } from 'react-router'
import Footer from './Footer.jsx'
import Navbar from './Navbar.jsx'

export default function AppLayout() {
  return (
    <>
      <div className="app-shell">
        <main className="app-main">
          <Outlet />
        </main>
        <Footer />
      </div>
      <Navbar />
    </>
  )
}
