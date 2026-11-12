-- backend/db/migrations/001_create_chat_messages.sql
CREATE TABLE IF NOT EXISTS chat_messages (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL,                     -- adapt type if your users table uses int
  conversation_id UUID NULL,                 -- optional: group messages into sessions
  sender VARCHAR(10) NOT NULL CHECK (sender IN ('user','bot')),
  message_text TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',                -- optional contextual data (language, intent, etc)
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_chat_user_created_at ON chat_messages (user_id, created_at DESC);
