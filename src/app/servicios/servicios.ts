import { Component, OnInit } from '@angular/core';
import { Supabase } from '../supabase';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './servicios.html',
  styleUrl: './servicios.css'
})

export class Servicios implements OnInit {
  servicios: any[] = [];

  constructor(private Supabase: Supabase) {}

  async ngOnInit() {
    try {
      // Trae todos los servicios
      const { data, error } = await this.Supabase.client
        .from('servicios')
        .select('*')
        .order('id_servicio', { ascending: true }); // opcional, ordena por id

      if (error) {
        console.error('❌ Error cargando servicios:', error);
      } else {
        this.servicios = data ?? [];
        console.log('📌 Servicios cargados:', this.servicios);
      }
    } catch (err) {
      console.error('💥 Error inesperado:', err);
    }
  }
}