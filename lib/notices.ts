import { supabase } from "./supabase";
 
// ─────────────────────────────────────────
// Types
// ─────────────────────────────────────────
 
export interface Notice {
  id: string;
  title: string;
  description: string;
  category: string;
  important: boolean;
  expiry_date: string | null;
  created_at: string;
}
 
export type CreateNoticeInput = Omit<Notice, "id" | "created_at">;
export type UpdateNoticeInput = Partial<CreateNoticeInput>;
 
export const CATEGORIES = [
  "General",
  "Academics",
  "Placement",
  "Events",
  "Sports",
  "Administration",
  "Library",
  "Hostel",
] as const;
 
export type Category = (typeof CATEGORIES)[number];
 
// ─────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────
 
function isExpired(notice: Notice): boolean {
  if (!notice.expiry_date) return false;
  return new Date(notice.expiry_date) < new Date(new Date().toDateString());
}
 
// ─────────────────────────────────────────
// CRUD operations
// ─────────────────────────────────────────
 
/** Fetch all active (non-expired) notices, pinned ones first */
export async function fetchNotices(): Promise<Notice[]> {
  const { data, error } = await supabase
    .from("notices")
    .select("*")
    .order("important", { ascending: false })
    .order("created_at",  { ascending: false });
 
  if (error) throw new Error(error.message);
 
  // Filter out expired notices client-side so existing notices still show
  // during the same day they expire
  return (data as Notice[]).filter((n) => !isExpired(n));
}
 
/** Fetch ALL notices including expired (for admin use) */
export async function fetchAllNotices(): Promise<Notice[]> {
  const { data, error } = await supabase
    .from("notices")
    .select("*")
    .order("important", { ascending: false })
    .order("created_at",  { ascending: false });
 
  if (error) throw new Error(error.message);
  return data as Notice[];
}
 
/** Fetch a single notice by id */
export async function fetchNoticeById(id: string): Promise<Notice | null> {
  const { data, error } = await supabase
    .from("notices")
    .select("*")
    .eq("id", id)
    .single();
 
  if (error) return null;
  return data as Notice;
}
 
/** Create a new notice */
export async function createNotice(input: CreateNoticeInput): Promise<Notice> {
  const { data, error } = await supabase
    .from("notices")
    .insert([input])
    .select()
    .single();
 
  if (error) throw new Error(error.message);
  return data as Notice;
}
 
/** Update an existing notice */
export async function updateNotice(
  id: string,
  input: UpdateNoticeInput
): Promise<Notice> {
  const { data, error } = await supabase
    .from("notices")
    .update(input)
    .eq("id", id)
    .select()
    .single();
 
  if (error) throw new Error(error.message);
  return data as Notice;
}
 
/** Delete a notice */
export async function deleteNotice(id: string): Promise<void> {
  const { error } = await supabase.from("notices").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
 