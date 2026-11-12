import { TermOption, AttendanceReportData, SubjectAttendance } from '../types';

export const ACADEMIC_TERMS: TermOption[] = [
  {
    code: '2025-2026',
    description: 'Academic Year 2025-2026',
    academicCareer: 'Undergraduate',
    academicYear: '2025-2026',
    totalClasses: 60,
    attendedClasses: 52,
  },
  {
    code: '2025 Fall',
    description: 'Fall Semester 2025',
    academicCareer: 'Undergraduate',
    academicYear: '2025-2026',
    totalClasses: 45,
    attendedClasses: 40,
  },
  {
    code: '2026 Spring',
    description: 'Spring Semester 2026',
    academicCareer: 'Undergraduate',
    academicYear: '2025-2026',
    totalClasses: 50,
    attendedClasses: 46,
  },
  {
    code: '2026 Summer',
    description: 'Summer Term 2026',
    academicCareer: 'Undergraduate',
    academicYear: '2025-2026',
    totalClasses: 30,
    attendedClasses: 27,
  },
];

export function getAttendanceReport(termCode: string): AttendanceReportData {
  const matchedTerm = ACADEMIC_TERMS.find(
    (t) => t.code.toLowerCase() === termCode.trim().toLowerCase()
  );

  const termDesc = matchedTerm ? matchedTerm.description : `Term ${termCode}`;
  const totalClasses = matchedTerm ? matchedTerm.totalClasses : 60;
  const classesAttended = matchedTerm ? matchedTerm.attendedClasses : 52;
  const classesAbsent = totalClasses - classesAttended;
  const percentage = Number(((classesAttended / totalClasses) * 100).toFixed(2));

  // Generate realistic subject breakdown for Course BCM12 (Bachelor of Commerce / Business Curriculum)
  const subjectsData = [
    { code: 'BCM101', name: 'Financial Accounting & Reporting', faculty: 'Dr. R. Sharma' },
    { code: 'BCM102', name: 'Principles of Business Management', faculty: 'Prof. A. K. Verma' },
    { code: 'BCM103', name: 'Commercial & Corporate Law', faculty: 'Dr. M. Banerjee' },
    { code: 'BCM104', name: 'Business Economics & Analytics', faculty: 'Dr. S. K. Gupta' },
  ];

  const subjects: SubjectAttendance[] = subjectsData.map((sub, idx) => {
    // distribute total classes across subjects
    const subTotal = Math.floor(totalClasses / subjectsData.length);
    // slight variation across subjects
    let subAttended: number;
    if (idx === 0) {
      subAttended = Math.min(subTotal, Math.round(subTotal * 0.8667));
    } else if (idx === 1) {
      subAttended = Math.min(subTotal, Math.round(subTotal * 0.9333));
    } else if (idx === 2) {
      subAttended = Math.min(subTotal, Math.round(subTotal * 0.8000));
    } else {
      subAttended = classesAttended - (
        Math.min(subTotal, Math.round(subTotal * 0.8667)) +
        Math.min(subTotal, Math.round(subTotal * 0.9333)) +
        Math.min(subTotal, Math.round(subTotal * 0.8000))
      );
      if (subAttended < 0) subAttended = Math.round(subTotal * 0.85);
      if (subAttended > subTotal) subAttended = subTotal;
    }
    const subAbsent = subTotal - subAttended;
    const subPct = Number(((subAttended / subTotal) * 100).toFixed(2));

    let status: 'Eligible' | 'Shortage' | 'Critical' = 'Eligible';
    if (subPct < 65) status = 'Critical';
    else if (subPct < 75) status = 'Shortage';

    return {
      code: sub.code,
      name: sub.name,
      faculty: sub.faculty,
      totalClasses: subTotal,
      attended: subAttended,
      absent: subAbsent,
      percentage: subPct,
      status,
    };
  });

  return {
    studentName: 'Vicky Singh',
    campusId: '202510701120058',
    course: 'BCM12',
    career: 'UG',
    term: termCode,
    termDescription: termDesc,
    totalClasses,
    classesAttended,
    classesAbsent,
    attendancePercentage: percentage,
    generatedDate: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }),
    subjects,
  };
}
