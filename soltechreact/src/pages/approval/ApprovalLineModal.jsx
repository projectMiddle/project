import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import { appLineEmployees } from "../../api/approvalApi";
import {
  filterEmployees,
  filterByDepartment,
  canAddApprover,
  isFinalApproverValid,
  isAlreadySelected,
} from "../../utils/Approval";

const jobOrder = ["AM", "AD_AM", "ASSI_MGR", "AD_MGR"];
const departments = ["세무팀", "인사팀", "지원팀", "마케팅팀", "영업팀"];

const ApprovalLineModal = ({ isOpen, modalMode, onClose, onSave }) => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectedApprovers, setSelectedApprovers] = useState([]);
  const [selectedReferences, setSelectedReferences] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [jobFilter, setJobFilter] = useState("");
  const [selectedDept, setSelectedDept] = useState("");

  useEffect(() => {
    appLineEmployees()
      .then((data) => {
        setEmployees(data);
        setFilteredEmployees(data);
      })
      .catch((err) => {
        console.error("사원 목록 불러오기 실패", err);
      });
  }, []);

  const handleSearch = () => {
    const result = filterEmployees(employees, searchTerm, jobFilter, selectedDept);
    console.log({ searchTerm, jobFilter, selectedDept, result });
    setFilteredEmployees(result);
  };

  const handleDeptClick = (dept) => {
    if (selectedDept === dept) {
      setSelectedDept("");
      setFilteredEmployees(employees);
    } else {
      setSelectedDept(dept);
      const result = filterByDepartment(employees, dept);
      setFilteredEmployees(result);
    }
  };

  const handleAdd = (emp, type) => {
    if (isAlreadySelected(selectedApprovers, selectedReferences, emp.empNo)) {
      return alert("이미 선택된 사원입니다");
    }

    if (type === "approver") {
      if (selectedApprovers.length >= 3) {
        return alert("결재자는 최대 3명까지만 지정할 수 있습니다");
      }
      if (!canAddApprover(selectedApprovers, emp, jobOrder)) {
        return alert("하급자 부터 순차적으로 선택해야 합니다");
      }
      setSelectedApprovers([...selectedApprovers, emp]);
    } else {
      if (selectedReferences.length >= 3) {
        return alert("참조자는 최대 3명까지만 지정할 수 있습니다");
      }
      setSelectedReferences([...selectedReferences, emp]);
    }
  };

  const handleDelete = (empNo, type) => {
    if (type === "approver") {
      setSelectedApprovers((prev) => prev.filter((e) => e.empNo !== empNo));
    } else {
      setSelectedReferences((prev) => prev.filter((e) => e.empNo !== empNo));
    }
  };

  const handleSave = () => {
    if (!isFinalApproverValid(selectedApprovers, jobOrder)) {
      return alert("최종 결재자는 부장 이상이어야 합니다");
    }

    console.log("🟡 모달에서 선택된 결재자 리스트:", selectedApprovers);

    const resultList =
      modalMode === "APPROVER"
        ? selectedApprovers.map((emp, idx) => ({
            empNo: emp.empNo,
            appRoleJobNo: emp.jobNo, // enum 이름
            eName: emp.eName,
            jobName: emp.jobName,
            deptName: emp.deptName,
            appOrder: idx + 1,
          }))
        : selectedReferences.map((emp) => ({
            empNo: emp.empNo,
            appRoleJobNo: emp.jobNo,
            eName: emp.eName,
            jobName: emp.jobName,
            deptName: emp.deptName,
            appOrder: null,
          }));

    onSave(resultList); // ✅ 이제 배열로만 넘긴다!
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0">
      <div className="bg-black/40 fixed inset-0" aria-hidden="true" />
      <div className="flex items-center justify-center min-h-screen px-4">
        <Dialog.Panel className="bg-white w-full max-w-6xl rounded-lg shadow-xl p-6 relative">
          <button className="absolute top-4 right-4" onClick={onClose}>
            <X className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
          </button>
          <Dialog.Title className="text-xl font-bold mb-4 text-gray-800">결재선 지정</Dialog.Title>

          <div className="grid grid-cols-2 gap-6 overflow-hidden">
            {/* 좌측 영역 */}
            <div className="border rounded p-4 bg-gray-100 flex flex-col">
              <h3 className="font-semibold text-gray-700 mb-2">조직도</h3>
              <div className="mb-4 text-sm bg-white p-2 border rounded h-[180px] overflow-y-auto">
                <ul className="space-y-1">
                  {departments.map((dept) => (
                    <li
                      key={dept}
                      className={`cursor-pointer px-2 py-1 rounded hover:bg-purple-100 ${
                        selectedDept === dept ? "bg-purple-200 text-purple-500 font-semibold" : "text-gray-700"
                      }`}
                      onClick={() => handleDeptClick(dept)}
                    >
                      {dept}
                    </li>
                  ))}
                </ul>
              </div>

              <h3 className="font-semibold text-gray-700 mb-2">직책/이름 검색</h3>
              <div className="flex gap-2 mb-2">
                <select
                  value={jobFilter}
                  onChange={(e) => setJobFilter(e.target.value)}
                  className="border px-2 py-1 rounded-md text-sm w-1/2"
                >
                  <option value="">전체</option>
                  <option value="AM">대리</option>
                  <option value="AD_AM">과장</option>
                  <option value="ASSI_MGR">부장</option>
                  <option value="AD_MGR">본부장</option>
                </select>
                <input
                  type="text"
                  placeholder="이름 입력"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border px-2 py-1 rounded-md text-sm w-full"
                />
                <button
                  type="button"
                  onClick={handleSearch}
                  className="bg-purple-600 text-white px-3 py-1 rounded-md text-sm"
                >
                  검색
                </button>
              </div>

              <div className="h-[300px] overflow-y-auto border rounded bg-white">
                <table className="w-full text-sm">
                  <thead className="bg-gray-200 text-gray-700 sticky top-0 z-10">
                    <tr>
                      <th className="p-2 w-[25%]">이름</th>
                      <th className="p-2 w-[20%]">직책</th>
                      <th className="p-2 w-[25%]">부서</th>
                      <th className="p-2 w-[30%]">추가</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployees.map((emp) => (
                      <tr key={emp.empNo} className="border-t hover:bg-purple-50">
                        <td className="p-2">{emp.eName}</td>
                        <td className="p-2">{emp.jobName}</td>
                        <td className="p-2">{emp.deptName}</td>
                        <td className="p-2">
                          {modalMode === "APPROVER" && (
                            <button
                              className="text-blue-500 hover:underline text-xs cursor-pointer"
                              onClick={() => handleAdd(emp, "approver")}
                            >
                              결재자
                            </button>
                          )}
                          {modalMode === "REFERENCE" && (
                            <button
                              className="text-green-500 hover:underline text-xs cursor-pointer"
                              onClick={() => handleAdd(emp, "reference")}
                            >
                              참조자
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 우측 영역 */}
            <div className="flex flex-col gap-4">
              <div className="border border-gray-300 rounded bg-white">
                <h4 className="bg-gray-100 px-4 py-2 text-gray-800 font-semibold border-b">결재자</h4>
                <ul className="h-60 overflow-y-auto text-sm divide-y">
                  {selectedApprovers.map((a, idx) => (
                    <li key={a.empNo} className="flex justify-between items-center px-4 py-2">
                      <span>
                        {idx + 1}순위 | {a.eName} | {a.jobName} | {a.deptName}
                      </span>
                      <button
                        onClick={() => handleDelete(a.empNo, "approver")}
                        className="text-red-500 hover:underline text-xs"
                      >
                        삭제
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border border-gray-300 rounded bg-white">
                <h4 className="bg-gray-100 px-4 py-2 text-gray-800 font-semibold border-b">참조자</h4>
                <ul className="h-60 overflow-y-auto text-sm divide-y">
                  {selectedReferences.map((r) => (
                    <li key={r.empNo} className="flex justify-between items-center px-4 py-2">
                      <span>
                        {r.eName} | {r.jobName} | {r.deptName}
                      </span>
                      <button
                        onClick={() => handleDelete(r.empNo, "reference")}
                        className="text-red-500 hover:underline text-xs"
                      >
                        삭제
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleSave}
                  className="bg-purple-600 text-white w-full py-3 rounded hover:bg-purple-700 text-sm"
                >
                  저장
                </button>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ApprovalLineModal;
