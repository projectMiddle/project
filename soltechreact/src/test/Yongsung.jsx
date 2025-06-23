import { Routes, Route } from "react-router-dom";
// import CalendarView from "./../components/CalendarView";
import EmployeeProfile from "../components/intrahome/EmployeeProfile";
import CalendarView from "../pages/calendar/CalendarView";
const testData = {
  empNo: 1001,
  eName: "이주빈",
  eEmail: "hong@company.com",
  eMobile: "010-1234-5678",
  eAddress: "서울시 강남구",
  eAccount: "123-456-7890",
  eHiredate: "2020-01-01",
  eBirthday: "1990-05-20",
  eGender: "여",
  department: {
    deptName: "영업팀",
  },
  jobRank: {
    jobName: "과장",
  },
};
function Yongsung() {
  return <CalendarView />;
}

export default Yongsung;
