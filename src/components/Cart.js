import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Cart.css";

/* ── Bộ Icon SVG Đơn Sắc (Tạo cảm giác thủ công, tự nhiên) ── */
const Icons = {
  Cart: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    </svg>
  ),
  Trash: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
    </svg>
  ),
  EmptyBasket: () => (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3.5 13 1.5 7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2l1.5-7"/><path d="M7.5 7 3.5 13M16.5 7l4 6M2 13h20"/><circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  MapPin: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  )
};

function fmt(n) {
  return n.toLocaleString("vi-VN") + "₫";
}

export default function Cart() {
  const { items, isOpen, dispatch, totalItems, totalPrice } = useCart();

  return (
    <>
      {isOpen && (
        <div className="cart-overlay" onClick={() => dispatch({ type: "CLOSE" })} />
      )}

      <aside className={`cart-drawer ${isOpen ? "cart-drawer--open" : ""}`}>
        <div className="cart-header">
          <div className="cart-title-wrapper">
            <Icons.Cart />
            <h2 className="cart-title">Giỏ hàng của bạn</h2>
          </div>
          <span className="cart-count">{totalItems} món</span>
          <button
            className="cart-close"
            onClick={() => dispatch({ type: "CLOSE" })}
            aria-label="Đóng giỏ hàng"
          >
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <Icons.EmptyBasket />
            <p>Giỏ hàng chưa có sản phẩm nào</p>
            <Link
              to="/products"
              className="btn-shopping"
              onClick={() => dispatch({ type: "CLOSE" })}
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        ) : (
          <>
            <ul className="cart-items">
              {items.map(item => (
                <li key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item__img" />
                  <div className="cart-item__info">
                    <p className="cart-item__name">{item.name}</p>
                    <p className="cart-item__origin">
                      <Icons.MapPin /> {item.origin}
                    </p>
                    <p className="cart-item__price">{fmt(item.price)} / {item.unit}</p>
                  </div>
                  <div className="cart-item__controls">
                    <div className="qty-control">
                      <button
                        onClick={() =>
                          dispatch({ type: "UPDATE_QTY", id: item.id, qty: item.qty - 1 })
                        }
                      >−</button>
                      <span>{item.qty}</span>
                      <button
                        onClick={() =>
                          dispatch({ type: "UPDATE_QTY", id: item.id, qty: item.qty + 1 })
                        }
                      >+</button>
                    </div>
                    <p className="cart-item__subtotal">{fmt(item.price * item.qty)}</p>
                    <button
                      className="cart-item__remove"
                      onClick={() => dispatch({ type: "REMOVE", id: item.id })}
                      title="Xóa khỏi giỏ"
                    >
                      <Icons.Trash />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="cart-footer">
              <div className="cart-summary-box">
                {totalPrice < 500000 ? (
                  <div className="cart-delivery-hint">
                    <p>Mua thêm <strong>{fmt(500000 - totalPrice)}</strong> để được miễn phí giao hàng</p>
                    <div className="delivery-bar">
                      <div
                        className="delivery-bar__fill"
                        style={{ width: `${Math.min((totalPrice / 500000) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="cart-delivery-hint cart-delivery-hint--achieved">
                    Đơn hàng của bạn đã đủ điều kiện miễn phí vận chuyển!
                  </div>
                )}
                
                <div className="cart-total">
                  <span>Tổng tiền thanh toán</span>
                  <span className="cart-total__amount">{fmt(totalPrice)}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="btn-checkout"
                onClick={() => dispatch({ type: "CLOSE" })}
              >
                Tiến hành thanh toán
              </Link>
              
              <button
                className="cart-clear"
                onClick={() => dispatch({ type: "CLEAR" })}
              >
                Xóa sạch giỏ hàng
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
