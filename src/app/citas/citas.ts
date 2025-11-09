import { Component, OnInit } from '@angular/core';
import { Supabase } from '../supabase';
import { CommonModule } from '@angular/common';
import { AddCita } from '../add-cita/add-cita';
import { DeleteCita } from '../delete-cita/delete-cita';
import { EditCita } from '../edit-cita/edit-cita';
import { HeaderComponent } from '../header/header';

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [CommonModule, AddCita, DeleteCita, EditCita, HeaderComponent],
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
        .order('hora', { ascending: true });

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

  descargarCSV() {
    if (!this.citas.length) {
      alert('No hay datos para descargar');
      return;
    }

    const encabezados = ['ID', 'Cliente', 'Fecha', 'Hora', 'Servicio'];
    const filas = this.citas.map(cita => [
      cita.id,
      cita.clientes?.nombre || '',
      cita.cita_fecha || '',
      cita.hora || '',
      cita.servicios?.nombre || ''
    ]);

    const contenido = [encabezados, ...filas]
      .map(e => e.map(v => `"${v}"`).join(','))
      .join('\n');

    const blob = new Blob([contenido], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'citas.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

