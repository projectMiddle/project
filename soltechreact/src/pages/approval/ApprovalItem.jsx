// components/approval/ApprovalItem.jsx
import React from "react";

const ApprovalItem = ({ approval }) => {
  const {
    appDocNo,
    appType,
    appTitle,
    appRegDate,
    appDeptName,
    appEmpName,
    appStatus,
  } = approval;
  
  return (
    <tr className="text-center text-sm">
      <td className="border px-2 py-1">{appDocNo}</td>
      <td className="border px-2 py-1">{appType}</td>
      <td className="border px-2 py-1">{appTitle}</td>
      <td className="border px-2 py-1">{appRegDate}</td>
      <td className="border px-2 py-1">{appDeptName}</td>
      <td className="border px-2 py-1">{appEmpName}</td>
      <td className="border px-2 py-1">{appStatus}</td>
    </tr>
  );
};

export default ApprovalItem;
