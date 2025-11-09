import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { Supabase } from '../supabase';
import { HeaderComponent } from '../header/header';
@Component({
  selector: 'app-analitica',
  standalone: true,
  imports: [CommonModule, NgChartsModule, HeaderComponent],
  templateUrl: './analitica.html',
  styleUrl: './analitica.css'
})
export class Analitica implements OnInit {
  citas: any[] = [];
  totalCitas: number = 0;
  citasPorServicio: { [key: string]: number } = {};
  distribucionReservas: { [cantidad: number]: number } = {};

  
  private springColors: string[] = [
    '#87CEEB', '#B0E0E6', '#ADD8E6', '#E0FFFF', '#AFEEEE',
    '#FFA07A', '#FFDAB9', '#e7c193ff', '#F08080', '#E9967A',
    '#FFB7C5', '#FF69B4', '#FFE4E1', '#FF8DA1', '#FFB6C1',
    '#E6E6FA', '#D8BFD8', '#DDA0DD', '#DA70D6', '#BA55D3',
    '#98FB98', '#90EE90', '#8FBC8F', '#9DBB61', '#A8E4A0'
  ];

  
  public pieChartData: ChartData<'pie'> = {
    labels: [],
    datasets: [{ data: [], backgroundColor: this.springColors }]
  };

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Distribución de Servicios por Cita',
        color: '#15184b',
        font: { family: "'Instrument Sans', sans-serif", size: 24, weight: 'bold' },
        padding: { top: 20, bottom: 20 }
      },
      legend: {
        display: true,
        position: 'right',
        labels: {
          color: '#15184b',
          font: { family: "'Instrument Sans', sans-serif", size: 16 },
          usePointStyle: true,
          pointStyle: 'circle'
        }
      }
    }
  };


  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [{
      label: 'Número de clientes',
      data: [],
      backgroundColor: '#87CEEB',
      borderColor: '#87CEEB',
      borderWidth: 1
    }]
  };

  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      x: {
        title: { display: true, text: 'Cantidad de citas realizadas', color: '#15184b', font: { family: "'Instrument Sans', sans-serif", size: 16 } },
        ticks: { color: '#15184b', font: { family: "'Instrument Sans', sans-serif" } }
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Número de clientes', color: '#15184b', font: { family: "'Instrument Sans', sans-serif", size: 16 } },
        ticks: { color: '#15184b', font: { family: "'Instrument Sans', sans-serif" } }
      }
    },
    plugins: {
      title: { display: true, text: 'Distribución de Clientes por Número de Reservas', color: '#15184b', font: { family: "'Instrument Sans', sans-serif", size: 24, weight: 'bold' }, padding: { top: 20, bottom: 20 } },
      legend: { display: false }
    }
  };

  constructor(private Supabase: Supabase) {}

  async ngOnInit() {
    try {
      // 🔹 Traer todas las citas con cliente y servicio
      const { data, error } = await this.Supabase.client
        .from('citas')
        .select(`
          id,
          cita_fecha,
          hora,
          servicios!inner(nombre),
          clientes!inner(nombre)
        `)
        .order('cita_fecha', { ascending: false })
        .order('hora', { ascending: true });

      if (error) {
        console.error('❌ Error cargando citas:', error);
        return;
      }

      this.citas = data ?? [];
      this.totalCitas = this.citas.length;

      
      this.citasPorServicio = this.citas.reduce((acc, cita) => {
        const nombreServicio = cita.servicios.nombre;
        acc[nombreServicio] = (acc[nombreServicio] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      this.pieChartData = {
        labels: Object.keys(this.citasPorServicio),
        datasets: [{
          data: Object.values(this.citasPorServicio),
          backgroundColor: this.springColors
        }]
      };

     
      const citasPorCliente = this.citas.reduce((acc, cita) => {
        const cliente = cita.clientes.nombre;
        acc[cliente] = (acc[cliente] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      this.distribucionReservas = {};
      (Object.values(citasPorCliente) as number[]).forEach((cantidad: number) => {
        this.distribucionReservas[cantidad] = (this.distribucionReservas[cantidad] || 0) + 1;
      });

      this.barChartData = {
        labels: Object.keys(this.distribucionReservas).map(c => `${c} citas`),
        datasets: [{
          label: 'Número de clientes',
          data: Object.values(this.distribucionReservas),
          backgroundColor: '#6da8dfff',
          borderColor: '#15184b',
          borderWidth: 1
        }]
      };

     
      console.log('📌 Total de citas:', this.totalCitas);
      console.log('📌 Citas por servicio:', this.citasPorServicio);
      console.log('📊 Distribución de reservas:', this.distribucionReservas);

    } catch (err) {
      console.error('💥 Error inesperado:', err);
    }
  }
}
