import api from "./axios";
import axios from "axios";
import fileDownload from "js-file-download";

export const API_SERVER_HOST = "/intrasoltech/note";
// 쪽지 전송
export const sendNote = async (formData, empNo) => {
  return await api.post(`${API_SERVER_HOST}/send?senderEmpNo=${empNo}`, formData);
};

// 수신 목록
export const getReceivedNotes = async (empNo) => {
  const res = await api.get(`${API_SERVER_HOST}/receiveList`, {
    params: { receiveEmpNo: empNo },
  });
  return res.data;
};
// 송신 목록
export const getSendNotes = async (empNo) => {
  const res = await api.get(`${API_SERVER_HOST}/sendList`, {
    params: { senderEmpNo: empNo },
  });
  return res.data;
};

//  수신 상세
export const getNoteReceiveDetail = async (noteReceiveNo) => {
  const res = await api.get(`${API_SERVER_HOST}/receiveDetail/${noteReceiveNo}`);
  return res.data;
};

// 송신 상세
export const getNoteSendDetail = async (noteSendNo) => {
  const res = await api.get(`${API_SERVER_HOST}/sendDetail/${noteSendNo}`);
  return res.data;
};

// 읽음 처리
export const markNoteAsRead = async (noteReceiveNo, empNo) => {
  await api.post(`${API_SERVER_HOST}/read/${noteReceiveNo}`, null, {
    params: { empNo },
  });
};

// 휴지통 목록
export const getTrashNotes = async (empNo) => {
  const res = await api.get(`${API_SERVER_HOST}/trashList`, {
    params: { empNo },
  });
  return res.data;
};

// 논리 삭제
export const trashReceiveNote = async (noteReceiveNo) => {
  await api.post(`${API_SERVER_HOST}/receive/trash/${noteReceiveNo}`);
};

export const trashSendNote = async (noteSendNo) => {
  await api.post(`${API_SERVER_HOST}/send/trash/${noteSendNo}`);
};

// 물리 삭제
export const deleteReceivedNote = async (noteReceiveNo) => {
  await api.delete(`${API_SERVER_HOST}/delete/receive`, {
    data: [noteReceiveNo],
  });
};

export const deleteSendNote = async (noteSendNo) => {
  await api.delete(`${API_SERVER_HOST}/delete/send`, {
    data: [noteSendNo],
  });
};

// 복구
export const recoverSendNote = async (noteSendNo) => {
  await api.post(`${API_SERVER_HOST}/recover/send/${noteSendNo}`);
};

export const recoverReceiveNote = async (noteReceiveNo) => {
  await api.post(`${API_SERVER_HOST}/recover/receive/${noteReceiveNo}`);
};

// 다운로드 URL 생성 함수
export const getNoteDownloadUrl = (type, noteNo, filePath, fileUuid, fileName) => {
  const encodedPath = encodeURIComponent(filePath.replace(/\\/g, "/"));
  const encodedFileName = encodeURIComponent(`${fileUuid}_${fileName}`);
  return `${API_SERVER_HOST}/file/download?type=${type}&noteNo=${noteNo}&fileName=${encodedFileName}&noteFilePath=${encodedPath}`;
};
// 파일 다운로드 실행 함수
export const downloadNoteFile = async (type, noteNo, file, onError) => {
  try {
    const url = getNoteDownloadUrl(type, noteNo, file.noteFilePath, file.noteFileUuid, file.noteFileName);
    const res = await api.get(url, { responseType: "blob" });
    fileDownload(res.data, file.noteFileName); // js-file-download 사용
  } catch (err) {
    console.error("❌ 파일 다운로드 실패", err);
    if (onError) onError(err);
  }
};
