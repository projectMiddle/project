package com.example.project.repository;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.project.entity.Employee;
import com.example.project.entity.constant.FAQCategory;
import com.example.project.entity.mainhome.MainFAQ;
import com.example.project.repository.mainhome.faq.MainFAQRepository;

@SpringBootTest
public class MainHomeRepositoryTest {

    @Autowired
    private MainFAQRepository mainFAQRepository;

    @Test
    public void createRequirementTest() {
        MainFAQ faq1 = MainFAQ.builder()
                .empNo(Employee.builder().empNo(1001L).build())
                .faqTitle("신입도 지원이 가능한가요?")
                .faqContent(
                        "신입 지원 여부는 채용 공고별로 다르게 적용됩니다. 일부 직무는 경력자 전형으로만 모집하지만, "
                                + "경력 무관 또는 신입 지원이 가능한 공고의 경우에는 관련 경력이 없어도 지원할 수 있습니다. "
                                + "특히 개발, 연구 직군 등에서는 전공 졸업자 또는 졸업 예정자를 대상으로 한 채용이 열리는 경우가 많으며, "
                                + "포트폴리오, 인턴 경험, 공모전 수상 경력 등이 합격 가능성을 높이는 요소가 될 수 있습니다. "
                                + "신입 지원자는 자신의 강점과 잠재력을 서류와 면접에서 충분히 어필하는 것이 중요합니다.")
                .faqCategory(FAQCategory.REQUIREMENT_Q)
                .build();

        MainFAQ faq2 = MainFAQ.builder()
                .empNo(Employee.builder().empNo(1001L).build())
                .faqTitle("외국인도 지원할 수 있나요?")
                .faqContent(
                        "국내에서 합법적으로 근무할 수 있는 비자를 보유한 외국인이라면 지원 가능합니다. "
                                + "다만 직무 특성에 따라 한국어 능력시험(TOPIK) 일정 수준 이상의 성적을 요구할 수 있으며, "
                                + "고객 응대가 필요한 직무는 원활한 한국어 구사 능력이 필수입니다. "
                                + "또한 일부 직무에서는 영어 또는 제3외국어 능력이 중요한 평가 요소가 될 수 있으니, "
                                + "공고에 명시된 요구 사항을 반드시 확인하시기 바랍니다. "
                                + "비자 발급과 유지 관리 책임은 지원자 본인에게 있으며, 채용 후에도 이를 유지해야 합니다.")
                .faqCategory(FAQCategory.REQUIREMENT_Q)
                .build();

        MainFAQ faq3 = MainFAQ.builder()
                .empNo(Employee.builder().empNo(1001L).build())
                .faqTitle("나이 제한이 있나요?")
                .faqContent(
                        "당사의 채용 절차에는 연령 제한이 없습니다. "
                                + "지원자의 연령보다는 직무 수행 역량, 경험, 조직 적합성이 중요한 평가 요소입니다. "
                                + "다만 일부 정부 지원 사업이나 청년 채용 프로그램을 통한 채용의 경우 연령 요건이 적용될 수 있으며, "
                                + "이 경우 채용 공고에 별도로 안내됩니다. "
                                + "나이가 많거나 적더라도 지원은 가능하며, 자신의 역량과 성과를 서류 및 면접 과정에서 충분히 보여주시면 됩니다.")
                .faqCategory(FAQCategory.REQUIREMENT_Q)
                .build();

        MainFAQ faq4 = MainFAQ.builder()
                .empNo(Employee.builder().empNo(1001L).build())
                .faqTitle("관련 자격증이 필수인가요?")
                .faqContent(
                        "모든 직무에서 자격증이 필수는 아니지만, 일부 전문 직무에서는 필수 요건으로 지정될 수 있습니다. "
                                + "예를 들어 전기·전자 분야에서는 전기기사, 산업안전 분야에서는 산업안전기사 자격증이 필수일 수 있습니다. "
                                + "그 외 자격증은 필수 요건이 아니더라도 서류 평가에서 가산점을 받을 수 있는 요소입니다. "
                                + "지원 직무와 관련성이 높은 자격증을 보유하고 있다면 이를 적극적으로 기재하는 것이 좋으며, "
                                + "취득 예정인 자격증이 있다면 시험 일정과 합격 여부를 함께 안내하면 긍정적인 평가를 받을 수 있습니다.")
                .faqCategory(FAQCategory.REQUIREMENT_Q)
                .build();

        MainFAQ faq5 = MainFAQ.builder()
                .empNo(Employee.builder().empNo(1001L).build())
                .faqTitle("경력 단절이 있어도 지원 가능한가요?")
                .faqContent(
                        "경력 단절이 있는 경우에도 지원이 가능합니다. "
                                + "다만 직무 수행에 필요한 최신 지식과 기술을 얼마나 유지하고 있는지가 중요한 평가 요소가 됩니다. "
                                + "경력 공백 기간 동안 학습이나 관련 활동을 이어갔다면 이를 서류와 면접에서 적극적으로 어필하는 것이 좋습니다. "
                                + "회사에서는 다양한 배경과 경험을 가진 인재를 환영하며, 재취업 교육 프로그램이나 멘토링 제도를 통해 "
                                + "조직 적응을 지원하고 있습니다.")
                .faqCategory(FAQCategory.REQUIREMENT_Q)
                .build();

        mainFAQRepository.saveAll(List.of(faq1, faq2, faq3, faq4, faq5));
    }

