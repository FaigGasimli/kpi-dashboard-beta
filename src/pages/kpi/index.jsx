"use client";

import { useState } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import styles from "./kpi.module.css";
import KPICreationModal from "./kpimodal";
import EmployeeKPIProfile from "./EmployeeKPIProfile";
import Header from "../../components/header";

// Mock data
const summaryData = {
  totalKPIs: 156,
  activeKPIs: 142,
  slaOverdue: 8,
  avgExecution: 87.5,
  targetAverage: 85.0,
  deviation: 2.5,
  riskiestModule: "AML",
  bestBranch: "Yeni Filial",
};

const trendData = [
  { month: "Yan", fakt: 82, target: 85 },
  { month: "Fev", fakt: 85, target: 85 },
  { month: "Mar", fakt: 88, target: 85 },
  { month: "Apr", fakt: 84, target: 85 },
  { month: "May", fakt: 90, target: 85 },
  { month: "İyn", fakt: 87, target: 85 },
  { month: "İyl", fakt: 89, target: 85 },
  { month: "Avq", fakt: 91, target: 85 },
  { month: "Sen", fakt: 86, target: 85 },
  { month: "Okt", fakt: 88, target: 85 },
  { month: "Noy", fakt: 92, target: 85 },
  { month: "Dek", fakt: 87, target: 85 },
];

const moduleData = [
  { name: "Cərimə və Eskalasiya", value: 35, color: "#0088FE" },
  { name: "Monitorinq və Hesabatlılıq", value: 28, color: "#00C49F" },
  { name: "AML/ƏL/TMM", value: 22, color: "#FFBB28" },
  { name: "Audit və Uyğunsuzluqlar", value: 15, color: "#FF8042" },
];

const criticalKPIs = [
  {
    code: "CE-001",
    name: "Müştəri məmnuniyyəti",
    execution: 78,
    target: 85,
    responsible: "A.Məmmədov",
  },
  {
    code: "AML-003",
    name: "Şübhəli əməliyyat aşkarlanması",
    execution: 72,
    target: 80,
    responsible: "N.Həsənova",
  },
  {
    code: "MH-007",
    name: "Kredit portfelinin keyfiyyəti",
    execution: 81,
    target: 88,
    responsible: "R.Əliyev",
  },
  {
    code: "AU-002",
    name: "Nəzarət departamenti tapıntıları",
    execution: 75,
    target: 82,
    responsible: "S.Quliyeva",
  },
  {
    code: "CE-012",
    name: "Rəqəmsal kanallar istifadəsi",
    execution: 79,
    target: 85,
    responsible: "E.Babayev",
  },
];

const topKPIs = [
  {
    code: "MH-001",
    name: "Kapital adekvatlığı",
    execution: 98,
    target: 90,
    weight: 15,
  },
  {
    code: "CE-005",
    name: "Onlayn xidmət keyfiyyəti",
    execution: 96,
    target: 88,
    weight: 12,
  },
  {
    code: "AU-001",
    name: "Risk idarəetməsi",
    execution: 94,
    target: 85,
    weight: 18,
  },
  {
    code: "AML-001",
    name: "Compliance səviyyəsi",
    execution: 93,
    target: 87,
    weight: 20,
  },
  {
    code: "CE-008",
    name: "Müştəri bazası artımı",
    execution: 91,
    target: 82,
    weight: 10,
  },
];

const leaderboard = [
  { name: "A.Məmmədov", delays: 2, department: "Müştəri Xidmətləri" },
  { name: "N.Həsənova", delays: 3, department: "AML Şöbəsi" },
  { name: "R.Əliyev", delays: 1, department: "Maliyyə Həkimiyyəti" },
  { name: "S.Quliyeva", delays: 4, department: "Nəzarət departamenti" },
  { name: "E.Babayev", delays: 2, department: "IT Şöbəsi" },
];

const heatmapData = [
  { branch: "Yeni Filial", jan: 92, feb: 88, mar: 95, apr: 87, may: 91 },
  { branch: "Filial 2", jan: 85, feb: 82, mar: 88, apr: 84, may: 86 },
  { branch: "Filial 3", jan: 78, feb: 81, mar: 79, apr: 83, may: 80 },
  { branch: "Filial 4", jan: 89, feb: 91, mar: 87, apr: 90, may: 88 },
  { branch: "Filial 5", jan: 83, feb: 85, mar: 82, apr: 86, may: 84 },
];

const branchesData = [
  {
    name: "Yeni Filial",
    departments: 3,
    divisions: 3,
    employees: 16,
    performance: 77,
    color: "#92400e",
  },
  {
    name: "Filial 1",
    departments: 3,
    divisions: 3,
    employees: 16,
    performance: 64,
    color: "#92400e",
  },
  {
    name: "Filial 2",
    departments: 3,
    divisions: 3,
    employees: 16,
    performance: 96,
    color: "#92400e",
  },
  {
    name: "Filial 3",
    departments: 3,
    divisions: 3,
    employees: 16,
    performance: 49,
    color: "#92400e",
  },
];

const departmentsData = {
  "Yeni Filial": [
    {
      name: "Komplayens Departamenti",
      divisions: 3,
      employees: 8,
      performance: 85,
    },
    {
      name: "Risklərin idarə edilməsi",
      divisions: 2,
      employees: 5,
      performance: 78,
    },
    {
      name: "Nəzarət departamenti",
      divisions: 1,
      employees: 3,
      performance: 92,
    },
  ],
  "Filial 1": [
    { name: "Müştəri Xidmətləri", divisions: 2, employees: 6, performance: 72 },
    {
      name: "Maliyyə Departamenti",
      divisions: 2,
      employees: 7,
      performance: 68,
    },
    { name: "IT Departamenti", divisions: 1, employees: 3, performance: 88 },
  ],
  "Filial 2": [
    { name: "Satış Departamenti", divisions: 3, employees: 9, performance: 94 },
    { name: "Marketing", divisions: 1, employees: 4, performance: 96 },
    { name: "HR Departamenti", divisions: 1, employees: 3, performance: 89 },
  ],
  "Filial 3": [
    {
      name: "Əməliyyat Departamenti",
      divisions: 2,
      employees: 8,
      performance: 52,
    },
    { name: "Texniki Dəstək", divisions: 1, employees: 5, performance: 45 },
    { name: "Təhlükəsizlik", divisions: 1, employees: 3, performance: 58 },
  ],
};

const divisionsData = {
  "Komplayens Departamenti": [
    { name: "ƏL/TMM Şöbəsi", employees: 3, performance: 88 },
    { name: "MEŞ / Hesabatlıq şöbəsi", employees: 3, performance: 82 },
    { name: "Komplayens Monitorinq Şöbəsi", employees: 2, performance: 85 },
  ],
  "Risklərin idarə edilməsi": [
    { name: "Kredit Risk Şöbəsi", employees: 3, performance: 75 },
    { name: "Əməliyyat Risk Şöbəsi", employees: 2, performance: 81 },
  ],
  "Nəzarət departamenti": [
    { name: "Audit Şöbəsi", employees: 3, performance: 92 },
  ],
  "Müştəri Xidmətləri": [
    { name: "Müştəri Dəstəyi", employees: 3, performance: 70 },
    { name: "Şikayət İdarəetməsi", employees: 3, performance: 74 },
  ],
  "Maliyyə Departamenti": [
    { name: "Maliyyə Planlaşdırması", employees: 4, performance: 65 },
    { name: "Uçot Şöbəsi", employees: 3, performance: 71 },
  ],
  "IT Departamenti": [
    { name: "Sistem İdarəetməsi", employees: 3, performance: 88 },
  ],
  "Satış Departamenti": [
    { name: "Korporativ Satış", employees: 4, performance: 95 },
    { name: "Fərdi Satış", employees: 3, performance: 93 },
    { name: "Onlayn Satış", employees: 2, performance: 94 },
  ],
  Marketing: [{ name: "Rəqəmsal Marketing", employees: 4, performance: 96 }],
  "HR Departamenti": [
    { name: "İnsan Resursları", employees: 3, performance: 89 },
  ],
  "Əməliyyat Departamenti": [
    { name: "Gündəlik Əməliyyatlar", employees: 5, performance: 50 },
    { name: "Proses İdarəetməsi", employees: 3, performance: 54 },
  ],
  "Texniki Dəstək": [{ name: "Texniki Yardım", employees: 5, performance: 45 }],
  Təhlükəsizlik: [
    { name: "Fiziki Təhlükəsizlik", employees: 3, performance: 58 },
  ],
};

const TrendingUpIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="22,7 13.5,15.5 8.5,10.5 2,17"></polyline>
    <polyline points="16,7 22,7 22,13"></polyline>
  </svg>
);

const AlertTriangleIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
    <path d="M12 9v4"></path>
    <path d="m12 17 .01 0"></path>
  </svg>
);

const TrophyIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
    <path d="M4 22h16"></path>
    <path d="M10 14.66V17c0 .55.47.98.97 1.21C12.04 18.75 14 20 14 20s1.96-1.25 3.03-1.79c.5-.23.97-.66.97-.21v-2.34"></path>
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
  </svg>
);

const UsersIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="m22 21-2-2"></path>
    <path d="M16 11l2 2 4-4"></path>
  </svg>
);

const TargetIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <circle cx="12" cy="12" r="6"></circle>
    <circle cx="12" cy="12" r="2"></circle>
  </svg>
);

const BuildingIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect width="16" height="20" x="4" y="2" rx="2" ry="2"></rect>
    <path d="M9 22v-4h6v4"></path>
    <path d="M8 6h.01"></path>
    <path d="M16 6h.01"></path>
    <path d="M12 6h.01"></path>
    <path d="M12 10h.01"></path>
    <path d="M12 14h.01"></path>
    <path d="M16 10h.01"></path>
    <path d="M16 14h.01"></path>
    <path d="M8 10h.01"></path>
    <path d="M8 14h.01"></path>
  </svg>
);

const FilterIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"></polygon>
  </svg>
);

const SearchIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <path d="m21 21-4.35-4.35"></path>
  </svg>
);

const DownloadIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7,10 12,15 17,10"></polyline>
    <line x1="12" x2="12" y1="15" y2="3"></line>
  </svg>
);

