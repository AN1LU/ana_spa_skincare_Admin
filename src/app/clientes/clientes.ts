import { Component, OnInit } from '@angular/core';
import { Supabase } from '../supabase';
import { CommonModule } from '@angular/common';
import { AddClient } from '../add-client/add-client';
import { DeleteClient } from '../delete-client/delete-client';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, AddClient, DeleteClient],
  templateUrl: './clientes.html',
  styleUrls: ['./clientes.css']
})
export class Clientes implements OnInit {
  clientes: any[] = [];

  constructor(private Supabase: Supabase) {}

  async ngOnInit() {
    await this.cargarClientes();
  }

  async cargarClientes() {
    try {
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
        this.clientes = (data ?? []).map(cliente => ({
          ...cliente,
          tratamientos: cliente.citas ? cliente.citas.length : 0
        }));
        console.log('📌 Clientes con tratamientos:', this.clientes);
      }
    } catch (err) {
      console.error('💥 Error inesperado:', err);
    }
  }

  // ✅ Función para descargar CSV
  descargarCSV() {
    if (!this.clientes.length) return;

    const headers = ['Nombre', 'Fecha de Nacimiento', 'Tipo de piel', 'Tratamientos', 'Teléfono'];
    const rows = this.clientes.map(c =>
      [c.nombre, c.fecha_nacimiento, c.piel_tipo, c.tratamientos, c.telefono]
    );

    const csvContent = [
      headers.join(','), 
      ...rows.map(r => r.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', 'clientes.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