    @Test
    public void createUseHomeTest() {
        MainFAQ faq1 = MainFAQ.builder()
                .empNo(Employee.builder().empNo(1001L).build())
                .faqTitle("회원가입은 어떻게 하나요?")
                .faqContent(
                        "홈페이지 우측 상단의 '회원가입' 버튼을 클릭하시면 가입 페이지로 이동합니다. "
                                + "이름, 이메일 주소, 비밀번호 등 필수 정보를 입력하고, 이용 약관과 개인정보 처리방침에 동의하면 회원가입이 완료됩니다. "
                                + "가입 후 입력하신 이메일 주소로 인증 메일이 발송되며, 인증 절차를 완료해야 정상적으로 서비스를 이용할 수 있습니다.")
                .faqCategory(FAQCategory.USEHOMPAGE_Q)
                .build();

        MainFAQ faq2 = MainFAQ.builder()
                .empNo(Employee.builder().empNo(1001L).build())
                .faqTitle("비밀번호를 잊어버렸습니다. 어떻게 재설정하나요?")
                .faqContent(
                        "로그인 페이지에서 '비밀번호 찾기' 버튼을 클릭하시면 재설정 페이지로 이동합니다. "
                                + "가입 시 등록한 이메일 주소를 입력하면 비밀번호 재설정 링크가 이메일로 발송됩니다. "
                                + "해당 링크를 클릭하여 새 비밀번호를 입력하면 재설정이 완료됩니다.")
                .faqCategory(FAQCategory.USEHOMPAGE_Q)
                .build();

        MainFAQ faq3 = MainFAQ.builder()
                .empNo(Employee.builder().empNo(1001L).build())
                .faqTitle("회원정보 수정은 어디서 하나요?")
                .faqContent(
                        "로그인 후 우측 상단의 프로필 아이콘을 클릭하면 '내 정보' 메뉴가 나타납니다. "
                                + "해당 메뉴에서 이름, 비밀번호, 연락처, 주소 등의 개인정보를 수정할 수 있습니다. "
                                + "단, 이메일 주소와 같이 계정 식별에 사용되는 정보는 일부 변경이 제한될 수 있습니다.")
                .faqCategory(FAQCategory.USEHOMPAGE_Q)
                .build();

        MainFAQ faq4 = MainFAQ.builder()
                .empNo(Employee.builder().empNo(1001L).build())
                .faqTitle("게시글을 작성하려면 어떻게 해야 하나요?")
                .faqContent(
                        "로그인 후 상단 메뉴에서 원하는 게시판을 선택하고, 우측 상단의 '글쓰기' 버튼을 클릭합니다. "
                                + "제목과 본문 내용을 작성한 뒤, 필요하면 첨부파일을 추가할 수 있습니다. "
                                + "작성 완료 후 '등록' 버튼을 클릭하면 게시글이 등록됩니다.")
                .faqCategory(FAQCategory.USEHOMPAGE_Q)
                .build();

        MainFAQ faq5 = MainFAQ.builder()
                .empNo(Employee.builder().empNo(1001L).build())
                .faqTitle("모바일에서도 홈페이지를 이용할 수 있나요?")
                .faqContent(
                        "네, 당사 홈페이지는 모바일 환경에서도 최적화되어 있어 스마트폰이나 태블릿에서 접속하셔도 문제없이 이용 가능합니다. "
                                + "모바일 브라우저를 통해 접속하거나, 별도로 제공되는 모바일 앱을 설치하여 사용할 수도 있습니다.")
                .faqCategory(FAQCategory.USEHOMPAGE_Q)
                .build();

        MainFAQ faq6 = MainFAQ.builder()
                .empNo(Employee.builder().empNo(1001L).build())
                .faqTitle("홈페이지 알림 설정은 어떻게 하나요?")
                .faqContent(
                        "로그인 후 '내 정보' 메뉴에서 '알림 설정' 항목을 선택하면 이메일, 문자, 푸시 알림 수신 여부를 설정할 수 있습니다. "
                                + "관심 있는 게시판이나 서비스에 대한 알림만 선택적으로 받을 수도 있습니다.")
                .faqCategory(FAQCategory.USEHOMPAGE_Q)
                .build();

        MainFAQ faq7 = MainFAQ.builder()
                .empNo(Employee.builder().empNo(1001L).build())
                .faqTitle("홈페이지 오류나 불편사항은 어디에 신고하나요?")
                .faqContent(
                        "홈페이지 하단의 '고객센터' 메뉴에서 '문의하기'를 클릭하면 오류나 불편사항을 접수할 수 있는 양식이 제공됩니다. "
                                + "작성된 내용은 담당 부서에서 검토 후 최대한 빠른 시일 내에 답변드리며, 필요 시 이메일이나 전화로 추가 안내를 드립니다.")
                .faqCategory(FAQCategory.USEHOMPAGE_Q)
                .build();

        mainFAQRepository.saveAll(List.of(faq1, faq2, faq3, faq4, faq5, faq6, faq7));

    }