const organizationalStructure = {
  name: "Yeni Filial",
  type: "branch",
  children: [
    {
      name: "İdarə Heyyəti",
      type: "management",
      children: [
        {
          name: "Komplayens Departamenti",
          type: "department",
          children: [
            {
              name: "ƏL/TMM Şöbəsi",
              type: "division",
              children: [
                {
                  name: "Şöbə Rəisi",
                  type: "head",
                  canAssign: true,
                  canControl: ["chief", "leading", "intern"],
                },
                {
                  name: "Baş Mütəxəssis",
                  type: "chief",
                  canAssign: true,
                  canControl: ["leading", "intern"],
                },
                {
                  name: "Aparıcı Mütəxəssis",
                  type: "leading",
                  canAssign: true,
                  canControl: ["intern"],
                },
                {
                  name: "Təcrübəçi",
                  type: "intern",
                  canAssign: false,
                  canControl: [],
                },
              ],
            },
            {
              name: "MEŞ / Hesabatlıq şöbəsi",
              type: "division",
              children: [
                {
                  name: "Şöbə Rəisi",
                  type: "head",
                  canAssign: true,
                  canControl: ["chief", "leading", "intern"],
                },
                {
                  name: "Baş Mütəxəssis",
                  type: "chief",
                  canAssign: true,
                  canControl: ["leading", "intern"],
                },
                {
                  name: "Aparıcı Mütəxəssis",
                  type: "leading",
                  canAssign: true,
                  canControl: ["intern"],
                },
                {
                  name: "Təcrübəçi",
                  type: "intern",
                  canAssign: false,
                  canControl: [],
                },
              ],
            },
            {
              name: "Komplayens Monitorinq Şöbəsi",
              type: "division",
              children: [
                {
                  name: "Şöbə Rəisi",
                  type: "head",
                  canAssign: true,
                  canControl: ["chief", "leading", "intern"],
                },
                {
                  name: "Baş Mütəxəssis",
                  type: "chief",
                  canAssign: true,
                  canControl: ["leading", "intern"],
                },
                {
                  name: "Aparıcı Mütəxəssis",
                  type: "leading",
                  canAssign: true,
                  canControl: ["intern"],
                },
                {
                  name: "Təcrübəçi",
                  type: "intern",
                  canAssign: false,
                  canControl: [],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

const ChevronDownIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="6,9 12,15 18,9"></polyline>
  </svg>
);

const ChevronRightIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="9,18 15,12 9,6"></polyline>
  </svg>
);

const UserIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const ArrowDownIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="7,13 12,18 17,13"></polyline>
    <polyline points="12,18 12,6"></polyline>
  </svg>
);

const EyeIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const kpiCatalogData = [
  {
    code: "CE-01",
    name: "Komplayenslə əlaqəli şikayətlərin azaldılması",
    purpose: "Pozuntular hallarının azaldılması",
    method: "Say",
    period: "Rüblük",
    formula:
      "(Əvvəlki dövr ərzində sayı - Cari dövr ərzində sayı) ÷ Əvvəlki dövr ərzində sayı × 100",
    weight: "15%",
    department: "Komplayens Monitoring şöbəsi",
    relatedDepartment: "Risk İdarəetməsi",
    relatedBranch: "Baş Ofis",
    relatedPersons: "A.Məmmədov, N.Həsənova",
    dataSource: "MB qərar məktubları, daxili protokollar",
    status: "Aktiv",
    actual: 85,
    target: 90,
  },
  {
    code: "CE-02",
    name: "Komplayenslə əlaqəli məhkəmə işlərinin azaldılması",
    purpose: "Maliyyə yükünün azaldılması",
    method: "Məbləğ (AZN)",
    period: "Rüblük",
    formula:
      "(Əvvəlki dövr ərzində məbləği - Cari dövr ərzində məbləği) ÷ Əvvəlki dövr ərzində məbləği × 100",
    weight: "20%",
    department: "Maliyyə və Komplayens",
    relatedDepartment: "Hüquq Şöbəsi",
    relatedBranch: "Baş Ofis",
    relatedPersons: "R.Əliyev, S.Quliyeva",
    dataSource: "MB qərarları, maliyyə uçotu",
    status: "Aktiv",
    actual: 78,
    target: 85,
  },
  {
    code: "CE-03",
    name: "Mərkəzi Bank tərəfindən tətbiq olunan cərimələrin sayı",
    purpose: "MB tərəfindən pozuntuların sayının minimuma endirilməsi",
    method: "Say",
    period: "Rüblük",
    formula:
      "Cari dövrdə Mərkəzi bank tərəfindən verilmiş cərimə qərarlarının sayı",
    weight: "15%",
    department: "Komplayens",
    relatedDepartment: "Hüquq Şöbəsi",
    relatedBranch: "Baş Ofis",
    relatedPersons: "A.Məmmədov",
    dataSource: "MB qərarları",
    status: "Aktiv",
    actual: 92,
    target: 95,
  },
  {
    code: "CE-04",
    name: "Təkrar komplayens pozuntularının sayı",
    purpose: "Eyni səbəbdən təkrar pozuntuların qarşısının alınması",
    method: "Say",
    period: "İllik",
    formula:
      "Təkrar hallar (%) = Təkrar halların sayı ÷ Ümumi pozuntu sayı × 100",
    weight: "15%",
    department: "Komplayens",
    relatedDepartment: "Nəzarət Departamenti",
    relatedBranch: "Baş Ofis",
    relatedPersons: "N.Həsənova, R.Əliyev",
    dataSource: "Nəzarət departamenti hesabatına əsasən protokollar",
    status: "Aktiv",
    actual: 88,
    target: 90,
  },
  {
    code: "CE-05",
    name: "Əvvəlcədən səbəb olan prosedur üzrə tədbir planının icra faizi",
    purpose: "Risklərin aradan qaldırılması",
    method: "Faiz",
    period: "Rüblük",
    formula:
      "İcra olunmuş tədbirlərin sayı ÷ Planlaşdırılan tədbirlərin sayı × 100",
    weight: "20%",
    department: "Komplayens + Aşkaryat Şöbə",
    relatedDepartment: "Risk İdarəetməsi",
    relatedBranch: "Baş Ofis",
    relatedPersons: "S.Quliyeva, E.Babayev",
    dataSource: "Tədbir planı, daxili aktlar",
    status: "Aktiv",
    actual: 75,
    target: 80,
  },
  {
    code: "CE-06",
    name: "Komplayens pozuntularının əskalasiya müddəti",
    purpose: "Əskalasiya prosesinin sürətini ölçmək",
    method: "Gün / Saat",
    period: "Rüblük",
    formula:
      "SLA 24h (%) = 24 saat ərzində əskalasiya olunan hallar ÷ Ümumi hallar × 100",
    weight: "15%",
    department: "Komplayens",
    dataSource: "Əskalasiya jurnalları",
    status: "Aktiv",
    actual: 82,
    target: 85,
  },
  {
    code: "MH-01",
    name: "Planli monitorinqlərin icra faizi",
    purpose:
      "Planlı nəzarətdə tutulmuş monitorinqlərin keyfiyyətlə icrasını təmin etmək",
    method: "Faiz",
    period: "Rüblük",
    formula:
      "İcra olunmuş monitorinq sayı ÷ Planlaşdırılmış monitorinq sayı × 100",
    weight: "20%",
    department: "Komplayens Monitoring",
    dataSource: "Monitoring planı, daxili aktlar",
    status: "Aktiv",
    actual: 91,
    target: 95,
  },
  {
    code: "MH-02",
    name: "Şübhəli əməliyyatlara dair STR-lərin vaxtında hazırlanması",
    purpose: "AML/TMM təşəbbüslərinə uyğun STR-lərin vaxtında təqdim edilməsi",
    method: "Say",
    period: "Aylıq / Rüblük",
    formula: "Cari dövrdə hazırlanmış STR hesabatlarının sayı",
    weight: "25%",
    department: "ƏL/TMM Şöbə",
    dataSource: "STR bazası, daxili hesabat sistemi",
    status: "Aktiv",
    actual: 87,
    target: 90,
  },
  {
    code: "MH-03",
    name: "Hesabların vaxtında təqdimati",
    purpose: "MB və daxili rəhbərliyə hesabların vaxtında təmin olunması",
    method: "Faiz",
    period: "Rüblük",
    formula:
      "Vaxtında təqdim olunmuş hesabatların sayı ÷ Ümumi hesabatların sayı × 100",
    weight: "20%",
    department: "Komplayens",
    dataSource: "MB hesabat sistemi",
    status: "Aktiv",
    actual: 94,
    target: 95,
  },
  {
    code: "MH-04",
    name: "Proses pozuntularının təhlili",
    purpose: "Monitorinq sahəsində aşkarlanmış pozuntuların təhlil dərəcəsi",
    method: "Faiz",
    period: "Rüblük",
    formula: "Təhlil olunmuş pozuntu sayı ÷ Aşkarlanmış pozuntu sayı × 100",
    weight: "15%",
    department: "Komplayens Monitoring",
    dataSource: "Daxili protokollar",
    status: "Aktiv",
    actual: 89,
    target: 92,
  },
  {
    code: "MH-05",
    name: "Təscili müdaxilə tələb edən hallar üzrə müddət (gün/saat)",
    purpose: "Yüksək riskli halların dərhal reaksiya təmin olunması",
    method: "Gün / Saat",
    period: "Aylıq",
    formula:
      "Pozuntu aşkarlandığı tarix - Reaksiyaya çatdırılma tarixi ÷ Orta müddət (gün/saat)",
    weight: "20%",
    department: "Komplayens + Risklərin idarə edilməsi",
    dataSource: "Əskalasiya jurnalı, risk reyestri",
    status: "Aktiv",
    actual: 76,
    target: 80,
  },
  {
    code: "AML-01",
    name: "STR hesabatlarının hazırlanması",
    purpose: "Şübhəli əməliyyatların vaxtında MB-ə təqdimati",
    method: "Say",
    period: "Aylıq",
    formula: "Cari dövrdə hazırlanmış STR hesabatlarının sayı",
    weight: "25%",
    department: "ƏL/TMM Şöbə",
    dataSource: "STR bazası, MB təqdimati",
    status: "Aktiv",
    actual: 93,
    target: 95,
  },
  {
    code: "AML-02",
    name: "STR hesabatlarının vaxtında təqdimati",
    purpose: "MB təşəbbüslərinə uyğun vaxtında icra",
    method: "Say",
    period: "Aylıq",
    formula:
      "Vaxtında təqdim olunmuş STR tarixi sayı ÷ Ümumi STR-lərin sayı × 100",
    weight: "20%",
    department: "ƏL/TMM Şöbə",
    dataSource: "STR təqdimati reyestri",
    status: "Aktiv",
    actual: 88,
    target: 90,
  },
  {
    code: "AML-03",
    name: "KYC və müştəri yoxlamalarının icra faizi",
    purpose: "Müştəri məlumatlarının AML tələblərinə uyğun yoxlanması",
    method: "Say",
    period: "Aylıq",
    formula:
      "Tam icra olunmuş KYC yoxlamaları ÷ Planlaşdırılan yoxlamalar × 100",
    weight: "20%",
    department: "Data Əməli Şöbəsi + ƏL/TMM",
    dataSource: "KYC sistemləri, daxili aktlar",
    status: "Aktiv",
    actual: 85,
    target: 88,
  },
  {
    code: "AML-04",
    name: "Yüksək riskli müştərilərin monitorinqi",
    purpose: "PEP və yüksək risk qruplarının izlənməsi",
    method: "Say",
    period: "Aylıq",
    formula:
      "İzlənmiş yüksək riskli müştəri sayı ÷ Ümumi yüksək riskli müştəri sayı × 100",
    weight: "15%",
    department: "ƏL/TMM Şöbə",
    dataSource: "Risk reyestri, PEP bazası",
    status: "Aktiv",
    actual: 91,
    target: 93,
  },
  {
    code: "AML-05",
    name: "Əməkdaşların AML/TMM təlim iştirak faizi",
    purpose: "AML üzrə əməkdaşların maarifləndirməsi",
    method: "Say",
    period: "6 Ay / İllik",
    formula:
      "Təlimə iştirak edən əməkdaşların sayı ÷ Ümumi əməkdaşların sayı × 100",
    weight: "20%",
    department: "HR + ƏL/TMM",
    dataSource: "Təlim protokolları",
    status: "Aktiv",
    actual: 89,
    target: 92,
  },
  {
    code: "AU-01",
    name: "Audit tapıntılarının ümumi sayı",
    purpose: "Audit proseslərində aşkarlanmış pozuntuların izlənməsi",
    method: "Say",
    period: "Rüblük",
    formula: "Cari dövrdə qeydə alınan audit tapıntılarının sayı",
    weight: "15%",
    department: "Nəzarət departamenti + Komplayens",
    dataSource: "Audit hesabatları",
    status: "Aktiv",
    actual: 87,
    target: 90,
  },
  {
    code: "AU-02",
    name: "Yüksək riskli audit tapıntıları",
    purpose: "Kritik risk daşıyan tapıntıların nəzarəti",
    method: "Say",
    period: "Rüblük",
    formula: "Yüksək riskli tapıntıların sayı",
    weight: "20%",
    department: "Nəzarət departamenti",
    dataSource: "Audit hesabatları",
    status: "Aktiv",
    actual: 92,
    target: 95,
  },
  {
    code: "AU-03",
    name: "Orta riskli audit tapıntıları",
    purpose: "Orta səviyyəli risklərin izlənməsi",
    method: "Say",
    period: "Rüblük",
    formula: "Orta riskli tapıntıların sayı",
    weight: "10%",
    department: "Nəzarət departamenti",
    dataSource: "Audit hesabatları",
    status: "Aktiv",
    actual: 84,
    target: 87,
  },
  {
    code: "AU-04",
    name: "Audit tapıntılarının aradan qaldırılması faizi",
    purpose: "Audit səlahiyyətinin effektiv şəkildə icra",
    method: "Faiz",
    period: "Rüblük",
    formula: "(Aradan qaldırılmış tapıntılar ÷ Ümumi tapıntılar) × 100",
    weight: "25%",
    department: "Komplayens + Nəzarət departamenti",
    dataSource: "Tədbir planları, icra aktları",
    status: "Aktiv",
    actual: 79,
    target: 82,
  },
  {
    code: "AU-05",
    name: "Tədbir planının vaxtında icra faizi",
    purpose: "Audit tövsiyələrinin vaxtında yerinə yetirilməsi",
    method: "Faiz",
    period: "İllik",
    formula: "(Vaxtında icra olunmuş tədbir ÷ Ümumi tədbir) × 100",
    weight: "15%",
    department: "Komplayens",
    dataSource: "Tədbir planları, daxili hesabat",
    status: "Aktiv",
    actual: 86,
    target: 88,
  },
];

const getHeatmapColor = (value) => {
  if (value >= 90) return "#6cf38273";
  if (value >= 80) return "#fde3acff";
  if (value >= 70) return "#ffc6b3ff";
  return "#ef4444";
};

const ThreeDotsIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="1" />
    <circle cx="12" cy="5" r="1" />
    <circle cx="12" cy="19" r="1" />
  </svg>
);

export default function KPIHomePage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedNodes, setExpandedNodes] = useState({});
  const [isKPIModalOpen, setIsKPIModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingKPI, setEditingKPI] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedDivision, setSelectedDivision] = useState(null);
  const [navigationLevel, setNavigationLevel] = useState("branches");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [heatmapFilter, setHeatmapFilter] = useState("");
  const [periodFilter, setPeriodFilter] = useState("monthly");
  const [yearFilter, setYearFilter] = useState("2024");
  const [singleMonth, setSingleMonth] = useState("may");
  const [selectedMonths, setSelectedMonths] = useState(["mar", "apr", "may"]);

  // Month keys and labels for dynamic KPI Statistika table
  const monthKeys = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];
  const monthLabels = {
    jan: "Yanvar",
    feb: "Fevral",
    mar: "Mart",
    apr: "Aprel",
    may: "May",
    jun: "İyun",
    jul: "İyul",
    aug: "Avqust",
    sep: "Sentyabr",
    oct: "Oktyabr",
    nov: "Noyabr",
    dec: "Dekabr",
  };

  // Edit KPI functions
  const handleEditKPI = (kpi, index) => {
    setEditingKPI(kpi);
    setEditingIndex(index);
    setIsEditModalOpen(true);
  };

  const handleSaveEditKPI = (updatedKPI) => {
    // Here you would update the KPI in your data source
    console.log("Updated KPI:", updatedKPI, "at index:", editingIndex);
    setIsEditModalOpen(false);
    setEditingKPI(null);
    setEditingIndex(null);
  };

  const handleCancelEditKPI = () => {
    setIsEditModalOpen(false);
    setEditingKPI(null);
    setEditingIndex(null);
  };

  // Determine latest available month key from current data
  const latestAvailableMonthKey =
    [
      "dec",
      "nov",
      "oct",
      "sep",
      "aug",
      "jul",
      "jun",
      "may",
      "apr",
      "mar",
      "feb",
      "jan",
    ].find((key) => heatmapData[0] && heatmapData[0][key] !== undefined) ||
    "jan";

  // Columns to show based on period filter
  const displayedColumns = (() => {
    if (periodFilter === "monthly") {
      return [singleMonth || latestAvailableMonthKey];
    }
    if (periodFilter === "quarterly") {
      const picked =
        selectedMonths.length > 0 ? selectedMonths : ["mar", "apr", "may"];
      return picked.slice(-3);
    }
    // yearly - always show 12 months
    return monthKeys;
  })();

  const handleMultiMonthChange = (event) => {
    const options = Array.from(event.target.options);
    const values = options.filter((o) => o.selected).map((o) => o.value);
    // Limit to last 3 selections for quarterly
    if (values.length > 3) {
      setSelectedMonths(values.slice(-3));
    } else {
      setSelectedMonths(values);
    }
  };

  const toggleNode = (nodeId) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [nodeId]: !prev[nodeId],
    }));
  };

  const handleBranchClick = (branch) => {
    setSelectedBranch(branch);
    setNavigationLevel("departments");
    setSelectedDepartment(null);
  };

  const handleDepartmentClick = (department) => {
    setSelectedDepartment(department);
    setNavigationLevel("divisions");
  };

  const handleDivisionClick = (division) => {
    setSelectedDivision(division);
    setNavigationLevel("employees");
  };

  const handleBackClick = () => {
    if (navigationLevel === "employees") {
      setNavigationLevel("divisions");
      setSelectedDivision(null);
    } else if (navigationLevel === "divisions") {
      setNavigationLevel("departments");
      setSelectedDepartment(null);
    } else if (navigationLevel === "departments") {
      setNavigationLevel("branches");
      setSelectedBranch(null);
    }
  };

  const handleEmployeeProfileClick = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleBackFromEmployeeProfile = () => {
    setSelectedEmployee(null);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      "On-track": { color: "#22c55e", emoji: "🟢", text: "On-track" },
      Risk: { color: "#eab308", emoji: "🟡", text: "Risk" },
      Off: { color: "#ef4444", emoji: "🔴", text: "Off" },
    };
    return statusConfig[status] || statusConfig["Off"];
  };

  const renderOrgNode = (node, level = 0, parentId = "", index = 0) => {
    const nodeId = `${parentId}-${index}`;
    const isExpanded = expandedNodes[nodeId];
    const hasChildren = node.children && node.children.length > 0;

    const getNodeIcon = (type) => {
      switch (type) {
        case "branch":
          return <BuildingIcon />;
        case "management":
          return <UsersIcon />;
        case "department":
          return <BuildingIcon />;
        case "division":
          return <BuildingIcon />;
        default:
          return <UserIcon />;
      }
    };

    const getNodeClass = (type) => {
      switch (type) {
        case "branch":
          return styles.branchNode;
        case "management":
          return styles.managementNode;
        case "department":
          return styles.departmentNode;
        case "division":
          return styles.divisionNode;
        case "head":
          return styles.headNode;
        case "chief":
          return styles.chiefNode;
        case "leading":
          return styles.leadingNode;
        case "intern":
          return styles.internNode;
        default:
          return styles.defaultNode;
      }
    };

    return (
      <div key={nodeId} className={styles.orgNodeContainer}>
        <div
          className={`${styles.orgNode} ${getNodeClass(node.type)}`}
          style={{ marginLeft: `${level * 20}px` }}
          onClick={() => hasChildren && toggleNode(nodeId)}
        >
          <div className={styles.nodeContent}>
            {hasChildren && (
              <span className={styles.expandIcon}>
                {isExpanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
              </span>
            )}
            <span className={styles.nodeIcon}>{getNodeIcon(node.type)}</span>
            <span className={styles.nodeName}>{node.name}</span>
            {node.canAssign && (
              <span className={styles.permissionBadge}>
                Tapşırıq verə bilər
              </span>
            )}
            {node.canControl && node.canControl.length > 0 && (
              <span className={styles.controlBadge}>Nəzarət edə bilər</span>
            )}
          </div>
          {node.canControl && node.canControl.length > 0 && (
            <div className={styles.hierarchyArrow}>
              <ArrowDownIcon />
            </div>
          )}
        </div>

        {hasChildren && isExpanded && (
          <div className={styles.childNodes}>
            {node.children.map((child, childIndex) =>
              renderOrgNode(child, level + 1, nodeId, childIndex),
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {" "}
      <Header title="KPI İdarəetmə Sistemi" />
      <div className={styles.container}>
        {selectedEmployee ? (
          <EmployeeKPIProfile
            employee={selectedEmployee}
            onBack={handleBackFromEmployeeProfile}
          />
        ) : (
          <>
            <div className={styles.tabs}>
              <div className={styles.tabsList}>
                <button
                  className={`${styles.tabsTrigger} ${
                    activeTab === "overview" ? styles.active : ""
                  }`}
                  onClick={() => setActiveTab("overview")}
                >
                  Ümumi Baxış
                </button>
                <button
                  className={`${styles.tabsTrigger} ${
                    activeTab === "catalog" ? styles.active : ""
                  }`}
                  onClick={() => setActiveTab("catalog")}
                >
                  KPI Siyahısı
                </button>
                {/* <button
                  className={`${styles.tabsTrigger} ${
                    activeTab === "employee" ? styles.active : ""
                  }`}
                  onClick={() => setActiveTab("employee")}
                >
                  KPI Nəticələri
                </button> */}
              </div>

              {activeTab === "overview" && (
                <div className={styles.tabContent}>
                  {/* Filters */}

                  {/* Summary Cards */}
                  <div className={styles.summaryCards}>
                    <div className={styles.summaryCard}>
                      <div className={styles.cardHeader}>
                        <h3 className={styles.cardTitle}>Ümumi KPI</h3>
                        <div className={styles.cardIcon}>
                          <TargetIcon />
                        </div>
                      </div>
                      <div className={styles.cardContent}>
                        <div className={styles.cardValue}>
                          {summaryData.totalKPIs}
                        </div>
                        <div className={styles.cardSubtext}>
                          Aktiv: {summaryData.activeKPIs}
                        </div>
                      </div>
                    </div>

                    <div className={styles.summaryCard}>
                      <div className={styles.cardHeader}>
                        <h3 className={styles.cardTitle}>SLA Gecikməsi</h3>
                        <div className={styles.cardIcon}>
                          <AlertTriangleIcon />
                        </div>
                      </div>
                      <div className={styles.cardContent}>
                        <div className={styles.cardValue}>
                          {summaryData.slaOverdue}
                        </div>
                        <div className={styles.cardSubtext}>KPI gecikib</div>
                      </div>
                    </div>

                    <div className={styles.summaryCard}>
                      <div className={styles.cardHeader}>
                        <h3 className={styles.cardTitle}>Orta İcra %</h3>
                        <div className={styles.cardIcon}>
                          <TrendingUpIcon />
                        </div>
                      </div>
                      <div className={styles.cardContent}>
                        <div className={styles.cardValue}>
                          {summaryData.avgExecution}%
                        </div>
                        <div className={styles.cardSubtext}>
                          Hədəf: {summaryData.targetAverage}%
                        </div>
                      </div>
                    </div>

                    <div className={styles.summaryCard}>
                      <div className={styles.cardHeader}>
                        <h3 className={styles.cardTitle}>Müqayisə</h3>
                        <div className={styles.cardIcon}>
                          <TrendingUpIcon />
                        </div>
                      </div>
                      <div className={styles.cardContent}>
                        <div className={styles.cardValue}>
                          +{summaryData.deviation}%
                        </div>
                        <div className={styles.cardSubtext}>
                          Hədəfdən yuxarı
                        </div>
                      </div>
                    </div>
                    <div className={styles.summaryCard}>
                      <div className={styles.cardHeader}>
                        <h3 className={styles.cardTitle}>
                          Prioritet və Hesabatlar
                        </h3>
                        <div className={styles.cardIcon}>
                          <TrendingUpIcon />
                        </div>
                      </div>
                      <div className={styles.cardContent}>
                        <div className={styles.cardValue}>
                          +{summaryData.deviation}%
                        </div>
                        <div className={styles.cardSubtext}>
                          Hədəfdən yuxarı
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Charts Section */}
                  <div className={styles.chartsSection}>
                    <div className={styles.chartContainer}>
                      <div className={styles.card}>
                        <div className={styles.cardHeader}>
                          <h3 className={styles.cardTitle}>
                            Son 12 Ayda KPI Trend Xətti
                          </h3>
                        </div>
                        <div className={styles.cardContent}>
                          <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={trendData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="month" />
                              <YAxis />
                              <Tooltip />
                              <Line
                                type="monotone"
                                dataKey="fakt"
                                stroke="#0088FE"
                                strokeWidth={2}
                                name="Fakt"
                              />
                              <Line
                                type="monotone"
                                dataKey="target"
                                stroke="#FF8042"
                                strokeWidth={2}
                                strokeDasharray="5 5"
                                name="Hədəf"
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>

                    <div className={styles.chartContainer}>
                      <div className={styles.card}>
                        <div className={styles.cardHeader}>
                          <h3 className={styles.cardTitle}>
                            Modul Payı (Çəkiyə görə)
                          </h3>
                        </div>
                        <div className={styles.cardContent}>
                          <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                              <Pie
                                data={moduleData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                paddingAngle={5}
                                dataKey="value"
                              >
                                {moduleData.map((entry, index) => (
                                  <Cell
                                    key={`cell-${index}`}
                                    fill={entry.color}
                                  />
                                ))}
                              </Pie>
                              <Tooltip />
                            </PieChart>
                          </ResponsiveContainer>
                          <div className={styles.pieChartLegend}>
                            {moduleData.map((item, index) => (
                              <div key={index} className={styles.legendItem}>
                                <div
                                  className={styles.legendColor}
                                  style={{ backgroundColor: item.color }}
                                ></div>
                                <span>
                                  {item.name}: {item.value}%
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Heatmap */}
                  <div className={styles.heatmapSection}>
                    <div className={styles.card}>
                      <div className={styles.cardHeader}>
                        <h3 className={styles.cardTitle}>KPI Statistika</h3>
                        <div className={styles.catalogActions}>
                          <select
                            className={styles.filterSelect}
                            value={periodFilter}
                            onChange={(e) => setPeriodFilter(e.target.value)}
                          >
                            <option value="monthly">Aylıq</option>
                            <option value="quarterly">Rüblük</option>
                            <option value="yearly">İllik</option>
                          </select>
                          <select
                            className={styles.filterSelect}
                            value={yearFilter}
                            onChange={(e) => setYearFilter(e.target.value)}
                          >
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                          </select>
                          {periodFilter === "monthly" && (
                            <select
                              className={styles.filterSelect}
                              value={singleMonth}
                              onChange={(e) => setSingleMonth(e.target.value)}
                            >
                              {monthKeys.map((key) => (
                                <option key={key} value={key}>
                                  {monthLabels[key]}
                                </option>
                              ))}
                            </select>
                          )}
                          {periodFilter === "quarterly" && (
                            <select
                              multiple
                              className={styles.filterSelect}
                              value={selectedMonths}
                              onChange={handleMultiMonthChange}
                              size={4}
                              title="Ayları seçin"
                            >
                              {monthKeys.map((key) => (
                                <option key={key} value={key}>
                                  {monthLabels[key]}
                                </option>
                              ))}
                            </select>
                          )}
                        </div>
                      </div>
                      <div className={styles.cardContent}>
                        <div className={styles.cleanTableContainer}>
                          <table className={styles.cleanTable}>
                            <thead>
                              <tr>
                                <th>Filial</th>
                                {displayedColumns.map((key) => (
                                  <th key={key}>{monthLabels[key]}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {heatmapData.map((row, index) => (
                                <tr key={index}>
                                  <td>{row.branch}</td>
                                  {displayedColumns.map((key) => {
                                    const value = row[key];
                                    const hasValue =
                                      value !== undefined && value !== null;
                                    const bg = hasValue
                                      ? getHeatmapColor(value)
                                      : "transparent";
                                    const style = {
                                      backgroundColor: bg,
                                      color: hasValue ? "black" : "#666",
                                    };
                                    return (
                                      <td key={key} style={style}>
                                        {hasValue ? `${value}%` : "—"}
                                      </td>
                                    );
                                  })}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Lists */}
                  <div className={styles.bottomLists}>
                    <div className={styles.listCard}>
                      <div className={styles.cardHeader}>
                        <h3 className={styles.listTitle}>
                          <AlertTriangleIcon />
                          Riskli / Hədəfə çatmayan
                        </h3>
                      </div>
                      <div className={styles.cardContent}>
                        <div className={styles.listContainer}>
                          {criticalKPIs.map((kpi, index) => (
                            <div key={index} className={styles.listItem}>
                              <div className={styles.listItemHeader}>
                                <span className={styles.badgeDestructive}>
                                  {kpi.code}
                                </span>
                                <span className={styles.executionBadge}>
                                  {kpi.execution}% / {kpi.target}%
                                </span>
                              </div>
                              <div className={styles.listItemContent}>
                                <div className={styles.kpiName}>{kpi.name}</div>
                                <div className={styles.responsible}>
                                  Məsul: {kpi.responsible}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className={styles.listCard}>
                      <div className={styles.cardHeader}>
                        <h3 className={styles.listTitle}>
                          <TrophyIcon />
                          Top KPI-lar
                        </h3>
                      </div>
                      <div className={styles.cardContent}>
                        <div className={styles.listContainer}>
                          {topKPIs.map((kpi, index) => (
                            <div key={index} className={styles.listItem}>
                              <div className={styles.listItemHeader}>
                                <span className={styles.badgeSecondary}>
                                  {kpi.code}
                                </span>
                                <span className={styles.executionBadge}>
                                  {kpi.execution}% / {kpi.target}%
                                </span>
                              </div>
                              <div className={styles.listItemContent}>
                                <div className={styles.kpiName}>{kpi.name}</div>
                                <div className={styles.weight}>
                                  Çəki: {kpi.weight}%
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className={styles.listCard}>
                      <div className={styles.cardHeader}>
                        <h3 className={styles.listTitle}>
                          <UsersIcon />
                          Yüksək Prioritetlər
                        </h3>
                      </div>
                      <div className={styles.cardContent}>
                        <div className={styles.listContainer}>
                          {topKPIs.map((kpi, index) => {
                            const moduleCode = kpi.code.split("-")[0];
                            return (
                              <div key={index} className={styles.listItem}>
                                <div className={styles.listItemHeader}>
                                  <span className={styles.badgeSecondary}>
                                    {kpi.code}
                                  </span>
                                  <span className={styles.executionBadge}>
                                    Yüksək prioritet
                                  </span>
                                </div>
                                <div className={styles.listItemContent}>
                                  <div className={styles.kpiName}>
                                    {`${kpi.name}`}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "catalog" && (
                <div className={styles.tabContent}>
                  <div className={styles.card}>
                    <div className={styles.cardHeader}>
                      <h3 className={styles.cardTitle}>KPI Kataloqu</h3>
                      <div className={styles.catalogActions}>
                        <div className={styles.searchContainer}>
                          <SearchIcon />
                          <input
                            placeholder="KPI kodu və ya adı ilə axtarın..."
                            className={styles.searchInput}
                          />
                        </div>
                        <button
                          className={styles.primaryButton}
                          onClick={() => setIsKPIModalOpen(true)}
                        >
                          Yeni KPI
                        </button>
                      </div>
                    </div>
                    <div className={styles.cardContent}>
                      <div className={styles.cleanTableContainer}>
                        <table className={styles.cleanTable}>
                          <thead>
                            <tr>
                              <th>KPI Kodu</th>
                              <th>KPI Adı</th>
                              <th>Məqsəd</th>
                              <th>Ölçü Metodu</th>
                              <th>Müddət</th>
                              <th>Çəki (%)</th>
                              <th>Məsul Şöbə</th>
                              <th>Əlaqəli Şöbə</th>
                              <th>Əlaqəli Departament</th>
                              <th>Əlaqəli Şəxslər</th>
                              <th>Data Mənbə</th>
                              <th>Əməliyyatlar</th>
                            </tr>
                          </thead>
                          <tbody>
                            {kpiCatalogData.map((kpi, index) => (
                              <tr key={index}>
                                <td>{kpi.code}</td>
                                <td>{kpi.name}</td>
                                <td>{kpi.purpose}</td>
                                <td>{kpi.method}</td>
                                <td>{kpi.period}</td>
                                <td>{kpi.weight}</td>
                                <td>{kpi.department}</td>
                                <td>{kpi.relatedDepartment}</td>
                                <td>{kpi.relatedBranch}</td>
                                <td>{kpi.relatedPersons}</td>
                                <td>{kpi.dataSource}</td>
                                <td>
                                  <button
                                    className={styles.editButton}
                                    onClick={() => handleEditKPI(kpi, index)}
                                  >
                                    Edit
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "employee" && (
                <div className={styles.tabContent}>
                  <div className={styles.branchesSection}>
                    {/* Navigation breadcrumb */}
                    <div className={styles.breadcrumb}>
                      <button
                        className={styles.breadcrumbItem}
                        onClick={() => {
                          setNavigationLevel("branches");
                          setSelectedBranch(null);
                          setSelectedDepartment(null);
                          setSelectedDivision(null);
                        }}
                      >
                        Filiallar
                      </button>
                      {selectedBranch && (
                        <>
                          <span className={styles.breadcrumbSeparator}>›</span>
                          <button
                            className={styles.breadcrumbItem}
                            onClick={() => {
                              setNavigationLevel("departments");
                              setSelectedDepartment(null);
                              setSelectedDivision(null);
                            }}
                          >
                            {selectedBranch.name}
                          </button>
                        </>
                      )}
                      {selectedDepartment && (
                        <>
                          <span className={styles.breadcrumbSeparator}>›</span>
                          <button
                            className={styles.breadcrumbItem}
                            onClick={() => {
                              setNavigationLevel("divisions");
                              setSelectedDivision(null);
                            }}
                          >
                            {selectedDepartment.name}
                          </button>
                        </>
                      )}
                      {selectedDivision && (
                        <>
                          <span className={styles.breadcrumbSeparator}>›</span>
                          <span className={styles.breadcrumbCurrent}>
                            {selectedDivision.name}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Branches List */}
                    {navigationLevel === "branches" && (
                      <div className={styles.card}>
                        <div className={styles.cardHeader}>
                          <h3 className={styles.cardTitle}>
                            Filiallar Siyahısı
                          </h3>
                        </div>
                        <div className={styles.cardContent}>
                          <div className={styles.branchGrid}>
                            {branchesData.map((branch, index) => (
                              <div
                                key={index}
                                className={styles.branchCard}
                                onClick={() => handleBranchClick(branch)}
                              >
                                <div className={styles.branchHeader}>
                                  <h3 className={styles.branchName}>
                                    {branch.name}
                                  </h3>
                                  <button className={styles.menuButton}>
                                    <ThreeDotsIcon />
                                  </button>
                                </div>
                                <div className={styles.branchStats}>
                                  <div className={styles.statItem}>
                                    <span className={styles.statLabel}>
                                      Departament sayı:
                                    </span>
                                    <span className={styles.statValue}>
                                      {branch.departments}
                                    </span>
                                  </div>
                                  <div className={styles.statItem}>
                                    <span className={styles.statLabel}>
                                      Şöbə sayı:
                                    </span>
                                    <span className={styles.statValue}>
                                      {branch.divisions}
                                    </span>
                                  </div>
                                  <div className={styles.statItem}>
                                    <span className={styles.statLabel}>
                                      İşçi sayı:
                                    </span>
                                    <span className={styles.statValue}>
                                      {branch.employees}
                                    </span>
                                  </div>
                                </div>
                                <div className={styles.branchPerformance}>
                                  <div className={styles.progressBar}>
                                    <div
                                      className={styles.progressFill}
                                      style={{
                                        width: `${branch.performance}%`,
                                        backgroundColor: branch.color,
                                      }}
                                    ></div>
                                  </div>
                                  <span className={styles.performanceText}>
                                    {branch.performance}%
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Departments List */}
                    {navigationLevel === "departments" && selectedBranch && (
                      <div className={styles.card}>
                        <div className={styles.cardHeader}>
                          <h3 className={styles.cardTitle}>
                            {selectedBranch.name} - Departamentlər
                          </h3>
                          <button
                            className={styles.backButton}
                            onClick={handleBackClick}
                          >
                            ← Geri
                          </button>
                        </div>
                        <div className={styles.cardContent}>
                          <div className={styles.branchGrid}>
                            {departmentsData[selectedBranch.name]?.map(
                              (department, index) => (
                                <div
                                  key={index}
                                  className={styles.branchCard}
                                  onClick={() =>
                                    handleDepartmentClick(department)
                                  }
                                >
                                  <div className={styles.branchHeader}>
                                    <h3 className={styles.branchName}>
                                      {department.name}
                                    </h3>
                                    <button className={styles.menuButton}>
                                      <ThreeDotsIcon />
                                    </button>
                                  </div>
                                  <div className={styles.branchStats}>
                                    <div className={styles.statItem}>
                                      <span className={styles.statLabel}>
                                        Şöbə sayı:
                                      </span>
                                      <span className={styles.statValue}>
                                        {department.divisions}
                                      </span>
                                    </div>
                                    <div className={styles.statItem}>
                                      <span className={styles.statLabel}>
                                        İşçi sayı:
                                      </span>
                                      <span className={styles.statValue}>
                                        {department.employees}
                                      </span>
                                    </div>
                                  </div>
                                  <div className={styles.branchPerformance}>
                                    <div className={styles.progressBar}>
                                      <div
                                        className={styles.progressFill}
                                        style={{
                                          width: `${department.performance}%`,
                                          backgroundColor: "#4b5563",
                                        }}
                                      ></div>
                                    </div>
                                    <span className={styles.performanceText}>
                                      {department.performance}%
                                    </span>
                                  </div>
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Divisions List */}
                    {navigationLevel === "divisions" && selectedDepartment && (
                      <div className={styles.card}>
                        <div className={styles.cardHeader}>
                          <h3 className={styles.cardTitle}>
                            {selectedDepartment.name} - Şöbələr
                          </h3>
                          <button
                            className={styles.backButton}
                            onClick={handleBackClick}
                          >
                            ← Geri
                          </button>
                        </div>
                        <div className={styles.cardContent}>
                          <div className={styles.branchGrid}>
                            {divisionsData[selectedDepartment.name]?.map(
                              (division, index) => (
                                <div
                                  key={index}
                                  className={styles.branchCard}
                                  onClick={() => handleDivisionClick(division)}
                                >
                                  <div className={styles.branchHeader}>
                                    <h3 className={styles.branchName}>
                                      {division.name}
                                    </h3>
                                    <button className={styles.menuButton}>
                                      <ThreeDotsIcon />
                                    </button>
                                  </div>
                                  <div className={styles.branchStats}>
                                    <div className={styles.statItem}>
                                      <span className={styles.statLabel}>
                                        İşçi sayı:
                                      </span>
                                      <span className={styles.statValue}>
                                        {division.employees}
                                      </span>
                                    </div>
                                  </div>
                                  <div className={styles.branchPerformance}>
                                    <div className={styles.progressBar}>
                                      <div
                                        className={styles.progressFill}
                                        style={{
                                          width: `${division.performance}%`,
                                          backgroundColor: "#4b5563",
                                        }}
                                      ></div>
                                    </div>
                                    <span className={styles.performanceText}>
                                      {division.performance}%
                                    </span>
                                  </div>
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {navigationLevel === "employees" && selectedDivision && (
                      <div className={styles.card}>
                        <div className={styles.cardHeader}>
                          <h3 className={styles.cardTitle}>
                            {selectedDivision.name} - İşçi Siyahısı
                          </h3>
                          <button
                            className={styles.backButton}
                            onClick={handleBackClick}
                          >
                            ← Geri
                          </button>
                        </div>
                        <div className={styles.cardContent}>
                          <div className={styles.employeeTable}>
                            <div className={styles.employeeTableHeader}>
                              <div className={styles.employeeHeaderCell}>
                                İşçi
                              </div>
                              <div className={styles.employeeHeaderCell}>
                                Struktur
                              </div>
                              <div className={styles.employeeHeaderCell}>
                                KPI Nəticəsi
                              </div>
                              <div className={styles.employeeHeaderCell}>
                                Status
                              </div>
                              <div className={styles.employeeHeaderCell}>
                                Benchmark
                              </div>
                              <div className={styles.employeeHeaderCell}>
                                Əməliyyat
                              </div>
                            </div>
                            {employeesData[selectedDivision.name]?.map(
                              (employee, index) => {
                                const statusBadge = getStatusBadge(
                                  employee.status,
                                );
                                return (
                                  <div
                                    key={index}
                                    className={styles.employeeRow}
                                  >
                                    <div className={styles.employeeCell}>
                                      <div className={styles.employeeInfo}>
                                        <div className={styles.employeeAvatar}>
                                          <img
                                            src={
                                              employee.photo ||
                                              "/placeholder.svg"
                                            }
                                            alt={employee.name}
                                          />
                                        </div>
                                        <button
                                          className={styles.employeeName}
                                          onClick={() =>
                                            handleEmployeeProfileClick(employee)
                                          }
                                        >
                                          {employee.name}
                                        </button>
                                      </div>
                                    </div>
                                    <div className={styles.employeeCell}>
                                      <div className={styles.employeeStructure}>
                                        <div className={styles.structureBranch}>
                                          {employee.branch}
                                        </div>
                                        <div className={styles.structureDept}>
                                          {employee.department} /{" "}
                                          {employee.division}
                                        </div>
                                      </div>
                                    </div>
                                    <div className={styles.employeeCell}>
                                      <div className={styles.kpiResult}>
                                        <div className={styles.kpiProgress}>
                                          <div
                                            className={styles.kpiProgressBar}
                                          >
                                            <div
                                              className={styles.kpiProgressFill}
                                              style={{
                                                width: `${employee.kpiResult}%`,
                                              }}
                                            ></div>
                                          </div>
                                          <span
                                            className={styles.kpiPercentage}
                                          >
                                            {employee.kpiResult}%
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className={styles.employeeCell}>
                                      <div
                                        className={styles.statusBadge}
                                        style={{
                                          backgroundColor: statusBadge.color,
                                        }}
                                      >
                                        <span className={styles.statusEmoji}>
                                          {statusBadge.emoji}
                                        </span>
                                        <span className={styles.statusText}>
                                          {statusBadge.text}
                                        </span>
                                      </div>
                                    </div>
                                    <div className={styles.employeeCell}>
                                      <div className={styles.benchmark}>
                                        <span className={styles.benchmarkIcon}>
                                          {employee.benchmark > 0 ? "↑" : "↓"}
                                        </span>
                                        <span className={styles.benchmarkValue}>
                                          {Math.abs(employee.benchmark)}%
                                        </span>
                                      </div>
                                    </div>
                                    <div className={styles.employeeCell}>
                                      <button
                                        className={styles.detailButton}
                                        onClick={() =>
                                          handleEmployeeProfileClick(employee)
                                        }
                                      >
                                        Detallı bax
                                      </button>
                                    </div>
                                  </div>
                                );
                              },
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <KPICreationModal
              open={isKPIModalOpen}
              onOpenChange={setIsKPIModalOpen}
            />

            <KPICreationModal
              open={isEditModalOpen}
              onOpenChange={setIsEditModalOpen}
              editMode={true}
              kpiData={editingKPI}
              onSave={handleSaveEditKPI}
              onCancel={handleCancelEditKPI}
            />
          </>
        )}
      </div>
    </>
  );
}

const employeesData = {
  "Komplayens Monitorinq Şöbəsi": [
    {
      name: "Nigar Əhmədova",
      photo: "/professional-female-avatar.png",
      position: "Baş Mütəxəssis",
      branch: "Yeni Filial",
      department: "Komplayens Departamenti",
      division: "ƏL/TMM Şöbəsi",
      kpiResult: 91,
      kpiScore: 91,
      status: "On-track",
      benchmark: 6,
    },
    {
      name: "Tural Məmmədov",
      photo: "/professional-male-avatar.png",
      position: "Aparıcı Mütəxəssis",
      branch: "Yeni Filial",
      department: "Komplayens Departamenti",
      division: "ƏL/TMM Şöbəsi",
      kpiResult: 85,
      kpiScore: 85,
      status: "On-track",
      benchmark: 3,
    },
    {
      name: "Səbinə Qasımova",
      photo: "/professional-female-avatar-2.png",
      position: "Mütəxəssis",
      branch: "Yeni Filial",
      department: "Komplayens Departamenti",
      division: "ƏL/TMM Şöbəsi",
      kpiResult: 88,
      kpiScore: 88,
      status: "On-track",
      benchmark: 4,
    },
  ],
  "MEŞ / Hesabatlıq şöbəsi": [
    {
      name: "Orxan Həsənov",
      photo: "/professional-male-avatar-2.png",
      position: "Şöbə Rəisi",
      branch: "Yeni Filial",
      department: "Komplayens Departamenti",
      division: "MEŞ / Hesabatlıq şöbəsi",
      kpiResult: 82,
      kpiScore: 82,
      status: "On-track",
      benchmark: 2,
    },
    {
      name: "Aynur Rəhimova",
      photo: "/professional-female-avatar.png",
      position: "Baş Mütəxəssis",
      branch: "Yeni Filial",
      department: "Komplayens Departamenti",
      division: "MEŞ / Hesabatlıq şöbəsi",
      kpiResult: 79,
      kpiScore: 79,
      status: "Risk",
      benchmark: -1,
    },
    {
      name: "Fərid Əliyev",
      photo: "/professional-male-avatar-3.png",
      position: "Aparıcı Mütəxəssis",
      branch: "Yeni Filial",
      department: "Komplayens Departamenti",
      division: "MEŞ / Hesabatlıq şöbəsi",
      kpiResult: 84,
      kpiScore: 84,
      status: "On-track",
      benchmark: 3,
    },
  ],
  "Komplayens Monitorinq Şöbəsi": [
    {
      name: "Məryəm Nəsirova",
      photo: "/professional-female-avatar-2.png",
      position: "Baş Mütəxəssis",
      branch: "Yeni Filial",
      department: "Komplayens Departamenti",
      division: "Komplayens Monitorinq Şöbəsi",
      kpiResult: 94,
      kpiScore: 94,
      status: "On-track",
      benchmark: 8,
    },
    {
      name: "Kamran Babayev",
      photo: "/professional-male-avatar.png",
      position: "Mütəxəssis",
      branch: "Yeni Filial",
      department: "Komplayens Departamenti",
      division: "Komplayens Monitorinq Şöbəsi",
      kpiResult: 90,
      kpiScore: 90,
      status: "On-track",
      benchmark: 5,
    },
  ],
  "Satış Şöbəsi": [
    {
      name: "Əli Məmmədov",
      photo: "/professional-male-avatar.png",
      position: "Satış Mütəxəssisi",
      branch: "Bakı Filialı",
      department: "Satış Departamenti",
      division: "Satış Şöbəsi",
      kpiResult: 87,
      kpiScore: 87,
      status: "On-track",
      benchmark: 5,
    },
    {
      name: "Leyla Həsənova",
      photo: "/professional-female-avatar.png",
      position: "Satış Mütəxəssisi",
      branch: "Bakı Filialı",
      department: "Satış Departamenti",
      division: "Satış Şöbəsi",
      kpiResult: 72,
      kpiScore: 72,
      status: "Risk",
      benchmark: -3,
    },
    {
      name: "Rəşad Quliyev",
      photo: "/professional-male-avatar-2.png",
      position: "Satış Mütəxəssisi",
      branch: "Bakı Filialı",
      department: "Satış Departamenti",
      division: "Satış Şöbəsi",
      kpiResult: 45,
      kpiScore: 45,
      status: "Off",
      benchmark: -12,
    },
  ],
  "Müştəri Xidmətləri": [
    {
      name: "Günel Əliyeva",
      photo: "/professional-female-avatar-2.png",
      position: "Müştəri Xidmətləri Mütəxəssisi",
      branch: "Bakı Filialı",
      department: "Satış Departamenti",
      division: "Müştəri Xidmətləri",
      kpiResult: 92,
      kpiScore: 92,
      status: "On-track",
      benchmark: 8,
    },
    {
      name: "Elvin Nərimanov",
      photo: "/professional-male-avatar-3.png",
      position: "Müştəri Xidmətləri Mütəxəssisi",
      branch: "Bakı Filialı",
      department: "Satış Departamenti",
      division: "Müştəri Xidmətləri",
      kpiResult: 78,
      kpiScore: 78,
      status: "Risk",
      benchmark: 2,
    },
  ],
};
