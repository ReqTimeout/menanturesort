/**
 * storage.ts — D1 query helpers for leads + events + activities
 *
 * All queries are prepared statements for performance + SQL injection safety.
 */

export interface Lead {
  id: number;
  event_id: string;
  name: string | null;
  phone: string | null;
  email: string | null;
  villa_pref: string | null;
  source: string | null;
  page_path: string | null;
  message: string | null;
  ip_country: string | null;
  ip_city: string | null;
  user_agent: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  referer: string | null;
  status: string;
  score: number;
  assigned_to: string | null;
  notes: string | null;
  tags: string | null;
  last_contacted_at: number | null;
  last_activity_at: number | null;
  created_at: number;
  updated_at: number;
}

export interface LeadInput {
  event_id: string;
  name?: string;
  phone?: string;
  email?: string;
  villa_pref?: string;
  source?: string;
  page_path?: string;
  message?: string;
  ip_country?: string;
  ip_city?: string;
  user_agent?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  referer?: string;
}

export interface EventInput {
  event_id: string;
  event_name: string;
  event_time: number;
  user_email_hash?: string;
  user_phone_hash?: string;
  user_name_hash?: string;
  ip_country?: string;
  ip_city?: string;
  user_agent?: string;
  page_path?: string;
  custom_data?: string;          // JSON string
  lead_id?: number;
  meta_event_id?: string;
  meta_response_code?: number;
  meta_response_body?: string;
  trigger_reason?: string;
}

// ============================================================================
// Leads
// ============================================================================

export async function insertLead(db: D1Database, lead: LeadInput): Promise<number> {
  const result = await db.prepare(`
    INSERT INTO leads (
      event_id, name, phone, email, villa_pref, source, page_path, message,
      ip_country, ip_city, user_agent, utm_source, utm_medium, utm_campaign,
      utm_content, utm_term, referer
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(event_id) DO UPDATE SET
      name = COALESCE(excluded.name, leads.name),
      phone = COALESCE(excluded.phone, leads.phone),
      email = COALESCE(excluded.email, leads.email),
      updated_at = unixepoch()
    RETURNING id
  `).bind(
    lead.event_id,
    lead.name ?? null,
    lead.phone ?? null,
    lead.email ?? null,
    lead.villa_pref ?? null,
    lead.source ?? null,
    lead.page_path ?? null,
    lead.message ?? null,
    lead.ip_country ?? null,
    lead.ip_city ?? null,
    lead.user_agent ?? null,
    lead.utm_source ?? null,
    lead.utm_medium ?? null,
    lead.utm_campaign ?? null,
    lead.utm_content ?? null,
    lead.utm_term ?? null,
    lead.referer ?? null,
  ).first<{ id: number }>();

  return result?.id ?? 0;
}

export async function findLeadById(db: D1Database, id: number): Promise<Lead | null> {
  return db.prepare(`SELECT * FROM leads WHERE id = ?`).bind(id).first<Lead>();
}

export async function findLeadByPhone(db: D1Database, phone: string): Promise<Lead | null> {
  return db.prepare(`SELECT * FROM leads WHERE phone = ? ORDER BY id DESC LIMIT 1`).bind(phone).first<Lead>();
}

export async function findLeadByEmail(db: D1Database, email: string): Promise<Lead | null> {
  return db.prepare(`SELECT * FROM leads WHERE email = ? ORDER BY id DESC LIMIT 1`).bind(email).first<Lead>();
}

export interface ListLeadsOptions {
  status?: string;
  source?: string;
  limit?: number;
  offset?: number;
  search?: string;
}

export async function listLeads(db: D1Database, opts: ListLeadsOptions = {}): Promise<Lead[]> {
  const limit = Math.min(opts.limit ?? 50, 200);
  const offset = opts.offset ?? 0;

  const conditions: string[] = [];
  const bindings: any[] = [];

  if (opts.status) {
    conditions.push('status = ?');
    bindings.push(opts.status);
  }
  if (opts.source) {
    conditions.push('source = ?');
    bindings.push(opts.source);
  }
  if (opts.search) {
    conditions.push('(name LIKE ? OR phone LIKE ? OR email LIKE ?)');
    const like = `%${opts.search}%`;
    bindings.push(like, like, like);
  }

  const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
  const query = `SELECT * FROM leads ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`;

  return db.prepare(query).bind(...bindings, limit, offset).all<Lead>();
}

export async function countLeads(db: D1Database, opts: ListLeadsOptions = {}): Promise<number> {
  const conditions: string[] = [];
  const bindings: any[] = [];

  if (opts.status) {
    conditions.push('status = ?');
    bindings.push(opts.status);
  }
  if (opts.source) {
    conditions.push('source = ?');
    bindings.push(opts.source);
  }

  const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
  const result = await db.prepare(`SELECT COUNT(*) as count FROM leads ${where}`).bind(...bindings).first<{ count: number }>();
  return result?.count ?? 0;
}

export async function updateLead(
  db: D1Database,
  id: number,
  updates: Partial<Pick<Lead, 'status' | 'notes' | 'assigned_to' | 'score' | 'tags' | 'last_contacted_at'>>,
): Promise<boolean> {
  const fields: string[] = [];
  const bindings: any[] = [];

  for (const [key, value] of Object.entries(updates)) {
    if (value !== undefined) {
      fields.push(`${key} = ?`);
      bindings.push(value);
    }
  }

  if (fields.length === 0) return false;
  fields.push('updated_at = unixepoch()');

  const result = await db.prepare(
    `UPDATE leads SET ${fields.join(', ')} WHERE id = ?`,
  ).bind(...bindings, id).run();

  return result.success;
}

// ============================================================================
// Events
// ============================================================================

