import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductDetail, addCart } from "../../api/mallApi";
import useAuth from "../../hooks/useAuth";

export default function WelfareMallDetail() {
  const { product_id } = useParams();
  const { userInfo } = useAuth();
  const [product, setProduct] = useState(null);
  const [imageIndex, setImageIndex] = useState(1);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    getProductDetail(product_id)
      .then((data) => {
        setProduct(data);
        // index 계산 방식 유지
        setImageIndex(1); // 나중에 리스트에서 찾아도 OK
      })
      .catch((err) => console.error("상세 정보 불러오기 실패", err));
  }, [product_id]);

  const handleAddToCart = () => {
    addCart(product.productId, userInfo.empNo, quantity)
      .then(() => alert("장바구니에 추가되었습니다!"))
      .catch((err) => {
        console.error("장바구니 추가 실패", err);
        alert("장바구니 추가에 실패했습니다.");
      });
  };

  if (!product) return <div className="p-6">상품을 불러오는 중...</div>;

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white flex flex-col lg:flex-row gap-10">
      {/* 왼쪽: 이미지 */}
      <div className="flex-1">
        <img
          src={`/welfimages/${product.productId}.jpg`}
          alt={product.name}
          className="w-full max-w-[500px] mx-auto object-contain rounded-lg"
        />
      </div>

      {/* 오른쪽: 상세정보 */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* 상품명 */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2 pt-30">{product.name}</h1>

          {/* 가격 */}
          <div className="mb-4">
            <span className="text-3xl font-bold text-red-600">{Number(product.price).toLocaleString()}원</span>
          </div>

          {/* 배송 정보 */}
          <div className="mb-4 text-sm">
            <p className="text-green-600 font-semibold">무료배송</p>
            <p className="text-gray-500">내일 도착 보장 (오후 3시 30분 전 주문 시)</p>
          </div>

          {/* 수량 선택 */}
          <div className="mb-6">
            <label className="text-sm font-medium text-gray-700">수량</label>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="ml-2 border px-2 py-1 rounded w-20"
            />
          </div>
        </div>

        {/* 판매자 정보 */}
        <p className="text-sm text-gray-500">판매자: 솔테크 복지몰</p>

        {/* 버튼 영역 */}
        <div className="flex gap-4 mt-4">
          <button
            className="flex-1 border border-blue-600 text-blue-600 py-3 font-semibold rounded hover:bg-blue-50"
            onClick={handleAddToCart}
          >
            장바구니
          </button>
          <button className="flex-1 bg-blue-600 text-white py-3 font-semibold rounded hover:bg-blue-700">
            바로구매
          </button>
        </div>
      </div>
    </div>
  );
}
