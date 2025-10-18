import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Input, Output, EventEmitter} from '@angular/core';
import { Supabase } from '../supabase';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-services',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-services.html',
  styleUrl: './edit-services.css'
})
export class EditServices {
  @Input() servicio: any; // Recibe el servicio a editar
  @Output() actualizado = new EventEmitter<void>(); // Para notificar al padre que se guardó
  mostrarModal = false;

  nombre = '';
  categoria = '';
  precio = '';
  descripcion = '';

  constructor(private supabase: Supabase) {}

  abrirModal(servicio: any) {
    this.servicio = servicio;
    this.nombre = servicio.nombre;
    this.categoria = servicio.categoria;
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  async guardarCambios() {
    if (!this.servicio?.id_servicio) return;

    const { error } = await this.supabase.client
      .from('servicios')
      .update({
        nombre: this.nombre,
        categoria: this.categoria,
        
      })
      .eq('id_servicio', this.servicio.id_servicio);

    if (error) {
      console.error('❌ Error actualizando servicio:', error);
      alert('Error al actualizar el servicio');
    } else {
      alert('✅ Servicio actualizado correctamente');
      this.cerrarModal();
      this.actualizado.emit();
    }
  }
}