    @Test
    public void createFrequentTest() {
        // 긴 본문 (13개)
        MainFAQ faq1 = MainFAQ.builder()
                .empNo(Employee.builder().empNo(1001L).build())
                .faqTitle("배송 기간은 얼마나 걸리나요?")
                .faqContent(
                        "주문 결제 완료 후 평균 2~3일 내에 배송됩니다. 일부 도서 산간 지역은 5일 이상 소요될 수 있으며, 공휴일과 주말은 배송일에서 제외됩니다. 배송 상태는 마이페이지에서 실시간으로 확인 가능합니다.")
                .faqCategory(FAQCategory.FREQUNET_Q)
                .build();

        MainFAQ faq2 = MainFAQ.builder()
                .empNo(Employee.builder().empNo(1001L).build())
                .faqTitle("반품은 어떻게 하나요?")
                .faqContent(
                        "상품 수령일로부터 7일 이내에 반품 신청이 가능합니다. 단, 사용 흔적이나 훼손이 있는 경우 반품이 제한될 수 있습니다. 반품 신청 후 안내받은 주소로 상품을 보내주시면 확인 후 환불 절차가 진행됩니다.")
                .faqCategory(FAQCategory.FREQUNET_Q)
                .build();

        MainFAQ faq3 = MainFAQ.builder()
                .empNo(Employee.builder().empNo(1001L).build())
                .faqTitle("교환 신청은 어떻게 하나요?")
                .faqContent(
                        "제품 하자나 오배송 시 교환 신청이 가능하며, 동일 상품으로만 교환이 가능합니다. 교환 신청은 고객센터 또는 홈페이지 내 교환 신청 메뉴를 통해 접수할 수 있습니다.")
                .faqCategory(FAQCategory.FREQUNET_Q)
                .build();

        MainFAQ faq4 = MainFAQ.builder()
                .empNo(Employee.builder().empNo(1001L).build())
                .faqTitle("AS는 어떻게 받나요?")
                .faqContent(
                        "제품 보증 기간 내에 발생한 하자에 대해서는 무상 수리를 제공합니다. 보증 기간이 지난 경우 유상 수리가 가능하며, 자세한 절차는 고객센터를 통해 안내받을 수 있습니다.")
                .faqCategory(FAQCategory.FREQUNET_Q)
                .build();

        MainFAQ faq5 = MainFAQ.builder()
                .empNo(Employee.builder().empNo(1001L).build())
                .faqTitle("포인트 적립은 어떻게 되나요?")
                .faqContent("상품 구매 시 결제 금액의 1~3%가 포인트로 적립됩니다. 적립된 포인트는 다음 구매 시 현금처럼 사용 가능하며, 유효기간은 적립일로부터 1년입니다.")
                .faqCategory(FAQCategory.FREQUNET_Q)
                .build();

        MainFAQ faq6 = MainFAQ.builder()
                .empNo(Employee.builder().empNo(1001L).build())
                .faqTitle("쿠폰은 어떻게 사용하나요?")
                .faqContent(
                        "결제 페이지에서 보유 중인 쿠폰을 선택하여 사용할 수 있습니다. 일부 할인 쿠폰은 특정 상품이나 카테고리에만 적용 가능하니, 사용 조건을 꼭 확인하시기 바랍니다.")
                .faqCategory(FAQCategory.FREQUNET_Q)
                .build();

        MainFAQ faq7 = MainFAQ.builder()
                .empNo(Employee.builder().empNo(1001L).build())
                .faqTitle("회원 등급은 어떻게 산정되나요?")
                .faqContent("회원 등급은 최근 6개월간의 구매 금액과 횟수를 기준으로 산정됩니다. 등급이 올라가면 추가 할인, 포인트 적립률 증가 등 다양한 혜택을 받을 수 있습니다.")
                .faqCategory(FAQCategory.FREQUNET_Q)
                .build();

        MainFAQ faq8 = MainFAQ.builder()
                .empNo(Employee.builder().empNo(1001L).build())
                .faqTitle("비회원 구매가 가능한가요?")
                .faqContent("네, 비회원도 상품 구매가 가능합니다. 단, 비회원 주문의 경우 포인트 적립 및 일부 이벤트 참여가 제한될 수 있습니다.")
                .faqCategory(FAQCategory.FREQUNET_Q)
                .build();

        MainFAQ faq9 = MainFAQ.builder()
                .empNo(Employee.builder().empNo(1001L).build())
                .faqTitle("배송지를 변경하고 싶습니다.")
                .faqContent("배송 시작 전이라면 마이페이지에서 배송지 변경이 가능합니다. 이미 배송이 시작된 경우에는 고객센터를 통해 요청해야 하며, 변경이 불가능할 수도 있습니다.")
                .faqCategory(FAQCategory.FREQUNET_Q)
                .build();

        MainFAQ faq10 = MainFAQ.builder()
                .empNo(Employee.builder().empNo(1001L).build())
                .faqTitle("결제 수단에는 어떤 것이 있나요?")
                .faqContent("신용카드, 체크카드, 실시간 계좌이체, 무통장입금, 간편결제(카카오페이, 네이버페이 등)를 지원합니다. 결제 수단은 주문 시 선택할 수 있습니다.")
                .faqCategory(FAQCategory.FREQUNET_Q)
                .build();

        MainFAQ faq11 = MainFAQ.builder()
                .empNo(Employee.builder().empNo(1001L).build())
                .faqTitle("주문 내역은 어디서 확인하나요?")
                .faqContent("로그인 후 마이페이지에서 주문 내역을 확인할 수 있습니다. 주문 상세 페이지에서 배송 상태와 결제 정보를 함께 확인할 수 있습니다.")
                .faqCategory(FAQCategory.FREQUNET_Q)
                .build();

        MainFAQ faq12 = MainFAQ.builder()
                .empNo(Employee.builder().empNo(1001L).build())
                .faqTitle("이벤트 당첨 여부는 어떻게 확인하나요?")
                .faqContent("이벤트 당첨자는 개별 연락 또는 홈페이지 공지사항을 통해 안내됩니다. 당첨 안내 시 경품 발송을 위한 개인정보를 요청할 수 있습니다.")
                .faqCategory(FAQCategory.FREQUNET_Q)
                .build();

        MainFAQ faq13 = MainFAQ.builder()
                .empNo(Employee.builder().empNo(1001L).build())
                .faqTitle("회원 탈퇴는 어떻게 하나요?")
                .faqContent("로그인 후 마이페이지의 회원 탈퇴 메뉴에서 신청할 수 있습니다. 탈퇴 후에는 보유 포인트와 쿠폰이 모두 소멸되며, 재가입 시에도 복원되지 않습니다.")
                .faqCategory(FAQCategory.FREQUNET_Q)
                .build();

        // 짧은 본문 (10개)
        MainFAQ faq14 = MainFAQ.builder()
                .empNo(Employee.builder().empNo(1001L).build())
                .faqTitle("해외 배송이 가능한가요?")
                .faqContent("현재는 국내 배송만 가능합니다.")
                .faqCategory(FAQCategory.FREQUNET_Q)
                .build();

        MainFAQ faq15 = MainFAQ.builder()
                .empNo(Employee.builder().empNo(1001L).build())
                .faqTitle("현금 영수증 발급이 되나요?")
                .faqContent("네, 결제 시 현금영수증 발급이 가능합니다.")
                .faqCategory(FAQCategory.FREQUNET_Q)
                .build();

        MainFAQ faq16 = MainFAQ.builder()
                .empNo(Employee.builder().empNo(1001L).build())
                .faqTitle("상품 예약이 가능한가요?")
                .faqContent("일부 상품은 사전 예약 구매가 가능합니다.")
                .faqCategory(FAQCategory.FREQUNET_Q)
                .build();

        MainFAQ faq17 = MainFAQ.builder()
                .empNo(Employee.builder().empNo(1001L).build())
                .faqTitle("포인트로만 결제가 가능한가요?")
                .faqContent("네, 보유 포인트가 충분하다면 전액 결제가 가능합니다.")
                .faqCategory(FAQCategory.FREQUNET_Q)
                .build();

        MainFAQ faq18 = MainFAQ.builder()
                .empNo(Employee.builder().empNo(1001L).build())
                .faqTitle("배송비는 얼마인가요?")
                .faqContent("3만원 이상 구매 시 무료 배송입니다.")
                .faqCategory(FAQCategory.FREQUNET_Q)
                .build();

        MainFAQ faq19 = MainFAQ.builder()
                .empNo(Employee.builder().empNo(1001L).build())
                .faqTitle("쿠폰은 중복 사용이 가능한가요?")
                .faqContent("쿠폰은 한 번에 한 장만 사용할 수 있습니다.")
                .faqCategory(FAQCategory.FREQUNET_Q)
                .build();

        MainFAQ faq20 = MainFAQ.builder()
                .empNo(Employee.builder().empNo(1001L).build())
                .faqTitle("구매 영수증 발급이 가능한가요?")
                .faqContent("마이페이지에서 직접 출력이 가능합니다.")
                .faqCategory(FAQCategory.FREQUNET_Q)
                .build();

        MainFAQ faq21 = MainFAQ.builder()
                .empNo(Employee.builder().empNo(1001L).build())
                .faqTitle("결제 취소는 어떻게 하나요?")
                .faqContent("배송 전이라면 마이페이지에서 취소 가능합니다.")
                .faqCategory(FAQCategory.FREQUNET_Q)
                .build();

        MainFAQ faq22 = MainFAQ.builder()
                .empNo(Employee.builder().empNo(1001L).build())
                .faqTitle("포인트 유효기간은 얼마인가요?")
                .faqContent("적립일로부터 1년입니다.")
                .faqCategory(FAQCategory.FREQUNET_Q)
                .build();

        MainFAQ faq23 = MainFAQ.builder()
                .empNo(Employee.builder().empNo(1001L).build())
                .faqTitle("상품 재입고 알림은 어떻게 받나요?")
                .faqContent("상품 상세 페이지에서 재입고 알림 신청이 가능합니다.")
                .faqCategory(FAQCategory.FREQUNET_Q)
                .build();

        // 저장
        mainFAQRepository.saveAll(List.of(
                faq1, faq2, faq3, faq4, faq5, faq6, faq7, faq8, faq9, faq10,
                faq11, faq12, faq13, faq14, faq15, faq16, faq17, faq18, faq19, faq20,
                faq21, faq22, faq23));

    }

