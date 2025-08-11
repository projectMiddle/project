function Report() {
  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      {/* rCode 는 보고서 번호임(본인 보고서 번호) */}
      <div className="w-full px-4 py-12 max-w-6xl">
        <iframe
          // ref={iframeRef}
          src="http://localhost:8080/report?rCode=REPEEFA9F84AA74437EA939758EC7F7D67B"
          className="w-full h-200"
        />
      </div>
    </div>
  );
}
export default Report;