export async function insertEvent(db: D1Database, event: EventInput): Promise<number> {
  const result = await db.prepare(`
    INSERT INTO events (
      event_id, event_name, event_time,
      user_email_hash, user_phone_hash, user_name_hash,
      ip_country, ip_city, user_agent, page_path, custom_data,
      lead_id, meta_event_id, meta_response_code, meta_response_body,
      trigger_reason
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(event_id) DO NOTHING
    RETURNING id
  `).bind(
    event.event_id,
    event.event_name,
    event.event_time,
    event.user_email_hash ?? null,
    event.user_phone_hash ?? null,
    event.user_name_hash ?? null,
    event.ip_country ?? null,
    event.ip_city ?? null,
    event.user_agent ?? null,
    event.page_path ?? null,
    event.custom_data ?? null,
    event.lead_id ?? null,
    event.meta_event_id ?? null,
    event.meta_response_code ?? null,
    event.meta_response_body ?? null,
    event.trigger_reason ?? null,
  ).first<{ id: number }>();

  return result?.id ?? 0;
}

// ============================================================================
// Activities
// ============================================================================

export interface ActivityInput {
  lead_id: number;
  activity_type: 'note' | 'call' | 'email' | 'meeting' | 'status_change' | 'whatsapp';
  description?: string;
  metadata?: Record<string, any>;
  created_by?: string;
}

export async function insertActivity(db: D1Database, activity: ActivityInput): Promise<number> {
  const result = await db.prepare(`
    INSERT INTO activities (lead_id, activity_type, description, metadata, created_by)
    VALUES (?, ?, ?, ?, ?)
    RETURNING id
  `).bind(
    activity.lead_id,
    activity.activity_type,
    activity.description ?? null,
    activity.metadata ? JSON.stringify(activity.metadata) : null,
    activity.created_by ?? null,
  ).first<{ id: number }>();

  return result?.id ?? 0;
}

export interface Activity {
  id: number;
  lead_id: number;
  activity_type: string;
  description: string | null;
  metadata: string | null;
  created_by: string | null;
  created_at: number;
}

export async function listActivities(db: D1Database, leadId: number): Promise<Activity[]> {
  return db.prepare(
    `SELECT * FROM activities WHERE lead_id = ? ORDER BY created_at DESC LIMIT 100`,
  ).bind(leadId).all<Activity>();
}

// ============================================================================
// Stats
// ============================================================================

export interface DashboardStats {
  total_leads: number;
  new_leads: number;
  qualified_leads: number;
  won_leads: number;
  leads_today: number;
  leads_this_week: number;
  leads_this_month: number;
  top_sources: Array<{ source: string; count: number }>;
  top_villa_prefs: Array<{ villa_pref: string; count: number }>;
  conversion_rate: number;       // 0-1
  total_events: number;
  events_today: number;
}

export async function getDashboardStats(db: D1Database): Promise<DashboardStats> {
  const now = Math.floor(Date.now() / 1000);
  const dayAgo = now - 86400;
  const weekAgo = now - 86400 * 7;
  const monthAgo = now - 86400 * 30;

  const [
    total,
    newCount,
    qualified,
    won,
    todayCount,
    weekCount,
    monthCount,
    sources,
    villaPrefs,
    totalEvents,
    eventsToday,
  ] = await Promise.all([
    db.prepare(`SELECT COUNT(*) as c FROM leads`).first<{ c: number }>().then(r => r?.c ?? 0),
    db.prepare(`SELECT COUNT(*) as c FROM leads WHERE status = 'new'`).first<{ c: number }>().then(r => r?.c ?? 0),
    db.prepare(`SELECT COUNT(*) as c FROM leads WHERE status IN ('qualified', 'tour_scheduled')`).first<{ c: number }>().then(r => r?.c ?? 0),
    db.prepare(`SELECT COUNT(*) as c FROM leads WHERE status = 'won'`).first<{ c: number }>().then(r => r?.c ?? 0),
    db.prepare(`SELECT COUNT(*) as c FROM leads WHERE created_at >= ?`).bind(dayAgo).first<{ c: number }>().then(r => r?.c ?? 0),
    db.prepare(`SELECT COUNT(*) as c FROM leads WHERE created_at >= ?`).bind(weekAgo).first<{ c: number }>().then(r => r?.c ?? 0),
    db.prepare(`SELECT COUNT(*) as c FROM leads WHERE created_at >= ?`).bind(monthAgo).first<{ c: number }>().then(r => r?.c ?? 0),
    db.prepare(`SELECT source, COUNT(*) as count FROM leads WHERE source IS NOT NULL GROUP BY source ORDER BY count DESC LIMIT 5`).all<{ source: string; count: number }>(),
    db.prepare(`SELECT villa_pref, COUNT(*) as count FROM leads WHERE villa_pref IS NOT NULL GROUP BY villa_pref ORDER BY count DESC LIMIT 5`).all<{ villa_pref: string; count: number }>(),
    db.prepare(`SELECT COUNT(*) as c FROM events`).first<{ c: number }>().then(r => r?.c ?? 0),
    db.prepare(`SELECT COUNT(*) as c FROM events WHERE created_at >= ?`).bind(dayAgo).first<{ c: number }>().then(r => r?.c ?? 0),
  ]);

  const conversionRate = total > 0 ? won / total : 0;

  return {
    total_leads: total,
    new_leads: newCount,
    qualified_leads: qualified,
    won_leads: won,
    leads_today: todayCount,
    leads_this_week: weekCount,
    leads_this_month: monthCount,
    top_sources: sources,
    top_villa_prefs: villaPrefs,
    conversion_rate: conversionRate,
    total_events: totalEvents,
    events_today: eventsToday,
  };
}
