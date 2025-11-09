import { Component, OnInit } from '@angular/core';
import { Supabase } from '../supabase';
import { CommonModule } from '@angular/common';
import { AddService } from '../add-service/add-service';
import { DeleteService } from '../delete-service/delete-service';
import { EditServices } from '../edit-services/edit-services';
import { HeaderComponent } from '../header/header';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [AddService, DeleteService, EditServices, CommonModule, HeaderComponent],
  templateUrl: './servicios.html',
  styleUrls: ['./servicios.css']
})
export class Servicios implements OnInit {
  servicios: any[] = [];

  constructor(private Supabase: Supabase) {}

  ngOnInit() {
    this.cargarServicios();
  }

  // ✅ Función reutilizable para traer los servicios desde Supabase
  async cargarServicios() {
    try {
      const { data, error } = await this.Supabase.client
        .from('servicios')
        .select('*')
        .order('id_servicio', { ascending: true });

      if (error) {
        console.error('❌ Error cargando servicios:', error);
      } else {
        this.servicios = data ?? [];
        console.log('📌 Servicios cargados:', this.servicios);
      }
    } catch (err) {
      console.error('💥 Error inesperado:', err);
    }
  }
  
}
