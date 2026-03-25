import React, { useState, useRef, useEffect } from "react";
import "./AIChatWidget.css";

/* ── Monochrome Icon System (Bảng Icon Đơn Sắc) ── */
const Icons = {
  Robot: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a2 2 0 0 1 2 2c0 .28-.06.53-.16.75A7 7 0 0 1 21 11v1h1v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7h1v-1a7 7 0 0 1 7.16-6.25c-.1-.22-.16-.47-.16-.75a2 2 0 0 1 2-2m3 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-6 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
    </svg>
  ),
  Camera: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>
    </svg>
  ),
  Send: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
    </svg>
  ),
  Check: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  Tag: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
  )
};

/* ── Optimized Listing Popup ── */
function ListingPopup({ onClose, onConfirm }) {
  return (
    <div className="ai-popup-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="ai-popup">
        <div className="ai-popup__header">
          <div className="ai-popup__status-icon"><Icons.Check /></div>
          <h3 className="ai-popup__title">Kết quả phân tích</h3>
          <p className="ai-popup__subtitle">Dữ liệu được trích xuất từ thị trường thời gian thực</p>
        </div>

        <div className="ai-popup__body">
          <div className="ai-popup__data-grid">
            <div className="ai-popup__item">
              <span className="ai-popup__label">Sản phẩm</span>
              <span className="ai-popup__value">Cam sành</span>
            </div>
            <div className="ai-popup__item">
              <span className="ai-popup__label">Trọng lượng</span>
              <span className="ai-popup__value">500 kg</span>
            </div>
            <div className="ai-popup__item ai-popup__item--highlight">
              <span className="ai-popup__label">Định giá đề xuất</span>
              <span className="ai-popup__value">15.000₫/kg</span>
            </div>
          </div>

          <div className="ai-popup__insight-box">
            <Icons.Tag />
            <p>Biên độ giá thị trường hiện tại: <strong>13k - 17k</strong>. Mức giá của bạn có tính cạnh tranh cao.</p>
          </div>
        </div>

        <div className="ai-popup__actions">
          <button className="ai-popup__confirm" onClick={onConfirm}>Xác nhận niêm yết</button>
          <button className="ai-popup__edit" onClick={onClose}>Điều chỉnh</button>
        </div>
      </div>
    </div>
  );
}

/* ── Main AI Chat Component ── */
export default function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "ai",
      text: "Hệ thống AI Rễ Tươi đã sẵn sàng. Vui lòng cung cấp hình ảnh nông sản để bắt đầu quá trình định giá tự động.",
      time: "08:30",
    }
  ]);
  const [input, setInput] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [successToast, setSuccessToast] = useState(false);
  const fileRef = useRef();
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, analyzing]);

  const now = () => new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });

  const handleSendText = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMsg = { id: Date.now(), role: "user", text: input, time: now() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: "ai",
        text: "Để thực hiện phân tích thị trường chính xác, tôi cần dữ liệu hình ảnh trực quan. Vui lòng tải lên ảnh sản phẩm.",
        time: now(),
      }]);
    }, 1000);
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);

    setMessages(prev => [...prev, {
      id: Date.now(),
      role: "user",
      image: url,
      text: "Đã tải lên tệp tin hình ảnh.",
      time: now(),
    }]);

    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setMessages(prev => [...prev, {
        id: Date.now() + 2,
        role: "ai",
        text: "Phân tích hoàn tất. Nhận diện: Cam sành | Khối lượng: ~500kg. Vui lòng kiểm tra báo cáo chi tiết bên dưới.",
        time: now(),
        hasAction: true,
      }]);
    }, 3000);
  };

  return (
    <>
      {!open && (
        <button className="ai-fab" onClick={() => setOpen(true)}>
          <Icons.Robot />
          <span className="ai-fab__label">AI Pricing</span>
        </button>
      )}

      <div className={`ai-chat ${open ? "ai-chat--open" : ""}`}>
        <div className="ai-chat__header">
          <div className="ai-chat__avatar"><Icons.Robot /></div>
          <div className="ai-chat__header-info">
            <span className="ai-chat__name">AI Engine v3.0</span>
            <span className="ai-chat__status">● System Online</span>
          </div>
          <button className="ai-chat__close-btn" onClick={() => setOpen(false)}>✕</button>
        </div>

        <div className="ai-chat__messages">
          {messages.map(msg => (
            <div key={msg.id} className={`ai-bubble-row ai-bubble-row--${msg.role}`}>
              {msg.role === "ai" && <div className="ai-bubble-avatar"><Icons.Robot /></div>}
              <div className={`ai-bubble ai-bubble--${msg.role}`}>
                {msg.image && <img src={msg.image} alt="Upload" className="ai-bubble__image" />}
                <p className="ai-bubble__text">{msg.text}</p>
                {msg.hasAction && (
                  <button className="ai-bubble__action-btn" onClick={() => setShowPopup(true)}>
                    Mở báo cáo chi tiết
                  </button>
                )}
                <span className="ai-bubble__time">{msg.time}</span>
              </div>
            </div>
          ))}

          {analyzing && (
            <div className="ai-bubble-row ai-bubble-row--ai">
              <div className="ai-bubble-avatar"><Icons.Robot /></div>
              <div className="ai-bubble ai-bubble--ai">
                <div className="ai-analyzing">
                  <span className="ai-analyzing__text">Processing visual data...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="ai-chat__footer">
          <button className="ai-chat__camera-btn" onClick={() => fileRef.current?.click()}>
            <Icons.Camera />
            <span>Đính kèm dữ liệu ảnh</span>
          </button>
          <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageChange} />

          <form className="ai-chat__input-row" onSubmit={handleSendText}>
            <input 
               className="ai-chat__input" 
               placeholder="Nhập yêu cầu tại đây..." 
               value={input} 
               onChange={e => setInput(e.target.value)} 
            />
            <button className="ai-chat__send-btn" type="submit" disabled={!input.trim()}>
              <Icons.Send />
            </button>
          </form>
        </div>
      </div>

      {showPopup && <ListingPopup onClose={() => setShowPopup(false)} onConfirm={() => { setShowPopup(false); setSuccessToast(true); setTimeout(() => setSuccessToast(false), 3000); }} />}
      {successToast && <div className="ai-success-toast">Hệ thống: Niêm yết sản phẩm thành công.</div>}
    </>
  );
}
