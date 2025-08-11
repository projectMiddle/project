import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { getOrderList, getOrderDetail } from "../../api/mallApi";

export default function WelfareMallOrders() {
  const { userInfo } = useAuth();
  const empNo = userInfo?.empNo;

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // 상세 모달
  const [openDetail, setOpenDetail] = useState(false);
  const [detailId, setDetailId] = useState(null);

  // 페이지네이션
  const [searchParams, setSearchParams] = useSearchParams();
  const pageSize = 10;
  const pageParam = Number(searchParams.get("page") || "1");
  const [currentPage, setCurrentPage] = useState(Number.isNaN(pageParam) ? 1 : pageParam);

  // 공통 포맷
  const currency = (n = 0) => Number(n || 0).toLocaleString() + "원";
  const formatDate = (v) => (v ? String(v).replace("T", " ").slice(0, 19) : "");
  const formatPhone = (v = "") =>
    String(v)
      .replace(/\D/g, "")
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4}).*$/, (_, a, b, c) =>
        [a, b && `-${b}`, c && `-${c}`].filter(Boolean).join("")
      );

  // 응답 안전 파싱
  const coerceArray = (data) => {
    if (Array.isArray(data)) return data;
    if (!data || typeof data !== "object") return [];
    return data.list || data.items || data.content || data.data || data.orders || [];
  };

  // 목록 로드
  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setErr("");

      if (!empNo) {
        console.log("[orders] empNo 아직 없음");
        setLoading(false);
        return;
      }

      try {
        const data = await getOrderList(empNo);
        const arr = coerceArray(data);
        if (mounted) {
          console.log("[orders] 응답:", data);
          setOrders(arr);
        }
      } catch (e) {
        console.error("주문 목록 불러오기 실패", e);
        if (mounted) setErr("주문 목록을 불러오지 못했습니다.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, [empNo]);

  // URL 쿼리 → 페이지 반영
  useEffect(() => {
    const q = Number(searchParams.get("page") || "1");
    setCurrentPage(Number.isNaN(q) ? 1 : q);
  }, [searchParams]);

  const totalPages = Math.max(1, Math.ceil(orders.length / pageSize));
  const page = Math.min(Math.max(1, currentPage), totalPages);
  const start = (page - 1) * pageSize;
  const pageItems = orders.slice(start, start + pageSize);

  const goPage = (p) => setSearchParams({ page: String(Math.min(Math.max(1, p), totalPages)) });

  const pager = useMemo(() => {
    const btn = (label, p, disabled = false, key = label) => (
      <button
        key={`${key}-${p}`}
        onClick={() => goPage(p)}
        disabled={disabled}
        className={`px-3 py-1 rounded border text-sm ${
          disabled ? "text-gray-400 border-gray-200" : "hover:bg-gray-100"
        }`}
      >
        {label}
      </button>
    );
    const nums = [];
    const windowSize = 5;
    const startNum = Math.max(1, page - Math.floor(windowSize / 2));
    const endNum = Math.min(totalPages, startNum + windowSize - 1);
    for (let i = startNum; i <= endNum; i++) {
      nums.push(
        <button
          key={`n-${i}`}
          onClick={() => goPage(i)}
          className={`px-3 py-1 rounded border text-sm ${
            i === page ? "bg-blue-600 text-white border-blue-600" : "hover:bg-gray-100"
          }`}
        >
          {i}
        </button>
      );
    }
    return (
      <div className="mt-6 flex items-center justify-center gap-2">
        {btn("« 처음", 1, page === 1, "first")}
        {btn("‹ 이전", page - 1, page === 1, "prev")}
        {nums}
        {btn("다음 ›", page + 1, page === totalPages, "next")}
        {btn("끝 »", totalPages, page === totalPages, "last")}
      </div>
    );
  }, [page, totalPages]);

  // 리스트에서 쓸 필드 매핑
  const normalizeRow = (o) => {
    const id = o.orderId ?? o.id ?? o.orderNo ?? o.order_no ?? "";
    const when = o.orderedAt ?? o.orderDate ?? o.createdAt ?? o.reg_dt ?? "";
    const total = o.total ?? o.totalAmount ?? o.amount ?? 0;
    const status = o.status ?? o.orderStatus ?? "COMPLETED";
    const count =
      o.items?.length ??
      o.itemCount ??
      o.totalQuantity ??
      (Array.isArray(o.details) ? o.details.reduce((a, d) => a + (d.quantity || 0), 0) : undefined);
    return { id, when: formatDate(when), total, status, count: count ?? "-" };
  };

  return (
    <section className="bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">주문 내역</h1>
          <Link to="/intrasoltech/welfaremall" className="text-sm text-blue-600 hover:underline">
            ← 복지몰로
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow min-h-[160px]">
          {loading ? (
            <div className="p-6 text-sm text-gray-600">불러오는 중…</div>
          ) : err ? (
            <div className="p-6 text-sm text-red-600">{err}</div>
          ) : orders.length === 0 ? (
            <div className="p-10 text-center text-sm text-gray-500">주문 내역이 없습니다.</div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">주문번호</th>
                      <th className="px-4 py-3 text-left font-semibold">주문일시</th>
                      <th className="px-4 py-3 text-right font-semibold">상품수</th>
                      <th className="px-4 py-3 text-right font-semibold">결제금액</th>
                      <th className="px-4 py-3 text-center font-semibold">상태</th>
                      <th className="px-4 py-3 text-center font-semibold">액션</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pageItems.map((o) => {
                      const row = normalizeRow(o);
                      return (
                        <tr key={row.id} className="border-t">
                          <td className="px-4 py-3">{row.id}</td>
                          <td className="px-4 py-3">{row.when}</td>
                          <td className="px-4 py-3 text-right">{row.count}</td>
                          <td className="px-4 py-3 text-right">{currency(row.total)}</td>
                          <td className="px-4 py-3 text-center">
                            <span
                              className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${
                                row.status === "COMPLETED"
                                  ? "bg-green-100 text-green-700"
                                  : row.status === "CANCELED"
                                  ? "bg-gray-200 text-gray-600"
                                  : "bg-blue-100 text-blue-700"
                              }`}
                            >
                              {row.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <button
                              onClick={() => {
                                setDetailId(row.id);
                                setOpenDetail(true);
                              }}
                              className="px-3 py-1 rounded border hover:bg-gray-50"
                            >
                              상세보기
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {pager}
            </>
          )}
        </div>
      </div>

      {/* 플로팅 아이콘 */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2">
        <Link
          to="/intrasoltech/welfaremall/cart"
          className="w-12 h-12 flex items-center justify-center rounded-full shadow-lg bg-blue-600 text-white hover:bg-blue-700"
          title="장바구니"
        >
          🛒
        </Link>
        <Link
          to="/intrasoltech/welfaremall"
          className="w-12 h-12 flex items-center justify-center rounded-full shadow-lg bg-blue-600 text-white hover:bg-blue-700"
          title="복지몰 홈"
        >
          🏬
        </Link>
      </div>

      {openDetail && detailId && (
        <OrderDetailModal
          empNo={empNo}
          orderId={detailId}
          onClose={() => {
            setOpenDetail(false);
            setDetailId(null);
          }}
          formatPhone={formatPhone}
          currency={currency}
          formatDate={formatDate}
        />
      )}
    </section>
  );
}

function OrderDetailModal({ empNo, orderId, onClose, formatPhone, currency, formatDate }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setErr("");
      try {
        const d = await getOrderDetail(empNo, orderId);
        if (mounted) setData(d);
      } catch (e) {
        console.error("주문 상세 불러오기 실패", e);
        if (mounted) setErr("주문 상세를 불러오지 못했습니다.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, [empNo, orderId]);

  const order = data || {};
  const items = order.items || order.orderItems || order.details || [];
  const shipping = order.shipping || {};
  const receiver = shipping.receiver || order.receiver || "";
  const phone = shipping.phone || order.phone || "";
  const address1 = shipping.address1 || order.address1 || "";
  const address2 = shipping.address2 || order.address2 || "";
  const requestMessage = shipping.requestMessage || order.requestMessage || "";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-3xl rounded-2xl bg-white shadow-xl p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">주문 상세</h3>
          <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
            ✕
          </button>
        </div>

        {loading ? (
          <div className="p-4 text-sm text-gray-600">불러오는 중…</div>
        ) : err ? (
          <div className="p-4 text-sm text-red-600">{err}</div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <div className="text-sm text-gray-500">주문번호</div>
                <div className="font-medium">{order.orderId || order.id}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">주문일시</div>
                <div className="font-medium">{formatDate(order.orderedAt || order.orderDate || order.createdAt)}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">총 결제금액</div>
                <div className="font-medium">{currency(order.total || order.totalAmount)}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">상태</div>
                <div className="font-medium">{order.status || order.orderStatus || "COMPLETED"}</div>
              </div>
            </div>

            <div className="bg-gray-50 rounded p-4 mb-6">
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">수령인</span> <div className="font-medium">{receiver}</div>
                </div>
                <div>
                  <span className="text-gray-500">연락처</span> <div className="font-medium">{formatPhone(phone)}</div>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-gray-500">주소</span>
                  <div className="font-medium">{address1}</div>
                  {address2 ? <div className="text-gray-600">{address2}</div> : null}
                </div>
                {requestMessage ? (
                  <div className="sm:col-span-2">
                    <span className="text-gray-500">요청사항</span>
                    <div className="font-medium">{requestMessage}</div>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="max-h-72 overflow-auto border rounded">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left">상품</th>
                    <th className="px-3 py-2 text-right">수량</th>
                    <th className="px-3 py-2 text-right">가격</th>
                    <th className="px-3 py-2 text-right">합계</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((it, idx) => (
                    <tr key={it.cartItemId || it.productId || idx} className="border-t">
                      <td className="px-3 py-2">
                        <div className="flex items-center gap-3">
                          <img
                            src={it.imageUrl || `/welfimages/${it.productId}.jpg`}
                            onError={(e) => (e.currentTarget.src = "/welfimages/fallback.jpg")}
                            alt={it.productName}
                            className="w-10 h-10 rounded object-cover"
                          />
                          <div className="truncate">{it.productName}</div>
                        </div>
                      </td>
                      <td className="px-3 py-2 text-right">{it.quantity}</td>
                      <td className="px-3 py-2 text-right">{currency(it.price)}</td>
                      <td className="px-3 py-2 text-right">{currency(it.price * it.quantity)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        <div className="mt-4 text-right">
          <button className="px-4 py-2 rounded border" onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
