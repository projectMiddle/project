import { Link } from "react-router-dom";

export default function WelfFloatingNav() {
  const base = "fixed bottom-6 right-6 z-40 flex flex-col gap-2";
  const btn =
    "w-12 h-12 flex items-center justify-center rounded-full shadow-lg bg-blue-600 text-white hover:bg-blue-700";
  return (
    <div className={base}>
      <Link to="/intrasoltech/welfaremall/cart" className={btn} aria-label="장바구니">
        🛒
      </Link>
      <Link to="/intrasoltech/welfaremall/orders" className={btn} aria-label="주문목록">
        🧾
      </Link>
    </div>
  );
}
