import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPayDetail } from "../../api/emppayApi";
import { Page, Text, View, Document, StyleSheet, Font, PDFDownloadLink } from "@react-pdf/renderer";
import notoSansKR from "../../assets/fonts/NotoSansKR-Regular.ttf";

Font.register({
  family: "NotoSansKR",
  src: notoSansKR,
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "NotoSansKR",
    fontSize: 12,
    padding: 30,
    backgroundColor: "#fff",
    color: "#000",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    color: "#6b21a8",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  infoBox: {
    padding: 10,
    border: "1 solid #ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  label: {
    fontWeight: "bold",
  },
  tableHeader: {
    backgroundColor: "#ede9fe",
    fontWeight: "bold",
    padding: 4,
    borderTop: "1 solid #ccc",
    borderBottom: "1 solid #ccc",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 4,
    borderBottom: "1 solid #eee",
  },
  netSalaryBox: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f3f4f6",
    borderTop: "1 solid #ccc",
    alignItems: "flex-end",
  },
  netSalaryText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6b21a8",
  },
});

const TableRow = ({ label, value }) => (
  <View style={styles.tableRow}>
    <Text>{label}</Text>
    <Text>{Number(value).toLocaleString("ko-KR")} 원</Text>
  </View>
);

const PaySlipPDF = ({ pay }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>{pay.payMonth} 급여명세서</Text>

      <View style={styles.infoBox}>
        <View style={styles.row}>
          <Text>성명: {pay.eName}</Text>
          <Text>사번: {pay.empNo}</Text>
        </View>
        <View style={styles.row}>
          <Text>부서: {pay.departmentName}</Text>
          <Text>직급: {pay.jobName}</Text>
        </View>
        <View style={styles.row}>
          <Text>계좌번호: {pay.accountNumber}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.tableHeader}>지급 항목</Text>
        <TableRow label="기본급" value={pay.payBaseSalary} />
        <TableRow label="상여금" value={pay.payBonusWage} />
        <TableRow label="직책수당" value={pay.payPositionWage} />
        <TableRow label="복리후생비" value={pay.payBenefits} />
        <TableRow label="지급합계" value={pay.payTotalSalary} />
      </View>

      <View style={styles.section}>
        <Text style={styles.tableHeader}>공제 항목</Text>
        <TableRow label="소득세" value={pay.payIncomeTax} />
        <TableRow label="지방세" value={pay.payResidentTax} />
        <TableRow label="건강보험" value={pay.payHealthInsurance} />
        <TableRow label="국민연금" value={pay.payNationalPension} />
        <TableRow label="고용보험" value={pay.payEmpInsurance} />
        <TableRow label="장기요양보험" value={pay.payLongtermCare} />
        <TableRow label="공제합계" value={pay.payTotalDeduction} />
      </View>

      <View style={styles.netSalaryBox}>
        <Text style={styles.netSalaryText}>실지급액: {Number(pay.payNetSalary).toLocaleString("ko-KR")} 원</Text>
      </View>
    </Page>
  </Document>
);

export default function PayPDFViewer() {
  const { id } = useParams();
  const [pay, setPay] = useState(null);

  useEffect(() => {
    getPayDetail(id).then((res) => setPay(res.data));
  }, [id]);

  if (!pay) return <div>로딩 중...</div>;

  return (
    <div style={{ padding: "20px", textAlign: "right" }}>
      <PDFDownloadLink
        document={<PaySlipPDF pay={pay} />}
        fileName={`${pay.eName}_${pay.payMonth}_급여명세서.pdf`}
        style={{
          padding: "10px 20px",
          backgroundColor: "#6b21a8",
          color: "white",
          textDecoration: "none",
          borderRadius: "8px",
          fontWeight: "bold",
        }}
      >
        PDF 다운로드
      </PDFDownloadLink>
    </div>
  );
}
