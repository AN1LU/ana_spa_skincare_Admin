import { Component, OnInit } from '@angular/core';
import { Supabase } from '../supabase';
import { CommonModule } from '@angular/common';
import { AddCita } from '../add-cita/add-cita';
import { DeleteCita } from '../delete-cita/delete-cita';
import { EditCita } from '../edit-cita/edit-cita';
@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [CommonModule, AddCita, DeleteCita, EditCita],
  templateUrl: './citas.html',
  styleUrls: ['./citas.css']
})
export class Citas implements OnInit {
  citas: any[] = [];

  constructor(private Supabase: Supabase) {}

  async ngOnInit() {
    try {
      // Trae todas las citas con el nombre del cliente
      const { data, error } = await this.Supabase.client
        .from('citas')
        .select(`
          id,
          cita_fecha,
          hora,
          servicios!inner(nombre),
          clientes!inner(nombre)
        `)
        .order('cita_fecha', { ascending: false })
        .order('hora', {ascending: true});

      if (error) {
        console.error('❌ Error cargando citas:', error);
      } else {
        this.citas = data ?? [];
        console.log('📌 Citas cargadas:', this.citas);
      }
    } catch (err) {
      console.error('💥 Error inesperado:', err);
    }
  }
}
