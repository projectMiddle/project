import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdPersonSearch } from "react-icons/md";
import EmployeeCard from "./EmployeeCard";

const EmployeeSearchModal = ({ isOpen, onClose }) => {
  const [searchText, setSearchText] = useState("");
  const [employeeList, setEmployeeList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  // useEffect(() => {
  //   fetch("/data/employees.json")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setEmployeeList(data);
  //       setFilteredList(data);
  //     });
  // }, []);
  useEffect(() => {
    axios
      .get("/empinfo/search")
      .then((res) => {
        setEmployeeList(res.data);
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
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
          <button
            type="submit"
            className="text-purple-500 font-bold text-sm px-3 whitespace-nowrap hover:text-purple-700"
          >
            검색
          </button>
        </form>

        {/* 👥 사원 목록 */}
        <div className="space-y-4">
          {filteredList.length > 0 ? (
            filteredList.map((emp) => <EmployeeCard key={emp.empNo} employee={emp} />)
          ) : (
            <p className="text-center text-gray-500">검색 결과가 없습니다.</p>
          )}
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-purple-500 hover:bg-purple-600 transition text-white py-2 rounded-lg"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default EmployeeSearchModal;
