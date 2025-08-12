import { useEffect, useState, useMemo } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { getProductList, addCart } from "../../api/mallApi";
import useAuth from "../../hooks/useAuth";

export default function WelfareMallList() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const { userInfo } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    getProductList()
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch((err) => console.error("상품 목록 불러오기 실패", err));
  }, []);

  const handleAddToCart = (product) => {
    if (!userInfo?.empNo) {
      alert("로그인이 필요합니다.");
      return;
    }
    addCart(product.productId, userInfo.empNo, 1)
      .then(() => alert("장바구니에 담았습니다!"))
      .catch((err) => {
        console.error("장바구니 담기 실패", err);
        alert("장바구니 담기 실패");
      });
  };

  // 바로구매 → 카트로 이동(+자동결제 신호)
  const handleBuyNow = async (product) => {
    if (!userInfo?.empNo) {
      alert("로그인이 필요합니다.");
      return;
    }
    try {
      await addCart(product.productId, userInfo.empNo, 1);
    } catch (e) {
      console.warn("장바구니 담기 실패(무시하고 진행):", e);
    }
    navigate("/intrasoltech/welfaremall/cart?autosubmit=1");
  };

  // ❌ (삭제) checkoutData 관련 낙서 코드
  // console.log("🛒 바로구매 데이터:", checkoutData);
  // navigate("/intrasoltech/welfaremall/checkout", { state: checkoutData });

  // ======= 페이지네이션 (10개씩) =======
  const pageSize = 10;
  const pageParam = Number(searchParams.get("page") || "1");
  const [currentPage, setCurrentPage] = useState(Number.isNaN(pageParam) ? 1 : pageParam);

  // URL 쿼리 변화 → 상태 반영
  useEffect(() => {
    const q = Number(searchParams.get("page") || "1");
    setCurrentPage(Number.isNaN(q) ? 1 : q);
  }, [searchParams]);

  const totalPages = Math.max(1, Math.ceil(products.length / pageSize));
  const page = Math.min(Math.max(1, currentPage), totalPages);
  const start = (page - 1) * pageSize;
  const pageItems = products.slice(start, start + pageSize);

  const goPage = (p) => {
    const np = Math.min(Math.max(1, p), totalPages);
    setSearchParams({ page: String(np) });
  };

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

  // ✅ 여기서 컴포넌트를 닫아야 함 (이 아래 코드들은 전부 return 내부)
  return (
    <div className="p-6">
      {/* 상품 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pageItems.map((product) => (
          <div key={product.productId} className="group relative block overflow-hidden rounded border shadow-sm">
            {/* 현재 페이지를 상세로 함께 전달 */}
            <Link to={`/intrasoltech/welfaremall/product/${product.productId}?page=${page}`}>
              <img
                src={`/welfimages/${product.productId}.jpg`}
                alt={product.name}
                className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
                onError={(e) => (e.currentTarget.src = "/welfimages/fallback.jpg")}
              />
            </Link>

            <div className="relative border-t bg-white p-6">
              <p className="text-gray-700 text-sm">{Number(product.price).toLocaleString()}원</p>
              <h3 className="mt-1.5 text-base font-medium text-gray-900 line-clamp-2">{product.name}</h3>

              <div className="mt-4 flex gap-4">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="flex-1 rounded-sm bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 transition hover:scale-105"
                >
                  장바구니
                </button>
                <button
                  onClick={() => handleBuyNow(product)}
                  className="flex-1 rounded-sm bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 hover:scale-105"
                >
                  바로구매
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      {pager}

      {/* 우측 하단 플로팅 아이콘: 카트 / 주문목록 */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2">
        <Link
          to="/intrasoltech/welfaremall/cart"
          className="w-12 h-12 flex items-center justify-center rounded-full shadow-lg bg-blue-600 text-white hover:bg-blue-700"
          aria-label="장바구니"
          title="장바구니"
        >
          🛒
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
  );
}
