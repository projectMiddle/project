import React, { useState, useEffect } from "react";

import { MdPersonSearch } from "react-icons/md";
import EmployeeCard from "./EmployeeCard";
import { fetchAllEmployees } from "../../api/employeeProfile";

const EmployeeSearchModal = ({ isOpen, onClose, onSelect }) => {
  const [searchText, setSearchText] = useState("");
  const [employeeList, setEmployeeList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [selected, setSelected] = useState([]);

  // useEffect(() => {
  //   fetch("/data/employees.json")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setEmployeeList(data);
  //       setFilteredList(data);
  //     });
  // }, []);
  useEffect(() => {
    fetchAllEmployees()
      .then((data) => {
        // console.log("📦 백엔드 응답 데이터:", data);
        setEmployeeList(data);
      })
      .catch((err) => {
        console.error("🚨 사원 목록 불러오기 실패:", err);
      });
  }, []);
  //  타이핑할 때마다 자동 필터링
  useEffect(() => {
    const filtered = employeeList.filter((emp) => emp.ename.toLowerCase().includes(searchText.toLowerCase()));
    setFilteredList(filtered);
  }, [searchText, employeeList]);

  //  버튼/엔터 검색 (하이브리드)
  const handleSearch = () => {
    const filtered = employeeList.filter((emp) => emp.ename.toLowerCase().includes(searchText.toLowerCase()));
    setFilteredList(filtered);
  };

  //선택 토글
  const handleToggleSelect = (emp) => {
    setSelected((prev) =>
      prev.some((e) => e.empNo === emp.empNo) ? prev.filter((e) => e.empNo !== emp.empNo) : [...prev, emp]
    );
  };
  //선택완료
  const handleConfirm = () => {
    const simplified = selected.map((emp) => ({
      id: emp.empNo,
      name: emp.ename,
      email: emp.eemail,
    }));
    onSelect && onSelect(simplified);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      {/* ✅ 상단 닫기 버튼: 검은 배경 기준으로 고정 */}
      <button
        onClick={onClose}
        className="fixed top-1 right-50% text-white text-4xl hover:text-gray-300 z-[999]"
        title="닫기"
      >
        ×
      </button>
      <div className="bg-white w-[500px] max-h-[90vh] overflow-y-auto p-6 rounded-lg shadow-lg">
        {/* 🔍 검색창 */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch(); // 엔터 키로도 반응
          }}
          className="flex items-center border-2 border-purple-500 rounded-full px-4 py-2 mb-5 focus-within:ring-2 focus-within:ring-purple-300"
        >
          <MdPersonSearch className="text-purple-500 w-5 h-5 mr-2" />
          <input
            type="text"
            placeholder="이름을 입력하세요"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full outline-none text-sm"
          />
          {/* <button
            type="submit"
            className="text-purple-500 font-bold text-sm px-3 whitespace-nowrap hover:text-purple-700"
          >
            검색
          </button> */}
        </form>

        {/* 👥 사원 목록 */}
        <div className="space-y-4">
          {filteredList.length > 0 ? (
            filteredList.map((emp) => (
              <div
                key={emp.empNo}
                onClick={() => handleToggleSelect(emp)}
                className={`cursor-pointer rounded border p-2 ${
                  selected.some((e) => e.empNo === emp.empNo)
                    ? "bg-purple-100 border-purple-400" // ✅ 선택된 경우 보라색 강조
                    : "hover:bg-gray-100"
                }`}
              >
                <EmployeeCard key={emp.empNo} employee={emp} />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">검색 결과가 없습니다.</p>
          )}
        </div>
        {/* 하단 버튼 */}
        <button
          onClick={onClose}
          className="mt-6 w-full bg-purple-500 hover:bg-purple-600 transition text-white py-2 rounded-lg"
        >
          닫기
        </button>
        {onSelect && (
          <button onClick={handleConfirm} className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded">
            선택 완료
          </button>
        )}
      </div>
    </div>
  );
};

export default EmployeeSearchModal;
