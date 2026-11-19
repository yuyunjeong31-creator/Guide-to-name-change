export type ReasonId = 'rename' | 'ssn' | 'contractor-transfer';
export type SubReasonId = 'death' | 'marriage-divorce';

export type DistrictKey =
  | '강동구'
  | '노원구'
  | '동대문구'
  | '은평구'
  | '강남구'
  | '그 외 지역';

export interface DocumentItem {
  id: string;
  name: string;
  quantity?: string;
  badge?: string;
}

export interface DocumentGroup {
  id: string;
  title: string;
  items: DocumentItem[];
}

export interface SubReasonGuide {
  id: SubReasonId;
  label: string;
  topMessage: string;
  subNotice?: string;
  footerNotice?: string;
  groups: DocumentGroup[];
  hasCenterContact: boolean;
  calmTone: boolean;
}

export interface ReasonGuide {
  id: ReasonId;
  rowTitle: string;
  panelTitle?: string;
  topMessage: string;
  subNotice?: string;
  footerNotice?: string;
  groups?: DocumentGroup[];
  subReasons?: SubReasonGuide[];
  hasCenterContact: boolean;
  calmTone: boolean;
}

export interface CenterInfo {
  district: Exclude<DistrictKey, '그 외 지역'>;
  name: string;
  phone: string;
  address: string;
  mapQuery: string;
}

export const HEADER_TEXT = {
  title: '바뀐 내 정보, SH에도 알려주세요!',
  subtitle: '해당하는 상황을 눌러 구비서류를 확인하세요',
  notice:
    '주민센터에 신고해도 SH 계약정보는 자동으로 바뀌지 않을 수 있습니다. SH에도 알려 주세요.',
} as const;

/**
 * 개명과 주민등록번호 변경이 공유하는 구비서류 상수
 */
export const RENAME_SSN_DOCS: readonly DocumentItem[] = [
  { id: 'basic-cert', name: '기본증명서', quantity: '1부' },
  { id: 'resident-abstract', name: '주민등록초본', quantity: '1부' },
  { id: 'seal-cert', name: '인감증명서', quantity: '1부' },
  { id: 'lease-contract', name: '임대차계약서', quantity: '원본' },
  { id: 'id-and-seal', name: '신분증 및 인감도장', quantity: '지참' },
];

