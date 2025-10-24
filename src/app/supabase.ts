import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class Supabase {
  private supabase: SupabaseClient;

  constructor(){
    const supabaseUrl = 'https://xonxikgleunqjznzegbq.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhvbnhpa2dsZXVucWp6bnplZ2JxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwNTQ3MzcsImV4cCI6MjA3MzYzMDczN30.QcXwjpZb51R4o8wEwvPzWQvt7YRXvausnek9Y-cIslw';

    this.supabase = createClient(supabaseUrl, supabaseKey);

  }

  get client(){
    return this.supabase;
  }

  async getData() {
    // Cambia 'tu_tabla' por el nombre real de tu tabla
    const { data, error } = await this.supabase
      .from('citas')
      .select('*');

    if (error) {
      console.error('Error al obtener datos de Supabase:', error);
      return [];
    }

    return data || [];
  }
}