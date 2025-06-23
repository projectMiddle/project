// ================================================= 결재선 지정 모달 기능 =================================================

// 검색 필터링 기능
export function filterEmployees(list, keyword, jobFilter, deptFilter) {
    return list.filter(emp => {
        const name = emp.eName || "";   // undefined 방지
        const job = emp.jobNo || "";
        const dept = emp.deptName || "";

        const matchesName = keyword
            ? name.toLowerCase().includes(keyword.toLowerCase())
            : true;

        const matchesJob = jobFilter
            ? job === jobFilter
            : true;

        const matchesDept = deptFilter
            ? dept === deptFilter
            : true;

        return matchesName && matchesJob && matchesDept;
    });
}

// 부서 클릭 시 필터링 기능
export const filterByDepartment = (employees, dept) => {
    return employees.filter((emp) => emp.deptName === dept);
};

// 결재자 추가 유효성 검사 (중복, 순서)
export const canAddApprover = (selectedApprovers, emp, jobOrder) => {
    const last = selectedApprovers.at(-1);
    const currentIdx = jobOrder.indexOf(emp.jobNo);
    const lastIdx = last ? jobOrder.indexOf(last.jobNo) : -1;
    return currentIdx >= lastIdx;
};

// 결재자 마지막 조건 검사
export const isFinalApproverValid = (selectedApprovers, jobOrder) => {
    const last = selectedApprovers.at(-1);
    return last && jobOrder.indexOf(last.jobNo) >= 2;
};

// 사원 중복 선택 검사
export const isAlreadySelected = (selectedApprovers, selectedReferences, empNo) => {
    return [...selectedApprovers, ...selectedReferences].some((e) => e.empNo === empNo);
};

// =========================================================================================================================

// ================================================= 사이드바 카테고리별 기능 ==================================================

// 현재 경로에 따른 결재 상태 추출
export const getCurrentApprovalStatus = (pathname) => {
    if (pathname.includes("submitted")) return "submitted";
    if (pathname.includes("processing")) return "processing";
    if (pathname.includes("completed")) return "completed";
    if (pathname.includes("list")) return "list";
    if (pathname.includes("history")) return "history";
    if (pathname.includes("reference")) return "reference";
    return "all";
};

// 현재 경로가 특정 키로 끝나는지 여부
export const isActiveRoute = (pathname, key) => pathname.endsWith(key);

// 카테고리 목록 (공통 상수로 분리)
export const approvalCategories = ["기안서", "보고서", "연차신청서", "출장신청서"];

// 카테고리별 색상 or 약자 등 매핑
export const getCategoryColor = (category) => {
    switch (category) {
        case "기안서": return "bg-purple-100 text-purple-700";
        case "보고서": return "bg-blue-100 text-blue-700";
        case "연차신청서": return "bg-green-100 text-green-700";
        case "출장신청서": return "bg-yellow-100 text-yellow-700";
        default: return "bg-gray-100 text-gray-700";
    }
};

// ================================================= 사이드바 카테고리별 기능 ==================================================
