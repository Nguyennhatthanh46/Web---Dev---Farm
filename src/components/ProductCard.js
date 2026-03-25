import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import "./ProductCard.css";

/* ── Hệ thống Icon SVG mảnh (Stroke) ── */
const Icons = {
  MapPin: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  Star: ({ filled, half }) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      {half && <path d="M12 2v15.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor" stroke="none"/>}
    </svg>
  ),
  Plus: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
  Close: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  )
};

function fmt(n) {
  return n.toLocaleString("vi-VN") + "₫";
}

/* ── Component Rating Tự Nhiên ── */
function StarRating({ rating }) {
  return (
    <div className="product-card__rating-stars" title={`${rating}/5 sao`}>
      {[1, 2, 3, 4, 5].map((star) => {
        const isFull = star <= Math.floor(rating);
        const isHalf = !isFull && star === Math.ceil(rating) && rating % 1 >= 0.5;
        return <Icons.Star key={star} filled={isFull} half={isHalf} />;
      })}
    </div>
  );
}

export default function ProductCard({ product }) {
  const { dispatch } = useCart();
  const { addToast } = useToast();

  function handleAdd(e) {
    e.preventDefault();
    if (!product.inStock) return;
    dispatch({ type: "ADD", product, qty: product.minOrder || 1 });
    addToast(`Đã thêm ${product.name} vào giỏ hàng!`);
  }

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-card__img-wrap">
        <img
          src={product.image}
          alt={product.name}
          className="product-card__img"
          loading="lazy"
        />
        {product.badge && (
          <span className={`product-card__badge-tag badge-${product.badgeType}`}>
            {product.badge}
          </span>
        )}
        {!product.inStock && (
          <div className="product-card__soldout">Tạm hết hàng</div>
        )}
      </div>

      <div className="product-card__body">
        <div className="product-card__origin-wrap">
          <Icons.MapPin />
          <span className="product-card__origin-text">{product.origin}</span>
        </div>
        
        <h3 className="product-card__name">{product.name}</h3>
        
        <div className="product-card__rating">
          <StarRating rating={product.rating} />
          <span className="product-card__reviews">{product.reviews} phản hồi</span>
        </div>

        <div className="product-card__footer">
          <div className="product-card__price-group">
            <span className="product-card__price">{fmt(product.price)}</span>
            <span className="product-card__unit">/{product.unit}</span>
          </div>
          
          <button
            className={`product-card__add-btn ${!product.inStock ? "is-disabled" : ""}`}
            onClick={handleAdd}
            disabled={!product.inStock}
            aria-label={`Thêm ${product.name}`}
          >
            {product.inStock ? <Icons.Plus /> : <Icons.Close />}
            <span>{product.inStock ? "Chọn mua" : "Hết hàng"}</span>
          </button>
        </div>
      </div>
    </Link>
  );
}
