import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Navbar.css";

/* ── Bộ Icon SVG Đơn Sắc (Tạo cảm giác thủ công, tinh tế) ── */
const Icons = {
  Search: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  ),
  Cart: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    </svg>
  ),
  User: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  Box: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
  ),
  Logout: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  ),
  Leaf: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.2a7 7 0 0 1-9 8.8Z"/><path d="M11 20v-5c0-1.5 2-1.5 2 0"/>
    </svg>
  )
};

export default function Navbar({ user, onLoginClick, onLogout }) {
  const { totalItems, dispatch } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  function handleSearch(e) {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setQuery("");
    }
  }

  return (
    <>
      <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
        <div className="navbar__inner">
          <Link to="/" className="navbar__logo">
            <span className="navbar__logo-icon"><Icons.Leaf /></span>
            <span className="navbar__logo-text">
              Rễ<strong>Tươi</strong>
            </span>
          </Link>

          <ul className="navbar__links">
            <li><Link to="/">Trang Chủ</Link></li>
            <li><Link to="/products">Cửa Hàng</Link></li>
            <li><Link to="/products?category=fruits">Trái Cây</Link></li>
            <li><Link to="/products?category=vegetables">Rau Củ</Link></li>
            <li><Link to="/about">Về RễTươi</Link></li>
          </ul>

          <div className="navbar__actions">
            <button
              className="navbar__icon-btn"
              onClick={() => setSearchOpen(s => !s)}
              title="Tìm kiếm sản phẩm"
            >
              <Icons.Search />
            </button>
            
            <button
              className="navbar__icon-btn navbar__cart-btn"
              onClick={() => dispatch({ type: "TOGGLE_OPEN" })}
              title="Xem giỏ hàng"
            >
              <Icons.Cart />
              {totalItems > 0 && (
                <span className="navbar__cart-badge">{totalItems}</span>
              )}
            </button>

            {user ? (
              <div className="navbar__user-menu">
                <button className="navbar__user-btn">
                  <span className="navbar__user-avatar">
                    {user.name?.charAt(0).toUpperCase()}
                  </span>
                  <span className="navbar__user-name">{user.name}</span>
                </button>
                <div className="navbar__user-dropdown">
                  <div className="navbar__user-info">
                    <p className="navbar__user-info-name">{user.name}</p>
                    <p className="navbar__user-info-phone">{user.phone}</p>
                  </div>
                  <hr className="navbar__user-divider" />
                  <button className="navbar__dropdown-item"><Icons.User /> Hồ sơ cá nhân</button>
                  <button className="navbar__dropdown-item"><Icons.Box /> Lịch sử đơn hàng</button>
                  <hr className="navbar__user-divider" />
                  <button className="navbar__dropdown-item navbar__dropdown-item--logout" onClick={onLogout}>
                    <Icons.Logout /> Đăng xuất
                  </button>
                </div>
              </div>
            ) : (
              <button className="navbar__login-btn" onClick={onLoginClick}>
                <Icons.User />
                <span>Đăng nhập</span>
              </button>
            )}

            <button
              className="navbar__hamburger"
              onClick={() => setMenuOpen(o => !o)}
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="navbar__search-bar">
            <form onSubmit={handleSearch} className="navbar__search-form">
              <input
                autoFocus
                type="text"
                placeholder="Bạn đang tìm nông sản gì?..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="navbar__search-input"
              />
              <button type="submit" className="btn-search-submit">Tìm ngay</button>
              <button type="button" className="btn-search-cancel" onClick={() => setSearchOpen(false)}>Hủy</button>
            </form>
          </div>
        )}
      </nav>

      {/* Mobile Menu cũng loại bỏ Emoji */}
      <div className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""}`}>
        <ul>
          <li><Link to="/">Trang Chủ</Link></li>
          <li><Link to="/products">Tất Cả Sản Phẩm</Link></li>
          <li><Link to="/products?category=fruits">Trái Cây Tươi</Link></li>
          <li><Link to="/products?category=vegetables">Rau Củ Quả</Link></li>
          <li><Link to="/products?category=grains">Gạo & Ngũ Cốc</Link></li>
          <li><Link to="/about">Về Chúng Tôi</Link></li>
        </ul>
      </div>
      {menuOpen && <div className="mobile-overlay" onClick={() => setMenuOpen(false)} />}
    </>
  );
}
