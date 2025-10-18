import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Supabase } from '../supabase';

@Component({
  selector: 'app-delete-service',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-service.html',
  styleUrl: './delete-service.css'
})
export class DeleteService {
@Input() idServicio: number | undefined; // recibimos el id del servicio a eliminar

  constructor(private supabase: Supabase) {}

  async eliminar() {
    if (!this.idServicio) return;

    const { error } = await this.supabase.client
      .from('servicios')
      .delete()
      .eq('id_servicio', this.idServicio);

    if (error) {
      console.error('❌ Error eliminando servicio:', error);
      alert('❌ Error eliminando servicio');
    } else {
      alert('✅ Servicio eliminado correctamente');
      // Opcional: emitir un evento para actualizar la lista en el padre
    }
    window.location.reload();
  }
}