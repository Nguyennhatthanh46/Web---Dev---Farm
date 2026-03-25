import React, { useState } from "react";
import "./LoginModal.css";

/* ── Hệ thống Icon SVG mảnh (Stroke) tạo cảm giác chuyên nghiệp ── */
const Icons = {
  User: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  Phone: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
    </svg>
  ),
  Lock: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  ),
  Key: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.778-7.778zM12 7l.5 1L15 8.5l-1.5 1.5L14 12.5l-2-1-2 1 .5-2.5L9 8.5l2.5-.5L12 7z"/>
    </svg>
  ),
  Leaf: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.2a7 7 0 0 1-9 8.8Z"/><path d="M11 20v-5c0-1.5 2-1.5 2 0"/>
    </svg>
  )
};

export default function LoginModal({ isOpen, onClose, onLogin }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", phone: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  function validate() {
    const e = {};
    if (mode === "register" && !form.name.trim()) e.name = "Họ tên không được để trống";
    if (!form.phone.trim()) e.phone = "Số điện thoại không được để trống";
    else if (!/^0\d{9}$/.test(form.phone.trim())) e.phone = "Định dạng số điện thoại chưa đúng";
    if (!form.password) e.password = "Mật khẩu không được để trống";
    else if (form.password.length < 6) e.password = "Mật khẩu cần ít nhất 6 ký tự";
    if (mode === "register" && form.password !== form.confirm) e.confirm = "Xác nhận mật khẩu chưa khớp";
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    onLogin?.({ name: form.name || "Khách hàng", phone: form.phone });
    onClose?.();
  }

  function handleChange(field, val) {
    setForm(f => ({ ...f, [field]: val }));
    setErrors(e => ({ ...e, [field]: undefined }));
  }

  return (
    <div className="lm-overlay" onClick={e => e.target === e.currentTarget && onClose?.()}>
      <div className="lm-card">
        {/* Banner tối giản */}
        <div className="lm-card__top">
          <div className="lm-card__brand">
            <Icons.Leaf />
            <span className="lm-card__brand-text">Rễ<strong>Tươi</strong></span>
          </div>
          <p className="lm-card__tagline">Nông sản sạch từ tâm người nông dân</p>
        </div>

        {/* Tabs điều hướng */}
        <div className="lm-tabs">
          <button
            className={`lm-tab ${mode === "login" ? "lm-tab--active" : ""}`}
            onClick={() => { setMode("login"); setErrors({}); }}
          >
            Đăng nhập
          </button>
          <button
            className={`lm-tab ${mode === "register" ? "lm-tab--active" : ""}`}
            onClick={() => { setMode("register"); setErrors({}); }}
          >
            Đăng ký mới
          </button>
        </div>

        <form className="lm-form" onSubmit={handleSubmit}>
          {mode === "register" && (
            <div className="lm-field">
              <label className="lm-label">Họ và tên</label>
              <div className="lm-input-wrap">
                <span className="lm-input-icon"><Icons.User /></span>
                <input
                  className={`lm-input ${errors.name ? "lm-input--error" : ""}`}
                  type="text"
                  placeholder="Ví dụ: Nguyễn Văn A"
                  value={form.name}
                  onChange={e => handleChange("name", e.target.value)}
                />
              </div>
              {errors.name && <p className="lm-error">{errors.name}</p>}
            </div>
          )}

          <div className="lm-field">
            <label className="lm-label">Số điện thoại</label>
            <div className="lm-input-wrap">
              <span className="lm-input-icon"><Icons.Phone /></span>
              <input
                className={`lm-input ${errors.phone ? "lm-input--error" : ""}`}
                type="tel"
                placeholder="Nhập số điện thoại của bạn"
                value={form.phone}
                onChange={e => handleChange("phone", e.target.value)}
              />
            </div>
            {errors.phone && <p className="lm-error">{errors.phone}</p>}
          </div>

          <div className="lm-field">
            <label className="lm-label">Mật khẩu</label>
            <div className="lm-input-wrap">
              <span className="lm-input-icon"><Icons.Lock /></span>
              <input
                className={`lm-input ${errors.password ? "lm-input--error" : ""}`}
                type="password"
                placeholder="Nhập mật khẩu"
                value={form.password}
                onChange={e => handleChange("password", e.target.value)}
              />
            </div>
            {errors.password && <p className="lm-error">{errors.password}</p>}
          </div>

          {mode === "register" && (
            <div className="lm-field">
              <label className="lm-label">Xác nhận mật khẩu</label>
              <div className="lm-input-wrap">
                <span className="lm-input-icon"><Icons.Key /></span>
                <input
                  className={`lm-input ${errors.confirm ? "lm-input--error" : ""}`}
                  type="password"
                  placeholder="Nhập lại mật khẩu"
                  value={form.confirm}
                  onChange={e => handleChange("confirm", e.target.value)}
                />
              </div>
              {errors.confirm && <p className="lm-error">{errors.confirm}</p>}
            </div>
          )}

          {mode === "login" && (
            <div className="lm-forgot">
              <a href="#forgot">Bạn quên mật khẩu?</a>
            </div>
          )}

          <button className="lm-submit" type="submit" disabled={loading}>
            {loading ? (
              <span className="lm-spinner" />
            ) : (
              mode === "login" ? "Vào cửa hàng" : "Hoàn tất đăng ký"
            )}
          </button>

          <div className="lm-divider"><span>Hoặc đăng nhập nhanh qua</span></div>

          <div className="lm-socials">
            <button type="button" className="lm-social-btn">
              <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              <span>Google</span>
            </button>
            <button type="button" className="lm-social-btn">
              <span style={{fontWeight:900, color:"#0068ff"}}>Z</span>
              <span>Zalo</span>
            </button>
          </div>
        </form>

        <button className="lm-close" onClick={onClose} aria-label="Đóng">✕</button>
      </div>
    </div>
  );
}
