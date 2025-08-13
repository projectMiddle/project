// src/libs/ckeditor/index.js
// 설명: 빌드 산출물(UMD/IIFE)을 사이드이펙트로 로드하고,
// window.ClassicEditor를 ESM default로 래핑해서 export.

// 1) ckeditor.js를 "실행"만 시키는 임포트 (default import 금지)
//    이 파일은 실행되면서 window.ClassicEditor를 등록합니다.
import './ckeditor.js';

// 2) 전역에 붙은 클래식을 가져와서 export default로 래핑
const ClassicEditor = window.ClassicEditor;

if (!ClassicEditor) {
  // 디버깅 로그
  // eslint-disable-next-line no-console
  throw new Error('CKEditor build not found on window.ClassicEditor');
}

export default ClassicEditor;
