import * as LocalSession from "telegraf-session-local";

export const sessionMiddleware = new LocalSession({ database: 'session_db.json' })