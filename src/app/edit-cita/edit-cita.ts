import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Supabase } from '../supabase';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-cita',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-cita.html',
  styleUrl: './edit-cita.css'
})
export class EditCita {
  @Input() cita: any; // Recibe la cita a editar
  @Output() actualizado = new EventEmitter<void>(); // Notifica al padre
  mostrarModal = false;

  cita_fecha = '';
  hora = '';
  id_cliente = '';
  id_serviciocita = '';
  mensaje = '';

  clientes: any[] = [];
  servicios: any[] = [];

  constructor(private supabase: Supabase) {}

  async abrirModal(cita: any) {
    this.cita = cita;
    this.cita_fecha = cita.cita_fecha;
    this.hora = cita.hora;
    this.id_cliente = cita.id_cliente || (cita.clientes && cita.clientes.id);
    this.id_serviciocita = cita.id_serviciocita || (cita.servicios && cita.servicios.id_servicio);
    this.mensaje = cita.mensaje || '';
    await this.cargarClientes();
    await this.cargarServicios();
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  async cargarClientes() {
    const { data, error } = await this.supabase.client.from('clientes').select('id, nombre');
    if (!error) {
      this.clientes = data || [];
    } else {
      console.error('Error al cargar clientes:', error);
    }
  }

  async cargarServicios() {
    const { data, error } = await this.supabase.client.from('servicios').select('id_servicio, nombre');
    if (!error) {
      this.servicios = data || [];
    } else {
      console.error('Error al cargar servicios:', error);
    }
  }

  async guardarCambios() {
    if (!this.cita?.id) return;
    const { error } = await this.supabase.client
      .from('citas')
      .update({
        cita_fecha: this.cita_fecha,
        hora: this.hora,
        id_cliente: this.id_cliente,
        id_serviciocita: this.id_serviciocita,
        mensaje: this.mensaje
      })
      .eq('id', this.cita.id);
    if (error) {
      console.error('❌ Error actualizando cita:', error);
      alert('Error al actualizar la cita');
    } else {
      alert('✅ Cita actualizada correctamente');
      
      this.actualizado.emit();
    }
    window.location.reload();
    this.cerrarModal();
  }
  
}
