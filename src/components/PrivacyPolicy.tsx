import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="text-left text-sm text-foreground/80 leading-relaxed space-y-6 max-w-3xl mx-auto py-4 px-2">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-foreground mb-3">개인정보처리방침</h2>
      </div>

      <section>
        <p>
          Kello(이하 '회사'라 함)는 정보통신망 이용촉진 및 정보보호 등에 관한 법률, 개인정보보호법 등 관련 법령상의 개인정보보호 규정을 준수하며, 관련 법령에 의거한 개인정보처리방침을 정하여 이용자 권익 보호에 최선을 다하고 있습니다.
        </p>
      </section>

      <section>
        <h3 className="font-semibold text-base text-foreground mb-2">1. 수집하는 개인정보의 항목 및 수집 방법</h3>
        <p className="mb-2">회사는 회원가입, 원활한 고객상담, 서비스 예약 및 결제 등을 위해 아래와 같은 개인정보를 수집하고 있습니다.</p>
        <div className="space-y-2 pl-4">
          <p><strong>수집 항목:</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li>필수항목: 이름, 이메일 주소, 비밀번호, 휴대전화 번호</li>
            <li>서비스 이용 및 결제 시: 신용카드 정보, 은행 계좌 정보, 결제 기록, 예약 내역 (방문 일정, 이용 서비스 등)</li>
            <li>자동 수집 항목: 서비스 이용기록, 접속 로그, 쿠키, 접속 IP 정보, 기기 정보</li>
          </ul>
          <p className="mt-2"><strong>수집 방법:</strong> 홈페이지/앱(회원가입, 예약 진행), 고객센터 문의, 협력회사로부터의 제공 등</p>
        </div>
      </section>

      <section>
        <h3 className="font-semibold text-base text-foreground mb-2">2. 개인정보의 수집 및 이용 목적</h3>
        <p className="mb-2">회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다.</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>서비스 제공에 관한 계약 이행 및 요금 정산:</strong> 뷰티 및 관광 서비스 예약 관리, 콘텐츠 제공, 구매 및 요금 결제, 노쇼 보증금 및 취소 환불 처리</li>
          <li><strong>회원 관리:</strong> 회원제 서비스 이용에 따른 본인확인, 개인 식별, 불량회원의 부정 이용 방지와 비인가 사용 방지, 가입 의사 확인, 연령 확인, 불만 처리 등 민원 처리, 고지사항 전달</li>
          <li><strong>마케팅 및 광고에의 활용 (선택 시):</strong> 신규 서비스(제품) 개발 및 특화, 이벤트 등 광고성 정보 전달, 인구통계학적 특성에 따른 서비스 제공 및 광고 게재, 접속 빈도 파악 또는 회원의 서비스 이용에 대한 통계</li>
        </ul>
      </section>

      <section>
        <h3 className="font-semibold text-base text-foreground mb-2">3. 개인정보의 제3자 제공</h3>
        <p className="mb-2">회사는 고객의 예약 서비스 이행을 위해 필요한 최소한의 개인정보를 제휴 파트너 업체에 제공하고 있습니다.</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>제공받는 자:</strong> 예약을 진행한 Kello 파트너 업체 (뷰티샵, 관광 서비스 제공자 등)</li>
          <li><strong>제공 목적:</strong> 예약 상품에 대한 원활한 서비스 제공 및 본인 확인, 노쇼 방지 및 고객 응대</li>
          <li><strong>제공하는 항목:</strong> 예약자 이름, 연락처, 예약 일시, 선택한 서비스 내역</li>
          <li><strong>보유 및 이용기간:</strong> 서비스 제공 완료 후 6개월 보관 후 파기 (단, 관계 법령에 보존 근거가 있는 경우 해당 기간까지 보관)</li>
        </ul>
      </section>

      <section>
        <h3 className="font-semibold text-base text-foreground mb-2">4. 개인정보의 위탁</h3>
        <p className="mb-2">회사는 원활한 결제 및 서비스 제공을 위해 아래와 같이 개인정보 취급 업무를 외부 전문업체에 위탁하여 운영하고 있습니다.</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>결제대행사 (PG사):</strong> 페이팔 페이먼츠</li>
          <li><strong>알림톡/SMS 발송:</strong> kello앱 (예약 완료, 취소, 환불 등 안내 메시지 발송)</li>
        </ul>
      </section>

      <section>
        <h3 className="font-semibold text-base text-foreground mb-2">5. 개인정보의 보유 및 이용기간</h3>
        <p className="mb-2">원칙적으로, 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 관계법령의 규정에 의하여 보존할 필요가 있는 경우 회사는 아래와 같이 관계법령에서 정한 일정한 기간 동안 회원정보를 보관합니다.</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>계약 또는 청약철회 등에 관한 기록:</strong> 5년 (전자상거래 등에서의 소비자보호에 관한 법률)</li>
          <li><strong>대금 결제 및 재화 등의 공급에 관한 기록:</strong> 5년 (전자상거래 등에서의 소비자보호에 관한 법률)</li>
          <li><strong>소비자의 불만 또는 분쟁 처리에 관한 기록:</strong> 3년 (전자상거래 등에서의 소비자보호에 관한 법률)</li>
          <li><strong>웹사이트 방문 기록:</strong> 3개월 (통신비밀보호법)</li>
        </ul>
      </section>

      <section>
        <h3 className="font-semibold text-base text-foreground mb-2">6. 개인정보의 파기절차 및 방법</h3>
        <p className="mb-2">회사는 원칙적으로 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>파기절차:</strong> 이용자가 입력한 정보는 목적 달성 후 별도의 DB에 옮겨져(종이의 경우 별도의 서류함) 내부 방침 및 기타 관련 법령에 따라 일정 기간 저장된 후 파기됩니다.</li>
          <li><strong>파기방법:</strong> 전자적 파일 형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다. 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.</li>
        </ul>
      </section>

      <section>
        <h3 className="font-semibold text-base text-foreground mb-2">7. 정보주체의 권리와 그 행사방법</h3>
        <p>
          이용자는 언제든지 등록되어 있는 자신의 개인정보를 조회하거나 수정할 수 있으며 가입 해지를 요청할 수도 있습니다. 개인정보 조회/수정을 위해서는 '개인정보변경'(또는 '회원정보수정' 등)을, 가입해지(동의철회)를 위해서는 "회원탈퇴"를 클릭하여 본인 확인 절차를 거치신 후 직접 열람, 정정 또는 탈퇴가 가능합니다.
        </p>
      </section>

      <section>
        <h3 className="font-semibold text-base text-foreground mb-2">8. 개인정보 보호책임자</h3>
        <p className="mb-2">회사는 고객의 개인정보를 보호하고 개인정보와 관련한 불만을 처리하기 위하여 아래와 같이 관련 부서 및 개인정보 보호책임자를 지정하고 있습니다.</p>
        <div className="mt-4 text-sm bg-muted/40 p-5 rounded-xl border border-border/50 space-y-1">
          <p><strong>개인정보 보호책임자 성명:</strong> 김한수</p>
          <p><strong>전화번호:</strong> 010-8358-1199</p>
          <p><strong>이메일:</strong> hotsix6.kello@gmail.com</p>
          <p><strong>사업자번호:</strong> 162-48-01099</p>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
