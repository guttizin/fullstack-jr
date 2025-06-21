import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Shop from './components/Shop';
import Features from './components/Features';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ProtectedRoute from './components/ProtectedRoute';
import OrdersPage from './pages/OrdersPage';
import Modal from './components/Modal';
import { useUI } from './context/UIContext';

// A simple layout component
const MainLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header />
    {children}
    <Features />
    <Footer />
  </>
);

function App() {
  const { isLoginModalOpen, closeLoginModal } = useUI();
  return (
    <>
      <Routes>
        <Route path="/*" element={
          <MainLayout>
            <Routes>
              <Route path="/" element={<Shop />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              } />
              <Route path="/orders" element={
                <ProtectedRoute>
                  <OrdersPage />
                </ProtectedRoute>
              } />
            </Routes>
          </MainLayout>
        } />
      </Routes>
      <Modal isOpen={isLoginModalOpen} onClose={closeLoginModal}>
        <LoginPage />
      </Modal>
    </>
  );
}

export default App;
