const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function hashPassword(pwd) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(pwd, salt);
}

async function main() {
  console.log('🚀 Starting SRM Database Seed...');

  // Clean existing data in reverse relation order
  console.log('🧹 Cleaning old records...');
  await prisma.notificationLog.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.feePayment.deleteMany();
  await prisma.studentFee.deleteMany();
  await prisma.feeType.deleteMany();
  await prisma.mark.deleteMany();
  await prisma.exam.deleteMany();
  await prisma.classStaff.deleteMany();
  await prisma.staffSubject.deleteMany();
  await prisma.standardSubject.deleteMany();
  await prisma.subject.deleteMany();
  await prisma.studentEnrollment.deleteMany();
  await prisma.studentParent.deleteMany();
  await prisma.parent.deleteMany();
  await prisma.student.deleteMany();
  await prisma.class.deleteMany();
  await prisma.division.deleteMany();
  await prisma.standard.deleteMany();
  await prisma.academicYear.deleteMany();
  await prisma.userPermission.deleteMany();
  await prisma.permission.deleteMany();
  await prisma.staff.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.user.deleteMany();
  await prisma.role.deleteMany();

  // 1. ROLES
  console.log('🌱 Seeding Roles...');
  const adminRole = await prisma.role.create({
    data: { name: 'ADMIN', description: 'School Administrator with superuser privileges' },
  });

  const teacherRole = await prisma.role.create({
    data: { name: 'TEACHER', description: 'Teaching Faculty with scoped class and subject access' },
  });

  // 2. PERMISSIONS
  console.log('🌱 Seeding Granular Permissions...');
  const permissionsList = [
    // Students
    { name: 'STUDENT_VIEW', module: 'STUDENTS', description: 'View student list and profile details' },
    { name: 'STUDENT_CREATE', module: 'STUDENTS', description: 'Admit and register new students' },
    { name: 'STUDENT_UPDATE', module: 'STUDENTS', description: 'Modify student and parent information' },
    { name: 'STUDENT_DELETE', module: 'STUDENTS', description: 'Deactivate or transfer students' },

    // Staff
    { name: 'STAFF_VIEW', module: 'STAFF', description: 'View staff directory and qualifications' },
    { name: 'STAFF_CREATE', module: 'STAFF', description: 'Add new staff members' },
    { name: 'STAFF_UPDATE', module: 'STAFF', description: 'Modify staff details and assignments' },
    { name: 'STAFF_DELETE', module: 'STAFF', description: 'Deactivate staff accounts' },

    // Academic & Classes
    { name: 'ACADEMIC_MANAGE', module: 'ACADEMIC', description: 'Manage academic years, standards, and classes' },
    { name: 'CLASS_ASSIGN', module: 'ACADEMIC', description: 'Assign teachers to classes and subjects' },

    // Exams & Marks
    { name: 'EXAM_MANAGE', module: 'MARKS', description: 'Create and configure examinations' },
    { name: 'MARKS_VIEW', module: 'MARKS', description: 'View student examination marks' },
    { name: 'MARKS_CREATE', module: 'MARKS', description: 'Enter marks for assigned subjects' },
    { name: 'MARKS_UPDATE', module: 'MARKS', description: 'Modify entered examination marks' },

    // Fees & Payments
    { name: 'FEES_VIEW', module: 'FEES', description: 'View fee structures and student fee records' },
    { name: 'FEES_CREATE', module: 'FEES', description: 'Define fee structures and assign fees' },
    { name: 'FEES_UPDATE', module: 'FEES', description: 'Update fee amounts and due dates' },
    { name: 'PAYMENT_COLLECT', module: 'FEES', description: 'Collect and record fee payments with receipts' },

    // Notifications
    { name: 'NOTIFICATION_SEND', module: 'NOTIFICATIONS', description: 'Compose and dispatch WhatsApp messages' },
    { name: 'NOTIFICATION_VIEW', module: 'NOTIFICATIONS', description: 'Inspect notification dispatch logs' },

    // Reports & Audits
    { name: 'REPORT_VIEW', module: 'REPORTS', description: 'Access academic, marks, and fee reports' },
    { name: 'AUDIT_VIEW', module: 'AUDIT', description: 'View system audit logs and history' },
    { name: 'PERMISSION_MANAGE', module: 'PERMISSIONS', description: 'Grant or revoke teacher permissions' },
  ];

  const permissionsMap = {};
  for (const p of permissionsList) {
    const created = await prisma.permission.create({ data: p });
    permissionsMap[p.name] = created.id;
  }

  // 3. ADMIN USER
  console.log('🌱 Seeding Admin User...');
  const adminPasswordHash = await hashPassword('Admin@123');
  const adminUser = await prisma.user.create({
    data: {
      username: 'admin',
      email: 'admin@srm.edu',
      password_hash: adminPasswordHash,
      role_id: adminRole.id,
      is_active: true,
    },
  });

  // 4. TEACHERS & STAFF
  console.log('🌱 Seeding Staff & Faculty...');
  const teacherPasswordHash = await hashPassword('Teacher@123');

  const staffData = [
    {
      username: 'arun.teacher',
      email: 'arun.teacher@srm.edu',
      employee_code: 'EMP-101',
      first_name: 'Arun',
      last_name: 'Kumar',
      gender: 'Male',
      date_of_birth: new Date('1988-04-12'),
      phone: '+91 9840123456',
      designation: 'Senior Teacher',
      department: 'Mathematics',
      degree: 'Msc',
      qualification: 'M.Ed',
      joining_date: new Date('2018-06-01'),
      perms: ['STUDENT_VIEW', 'MARKS_VIEW', 'MARKS_CREATE', 'MARKS_UPDATE', 'NOTIFICATION_SEND', 'REPORT_VIEW'],
    },
    {
      username: 'rajesh.teacher',
      email: 'rajesh.teacher@srm.edu',
      employee_code: 'EMP-102',
      first_name: 'Rajesh',
      last_name: 'Sharma',
      gender: 'Male',
      date_of_birth: new Date('1990-09-20'),
      phone: '+91 9840234567',
      designation: 'Teacher',
      department: 'Languages',
      degree: 'BA',
      qualification: 'B.Ed',
      joining_date: new Date('2019-07-15'),
      // Note: Rajesh only has MARKS_VIEW (cannot edit marks per requirement example)
      perms: ['STUDENT_VIEW', 'MARKS_VIEW', 'REPORT_VIEW'],
    },
    {
      username: 'priya.teacher',
      email: 'priya.teacher@srm.edu',
      employee_code: 'EMP-103',
      first_name: 'Priya',
      last_name: 'Sundaram',
      gender: 'Female',
      date_of_birth: new Date('1992-11-05'),
      phone: '+91 9840345678',
      designation: 'Teacher',
      department: 'Science',
      degree: 'Msc',
      qualification: 'M.Ed',
      joining_date: new Date('2020-01-10'),
      perms: ['STUDENT_VIEW', 'MARKS_VIEW', 'MARKS_CREATE', 'MARKS_UPDATE', 'NOTIFICATION_SEND', 'REPORT_VIEW'],
    },
    {
      username: 'joseph.teacher',
      email: 'joseph.teacher@srm.edu',
      employee_code: 'EMP-104',
      first_name: 'Joseph',
      last_name: 'Daniel',
      gender: 'Male',
      date_of_birth: new Date('1985-03-25'),
      phone: '+91 9840456789',
      designation: 'Teacher',
      department: 'Computer Science',
      degree: 'Msc',
      qualification: 'B.Ed',
      joining_date: new Date('2016-08-01'),
      perms: ['STUDENT_VIEW', 'MARKS_VIEW', 'MARKS_CREATE', 'MARKS_UPDATE', 'REPORT_VIEW'],
    },
    {
      username: 'lakshmi.teacher',
      email: 'lakshmi.teacher@srm.edu',
      employee_code: 'EMP-105',
      first_name: 'Lakshmi',
      last_name: 'Narayanan',
      gender: 'Female',
      date_of_birth: new Date('1987-07-14'),
      phone: '+91 9840567890',
      designation: 'Teacher',
      department: 'Humanities',
      degree: 'Msc',
      qualification: 'B.Ed',
      joining_date: new Date('2017-06-15'),
      perms: ['STUDENT_VIEW', 'MARKS_VIEW', 'MARKS_CREATE', 'MARKS_UPDATE', 'REPORT_VIEW'],
    },
  ];

  const staffMap = {};

  for (const s of staffData) {
    const user = await prisma.user.create({
      data: {
        username: s.username,
        email: s.email,
        password_hash: teacherPasswordHash,
        role_id: teacherRole.id,
        is_active: true,
      },
    });

    const staff = await prisma.staff.create({
      data: {
        user_id: user.id,
        employee_code: s.employee_code,
        first_name: s.first_name,
        last_name: s.last_name,
        gender: s.gender,
        date_of_birth: s.date_of_birth,
        phone: s.phone,
        email: s.email,
        designation: s.designation,
        department: s.department,
        degree: s.degree,
        qualification: s.qualification,
        joining_date: s.joining_date,
        address: 'Staff Quarters, SRM Campus, Chennai',
      },
    });

    staffMap[s.username] = staff;

    // Grant user-specific permissions
    for (const permName of s.perms) {
      if (permissionsMap[permName]) {
        await prisma.userPermission.create({
          data: {
            user_id: user.id,
            permission_id: permissionsMap[permName],
            granted_by: adminUser.id,
          },
        });
      }
    }
  }

  // 5. ACADEMIC YEARS
  console.log('🌱 Seeding Academic Years...');
  const year2025 = await prisma.academicYear.create({
    data: {
      name: '2025-26',
      start_date: new Date('2025-06-01'),
      end_date: new Date('2026-04-30'),
      is_current: false,
    },
  });

  const year2026 = await prisma.academicYear.create({
    data: {
      name: '2026-27',
      start_date: new Date('2026-06-01'),
      end_date: new Date('2027-04-30'),
      is_current: true,
    },
  });

  const year2027 = await prisma.academicYear.create({
    data: {
      name: '2027-28',
      start_date: new Date('2027-06-01'),
      end_date: new Date('2028-04-30'),
      is_current: false,
    },
  });

  // 6. STANDARDS & DIVISIONS
  console.log('🌱 Seeding Standards (LKG to 12) & Divisions (A to D)...');
  const standardsNames = ['LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  const standardMap = {};

  for (let i = 0; i < standardsNames.length; i++) {
    const std = await prisma.standard.create({
      data: {
        name: standardsNames[i],
        display_order: i,
      },
    });
    standardMap[standardsNames[i]] = std;
  }

  const divisionNames = ['A', 'B', 'C', 'D'];
  const divisionMap = {};
  for (const d of divisionNames) {
    const div = await prisma.division.create({ data: { name: d } });
    divisionMap[d] = div;
  }

  // 7. CLASSES FOR 2026-27
  console.log('🌱 Seeding Classes...');
  const classDefs = [
    { std: 'LKG', div: 'A', room: 'R-01', teacher: 'lakshmi.teacher' },
    { std: 'UKG', div: 'A', room: 'R-02', teacher: 'priya.teacher' },
    { std: '1', div: 'A', room: 'R-101', teacher: 'rajesh.teacher' },
    { std: '1', div: 'B', room: 'R-102', teacher: null },
    { std: '5', div: 'A', room: 'R-201', teacher: 'lakshmi.teacher' },
    { std: '5', div: 'B', room: 'R-202', teacher: null },
    { std: '9', div: 'A', room: 'R-301', teacher: 'rajesh.teacher' },
    { std: '9', div: 'B', room: 'R-302', teacher: null },
    { std: '10', div: 'A', room: 'R-401', teacher: 'arun.teacher' }, // Arun is Class Teacher for 10-A
    { std: '10', div: 'B', room: 'R-402', teacher: 'priya.teacher' },
    { std: '10', div: 'C', room: 'R-403', teacher: null },
    { std: '11', div: 'A', room: 'R-501', teacher: 'joseph.teacher' },
    { std: '11', div: 'B', room: 'R-502', teacher: null },
    { std: '12', div: 'A', room: 'R-601', teacher: 'arun.teacher' },
    { std: '12', div: 'B', room: 'R-602', teacher: null },
    { std: '12', div: 'C', room: 'R-603', teacher: null },
  ];

  const classMap = {};
  for (const cd of classDefs) {
    const std = standardMap[cd.std];
    const div = divisionMap[cd.div];
    const teacher = cd.teacher ? staffMap[cd.teacher] : null;
    const cName = `${cd.std}-${cd.div}`;

    const createdClass = await prisma.class.create({
      data: {
        academic_year_id: year2026.id,
        standard_id: std.id,
        division_id: div.id,
        class_name: cName,
        class_teacher_id: teacher ? teacher.id : null,
        room_number: cd.room,
        is_active: true,
      },
    });
    classMap[cName] = createdClass;

    if (teacher) {
      await prisma.classStaff.create({
        data: {
          class_id: createdClass.id,
          staff_id: teacher.id,
          role: 'CLASS_TEACHER',
        },
      });
    }
  }

  // 8. SUBJECTS
  console.log('🌱 Seeding Subjects...');
  const subjectList = [
    { name: 'English', code: 'ENG', description: 'English Language and Literature' },
    { name: 'Mathematics', code: 'MATH', description: 'Pure and Applied Mathematics' },
    { name: 'Science', code: 'SCI', description: 'General Integrated Science' },
    { name: 'Social Science', code: 'SOC', description: 'History, Geography, and Civics' },
    { name: 'Physics', code: 'PHY', description: 'Core Physics' },
    { name: 'Chemistry', code: 'CHEM', description: 'Core Chemistry' },
    { name: 'Biology', code: 'BIO', description: 'Core Biology' },
    { name: 'Computer Science', code: 'CS', description: 'Programming, Data Structures, and Systems' },
    { name: 'Environmental Studies', code: 'EVS', description: 'Environmental Science for Primary' },
    { name: 'General Knowledge', code: 'GK', description: 'Current Affairs and General Knowledge' },
  ];

  const subjectMap = {};
  for (const s of subjectList) {
    const createdSub = await prisma.subject.create({ data: s });
    subjectMap[s.code] = createdSub;
  }

  // 9. STANDARD - SUBJECT MAPPINGS
  console.log('🌱 Mapping Subjects to Standards...');
  // Primary (LKG, UKG)
  for (const stdName of ['LKG', 'UKG']) {
    for (const code of ['ENG', 'MATH', 'EVS']) {
      await prisma.standardSubject.create({
        data: {
          standard_id: standardMap[stdName].id,
          subject_id: subjectMap[code].id,
          max_marks: 50,
          pass_marks: 18,
        },
      });
    }
  }

  // Standards 1 to 5
  for (const stdName of ['1', '2', '3', '4', '5']) {
    for (const code of ['ENG', 'MATH', 'SCI', 'SOC', 'GK']) {
      await prisma.standardSubject.create({
        data: {
          standard_id: standardMap[stdName].id,
          subject_id: subjectMap[code].id,
          max_marks: 100,
          pass_marks: 35,
        },
      });
    }
  }

  // Standards 6 to 10
  for (const stdName of ['6', '7', '8', '9', '10']) {
    for (const code of ['ENG', 'MATH', 'SCI', 'SOC', 'CS']) {
      await prisma.standardSubject.create({
        data: {
          standard_id: standardMap[stdName].id,
          subject_id: subjectMap[code].id,
          max_marks: 100,
          pass_marks: 35,
        },
      });
    }
  }

  // Standards 11 and 12
  for (const stdName of ['11', '12']) {
    for (const code of ['ENG', 'MATH', 'PHY', 'CHEM', 'CS']) {
      await prisma.standardSubject.create({
        data: {
          standard_id: standardMap[stdName].id,
          subject_id: subjectMap[code].id,
          max_marks: 100,
          pass_marks: 35,
        },
      });
    }
  }

  // 10. STAFF QUALIFICATIONS & CLASS ASSIGNMENTS
  console.log('🌱 Seeding Faculty Subject Assignments...');
  // Staff qualifications
  await prisma.staffSubject.createMany({
    data: [
      { staff_id: staffMap['arun.teacher'].id, subject_id: subjectMap['MATH'].id },
      { staff_id: staffMap['rajesh.teacher'].id, subject_id: subjectMap['ENG'].id },
      { staff_id: staffMap['priya.teacher'].id, subject_id: subjectMap['SCI'].id },
      { staff_id: staffMap['priya.teacher'].id, subject_id: subjectMap['PHY'].id },
      { staff_id: staffMap['joseph.teacher'].id, subject_id: subjectMap['CS'].id },
      { staff_id: staffMap['lakshmi.teacher'].id, subject_id: subjectMap['SOC'].id },
    ],
  });

  // Class 10-A Subject Teachers
  const class10A = classMap['10-A'];
  const class10B = classMap['10-B'];

  await prisma.classStaff.createMany({
    data: [
      // 10-A
      { class_id: class10A.id, staff_id: staffMap['arun.teacher'].id, subject_id: subjectMap['MATH'].id, role: 'SUBJECT_TEACHER' },
      { class_id: class10A.id, staff_id: staffMap['priya.teacher'].id, subject_id: subjectMap['SCI'].id, role: 'SUBJECT_TEACHER' },
      { class_id: class10A.id, staff_id: staffMap['rajesh.teacher'].id, subject_id: subjectMap['ENG'].id, role: 'SUBJECT_TEACHER' },
      { class_id: class10A.id, staff_id: staffMap['lakshmi.teacher'].id, subject_id: subjectMap['SOC'].id, role: 'SUBJECT_TEACHER' },
      { class_id: class10A.id, staff_id: staffMap['joseph.teacher'].id, subject_id: subjectMap['CS'].id, role: 'SUBJECT_TEACHER' },
      // 10-B
      { class_id: class10B.id, staff_id: staffMap['arun.teacher'].id, subject_id: subjectMap['MATH'].id, role: 'SUBJECT_TEACHER' },
      { class_id: class10B.id, staff_id: staffMap['priya.teacher'].id, subject_id: subjectMap['SCI'].id, role: 'SUBJECT_TEACHER' },
      { class_id: class10B.id, staff_id: staffMap['rajesh.teacher'].id, subject_id: subjectMap['ENG'].id, role: 'SUBJECT_TEACHER' },
    ],
  });

  // 11. STUDENTS & ENROLLMENTS (30 Students)
  console.log('🌱 Seeding Students, Parents & Enrollments...');
  const studentSeeds = [
    // 10-A Students
    { adm: 'SRM-2026-1001', first: 'Aarav', last: 'Sharma', gender: 'Male', dob: '2010-05-14', bg: 'O+', city: 'Chennai', class: '10-A', roll: '10A-01', parent: { first: 'Vikram', last: 'Sharma', phone: '+91 9841000001', whatsapp: '+91 9841000001', occ: 'Software Architect' } },
    { adm: 'SRM-2026-1002', first: 'Ananya', last: 'Krishnan', gender: 'Female', dob: '2010-08-22', bg: 'B+', city: 'Chennai', class: '10-A', roll: '10A-02', parent: { first: 'Krishnan', last: 'Subramanian', phone: '+91 9841000002', whatsapp: '+91 9841000002', occ: 'Doctor' } },
    { adm: 'SRM-2026-1003', first: 'Rohan', last: 'Verma', gender: 'Male', dob: '2010-02-10', bg: 'A+', city: 'Chennai', class: '10-A', roll: '10A-03', parent: { first: 'Suresh', last: 'Verma', phone: '+91 9841000003', whatsapp: '+91 9841000003', occ: 'Business Owner' } },
    { adm: 'SRM-2026-1004', first: 'Diya', last: 'Patel', gender: 'Female', dob: '2010-11-30', bg: 'AB+', city: 'Chennai', class: '10-A', roll: '10A-04', parent: { first: 'Bhavesh', last: 'Patel', phone: '+91 9841000004', whatsapp: '+91 9841000004', occ: 'Civil Engineer' } },
    { adm: 'SRM-2026-1005', first: 'Karthik', last: 'Rajan', gender: 'Male', dob: '2010-04-18', bg: 'O-', city: 'Chennai', class: '10-A', roll: '10A-05', parent: { first: 'Rajan', last: 'Narayanan', phone: '+91 9841000005', whatsapp: '+91 9841000005', occ: 'Professor' } },
    { adm: 'SRM-2026-1006', first: 'Meera', last: 'Iyer', gender: 'Female', dob: '2010-07-09', bg: 'A-', city: 'Chennai', class: '10-A', roll: '10A-06', parent: { first: 'Gopal', last: 'Iyer', phone: '+91 9841000006', whatsapp: '+91 9841000006', occ: 'Chartered Accountant' } },
    { adm: 'SRM-2026-1007', first: 'Siddharth', last: 'Menon', gender: 'Male', dob: '2010-09-15', bg: 'B-', city: 'Chennai', class: '10-A', roll: '10A-07', parent: { first: 'Murali', last: 'Menon', phone: '+91 9841000007', whatsapp: '+91 9841000007', occ: 'Bank Manager' } },
    { adm: 'SRM-2026-1008', first: 'Pooja', last: 'Reddy', gender: 'Female', dob: '2010-03-27', bg: 'O+', city: 'Chennai', class: '10-A', roll: '10A-08', parent: { first: 'Prasad', last: 'Reddy', phone: '+91 9841000008', whatsapp: '+91 9841000008', occ: 'Advocate' } },

    // 10-B Students
    { adm: 'SRM-2026-1009', first: 'Aditya', last: 'Kapoor', gender: 'Male', dob: '2010-06-12', bg: 'B+', city: 'Chennai', class: '10-B', roll: '10B-01', parent: { first: 'Rajiv', last: 'Kapoor', phone: '+91 9841000009', whatsapp: '+91 9841000009', occ: 'Merchant Navy' } },
    { adm: 'SRM-2026-1010', first: 'Sanya', last: 'Gupta', gender: 'Female', dob: '2010-01-20', bg: 'A+', city: 'Chennai', class: '10-B', roll: '10B-02', parent: { first: 'Alok', last: 'Gupta', phone: '+91 9841000010', whatsapp: '+91 9841000010', occ: 'Architect' } },
    { adm: 'SRM-2026-1011', first: 'Varun', last: 'Chopra', gender: 'Male', dob: '2010-10-05', bg: 'O+', city: 'Chennai', class: '10-B', roll: '10B-03', parent: { first: 'Deepak', last: 'Chopra', phone: '+91 9841000011', whatsapp: '+91 9841000011', occ: 'Entrepreneur' } },

    // 12-A Students
    { adm: 'SRM-2026-1201', first: 'Harish', last: 'Chandran', gender: 'Male', dob: '2008-08-11', bg: 'A+', city: 'Chennai', class: '12-A', roll: '12A-01', parent: { first: 'Chandran', last: 'K', phone: '+91 9841000012', whatsapp: '+91 9841000012', occ: 'Government Officer' } },
    { adm: 'SRM-2026-1202', first: 'Kavya', last: 'Sundar', gender: 'Female', dob: '2008-12-04', bg: 'O+', city: 'Chennai', class: '12-A', roll: '12A-02', parent: { first: 'Sundar', last: 'R', phone: '+91 9841000013', whatsapp: '+91 9841000013', occ: 'Scientist' } },
    { adm: 'SRM-2026-1203', first: 'Pranav', last: 'Mukund', gender: 'Male', dob: '2008-03-19', bg: 'B+', city: 'Chennai', class: '12-A', roll: '12A-03', parent: { first: 'Mukund', last: 'V', phone: '+91 9841000014', whatsapp: '+91 9841000014', occ: 'Director' } },

    // 1-A Primary Students
    { adm: 'SRM-2026-0101', first: 'Ishaan', last: 'Dev', gender: 'Male', dob: '2019-09-14', bg: 'O+', city: 'Chennai', class: '1-A', roll: '1A-01', parent: { first: 'Devraj', last: 'M', phone: '+91 9841000015', whatsapp: '+91 9841000015', occ: 'Software Engineer' } },
    { adm: 'SRM-2026-0102', first: 'Tara', last: 'Bose', gender: 'Female', dob: '2019-11-28', bg: 'A+', city: 'Chennai', class: '1-A', roll: '1A-02', parent: { first: 'Anupam', last: 'Bose', phone: '+91 9841000016', whatsapp: '+91 9841000016', occ: 'Financial Analyst' } },

    // LKG-A Students
    { adm: 'SRM-2026-0001', first: 'Vivaan', last: 'Rao', gender: 'Male', dob: '2022-04-10', bg: 'B+', city: 'Chennai', class: 'LKG-A', roll: 'LKG-01', parent: { first: 'Madhav', last: 'Rao', phone: '+91 9841000017', whatsapp: '+91 9841000017', occ: 'Product Manager' } },
    { adm: 'SRM-2026-0002', first: 'Anvi', last: 'Gowda', gender: 'Female', dob: '2022-06-25', bg: 'O+', city: 'Chennai', class: 'LKG-A', roll: 'LKG-02', parent: { first: 'Prakash', last: 'Gowda', phone: '+91 9841000018', whatsapp: '+91 9841000018', occ: 'Consultant' } },
  ];

  const enrollmentRecords = [];

  for (const st of studentSeeds) {
    const student = await prisma.student.create({
      data: {
        admission_number: st.adm,
        first_name: st.first,
        last_name: st.last,
        gender: st.gender,
        date_of_birth: new Date(st.dob),
        blood_group: st.bg,
        address: 'SRM Nagar, Potheri, Kattankulathur, Chennai',
        city: st.city,
        state: 'Tamil Nadu',
        pincode: '603203',
        admission_date: new Date('2026-06-01'),
        status: 'ACTIVE',
      },
    });

    const parent = await prisma.parent.create({
      data: {
        first_name: st.parent.first,
        last_name: st.parent.last,
        relationship: 'Father',
        phone: st.parent.phone,
        whatsapp_number: st.parent.whatsapp,
        email: `${st.first.toLowerCase()}.${st.last.toLowerCase()}.parent@gmail.com`,
        occupation: st.parent.occ,
        address: 'SRM Nagar, Chennai',
      },
    });

    await prisma.studentParent.create({
      data: {
        student_id: student.id,
        parent_id: parent.id,
        is_primary: true,
        receives_notifications: true,
      },
    });

    const targetClass = classMap[st.class];
    const enrollment = await prisma.studentEnrollment.create({
      data: {
        student_id: student.id,
        academic_year_id: year2026.id,
        class_id: targetClass.id,
        roll_number: st.roll,
        enrollment_date: new Date('2026-06-05'),
        status: 'ACTIVE',
      },
    });

    enrollmentRecords.push({ ...enrollment, student, className: st.class, parent });
  }

  // 12. EXAMINATIONS
  console.log('🌱 Seeding Exams...');
  const ut1 = await prisma.exam.create({
    data: {
      academic_year_id: year2026.id,
      name: 'Unit Test 1',
      exam_type: 'INTERNAL',
      start_date: new Date('2026-07-15'),
      end_date: new Date('2026-07-22'),
    },
  });

  const quarterly = await prisma.exam.create({
    data: {
      academic_year_id: year2026.id,
      name: 'Quarterly Examination',
      exam_type: 'QUARTERLY',
      start_date: new Date('2026-09-20'),
      end_date: new Date('2026-09-30'),
    },
  });

  const halfYearly = await prisma.exam.create({
    data: {
      academic_year_id: year2026.id,
      name: 'Half Yearly Examination',
      exam_type: 'HALF_YEARLY',
      start_date: new Date('2026-12-10'),
      end_date: new Date('2026-12-22'),
    },
  });

  const annualExam = await prisma.exam.create({
    data: {
      academic_year_id: year2026.id,
      name: 'Annual Examination',
      exam_type: 'ANNUAL',
      start_date: new Date('2027-03-15'),
      end_date: new Date('2027-03-30'),
    },
  });

  // 13. MARKS FOR 10-A (Unit Test 1)
  console.log('🌱 Seeding Marks for Class 10-A...');
  const class10AEnrollments = enrollmentRecords.filter((e) => e.className === '10-A');
  const subjects10A = [
    { code: 'ENG', max: 100 },
    { code: 'MATH', max: 100 },
    { code: 'SCI', max: 100 },
    { code: 'SOC', max: 100 },
    { code: 'CS', max: 100 },
  ];

  const sampleScores = [
    { ENG: 88, MATH: 96, SCI: 92, SOC: 85, CS: 98 },
    { ENG: 92, MATH: 89, SCI: 95, SOC: 90, CS: 94 },
    { ENG: 75, MATH: 82, SCI: 78, SOC: 70, CS: 85 },
    { ENG: 85, MATH: 91, SCI: 88, SOC: 82, CS: 90 },
    { ENG: 68, MATH: 74, SCI: 70, SOC: 65, CS: 80 },
    { ENG: 95, MATH: 98, SCI: 96, SOC: 92, CS: 99 },
    { ENG: 72, MATH: 65, SCI: 68, SOC: 74, CS: 75 },
    { ENG: 80, MATH: 85, SCI: 82, SOC: 79, CS: 88 },
  ];

  for (let i = 0; i < class10AEnrollments.length; i++) {
    const enr = class10AEnrollments[i];
    const scores = sampleScores[i] || sampleScores[0];

    for (const sub of subjects10A) {
      const markObt = scores[sub.code];
      const maxM = sub.max;
      let grade = 'A';
      if (markObt >= 90) grade = 'A+';
      else if (markObt >= 80) grade = 'A';
      else if (markObt >= 70) grade = 'B+';
      else if (markObt >= 60) grade = 'B';
      else if (markObt >= 50) grade = 'C';
      else if (markObt >= 35) grade = 'D';
      else grade = 'F';

      await prisma.mark.create({
        data: {
          student_enrollment_id: enr.id,
          exam_id: ut1.id,
          subject_id: subjectMap[sub.code].id,
          marks_obtained: markObt,
          max_marks: maxM,
          grade,
          remarks: markObt >= 90 ? 'Outstanding Performance' : 'Good Effort',
          entered_by: staffMap['arun.teacher'].user_id,
        },
      });
    }
  }

  // 14. FEE TYPES, STUDENT FEES & PAYMENTS
  console.log('🌱 Seeding Fee Types & Payments...');
  const tuitionFeeType = await prisma.feeType.create({
    data: { name: 'Tuition Fee - Term 1', description: 'Academic curriculum and laboratory tuition' },
  });

  const transportFeeType = await prisma.feeType.create({
    data: { name: 'Transport Fee - Term 1', description: 'School bus transportation service' },
  });

  const examFeeType = await prisma.feeType.create({
    data: { name: 'Annual Examination Fee', description: 'Standard board and internal evaluation fee' },
  });

  for (const enr of enrollmentRecords) {
    // Assign Tuition Fee: Rs. 25,000
    const tFee = await prisma.studentFee.create({
      data: {
        student_enrollment_id: enr.id,
        fee_type_id: tuitionFeeType.id,
        amount: 25000.00,
        due_date: new Date('2026-08-30'),
        status: enr.roll_number.endsWith('01') || enr.roll_number.endsWith('02') ? 'PAID' : 'PARTIAL',
      },
    });

    if (tFee.status === 'PAID') {
      await prisma.feePayment.create({
        data: {
          student_fee_id: tFee.id,
          amount_paid: 25000.00,
          payment_date: new Date('2026-07-10'),
          payment_method: 'UPI',
          transaction_reference: `UPI-${enr.id}-25000`,
          received_by: adminUser.id,
        },
      });
    } else if (tFee.status === 'PARTIAL') {
      await prisma.feePayment.create({
        data: {
          student_fee_id: tFee.id,
          amount_paid: 15000.00,
          payment_date: new Date('2026-07-15'),
          payment_method: 'BANK_TRANSFER',
          transaction_reference: `TXN-${enr.id}-15000`,
          received_by: adminUser.id,
        },
      });
    }

    // Assign Exam Fee: Rs. 3,500
    await prisma.studentFee.create({
      data: {
        student_enrollment_id: enr.id,
        fee_type_id: examFeeType.id,
        amount: 3500.00,
        due_date: new Date('2026-09-15'),
        status: 'PENDING',
      },
    });
  }

  // 15. SAMPLE AUDIT LOGS & NOTIFICATIONS
  console.log('🌱 Seeding Sample Audit Logs & Notifications...');
  await prisma.auditLog.createMany({
    data: [
      {
        user_id: adminUser.id,
        action: 'SYSTEM_INITIALIZATION',
        entity_type: 'System',
        entity_id: 1,
        new_data: { status: 'INITIALIZED', academic_year: '2026-27' },
        ip_address: '127.0.0.1',
      },
      {
        user_id: adminUser.id,
        action: 'CLASS_ASSIGNMENT',
        entity_type: 'ClassStaff',
        entity_id: class10A.id,
        new_data: { class_name: '10-A', class_teacher: 'Arun Kumar' },
        ip_address: '127.0.0.1',
      },
      {
        user_id: staffMap['arun.teacher'].user_id,
        action: 'ENTER_MARKS',
        entity_type: 'Mark',
        entity_id: ut1.id,
        new_data: { exam: 'Unit Test 1', class: '10-A', subject: 'Mathematics' },
        ip_address: '127.0.0.1',
      },
    ],
  });

  const firstStudent = enrollmentRecords[0];
  const sampleNotif = await prisma.notification.create({
    data: {
      student_id: firstStudent.student.id,
      parent_id: firstStudent.parent.id,
      type: 'FEE_PENDING',
      title: 'Fee Reminder Notice',
      message: `Dear ${firstStudent.parent.first_name}, this is a reminder regarding the pending term fee of Rs. 3,500 for ${firstStudent.student.first_name} ${firstStudent.student.last_name} (Class ${firstStudent.className}). Please complete the payment before 15-Sep-2026.`,
      status: 'SENT',
    },
  });

  await prisma.notificationLog.create({
    data: {
      notification_id: sampleNotif.id,
      phone_number: firstStudent.parent.whatsapp_number,
      provider: 'MOCK_WHATSAPP',
      provider_message_id: 'mock_msg_init_001',
      status: 'DELIVERED',
    },
  });

  console.log('✅ SRM Database Seeding Completed Successfully!');
  console.log('====================================================');
  console.log('🔑 DEFAULT LOGIN CREDENTIALS:');
  console.log('👑 Admin:   admin@srm.edu           / Admin@123');
  console.log('👨‍🏫 Teacher: arun.teacher@srm.edu   / Teacher@123 (Full marks editor for 10-A & 10-B)');
  console.log('👨‍🏫 Teacher: rajesh.teacher@srm.edu / Teacher@123 (View-only marks for 10-A)');
  console.log('👩‍🏫 Teacher: priya.teacher@srm.edu  / Teacher@123');
  console.log('👨‍🏫 Teacher: joseph.teacher@srm.edu / Teacher@123');
  console.log('👩‍🏫 Teacher: lakshmi.teacher@srm.edu/ Teacher@123');
  console.log('====================================================');
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
