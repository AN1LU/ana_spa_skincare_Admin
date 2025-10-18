import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Supabase } from '../supabase';

@Component({
  selector: 'app-delete-cita',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-cita.html',
  styleUrl: './delete-cita.css'
})
export class DeleteCita {
  @Input() idCita: number | undefined; // recibe el id de la cita a eliminar

  constructor(private supabase: Supabase) {}

  async eliminar() {
    if (!this.idCita) return;

    const { error } = await this.supabase.client
      .from('citas')
      .delete()
      .eq('id', this.idCita);

    if (error) {
      console.error('❌ Error eliminando cita:', error);
      alert('❌ Error eliminando cita');
    } else {
      alert('✅ Cita eliminada correctamente');
    }
    window.location.reload();
  }
}