    @Test
    public void createInternTest() {
        MainFAQ faq1 = MainFAQ.builder()
                .empNo(Employee.builder().empNo(1001L).build())
                .faqTitle("인턴 지원 자격은 어떻게 되나요?")
                .faqContent(
                        "당사의 인턴십 프로그램은 대학 재학생, 졸업 예정자, 그리고 졸업 후 2년 이내의 미취업자를 대상으로 합니다. "
                                + "전공에 대한 제한은 없지만, 지원하는 직무와 관련된 전공이나 경력, 프로젝트 경험이 있다면 우대 평가를 받게 됩니다. "
                                + "특히 개발, 디자인, 마케팅 등 전문성을 요하는 직무의 경우, 해당 분야의 기초 지식과 실무 툴 활용 능력을 갖춘 지원자를 선호합니다. "
                                + "또한 학점, 어학 성적, 자격증 등의 스펙보다는 실질적인 업무 수행 능력과 문제 해결 능력을 중요하게 평가합니다. "
                                + "지원 시 자기소개서에는 학업, 프로젝트, 동아리, 인턴 경험 등에서 얻은 구체적인 성과와 역할을 반드시 기재하는 것이 좋습니다. "
                                + "외국어 능력은 필수 요건이 아니지만, 글로벌 프로젝트 참여 가능성을 고려하여 기본적인 의사소통이 가능한 지원자에게 가산점이 부여됩니다. "
                                + "이외에도 성실한 근무 태도, 빠른 학습 능력, 협업 마인드가 필수 자질로 평가됩니다.")
                .faqCategory(FAQCategory.INTERN_Q)
                .build();

        MainFAQ faq2 = MainFAQ.builder()
                .empNo(Employee.builder().empNo(1001L).build())
                .faqTitle("인턴십 기간과 근무 조건은 어떻게 되나요?")
                .faqContent(
                        "인턴십 기간은 일반적으로 3개월에서 6개월이며, 직무 특성과 프로젝트 일정에 따라 연장이 가능할 수 있습니다. "
                                + "근무 시간은 주 5일, 하루 8시간(09:00~18:00)이 원칙이며, 점심 시간 1시간이 포함됩니다. "
                                + "급여는 회사 내규에 따라 지급되며, 모든 인턴에게 식대와 교통비가 별도로 지원됩니다. "
                                + "또한, 인턴 기간 동안에도 정규직과 동일하게 사내 복지 혜택 일부를 이용할 수 있습니다. "
                                + "예를 들어 사내 도서관, 체력단련실, 사내 카페 할인, 무료 점심 제공 등의 혜택이 있습니다. "
                                + "근무지는 본사 또는 지정된 사업장으로 배치되며, 직무 성격에 따라 재택근무나 하이브리드 근무가 가능할 수 있습니다. "
                                + "인턴은 실무 투입을 원칙으로 하되, 직무 이해를 돕기 위한 교육 프로그램과 멘토링이 병행됩니다. "
                                + "교육에는 직무 전문 교육, 직장 예절, 협업 툴 사용법, 보고서 작성법 등이 포함됩니다.")
                .faqCategory(FAQCategory.INTERN_Q)
                .build();

        MainFAQ faq3 = MainFAQ.builder()
                .empNo(Employee.builder().empNo(1001L).build())
                .faqTitle("인턴십 후 정규직 전환이 가능한가요?")
                .faqContent(
                        "네, 인턴십 종료 후 정규직 전환의 기회가 주어집니다. "
                                + "전환 여부는 인턴 기간 동안의 업무 성과, 근무 태도, 조직 적응력, 협업 능력 등을 종합적으로 평가하여 결정됩니다. "
                                + "정규직 전환 비율은 매년 다르지만 평균적으로 50% 이상이며, 일부 직무에서는 80% 이상이 전환되기도 합니다. "
                                + "정규직 전환 심사 시에는 인턴 기간 동안 수행한 프로젝트 성과, 보고서 품질, 상사 및 동료의 피드백이 중요한 평가 요소가 됩니다. "
                                + "또한, 회사의 채용 계획과 해당 부서의 인원 수요에 따라 전환 인원이 조정될 수 있습니다. "
                                + "전환 심사에 합격하면 인턴 기간이 수습 기간으로 인정되며, 곧바로 정규직 계약이 체결됩니다. "
                                + "정규직 전환 후에는 연봉, 복지, 승진 기회 등 모든 조건이 기존 정규직 직원과 동일하게 적용됩니다. "
                                + "따라서 인턴 기간 동안 성실한 태도와 적극적인 업무 참여가 무엇보다 중요합니다.")
                .faqCategory(FAQCategory.INTERN_Q)
                .build();

        mainFAQRepository.saveAll(List.of(faq1, faq2, faq3));

    }

