import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const SHIP_KEY = (id) => `wm_order_shipping_${id}`;
const toApiId = (v) => (typeof v === "number" ? String(v) : typeof v === "string" && /^\d+$/.test(v) ? v : null);

export default function WelfareMallComplete() {
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation(); // navigate(..., { state: order })
  const [order, setOrder] = useState(state || null);

  // 보기용 하이픈 포맷
  const formatPhone = (v = "") =>
    String(v)
      .replace(/\D/g, "")
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4}).*$/, (_, a, b, c) =>
        [a, b && `-${b}`, c && `-${c}`].filter(Boolean).join("")
      );

  // 처음 들어올 때 state가 있으면 저장, 없으면 복구
  useEffect(() => {
    if (state) {
      try {
        sessionStorage.setItem("wm_last_order", JSON.stringify(state));
      } catch (e) {
        console.warn("error");
      }
      setOrder(state);
      return;
    }
    try {
      const raw = sessionStorage.getItem("wm_last_order");
      if (raw) {
        const cached = JSON.parse(raw);
        if (cached) setOrder(cached);
      }
    } catch (e) {
      console.warn("error");
    }
  }, [state]);

  if (!order) {
    return (
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-3">주문 정보를 찾을 수 없어요</h1>
          <p className="text-gray-600 mb-6">주문이 정상적으로 완료되지 않았거나 페이지가 만료되었을 수 있어요.</p>
          <button
            onClick={() => navigate("/intrasoltech/welfaremall")}
            className="px-5 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            복지몰 홈으로
          </button>
        </div>
      </section>
    );
  }

  const { orderId, orderedAt, items = [], subtotal = 0, discount = 0, total = 0, shipping = {} } = order;

  const {
    receiver = userInfo?.name || userInfo?.empName || "",
    phone = "",
    address1 = "서울특별시 종로구 종로12길 15",
    address2 = "",
    requestMessage = "",
    payMethod = "CARD",
    cardLast4 = "",
  } = shipping;

  // 주문내역 페이지로 이동 (숫자형 주문ID만 넘김)
  const goOrders = () => {
    const shippingSeed = { receiver, phone, address1, address2, requestMessage };
    const apiOrderId = toApiId(order?.orderNo) ?? toApiId(orderId); // 서버가 기대하는 숫자 PK

    try {
      if (apiOrderId) {
        localStorage.setItem(SHIP_KEY(apiOrderId), JSON.stringify(shippingSeed));
      }
    } catch (e) {
      console.warn("error");
    }

    navigate("/intrasoltech/welfaremall/orders", {
      state: { seedOrderId: apiOrderId, seedShipping: shippingSeed },
    });
  };

  const payMethodLabel = payMethod === "TRANSFER" ? "계좌이체" : "카드";
  const maskedCard = payMethod === "CARD" && cardLast4 ? `**** **** **** ${cardLast4}` : undefined;

  // ---------- 이미지 헬퍼 (productId만 사용 + 1회 폴백) ----------
  const publicImg = (id) => `${import.meta.env.BASE_URL}welfimages/${id}.jpg`;
  const noImg = `${import.meta.env.BASE_URL}welfimages/noimage.jpg`;

  const ImgWithFallback = ({ id, alt }) => (
    <img
      src={publicImg(id)}
      alt={alt || ""}
      className="w-16 h-16 rounded object-cover"
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = noImg;
      }}
    />
  );
  // -------------------------------------------------------------

  return (
    <section className="bg-gray-50 py-10 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h1 className="text-2xl font-bold">주문이 완료되었습니다 🎉</h1>
          <p className="text-sm text-gray-600 mt-1">
            주문번호 <span className="font-medium">{orderId}</span>
            {orderedAt ? (
              <>
                {" "}
                · <span>{orderedAt}</span>
              </>
            ) : null}
          </p>
        </div>

        {/* 배송/결제 정보 */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="font-semibold mb-4">배송 정보</h2>
            <dl className="text-sm space-y-2">
              <div className="flex justify-between">
                <dt className="text-gray-500">수령인</dt>
                <dd className="font-medium">{receiver}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">연락처</dt>
                <dd className="font-medium">{formatPhone(phone)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">주소</dt>
                <dd className="text-right">
                  <div className="font-medium">{address1}</div>
                  {address2 ? <div className="text-gray-600">{address2}</div> : null}
                </dd>
              </div>
              {requestMessage ? (
                <div className="flex justify-between">
                  <dt className="text-gray-500">요청사항</dt>
                  <dd className="font-medium">{requestMessage}</dd>
                </div>
              ) : null}
            </dl>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="font-semibold mb-4">결제 정보</h2>
            <dl className="text-sm space-y-2">
              <div className="flex justify-between">
                <dt className="text-gray-500">결제수단</dt>
                <dd className="font-medium">{payMethodLabel}</dd>
              </div>
              {maskedCard ? (
                <div className="flex justify-between">
                  <dt className="text-gray-500">카드</dt>
                  <dd className="font-medium">{maskedCard}</dd>
                </div>
              ) : null}
              <div className="border-t pt-3 mt-3 space-y-2">
                <div className="flex justify-between">
                  <dt>합계</dt>
                  <dd>{subtotal.toLocaleString()}원</dd>
                </div>
                <div className="flex justify-between">
                  <dt>직급 할인 (10%)</dt>
                  <dd className="text-red-500">-{discount.toLocaleString()}원</dd>
                </div>
                <div className="flex justify-between text-base font-semibold">
                  <dt>총 결제금액</dt>
                  <dd>{total.toLocaleString()}원</dd>
                </div>
              </div>
            </dl>
          </div>
        </div>

        {/* 상품 목록 */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="font-semibold mb-4">주문 상품</h2>
          <ul className="divide-y">
            {items.map((it, idx) => (
              <li key={it.cartItemId || it.productId || idx} className="py-4 flex items-center gap-4">
                <ImgWithFallback id={it.productId} alt={it.productName} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">{it.productName}</div>
                  <div className="text-xs text-gray-500">
                    {Number(it.price).toLocaleString()}원 · 수량 {it.quantity}
                  </div>
                </div>
                <div className="text-sm font-semibold">{(it.price * it.quantity).toLocaleString()}원</div>
              </li>
            ))}
          </ul>
        </div>

        {/* 액션 */}
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <button onClick={() => navigate("/intrasoltech/welfaremall")} className="px-4 py-2 rounded border">
            쇼핑 계속
          </button>
          <button onClick={goOrders} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
            주문내역 보기
          </button>
        </div>
      </div>
    </section>
  );
}
