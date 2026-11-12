export interface TermOption {
  code: string;
  description: string;
  academicCareer: string;
  academicYear: string;
  totalClasses: number;
  attendedClasses: number;
}

export interface SubjectAttendance {
  code: string;
  name: string;
  faculty: string;
  totalClasses: number;
  attended: number;
  absent: number;
  percentage: number;
  status: 'Eligible' | 'Shortage' | 'Critical';
}

export interface AttendanceReportData {
  studentName: string;
  campusId: string;
  course: string;
  career: string;
  term: string;
  termDescription: string;
  totalClasses: number;
  classesAttended: number;
  classesAbsent: number;
  attendancePercentage: number;
  generatedDate: string;
  subjects: SubjectAttendance[];
}
