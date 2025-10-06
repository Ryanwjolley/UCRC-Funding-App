import db from './database.js';

// Sample form data for different applications
const sampleApplications = [
  {
    user_id: 2, // applicantA@example.com
    status: 'draft',
    form_data: JSON.stringify({
      // Eligibility
      eligibilityChecks: [true, true, true, true, true, true],
      
      // Applicant Info
      primaryContact: {
        name: 'John Smith',
        title: 'Water Manager',
        phone: '(435) 722-5555',
        email: 'applicantA@example.com',
        mailingAddress: '123 River Road, Roosevelt, UT 84066'
      },
      
      // Project Info
      projectType: 'New Installation',
      projectName: 'Green River Diversion Telemetry',
      deviceType: 'Parshall Flume with Ultrasonic Sensor',
      deviceSize: '3-foot throat width',
      waterBodyName: 'Green River',
      structureType: 'Diversion Canal',
      flowRate: 25.5,
      canalWidth: 12,
      canalDepth: 4,
      canalSlope: 0.5,
      canalLining: 'Concrete',
      monthsOfUse: 7,
      monthsDescription: 'April through October',
      
      // Location
      latitude: 40.2991,
      longitude: -109.9893,
      transbasinDiversion: 'no',
      
      // Water Rights
      waterRightNumber: 'WR-12345',
      waterRightFlowRate: '25.5 CFS',
      waterRightOwner: 'Green River Irrigation Company',
      pointOfDiversion: 'NE 1/4, Section 12, T4S, R6E'
    }),
    created_at: '2025-09-15 10:30:00',
    updated_at: '2025-10-05 14:22:00'
  },
  {
    user_id: 2, // applicantA@example.com
    status: 'submitted',
    form_data: JSON.stringify({
      eligibilityChecks: [true, true, true, true, true, true],
      
      primaryContact: {
        name: 'John Smith',
        title: 'Water Manager',
        phone: '(435) 722-5555',
        email: 'applicantA@example.com',
        mailingAddress: '123 River Road, Roosevelt, UT 84066'
      },
      
      projectType: 'Upgrade/Replacement',
      projectName: 'Duchesne River Flow Meter Installation',
      deviceType: 'Electromagnetic Flow Meter',
      deviceSize: '24-inch',
      waterBodyName: 'Duchesne River',
      structureType: 'Headgate',
      flowRate: 45.0,
      canalWidth: 18,
      canalDepth: 5,
      canalSlope: 0.3,
      canalLining: 'Earth',
      monthsOfUse: 6,
      monthsDescription: 'May through October',
      
      latitude: 40.1633,
      longitude: -110.4026,
      transbasinDiversion: 'no',
      
      waterRightNumber: 'WR-67890',
      waterRightFlowRate: '45.0 CFS',
      waterRightOwner: 'Duchesne Water Users Association',
      pointOfDiversion: 'SW 1/4, Section 8, T3S, R4W',
      
      certifications: [true, true, true, true, true, true, true]
    }),
    created_at: '2025-08-20 09:15:00',
    updated_at: '2025-09-28 16:45:00',
    submitted_at: '2025-09-28 16:45:00'
  },
  {
    user_id: 3, // applicantB@example.com
    status: 'draft',
    form_data: JSON.stringify({
      eligibilityChecks: [true, true, true, true, true, true],
      
      primaryContact: {
        name: 'Sarah Johnson',
        title: 'Irrigation District Manager',
        phone: '(435) 587-3456',
        email: 'applicantB@example.com',
        mailingAddress: '456 Canal Street, Monticello, UT 84535'
      },
      
      projectType: 'New Installation',
      projectName: 'Price River Measurement Device',
      deviceType: 'Cutthroat Flume',
      deviceSize: '4-foot',
      waterBodyName: 'Price River',
      structureType: 'Diversion Structure',
      flowRate: 18.2,
      canalWidth: 10,
      canalDepth: 3.5,
      canalSlope: 0.4,
      canalLining: 'Shotcrete',
      monthsOfUse: 8,
      monthsDescription: 'March through October',
      
      latitude: 39.7452,
      longitude: -110.7821,
      transbasinDiversion: 'yes',
      
      waterRightNumber: 'WR-11223',
      waterRightFlowRate: '18.2 CFS'
    }),
    created_at: '2025-09-10 11:20:00',
    updated_at: '2025-09-15 13:10:00'
  },
  {
    user_id: 3, // applicantB@example.com
    status: 'submitted',
    form_data: JSON.stringify({
      eligibilityChecks: [true, true, true, true, true, true],
      
      primaryContact: {
        name: 'Sarah Johnson',
        title: 'Irrigation District Manager',
        phone: '(435) 587-3456',
        email: 'applicantB@example.com',
        mailingAddress: '456 Canal Street, Monticello, UT 84535'
      },
      
      projectType: 'New Installation',
      projectName: 'San Juan River Telemetry System',
      deviceType: 'Parshall Flume with Pressure Transducer',
      deviceSize: '5-foot throat',
      waterBodyName: 'San Juan River',
      structureType: 'Canal Headgate',
      flowRate: 32.8,
      canalWidth: 15,
      canalDepth: 4.5,
      canalSlope: 0.35,
      canalLining: 'Concrete',
      monthsOfUse: 7,
      monthsDescription: 'April through October',
      
      latitude: 37.2753,
      longitude: -109.5498,
      transbasinDiversion: 'no',
      
      waterRightNumber: 'WR-44556',
      waterRightFlowRate: '32.8 CFS',
      waterRightOwner: 'San Juan Water Conservancy District',
      pointOfDiversion: 'NW 1/4, Section 22, T12S, R8E',
      
      certifications: [true, true, true, true, true, true, true]
    }),
    created_at: '2025-07-05 08:00:00',
    updated_at: '2025-08-12 15:30:00',
    submitted_at: '2025-08-12 15:30:00'
  },
  {
    user_id: 2, // applicantA@example.com
    status: 'draft',
    form_data: JSON.stringify({
      eligibilityChecks: [true, true, true, true, true, true],
      
      primaryContact: {
        name: 'John Smith',
        title: 'Water Manager',
        phone: '(435) 722-5555',
        email: 'applicantA@example.com',
        mailingAddress: '123 River Road, Roosevelt, UT 84066'
      },
      
      projectType: 'Self-Install',
      projectName: 'Strawberry River Monitor Upgrade',
      deviceType: 'Acoustic Doppler Velocity Meter',
      waterBodyName: 'Strawberry River'
    }),
    created_at: '2025-10-01 14:00:00',
    updated_at: '2025-10-03 10:15:00'
  }
];

