import { Component, OnInit } from '@angular/core';
import { Supabase } from '../supabase';
import { CommonModule } from '@angular/common';
import { AddClient } from '../add-client/add-client';
@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, AddClient],
  templateUrl: './clientes.html',
  styleUrl: './clientes.css'
})
export class Clientes implements OnInit {
  clientes: any[] = [];

  constructor(private Supabase: Supabase) {}

  async ngOnInit() {
    // Traemos los clientes con un conteo de citas asociadas
    const { data, error } = await this.Supabase.client
      .from('clientes')
      .select(`
        id,
        nombre,
        fecha_nacimiento,
        piel_tipo,
        telefono,
        citas ( id )
      `);

    if (error) {
      console.error('❌ Error cargando clientes:', error);
    } else {
      // Agregamos el conteo de citas como "tratamientos"
      this.clientes = (data ?? []).map(cliente => ({
        ...cliente,
        tratamientos: cliente.citas ? cliente.citas.length : 0
      }));
      console.log('📌 Clientes con tratamientos:', this.clientes);
    }
  }
}
