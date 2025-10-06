import { Router, Response } from 'express';
import db from '../database.js';
import { authenticateToken, AuthRequest, requireAdmin } from '../middleware/auth.js';

const router = Router();

// Get all applications for current user
router.get('/', authenticateToken, (req: AuthRequest, res: Response) => {
  try {
    const applications = db.prepare(`
      SELECT id, status, form_data, created_at, updated_at, submitted_at
      FROM applications
      WHERE user_id = ?
      ORDER BY updated_at DESC
    `).all(req.user!.id);

    const parsed = applications.map((app: any) => ({
      ...app,
      form_data: JSON.parse(app.form_data)
    }));

    res.json(parsed);
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single application
router.get('/:id', authenticateToken, (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    
    const application = db.prepare(`
      SELECT a.*, u.name as user_name, u.email as user_email
      FROM applications a
      JOIN users u ON a.user_id = u.id
      WHERE a.id = ?
    `).get(id) as any;

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    // Check permissions - user can only view their own unless admin
    if (application.user_id !== req.user!.id && req.user!.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    application.form_data = JSON.parse(application.form_data);

    res.json(application);
  } catch (error) {
    console.error('Get application error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new application
router.post('/', authenticateToken, (req: AuthRequest, res: Response) => {
  try {
    const { form_data } = req.body;

    const result = db.prepare(`
      INSERT INTO applications (user_id, status, form_data)
      VALUES (?, 'draft', ?)
    `).run(req.user!.id, JSON.stringify(form_data || {}));

    // Log action
    db.prepare(`
      INSERT INTO audit_log (application_id, user_id, action, details)
      VALUES (?, ?, 'created', 'Application created')
    `).run(result.lastInsertRowid, req.user!.id);

    const application = db.prepare('SELECT * FROM applications WHERE id = ?')
      .get(result.lastInsertRowid) as any;

    application.form_data = JSON.parse(application.form_data);

    res.status(201).json(application);
  } catch (error) {
    console.error('Create application error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update application
router.put('/:id', authenticateToken, (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { form_data, status } = req.body;

    const application = db.prepare('SELECT * FROM applications WHERE id = ?').get(id) as any;

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    // Check permissions
    if (application.user_id !== req.user!.id && req.user!.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Don't allow editing submitted applications unless admin
    if (application.status === 'submitted' && req.user!.role !== 'admin') {
      return res.status(403).json({ error: 'Cannot edit submitted application' });
    }

    const updates: any = { updated_at: new Date().toISOString() };
    if (form_data !== undefined) updates.form_data = JSON.stringify(form_data);
    if (status !== undefined) updates.status = status;

    const setClauses = Object.keys(updates).map(key => `${key} = ?`).join(', ');
    const values = Object.values(updates);

    db.prepare(`UPDATE applications SET ${setClauses} WHERE id = ?`)
      .run(...values, id);

    // Log action
    db.prepare(`
      INSERT INTO audit_log (application_id, user_id, action, details)
      VALUES (?, ?, 'updated', ?)
    `).run(id, req.user!.id, `Application updated by ${req.user!.email}`);

    const updated = db.prepare('SELECT * FROM applications WHERE id = ?').get(id) as any;
    updated.form_data = JSON.parse(updated.form_data);

    res.json(updated);
  } catch (error) {
    console.error('Update application error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Submit application
router.post('/:id/submit', authenticateToken, (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const application = db.prepare('SELECT * FROM applications WHERE id = ?').get(id) as any;

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    // Check permissions
    if (application.user_id !== req.user!.id && req.user!.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    if (application.status === 'submitted') {
      return res.status(400).json({ error: 'Application already submitted' });
    }

    db.prepare(`
      UPDATE applications 
      SET status = 'submitted', submitted_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(id);

    // Log action
    db.prepare(`
      INSERT INTO audit_log (application_id, user_id, action, details)
      VALUES (?, ?, 'submitted', 'Application submitted')
    `).run(id, req.user!.id);

    const updated = db.prepare('SELECT * FROM applications WHERE id = ?').get(id) as any;
    updated.form_data = JSON.parse(updated.form_data);

    res.json(updated);
  } catch (error) {
    console.error('Submit application error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete application (soft delete)
router.delete('/:id', authenticateToken, (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const application = db.prepare('SELECT * FROM applications WHERE id = ?').get(id) as any;

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    // Check permissions
    if (application.user_id !== req.user!.id && req.user!.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    // For now, hard delete. In production, you'd set a deleted_at flag
    db.prepare('DELETE FROM applications WHERE id = ?').run(id);

    // Log action
    db.prepare(`
      INSERT INTO audit_log (application_id, user_id, action, details)
      VALUES (?, ?, 'deleted', 'Application deleted')
    `).run(id, req.user!.id);

    res.json({ message: 'Application deleted successfully' });
  } catch (error) {
    console.error('Delete application error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Admin: Get all applications
router.get('/admin/all', authenticateToken, requireAdmin, (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.query;

    let query = `
      SELECT a.*, u.name as user_name, u.email as user_email
      FROM applications a
      JOIN users u ON a.user_id = u.id
    `;

    const params: any[] = [];

    if (status) {
      query += ' WHERE a.status = ?';
      params.push(status);
    }

    query += ' ORDER BY a.updated_at DESC';

    const applications = db.prepare(query).all(...params);

    const parsed = applications.map((app: any) => ({
      id: app.id,
      user_id: app.user_id,
      status: app.status,
      form_data: JSON.parse(app.form_data),
      created_at: app.created_at,
      updated_at: app.updated_at,
      submitted_at: app.submitted_at,
      user: {
        name: app.user_name,
        email: app.user_email
      }
    }));

    res.json(parsed);
  } catch (error) {
    console.error('Admin get applications error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
