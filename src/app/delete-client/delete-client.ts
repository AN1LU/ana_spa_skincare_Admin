import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Supabase } from '../supabase';

@Component({
  selector: 'app-delete-client',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-client.html',
  styleUrl: './delete-client.css'
})
export class DeleteClient {
  @Input() idCliente: number | undefined; // recibe el id del cliente a eliminar

  constructor(private supabase: Supabase) {}

  async eliminar() {
    if (!this.idCliente) return;

    const { error } = await this.supabase.client
      .from('clientes')
      .delete()
      .eq('id', this.idCliente);

    if (error) {
      console.error('❌ Error eliminando cliente:', error);
      alert('❌ Error eliminando cliente');
    } else {
      alert('✅ Cliente eliminado correctamente');
    }
    window.location.reload();
  }
}