export function seedApplications(force: boolean = false) {
  console.log('🌱 Seeding sample applications...');
  
  try {
    // Check if we already have applications
    const existingCount = db.prepare('SELECT COUNT(*) as count FROM applications').get() as { count: number };
    
    if (existingCount.count > 0 && !force) {
      console.log(`   Database already has ${existingCount.count} applications. Skipping seed.`);
      console.log('   To seed sample data, delete udmt.db and restart the server.');
      return;
    }
    
    // If forcing, clear existing applications
    if (force && existingCount.count > 0) {
      db.prepare('DELETE FROM audit_log').run();
      db.prepare('DELETE FROM files').run();
      db.prepare('DELETE FROM applications').run();
      console.log(`   Cleared ${existingCount.count} existing applications for re-seeding.`);
    }

    const insertApp = db.prepare(`
      INSERT INTO applications (user_id, status, form_data, created_at, updated_at, submitted_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const insertAudit = db.prepare(`
      INSERT INTO audit_log (application_id, user_id, action, details, timestamp)
      VALUES (?, ?, ?, ?, ?)
    `);

    for (const app of sampleApplications) {
      const result = insertApp.run(
        app.user_id,
        app.status,
        app.form_data,
        app.created_at,
        app.updated_at,
        app.status === 'submitted' ? app.submitted_at : null
      );

      // Add audit log entry
      insertAudit.run(
        result.lastInsertRowid,
        app.user_id,
        app.status === 'submitted' ? 'submitted' : 'created',
        `Application ${app.status === 'submitted' ? 'submitted' : 'created'}`,
        app.status === 'submitted' ? app.submitted_at : app.created_at
      );
    }

    console.log(`✅ Successfully seeded ${sampleApplications.length} sample applications`);
    console.log('   - 3 Draft applications');
    console.log('   - 2 Submitted applications');
  } catch (error) {
    console.error('❌ Error seeding applications:', error);
  }
}