    @Test
    public void createAndSoTest() {
        MainFAQ faq1 = MainFAQ.builder()
                .empNo(Employee.builder().empNo(1001L).build())
                .faqTitle("회사 방문 시 주차가 가능한가요?")
                .faqContent(
                        "본사 및 지사 모두 방문객을 위한 주차 공간을 마련하고 있습니다. "
                                + "다만 주차 공간이 제한적이므로 방문 전 사전 예약을 권장합니다. "
                                + "방문 당일에는 경비실에서 차량 등록을 완료해야 하며, 장기 주차는 불가합니다.")
                .faqCategory(FAQCategory.ANDSO_Q)
                .build();

        MainFAQ faq2 = MainFAQ.builder()
                .empNo(Employee.builder().empNo(1001L).build())
                .faqTitle("분실물은 어디서 찾을 수 있나요?")
                .faqContent(
                        "회사 내에서 분실물을 습득한 경우, 1층 안내 데스크나 경비실로 전달됩니다. "
                                + "분실 시 해당 부서나 안내 데스크로 문의하시면 보관 여부를 확인할 수 있습니다. "
                                + "분실물은 최대 3개월간 보관 후 폐기 또는 기부 처리됩니다.")
                .faqCategory(FAQCategory.ANDSO_Q)
                .build();

        MainFAQ faq3 = MainFAQ.builder()
                .empNo(Employee.builder().empNo(1001L).build())
                .faqTitle("사내 식당 이용이 가능한가요?")
                .faqContent(
                        "사내 식당은 전 직원 및 인턴, 계약직 모두 이용 가능합니다. "
                                + "점심 식사는 무료로 제공되며, 저녁 식사는 일부 부서에 한해 지원됩니다. "
                                + "외부 방문객의 경우 부서장의 승인 후 이용이 가능합니다.")
                .faqCategory(FAQCategory.ANDSO_Q)
                .build();

        MainFAQ faq4 = MainFAQ.builder()
                .empNo(Employee.builder().empNo(1001L).build())
                .faqTitle("복장 규정이 있나요?")
                .faqContent(
                        "일반 사무직의 경우 정장 또는 비즈니스 캐주얼 복장을 권장합니다. "
                                + "현장 근무자의 경우 안전 규정에 따른 복장과 장비를 반드시 착용해야 합니다. "
                                + "금요일과 특정일에는 캐주얼 데이를 운영하여 자유 복장이 가능합니다.")
                .faqCategory(FAQCategory.ANDSO_Q)
                .build();

        MainFAQ faq5 = MainFAQ.builder()
                .empNo(Employee.builder().empNo(1001L).build())
                .faqTitle("사내 동호회 활동이 있나요?")
                .faqContent(
                        "사내에는 축구, 농구, 등산, 독서, 봉사 등 다양한 동호회가 운영되고 있습니다. "
                                + "동호회 활동비 일부는 회사에서 지원하며, 신규 동호회 개설도 가능합니다. "
                                + "동호회 가입은 사내 인트라넷을 통해 신청할 수 있습니다.")
                .faqCategory(FAQCategory.ANDSO_Q)
                .build();

        MainFAQ faq6 = MainFAQ.builder()
                .empNo(Employee.builder().empNo(1001L).build())
                .faqTitle("연말 송년회는 어떻게 진행되나요?")
                .faqContent(
                        "매년 12월 중순에 전 직원이 참여하는 송년회를 개최합니다. "
                                + "우수 사원 시상식, 공연, 경품 추첨 등의 프로그램이 진행되며, 식사와 다과가 제공됩니다. "
                                + "행사 일정과 장소는 사내 공지를 통해 사전 안내됩니다.")
                .faqCategory(FAQCategory.ANDSO_Q)
                .build();

        MainFAQ faq7 = MainFAQ.builder()
                .empNo(Employee.builder().empNo(1001L).build())
                .faqTitle("재택근무 제도가 있나요?")
                .faqContent(
                        "일부 부서와 직무에 한해 재택근무가 허용됩니다. "
                                + "재택근무 신청은 팀장 승인 후 가능하며, 주 2회 이내로 제한됩니다. "
                                + "업무 효율성과 보안 유지를 위해 사내 VPN 접속과 화상 회의 시스템을 반드시 사용해야 합니다.")
                .faqCategory(FAQCategory.ANDSO_Q)
                .build();

        mainFAQRepository.saveAll(List.of(faq1, faq2, faq3, faq4, faq5, faq6, faq7));

    }

}
