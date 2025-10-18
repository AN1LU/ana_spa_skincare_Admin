import { Component, EventEmitter, Output } from '@angular/core';
import { Supabase } from '../supabase';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-add-service',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-service.html',
  styleUrl: './add-service.css'
})
export class AddService {
 mostrarModal = false;
  otraCategoria = false;

  categorias: string[] = [];
  nuevoServicio = {
    nombre: '',
    categoria: ''
  };

  constructor(private supabase: Supabase) {}

  ngOnInit() {
    this.cargarCategorias();
  }

 async cargarCategorias() {
  const { data, error } = await this.supabase.client
    .from('servicios')
    .select('categoria'); // trae todas las categorías

  if (!error && data) {
    // Crear un array de categorías únicas en frontend
    this.categorias = Array.from(new Set(data.map((item: any) => item.categoria)));
  }
}

  abrirModal() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.otraCategoria = false;
  }

  async agregarServicio() {
    if (!this.nuevoServicio.nombre || !this.nuevoServicio.categoria) return;

    const { data, error } = await this.supabase.client
      .from('servicios')
      .insert([this.nuevoServicio]);

    if (error) {
      console.error('Error agregando servicio:', error);
      alert('❌ Error al agregar el servicio. Inténtalo de nuevo.');
    } else {
      console.log('Servicio agregado:', data);
      alert('✅ Servicio agregado exitosamente.');
      this.cargarCategorias(); // actualizar categorías si se agregó una nueva
    }

    this.cerrarModal();
    this.nuevoServicio = { nombre: '', categoria: '' };
    window.location.reload();
  }
}
