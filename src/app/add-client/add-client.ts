import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Supabase } from '../supabase';

@Component({
  selector: 'app-add-client',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-client.html',
  styleUrl: './add-client.css'
})

export class AddClient {
mostrarModal = false;
  servicios: any[] = [];

  // Datos del cliente
  nuevoCliente = {
    nombre: '',
    telefono: '',
    email: '',
    fecha_nacimiento: '',
    piel_tipo: '',
    actividad_fisica: '',
    interaccion: ''
  };

  // Datos de la cita
  nuevaCita = {
    cita_fecha: '',
    hora: '',
    mensaje: '',
    id_serviciocita: null
  };

  constructor(private supabase: Supabase) {}

  async ngOnInit() {
    await this.cargarServicios();
  }

  async cargarServicios() {
    const { data, error } = await this.supabase.client
      .from('servicios')
      .select('id_servicio, nombre');

    if (!error && data) {
      this.servicios = data;
    }
  }

  abrirModal() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.nuevoCliente = {
      nombre: '',
      telefono: '',
      email: '',
      fecha_nacimiento: '',
      piel_tipo: '',
      actividad_fisica: '',
      interaccion: ''
    };
    this.nuevaCita = { cita_fecha: '', hora: '', mensaje: '', id_serviciocita: null };
  }

  async agregarCliente() {
    if (!this.nuevoCliente.nombre) return;

    // Insertar cliente
    const { data: clienteData, error: clienteError } = await this.supabase.client
      .from('clientes')
      .insert([this.nuevoCliente])
      .select()
      .single();

    if (clienteError) {
      console.error('Error al agregar cliente:', clienteError);
      return;
    }

    const idCliente = clienteData.id;

    // Insertar cita asociada
    if (this.nuevaCita.cita_fecha && this.nuevaCita.id_serviciocita) {
      const cita = { ...this.nuevaCita, id_cliente: idCliente };
      const { error: citaError } = await this.supabase.client
        .from('citas')
        .insert([cita]);

      if (citaError) {
        console.error('Error al agregar cita:', citaError);
        alert('❌ Error al agregar el cliente o la cita. Inténtalo de nuevo.');
      } else {
        console.log('Cliente y cita agregados correctamente');
        alert('✅ Cliente agregado exitosamente.');
      }

      window.location.reload();
    }

    this.cerrarModal();
  }
}