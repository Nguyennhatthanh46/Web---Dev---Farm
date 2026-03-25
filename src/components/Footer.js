import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

/* ── Bộ Icon SVG Đơn Sắc (Giao diện thủ công & Tự nhiên) ── */
const Icons = {
  Leaf: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.2a7 7 0 0 1-9 8.8Z"/><path d="M11 20v-5c0-1.5 2-1.5 2 0"/><path d="M7 16s1-1 2.5-1 2.5 1 2.5 1"/>
    </svg>
  ),
  Facebook: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  ),
  Instagram: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  ),
  Phone: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.27-2.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  ),
  Mail: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
  Clock: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  Heart: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#4ade80" }}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  )
};

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          {/* Cột Thương Hiệu */}
          <div className="footer__brand">
            <div className="footer__logo">
              <Icons.Leaf />
              <span>RễTươi</span>
            </div>
            <p className="footer__tagline">
              Kết nối nông dân với bàn ăn của bạn — tươi ngon, trung thực và gắn kết cộng đồng.
            </p>
            <div className="footer__social">
              <a href="#!" aria-label="Facebook"><Icons.Facebook /></a>
              <a href="#!" aria-label="Instagram"><Icons.Instagram /></a>
            </div>
          </div>

          {/* Cột Danh Mục */}
          <div className="footer__col">
            <h4>Danh Mục</h4>
            <ul>
              <li><Link to="/products?category=fruits">Trái Cây Tươi</Link></li>
              <li><Link to="/products?category=vegetables">Rau Củ Quả</Link></li>
              <li><Link to="/products?category=grains">Gạo & Ngũ Cốc</Link></li>
              <li><Link to="/products?category=herbs">Gia Vị & Thảo Mộc</Link></li>
            </ul>
          </div>

          {/* Cột Hỗ Trợ */}
          <div className="footer__col">
            <h4>Hỗ Trợ</h4>
            <ul>
              <li><Link to="/about">Về Chúng Tôi</Link></li>
              <li><a href="#!">Thông Tin Giao Hàng</a></li>
              <li><a href="#!">Chính Sách Đổi Trả</a></li>
              <li><a href="#!">Liên Hệ</a></li>
            </ul>
          </div>

          {/* Cột Liên Hệ & Chứng Nhận */}
          <div className="footer__col footer__contact">
            <h4>Thông Tin Liên Hệ</h4>
            <div className="contact-item">
              <Icons.Phone /> <span>1800-RỄ-TƯƠI</span>
            </div>
            <div className="contact-item">
              <Icons.Mail /> <span>xinchao@retuoi.vn</span>
            </div>
            <div className="contact-item">
              <Icons.Clock /> <span>Thứ 2–7: 7:00 – 21:00</span>
            </div>
            
            <div className="footer__trust-badges">
              <span>VietGAP Standard</span>
              <span>Organic Certified</span>
              <span>Fast Delivery</span>
            </div>
          </div>
        </div>

        {/* Chân trang cuối */}
        <div className="footer__bottom">
          <p>© 2026 RễTươi. Mọi quyền được bảo lưu.</p>
          <div className="footer__love">
            Làm với <Icons.Heart /> vì nông dân Việt Nam
          </div>
        </div>
      </div>
    </footer>
  );
}
