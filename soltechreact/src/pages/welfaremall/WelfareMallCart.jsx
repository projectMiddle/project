import { useEffect, useMemo, useState } from "react";
import { getCartList, deleteCart, clearCart, createOrder, getEmployeeMobile, addCart } from "../../api/mallApi";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

export default function WelfareMallCart() {
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  // const [searchParams, setSearchParams] = useSearchParams();
  // const autoSubmitted = useRef(false);

  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]); // cartItemId[]
  const [loading, setLoading] = useState(false);

  // 결제 모달 / 완료 모달
  const [openCheckout, setOpenCheckout] = useState(false);
  const [openDone, setOpenDone] = useState(false);
  const [order, setOrder] = useState(null); // 완료 페이지로 넘길 데이터

  const empNo = userInfo?.empNo;
  const defaultReceiver = userInfo?.empName || userInfo?.name || userInfo?.username || "";

  // 1순위: Auth에 이미 있는 번호 (키 케이스 다양성 대응)
  const phoneFromAuth =
    userInfo?.emobile ??
    userInfo?.E_MOBILE ??
    userInfo?.eMobile ??
    userInfo?.mobile ??
    userInfo?.phone ??
    userInfo?.tel ??
    "";

  // 숫자만 남기는 유틸
  const onlyDigits = (v) => String(v || "").replace(/\D/g, "");

  // 기본 전화번호 (없으면 API로 보강)
  const [phoneDefault, setPhoneDefault] = useState(onlyDigits(phoneFromAuth));

  useEffect(() => {
    if (!empNo) return;
    // Auth에 없으면 empinfo API로 가져오기
    if (!phoneDefault) {
      getEmployeeMobile(empNo)
        .then((m) => setPhoneDefault(onlyDigits(m)))
        .catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [empNo]);

  // 장바구니 로드
  useEffect(() => {
    if (!empNo) return;
    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [empNo]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const data = await getCartList(empNo);
      setCartItems(Array.isArray(data) ? data : []);
      setSelectedItems([]);
      // const ids = (Array.isArray(data) ? data : []).map((i) => i.cartItemId).filter(Boolean);
      // setSelectedItems(ids); // 갱신 시 선택 초기화
    } catch (err) {
      console.error("장바구니 불러오기 실패", err);
    } finally {
      setLoading(false);
    }
  };

  // 선택/삭제
  const toggle = (id) => setSelectedItems((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const allSelected = selectedItems.length === cartItems.length && cartItems.length > 0;
  const toggleAll = () => setSelectedItems(allSelected ? [] : cartItems.map((i) => i.cartItemId));

  const handleDeleteOne = async (cartItemId) => {
    try {
      await deleteCart(empNo, [cartItemId]);
      await fetchCart();
    } catch (err) {
      console.error("삭제 실패", err);
      alert("삭제에 실패했습니다.");
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedItems.length === 0) return alert("선택된 항목이 없습니다.");
    try {
      await deleteCart(empNo, selectedItems);
      await fetchCart();
    } catch (err) {
      console.error("선택 삭제 실패", err);
      alert("선택 삭제에 실패했습니다.");
    }
  };

  const handleClear = async () => {
    if (!confirm("장바구니를 모두 비우시겠어요?")) return;
    try {
      await clearCart(empNo);
      await fetchCart();
    } catch (err) {
      console.error("전체 비우기 실패", err);
      alert("전체 비우기에 실패했습니다.");
    }
  };

  // ---------- 선택/전체 공용 계산 ----------
  const selectedList = useMemo(
    () => cartItems.filter((it) => selectedItems.includes(it.cartItemId)),
    [cartItems, selectedItems]
  );
  const hasSelection = selectedItems.length > 0;

  const calcAmounts = (list) => {
    const subtotal = list.reduce((a, it) => a + it.price * it.quantity, 0);
    const discount = Math.floor(subtotal * 0.1);
    const total = subtotal - discount;
    return { subtotal, discount, total, count: list.length };
  };

  // 결제 기준 아이템과 금액(선택 있으면 선택, 아니면 전체)
  const itemsForOrder = selectedList;
  const amounts = useMemo(
    () => (hasSelection ? calcAmounts(selectedList) : { subtotal: 0, discount: 0, total: 0, count: 0 }),
    [hasSelection, selectedList]
  );
  // ----------------------------------------

  // 결제하기 → 체크아웃 모달
  const handleCheckoutOpen = () => {
    if (selectedItems.length === 0) return alert("결제할 항목을 선택하세요.");
    setOpenCheckout(true);
  };

  // 폼 제출 → 서버 주문 생성(실패하면 프론트 폴백)
  const submitCheckout = async (checkoutForm) => {
    const DEBUG = true;
    const dlog = (...args) => DEBUG && console.log("[checkout]", ...args);
    
    setLoading(true);
    if (selectedItems.length === 0) {
      alert("결제할 항목을 선택하세요.");
      setLoading(false);
      setOpenCheckout(false);
      return;
    }

    const selected = cartItems.filter((i) => selectedItems.includes(i.cartItemId));
    const unselected = cartItems.filter((i) => !selectedItems.includes(i.cartItemId));
    const unselectedIds = unselected.map((i) => i.cartItemId);

    dlog("selectedItems:", selectedItems);
    dlog(
      "selected:",
      selected.map((s) => ({ id: s.cartItemId, pid: s.productId, qty: s.quantity }))
    );
    dlog(
      "unselected:",
      unselected.map((u) => ({ id: u.cartItemId, pid: u.productId, qty: u.quantity }))
    );

    let created = null;
    let removedUnselected = false;

    try {
      // 1) 미선택 삭제
      if (unselectedIds.length) {
        dlog("deleteCart ->", { empNo, unselectedIds });
        await deleteCart(empNo, unselectedIds);
        dlog("deleteCart done");
        removedUnselected = true;
      }

      // 2) 주문 생성
      dlog("createOrder start", { empNo });
      const res = await createOrder(empNo);
      dlog("createOrder result", res);
      if (res?.orderId) created = { ...res, shipping: checkoutForm };
    } catch (err) {
      console.warn("[checkout] createOrder failed", {
        status: err?.response?.status,
        data: err?.response?.data,
        msg: err?.message,
      });

      // // 실패 롤백: 방금 뺀 미선택 복구 (부분 실패도 원인 수집)
    } finally {
      if (removedUnselected && unselected.length) {
        const results = await Promise.allSettled(
          unselected.map(async (u) => {
            const pid = u.productId ?? u.sku ?? u.id ?? u.productNo;
            const qty = Number(u.quantity || 0);
            if (!pid || !qty) {
              throw new Error(`invalid restore payload pid=${pid}, qty=${qty}`);
            }
            await addCart(pid, empNo, qty); // 1차 시그니처
          })
        );
        // 어떤게 실패했는지 한눈에
        const failed = results.map((r, i) => ({ r, item: unselected[i] })).filter((x) => x.r.status === "rejected");
        if (failed.length) {
          console.error("[restore] failed items:", failed);
        }
      }

      if (!created) {
        // 서버 실패 시 프런트 폴백(주문내역엔 안 남음)
        created = {
          orderId: "ORD-" + Math.random().toString(36).slice(2, 10).toUpperCase(),
          orderedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          items: selected,
          subtotal: amounts.subtotal,
          discount: amounts.discount,
          total: amounts.total,
          shipping: checkoutForm,
        };
      }
      try {
        if (created?.orderId) {
          localStorage.setItem(`wm_order_shipping_${created.orderId}`, JSON.stringify(created.shipping || {}));
        }
      } catch (e) {
        console.debug("[checkout] localStorage save skipped:", e);
      }

      setOrder(created);
      setOpenCheckout(false);
      setOpenDone(true);
      await fetchCart();
      setSelectedItems([]);
      setLoading(false);
    }
  };

  const goComplete = () => {
    setOpenDone(false);
    navigate("/intrasoltech/welfaremall/complete", { state: order });
  };

  return (
    <section className="bg-gray-50 py-12 px-6 lg:px-32">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-center mb-6">장바구니</h1>

        {/* 상단 툴바 */}
        <div className="mb-4 flex items-center justify-between text-sm">
          <div className="flex items-center gap-3">
            <label className="inline-flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                className="h-4 w-4"
                checked={allSelected}
                onChange={toggleAll}
                disabled={cartItems.length === 0}
              />
              <span>
                전체선택 ({selectedItems.length}/{cartItems.length})
              </span>
            </label>
            <button
              onClick={handleDeleteSelected}
              className="px-3 py-1 rounded border text-gray-700 hover:bg-gray-100 disabled:opacity-50"
              disabled={selectedItems.length === 0}
            >
              선택삭제
            </button>
          </div>
          <button
            onClick={handleClear}
            className="px-3 py-1 rounded border text-gray-700 hover:bg-gray-100 disabled:opacity-50"
            disabled={cartItems.length === 0}
          >
            전체 비우기
          </button>

          {/* 우측 하단 플로팅 */}
          <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2">
            <Link
              to="/intrasoltech/welfaremall"
              className="w-12 h-12 flex items-center justify-center rounded-full shadow-lg bg-blue-600 text-white hover:bg-blue-700"
              aria-label="복지몰 홈"
              title="복지몰 홈"
            >
              🏬
            </Link>
            <Link
              to="/intrasoltech/welfaremall/orders"
              className="w-12 h-12 flex items-center justify-center rounded-full shadow-lg bg-blue-600 text-white hover:bg-blue-700"
              aria-label="주문목록"
              title="주문목록"
            >
              🧾
            </Link>
          </div>
        </div>

        {/* 목록 */}
        <ul className="space-y-4">
          {loading && <li className="rounded border bg-white p-4 text-sm text-gray-500">로딩 중...</li>}

          {!loading && cartItems.length === 0 && (
            <li className="rounded border bg-white p-10 text-center text-sm text-gray-500">장바구니가 비어있습니다.</li>
          )}

          {cartItems.map((item) => (
            <li key={item.cartItemId} className="flex items-center gap-4 bg-white p-4 rounded border shadow-sm">
              <input
                type="checkbox"
                className="h-4 w-4"
                checked={selectedItems.includes(item.cartItemId)}
                onChange={() => toggle(item.cartItemId)}
              />

              <img
                src={`/welfimages/${item.productId}.jpg`}
                alt={item.productName}
                className="w-20 h-20 rounded object-cover"
                onError={(e) => (e.currentTarget.src = "/welfimages/fallback.jpg")}
              />

              <div className="flex-1">
                <h3 className="text-base font-medium text-gray-900 line-clamp-2">{item.productName}</h3>
                <div className="mt-1 text-sm text-gray-500">
                  {Number(item.price).toLocaleString()}원 · 수량 {item.quantity}
                </div>
              </div>

              <div className="text-right">
                <div className="font-semibold mb-2">{(item.price * item.quantity).toLocaleString()}원</div>
                <button
                  onClick={() => handleDeleteOne(item.cartItemId)}
                  className="text-red-500 hover:text-red-700 text-xs"
                >
                  삭제
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* 합계(선택 있으면 선택 기준, 아니면 전체 기준) */}
        <div className="mt-8 border-t pt-6 max-w-lg ml-auto text-sm text-gray-700 space-y-2">
          {hasSelection && (
            <div className="flex justify-between">
              <dt className="text-purple-600">선택된 상품</dt>
              <dd className="text-purple-600">{amounts.count}개</dd>
            </div>
          )}
          <div className="flex justify-between">
            <dt>{hasSelection ? "선택 합계" : "합계"}</dt>
            <dd>{amounts.subtotal.toLocaleString()}원</dd>
          </div>
          <div className="flex justify-between">
            <dt>직급 할인 </dt>
            <dd className="text-red-500">-{amounts.discount.toLocaleString()}원</dd>
          </div>
          <div className="flex justify-between text-base font-semibold">
            <dt>{hasSelection ? "선택 총 합계" : "총 합계"}</dt>
            <dd>{amounts.total.toLocaleString()}원</dd>
          </div>

          <div className="text-right mt-6">
            <button
              onClick={handleCheckoutOpen}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded disabled:opacity-50"
              disabled={loading || selectedItems.length === 0}
            >
              {loading ? "처리 중..." : "결제하기"}
            </button>
          </div>
        </div>
      </div>
      {/* 체크아웃 모달: 수령인/연락처 자동, 주소 고정 */}
      {openCheckout && (
        <CheckoutModal
          onClose={() => setOpenCheckout(false)}
          onSubmit={submitCheckout}
          defaultAmount={amounts} // ✅ 단일 소스
          defaults={{
            receiver: defaultReceiver,
            phone: phoneDefault, // 숫자만 전달 → 모달에서 하이픈 포맷
            address1: "서울특별시 종로구 종로12길 15",
          }}
          lockAddress={true}
        />
      )}

      {/* 결제 완료 모달 */}
      {openDone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpenDone(false)} />
          <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-bold mb-2">결제가 완료되었습니다</h2>
            <p className="text-sm text-gray-600 mb-4">
              주문번호: <b>{order?.orderId}</b>
            </p>
            <div className="bg-gray-50 rounded p-3 text-sm mb-4 space-y-1">
              <div className="flex justify-between">
                <span>상품 수</span>
                <span>{order?.items?.length ?? 0}개</span>
              </div>
              <div className="flex justify-between">
                <span>합계</span>
                <span>{order?.subtotal?.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between">
                <span>직급할인</span>
                <span>-{order?.discount?.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>총 결제금액</span>
                <span>{order?.total?.toLocaleString()}원</span>
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <button className="px-4 py-2 rounded border" onClick={() => setOpenDone(false)}>
                쇼핑 계속
              </button>
              <button className="px-4 py-2 rounded bg-blue-600 text-white" onClick={goComplete}>
                주문내역 보기
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/** 체크아웃 폼 모달
 * defaults: { receiver, phone(숫자만), address1 }
 * lockAddress: true면 주소 입력 잠금(회사 기본 배송지)
 * 전화번호는 보기용 하이픈 포맷(010-1234-5678)으로 표시, 전송은 숫자만
 */
function CheckoutModal({ onClose, onSubmit, defaultAmount, defaults = {}, lockAddress = false }) {
  // 보기용 하이픈 포맷터
  const formatPhone = (v = "") =>
    v
      .replace(/\D/g, "")
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4}).*$/, (_, a, b, c) =>
        [a, b && `-${b}`, c && `-${c}`].filter(Boolean).join("")
      );

  const [form, setForm] = useState({
    receiver: defaults.receiver ?? "",
    phone: formatPhone(defaults.phone ?? ""), // 기본값도 하이픈 표시
    address1: defaults.address1 ?? "서울특별시 종로구 종로12길 15",
    address2: "",
    requestMessage: "",
    payMethod: "CARD",
    cardLast4: "",
  });

  const [error, setError] = useState("");

  // defaults가 늦게 도착해도 자동 반영(비어있을 때만 주입)
  useEffect(() => {
    setForm((prev) => {
      const next = { ...prev };
      if (!prev.receiver && defaults?.receiver) next.receiver = defaults.receiver;
      if (!prev.phone && defaults?.phone) next.phone = formatPhone(defaults.phone);
      if (lockAddress && defaults?.address1) next.address1 = defaults.address1;
      return next;
    });
  }, [defaults, lockAddress]);

  const change = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      setForm((f) => ({ ...f, phone: formatPhone(value) })); // 입력 시 하이픈 자동
      return;
    }
    setForm((f) => ({ ...f, [name]: value }));
  };

  const submit = (e) => {
    e.preventDefault();
    const phoneDigits = String(form.phone || "").replace(/\D/g, ""); // 서버엔 숫자만
    if (!form.receiver.trim()) return setError("수령인을 입력하세요.");
    if (!/^\d{10,11}$/.test(phoneDigits)) return setError("연락처는 숫자 10~11자리로 입력하세요.");
    if (!form.address1.trim()) return setError("주소를 입력하세요.");
    if (form.payMethod === "CARD" && form.cardLast4 && !/^\d{4}$/.test(form.cardLast4))
      return setError("카드 마지막 4자리를 올바르게 입력하세요.");
    setError("");
    onSubmit({ ...form, phone: phoneDigits });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <form onSubmit={submit} className="relative z-10 w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-xl font-bold mb-1">결제 정보 입력</h2>
        <p className="text-xs text-gray-500 mb-4">실제 결제는 발생하지 않으며, 입력 정보는 주문서에만 표시됩니다.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="col-span-1">
            <label className="text-sm text-gray-600">수령인</label>
            <input
              name="receiver"
              value={form.receiver}
              onChange={change}
              className="mt-1 w-full border rounded px-3 py-2"
              readOnly
            />
          </div>
          <div className="col-span-1">
            <label className="text-sm text-gray-600">연락처</label>
            <input
              name="phone"
              placeholder="010-1234-5678"
              value={form.phone}
              onChange={change}
              className="mt-1 w-full border rounded px-3 py-2"
              readOnly
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm text-gray-600">주소</label>
            <input
              name="address1"
              value={form.address1}
              onChange={change}
              readOnly={lockAddress}
              className={`mt-1 w-full border rounded px-3 py-2 ${lockAddress ? "bg-gray-100" : ""}`}
            />
            {lockAddress && <p className="mt-1 text-xs text-gray-500">회사 기본 배송지입니다.</p>}
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm text-gray-600">상세주소</label>
            <input
              name="address2"
              value={form.address2}
              onChange={change}
              className="mt-1 w-full border rounded px-3 py-2"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm text-gray-600">요청사항</label>
            <input
              name="requestMessage"
              value={form.requestMessage}
              onChange={change}
              className="mt-1 w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <div className="mt-4 border-t pt-4">
          <div className="text-sm font-semibold mb-2">결제수단</div>
          <div className="flex gap-4 mb-3 text-sm">
            <label className="inline-flex items-center gap-2">
              <input type="radio" name="payMethod" value="CARD" checked={form.payMethod === "CARD"} onChange={change} />
              카드
            </label>
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                name="payMethod"
                value="TRANSFER"
                checked={form.payMethod === "TRANSFER"}
                onChange={change}
              />
              계좌이체
            </label>
          </div>

          {form.payMethod === "CARD" && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-1">
                <label className="text-sm text-gray-600">카드 마지막 4자리(표시용)</label>
                <input
                  name="cardLast4"
                  placeholder="1234"
                  maxLength={4}
                  value={form.cardLast4}
                  onChange={change}
                  className="mt-1 w-full border rounded px-3 py-2"
                />
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 bg-gray-50 rounded p-3 text-sm">
          <div className="flex justify-between">
            <span>상품 수</span>
            <span>{defaultAmount.count}개</span>
          </div>
          <div className="flex justify-between">
            <span>합계</span>
            <span>{defaultAmount.subtotal.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between">
            <span>직급할인</span>
            <span>-{defaultAmount.discount.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>총 결제금액</span>
            <span>{defaultAmount.total.toLocaleString()}원</span>
          </div>
        </div>

        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

        <div className="mt-5 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded border">
            취소
          </button>
          <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">
            결제 진행
          </button>
        </div>
      </form>
    </div>
  );
}
