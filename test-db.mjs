import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fwtbkhxumgyuhlfczjhr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3dGJraHh1bWd5dWhsZmN6amhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYyNTkwODEsImV4cCI6MjA4MTgzNTA4MX0.3r6JgbKbbRa1XinatNGfcpsWFwJzrs6WcOHosSNAosc';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function check() {
  console.log("Checking testimonials...");
  try {
    const { data, error } = await supabase.from('testimonials').select('*').limit(5);
    console.log("Testimonials fetch response:", { data, error });
  } catch (e) {
    console.error("Testimonials error:", e);
  }

  console.log("Checking projects...");
  try {
    const { data, error } = await supabase.from('projects').select('*').limit(5);
    console.log("Projects fetch response:", { data, error });
  } catch (e) {
    console.error("Projects error:", e);
  }
}

check();
