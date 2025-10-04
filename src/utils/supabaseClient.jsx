import { createClient } from "@supabase/supabase-js";

// Your Supabase credentials
const supabaseUrl = "https://ugsxirlabdgivvteobqe.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVnc3hpcmxhYmRnaXZ2dGVvYnFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyMzYxOTAsImV4cCI6MjA3NDgxMjE5MH0.mb2isMLNecZsKUbx_OEBnxx4hyngGMH0wdao2LlXrqY";

// Create and export the client
export const supabase = createClient(supabaseUrl, supabaseKey);