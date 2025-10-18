import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Supabase } from '../supabase';
@Component({
  selector: 'app-add-cita',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-cita.html',
  styleUrl: './add-cita.css'
})
export class AddCita {
mostrarModal = false;

  nuevaCita = {
    cita_fecha: '',
    hora: '',
    mensaje: '',
    id_cliente: '',
    id_serviciocita: ''
  };

  clientes: any[] = [];
  servicios: any[] = [];

  constructor(private supabase: Supabase) {}

  async ngOnInit() {
    await this.cargarClientes();
    await this.cargarServicios();
  }

  abrirModal() {
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

  async agregarCita() {
    if (!this.nuevaCita.cita_fecha || !this.nuevaCita.hora || !this.nuevaCita.id_cliente || !this.nuevaCita.id_serviciocita) {
      alert('Por favor completa todos los campos requeridos.');
      return;
    }

    const { data, error } = await this.supabase.client
      .from('citas')
      .insert([this.nuevaCita]);

    if (error) {
      console.error('Error agregando cita:', error);
      alert('❌ Ocurrió un error al agregar la cita.');
    } else {
      alert('✅ Cita agregada exitosamente.');
      window.location.reload();
    }

    this.cerrarModal();
  }
}