export const REASONS_DATA: readonly ReasonGuide[] = [
  {
    id: 'rename',
    rowTitle: '이름을 개명했어요',
    panelTitle: '개명으로 인한 명의변경 구비서류',
    topMessage: '아래 서류를 준비해 SH에 제출해 주세요.',
    footerNotice: '제출 방법은 방문 전 담당 센터에 문의해 주세요',
    groups: [
      {
        id: 'rename-docs',
        title: '구비서류',
        items: [...RENAME_SSN_DOCS],
      },
    ],
    hasCenterContact: false,
    calmTone: false,
  },
  {
    id: 'ssn',
    rowTitle: '주민등록번호가 변경됐어요',
    panelTitle: '주민등록번호 변경으로 인한 명의변경 구비서류',
    topMessage: '아래 서류를 준비해 SH에 제출해 주세요.',
    footerNotice: '제출 방법은 방문 전 담당 센터에 문의해 주세요',
    groups: [
      {
        id: 'ssn-docs',
        title: '구비서류',
        items: [...RENAME_SSN_DOCS],
      },
    ],
    hasCenterContact: false,
    calmTone: false,
  },
  {
    id: 'contractor-transfer',
    rowTitle: '계약자 명의를 변경하고 싶어요',
    topMessage: '해당하는 변경 사유를 선택해 주세요.',
    subNotice: '사유에 따라 필요한 구비서류와 안내 사항을 확인하실 수 있습니다.',
    hasCenterContact: false,
    calmTone: true,
    subReasons: [
      {
        id: 'death',
        label: '사망',
        topMessage:
          '상심이 크시겠습니다. 담당자가 절차를 하나씩 안내해 드립니다.',
        subNotice:
          '임차인(사망자) 서류는 사망처리가 완료되어 정리된 후 발급받으세요.',
        footerNotice: '제출 방법은 방문 전 담당 센터에 문의해 주세요',
        groups: [
          {
            id: 'death-group-a',
            title: '그룹A. 임차인(사망자) 서류 (각 1통)',
            items: [
              { id: 'd-a-1', name: '기본증명서(상세)' },
              { id: 'd-a-2', name: '제적등본(폐쇄포함)' },
              { id: 'd-a-3', name: '혼인관계증명서(상세)' },
              { id: 'd-a-4', name: '가족관계증명서(상세)' },
              { id: 'd-a-5', name: '입양관계증명서(상세)' },
              { id: 'd-a-6', name: '친양자입양관계증명서(상세)' },
              { id: 'd-a-7', name: '[임대주택]임대차계약서' },
            ],
          },
          {
            id: 'death-group-b',
            title: '그룹B. 상속인(신청인) 서류',
            items: [
              { id: 'd-b-1', name: '주민등록등본(세대주 변경)' },
              { id: 'd-b-2', name: '주민등록초본(주소이전내역포함)' },
              { id: 'd-b-3', name: '신분증' },
              {
                id: 'd-b-4',
                name: '인감증명서(본인발급분) 또는 본인서명사실확인서(해당용도발급분)',
              },
              {
                id: 'd-b-5',
                name: '인감도장 또는 서명(인감증명서에 날인된 도장 및 본인서명사실확인서의 서명은 신청서에 날인된 것과 일치해야 함)',
              },
              { id: 'd-b-6', name: '가족관계증명서(상세)' },
              {
                id: 'd-b-7',
                name: '입주자격증명서(해당세대만 – 수급자, 한부모 등)',
                badge: '해당되는 경우만',
              },
            ],
          },
          {
            id: 'death-group-c',
            title: '그룹C. 상속인(동의인) 서류',
            items: [
              {
                id: 'd-c-1',
                name: '인감증명서(본인발급분) 또는 본인서명사실확인서(해당용도발급분)',
              },
              {
                id: 'd-c-2',
                name: '인감도장 또는 서명(인감증명서에 날인된 도장 및 본인서명사실확인서의 서명은 신청서에 날인된 것과 일치해야 함)',
              },
            ],
          },
        ],
        hasCenterContact: true,
        calmTone: true,
      },
      {
        id: 'marriage-divorce',
        label: '혼인·이혼',
        topMessage:
          '명의변경은 상황에 따라 필요한 절차가 달라, 담당자가 직접 안내해 드립니다.',
        subNotice:
          'SH 「이혼(혼인)으로 인한 임차권 양도 등 승인 신청서」의 첨부서류 기준입니다.',
        footerNotice: '제출 방법은 방문 전 담당 센터에 문의해 주세요',
        groups: [
          {
            id: 'md-group-a',
            title: '그룹A. 임차인 서류 (각 1통, 1개월 이내 발급분)',
            items: [
              { id: 'dv-a-1', name: '혼인관계증명서' },
              { id: 'dv-a-2', name: '가족관계증명서(상세)' },
              { id: 'dv-a-3', name: '주민등록초본(임대주택이외 지역으로 전출)' },
            ],
          },
          {
            id: 'md-group-b',
            title: '그룹B. 승계인 서류 (각 1통)',
            items: [
              { id: 'dv-b-1', name: '주민등록등본(세대주변경)' },
              { id: 'dv-b-2', name: '가족관계증명서(상세)' },
              { id: 'dv-b-3', name: '주민등록초본(최근 5년이내 주소변동사항 포함)' },
            ],
          },
          {
            id: 'md-group-c',
            title: '그룹C. 공통 서류',
            items: [
              { id: 'dv-c-1', name: '임차권 등 양도각서(공증)' },
              {
                id: 'dv-c-2',
                name: '임차인 및 승계인 인감증명서 각 1통(1개월이내 본인 발급분)',
              },
              { id: 'dv-c-3', name: '임대차계약서 1통(분실시 분실신고서)' },
              { id: 'dv-c-4', name: '임대료 및 관리비 최종월 납부영수증' },
              { id: 'dv-c-5', name: '신분증 및 인감도장' },
              {
                id: 'dv-c-6',
                name: '수급자 또는 한부모증명서 등(입주자격요건 갖추어야 하는 주택)',
                badge: '해당 주택만',
              },
            ],
          },
        ],
        hasCenterContact: true,
        calmTone: true,
      },
    ],
  },
];

export const DISTRICT_OPTIONS: readonly DistrictKey[] = [
  '강동구',
  '노원구',
  '동대문구',
  '은평구',
  '강남구',
  '그 외 지역',
];

export const CENTERS_DATA: Record<
  Exclude<DistrictKey, '그 외 지역'>,
  CenterInfo
> = {
  강동구: {
    district: '강동구',
    name: '강동주거안심종합센터',
    phone: '02-6946-3600',
    address: '강동구 상일로6길 51 (상일동, 다올빌딩) 5층',
    mapQuery: '강동구 상일로6길 51',
  },
  노원구: {
    district: '노원구',
    name: '노원주거안심종합센터',
    phone: '02-3399-0000',
    address: '노원구 덕릉로 688 우리빌딩(기업은행 상계역지점) 4층',
    mapQuery: '노원구 덕릉로 688',
  },
  동대문구: {
    district: '동대문구',
    name: '동대문주거안심종합센터',
    phone: '02-6496-5400',
    address: '동대문구 왕산로 10 한성빌딩 5~6층',
    mapQuery: '동대문구 왕산로 10',
  },
  은평구: {
    district: '은평구',
    name: '은평주거안심종합센터',
    phone: '02-6910-9400',
    address: '은평구 진관2로 15-34 3층',
    mapQuery: '은평구 진관2로 15-34',
  },
  강남구: {
    district: '강남구',
    name: '강남주거안심종합센터',
    phone: '02-2086-9800',
    address: '강남구 선릉로 615 썬라이더빌딩 4층',
    mapQuery: '강남구 선릉로 615',
  },
};

export const SH_MAIN_PHONE = '1600-3456';
export const CENTER_HOURS_NOTICE = '방문 전 전화로 운영시간을 확인해 주세요.';
