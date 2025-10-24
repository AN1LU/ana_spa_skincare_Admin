import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  async getCitasPorMes() {
    try {
      console.log('Fetching citas data...');
      const { data, error } = await this.supabase
        .from('Cita')
        .select('fecha, servicio')
        .order('fecha');

      if (error) {
        console.error('Error fetching citas:', error);
        throw error;
      }

      console.log('Raw citas data:', data);

      // Procesar los datos para agrupar por mes
      const citasPorMes = new Map<string, number>();
      const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                     'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

      // Inicializar todos los meses en 0
      meses.forEach(mes => citasPorMes.set(mes, 0));

      if (data && data.length > 0) {
        // Contar citas por mes
        data.forEach(cita => {
          const fecha = new Date(cita.fecha);
          const mes = meses[fecha.getMonth()];
          citasPorMes.set(mes, (citasPorMes.get(mes) || 0) + 1);
        });
      } else {
        console.log('No citas data found');
      }

      const result = {
        labels: Array.from(citasPorMes.keys()),
        data: Array.from(citasPorMes.values())
      };

      console.log('Processed citas data:', result);
      return result;
    } catch (error) {
      console.error('Error in getCitasPorMes:', error);
      return {
        labels: [],
        data: []
      };
    }
  }

  async getServiciosPopulares() {
    try {
      console.log('Fetching servicios data...');
      const { data, error } = await this.supabase
        .from('Cita')
        .select(`
          id_servicio,
          Servicio (
            nombre
          )
        `);

      if (error) {
        console.error('Error fetching servicios:', error);
        throw error;
      }

      console.log('Raw servicios data:', data);

      // Contar servicios
      const serviciosCount = new Map<string, number>();
      
      if (data && data.length > 0) {
        data.forEach(cita => {
          if (cita.Servicio && cita.Servicio[0]) {
            const nombreServicio = cita.Servicio[0].nombre;
            serviciosCount.set(nombreServicio, (serviciosCount.get(nombreServicio) || 0) + 1);
          }
        });
      } else {
        console.log('No servicios data found');
      }

      const result = {
        labels: Array.from(serviciosCount.keys()),
        data: Array.from(serviciosCount.values())
      };

      console.log('Processed servicios data:', result);
      return result;
    } catch (error) {
      console.error('Error in getServiciosPopulares:', error);
      return {
        labels: [],
        data: []
      };
    }
  }
}