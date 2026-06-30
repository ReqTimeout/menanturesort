-- =============================================================================
-- Menantu Resort CAPI Gateway — Initial Schema
-- =============================================================================
-- Tables:
--   leads       — captured leads (from LeadForm submit, CAPI events, or manual)
--   events      — raw CAPI events for analytics & dedup
--   activities  — interaction log per lead (notes, calls, status changes)
-- =============================================================================

-- -----------------------------------------------------------------------------
-- leads: one row per unique lead
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,

  -- Identity
  event_id TEXT UNIQUE NOT NULL,
  name TEXT,
  phone TEXT,
  email TEXT,

  -- Lead context
  villa_pref TEXT,            -- 'bijak' | 'idaman' | 'mapan' | NULL
  source TEXT,                -- 'lead_form', 'inline_form', 'kpr_landing', etc.
  page_path TEXT,             -- e.g. '/villa/idaman/'
  message TEXT,               -- optional message from form

  -- Geography / device
  ip_country TEXT,
  ip_city TEXT,
  user_agent TEXT,

  -- UTM tracking
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  utm_term TEXT,
  referer TEXT,

  -- CRM state
  status TEXT NOT NULL DEFAULT 'new',  -- new, contacted, qualified, tour_scheduled, won, lost, abandoned
  score INTEGER DEFAULT 0,              -- 0-100, lead score
  assigned_to TEXT,                     -- sales person
  notes TEXT,
  tags TEXT,                            -- JSON array

  -- Timestamps
  last_contacted_at INTEGER,
  last_activity_at INTEGER,
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  updated_at INTEGER NOT NULL DEFAULT (unixepoch())
);

CREATE INDEX IF NOT EXISTS idx_leads_phone       ON leads(phone);
CREATE INDEX IF NOT EXISTS idx_leads_email       ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_status      ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_source      ON leads(source);
CREATE INDEX IF NOT EXISTS idx_leads_created     ON leads(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_villa_pref  ON leads(villa_pref);
CREATE INDEX IF NOT EXISTS idx_leads_assigned    ON leads(assigned_to);

-- -----------------------------------------------------------------------------
-- events: every CAPI event (Lead, ViewContent, Contact, etc.)
--   - Used for analytics + dedup with Meta Pixel via event_id
--   - lead_id links to leads table when user data matches
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  event_id TEXT UNIQUE NOT NULL,
  event_name TEXT NOT NULL,
  event_time INTEGER NOT NULL,

  -- Hashed PII (SHA-256)
  user_email_hash TEXT,
  user_phone_hash TEXT,
  user_name_hash TEXT,

  -- Context
  ip_country TEXT,
  ip_city TEXT,
  user_agent TEXT,
  page_path TEXT,
  custom_data TEXT,            -- JSON

  -- Meta CAPI result
  lead_id INTEGER,             -- FK to leads if matched
  meta_event_id TEXT,           -- Meta's response event_id
  meta_response_code INTEGER,   -- 200 = success
  meta_response_body TEXT,      -- Meta error if any

  -- Trigger context
  trigger_reason TEXT,          -- 'time' | 'scroll' | 'exit_intent' | 'manual'

  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  FOREIGN KEY (lead_id) REFERENCES leads(id)
);

CREATE INDEX IF NOT EXISTS idx_events_lead      ON events(lead_id);
CREATE INDEX IF NOT EXISTS idx_events_name      ON events(event_name);
CREATE INDEX IF NOT EXISTS idx_events_time      ON events(event_time);
CREATE INDEX IF NOT EXISTS idx_events_email     ON events(user_email_hash);
CREATE INDEX IF NOT EXISTS idx_events_phone     ON events(user_phone_hash);

-- -----------------------------------------------------------------------------
-- activities: per-lead activity log (notes, calls, status changes)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS activities (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  lead_id INTEGER NOT NULL,
  activity_type TEXT NOT NULL,  -- 'note' | 'call' | 'email' | 'meeting' | 'status_change' | 'whatsapp'
  description TEXT,
  metadata TEXT,                 -- JSON
  created_by TEXT,               -- user who logged it
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  FOREIGN KEY (lead_id) REFERENCES leads(id)
);

CREATE INDEX IF NOT EXISTS idx_activities_lead ON activities(lead_id);
CREATE INDEX IF NOT EXISTS idx_activities_time ON activities(created_at);
CREATE INDEX IF NOT EXISTS idx_activities_type ON activities(activity_type);

-- -----------------------------------------------------------------------------
-- Triggers: auto-update updated_at on leads
-- -----------------------------------------------------------------------------
CREATE TRIGGER IF NOT EXISTS trg_leads_updated_at
  AFTER UPDATE ON leads
  FOR EACH ROW
BEGIN
  UPDATE leads SET updated_at = unixepoch() WHERE id = OLD.id;
END;
