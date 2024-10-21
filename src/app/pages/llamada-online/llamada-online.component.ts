import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { BarController, BarElement, CategoryScale, Chart, ChartType, Legend, LinearScale, LineController, LineElement, PointElement, Title } from 'chart.js';
import * as moment from 'moment';
import { Parametros } from 'src/app/_model/parametros';
import { LoginService } from 'src/app/_services/login.service';
import { MatIcon } from '@angular/material/icon';
import { NgClass } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatDateRangeInput, MatStartDate, MatEndDate, MatDatepickerToggle, MatDateRangePicker } from '@angular/material/datepicker';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatCard } from '@angular/material/card';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { LlamadasPorHora } from 'src/app/_model/llamadasPorHora';
import { GraficosService } from 'src/app/_serviceRepo/graficos.service';
import { ExcelServiceService } from 'src/app/_serviceRepo/excel.service.service';
import { Tooltip } from 'chart.js';
import { EmpresaService } from 'src/app/_services/empresa.service';

// Registrar los componentes necesarios
Chart.register(
  LineController,
  BarController,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  BarElement
);


@Component({
    selector: 'app-llamada-online',
    templateUrl: './llamada-online.component.html',
    styleUrl: './llamada-online.component.scss',
    standalone: true,
    imports: [MatToolbar, MatToolbarRow, MatCard, ReactiveFormsModule, FormsModule, MatFormField, MatLabel, MatDateRangeInput, MatStartDate, MatEndDate, MatDatepickerToggle, MatSuffix, MatDateRangePicker, MatButton, NgClass, MatIcon, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow]
})



export class LlamadaOnlineComponent implements OnInit, OnDestroy {

  fechaini !:  string;
  fechafin !: string;
  empresa  !: string;
  parametros !: Parametros;
  llamadasPorHora !: LlamadasPorHora[];
  reporteName : string ="LLamadas Por Hora";
  cargando : boolean=false; 
  totalContestadas !: number;
  totalNoContestadas !: number;
  totalLLamadas !: number;

  campaignOne!: FormGroup;
  campaignTwo!: FormGroup;

  fechaInicio : Date = new Date;
  fechaFin : Date = new Date;
  fechaparametro1 !:  string;
  fechaparametro2 !:  string;
 
  empresaparametro !:  string;

  titulo : boolean = true;
  public chart: Chart | undefined; // Almacena la instancia del gráfico
  tipo: ChartType = 'line';

  displayedColumns = ['hora_llamada', 'answered', 'no_answer','totales'];
  dataSource !: MatTableDataSource<LlamadasPorHora>;

  displayedColumnss =['total','contestadas', 'nocontestadas', 'totalG']
  dataSources !: MatTableDataSource<LlamadasPorHora>;

  
  constructor(
    private graficosService: GraficosService,
    private empresaService: EmpresaService,
    private _excelServiceService : ExcelServiceService ) { 

    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    this.campaignOne = new FormGroup({
      start: new FormControl(new Date(year, month, 13)),
      end: new FormControl(new Date(year, month, 16)),

    });

      this.campaignTwo = new FormGroup({
        start: new FormControl(new Date(year, month, 15)),
        end: new FormControl(new Date(year, month, 19)),
      });

  }

  
  ngOnInit(): void {
  
    this.empresaService.getEmpresaCambio().subscribe(data =>{
      this.empresaparametro= data;
    }); 
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy(); // Asegúrate de destruir el gráfico cuando el componente se destruya
    }
  }

  




  llamadasporHora(){

    this.cargando= true;
    this.fechaparametro1 = moment(this.fechaInicio).format('YYYY-MM-DD 00:00:01');
    this.fechaparametro2 = moment(this.fechaFin).format('YYYY-MM-DD 23:59:59');

    if (this.chart != null) {
      this.chart.destroy();
    }
    
   
    const parametros= {fechaini:this.fechaparametro1, fechafin:this.fechaparametro2,empresa:this.empresaparametro }
    
    this.graficosService.llamadasporHora(parametros).subscribe(data =>{
    this.dataSource = new MatTableDataSource(data);
 

    
  // Calcula los totales
this.totalContestadas = data
.map((x: LlamadasPorHora) => x.answered || 0) // Usa 0 si `answered` es undefined
.reduce((count: number, x: number) => count + x, 0);

this.totalNoContestadas = data
.map((x: LlamadasPorHora) => x.no_answer || 0) // Usa 0 si `no_answer` es undefined
.reduce((count: number, x: number) => count + x, 0);

this.totalLLamadas = data
.map((x: LlamadasPorHora) => x.totales || 0) // Usa 0 si `totales` es undefined
.reduce((count: number, x: number) => count + x, 0);

    this.llamadasPorHora = [{total: 'TOTAL', contestadas: this.totalContestadas, nocontestadas: this.totalNoContestadas, 
      totalG: this.totalLLamadas }]

    this.dataSources = new MatTableDataSource(this.llamadasPorHora);
    });

    this.graficosService.llamadasporHora(parametros).subscribe(data =>{
      let fechas = data.map((x: LlamadasPorHora) => x.hora_llamada ?? 0);
      let contestadas = data.map((x: LlamadasPorHora) => x.answered ?? 0);
      let nocontestadas = data.map((x: LlamadasPorHora) => x.no_answer ?? 0);
      let totales = data.map((x: LlamadasPorHora) => x.totales ?? 0);


      this.chart = new Chart('canvas', {
        type: this.tipo,
        data: {
          labels: fechas,
          datasets: [
            {
              label: 'Contestadas',
              data: contestadas,
              backgroundColor: 'green',
              borderColor: 'green',
              borderWidth: 1
            },
            {
              label: 'No Contestadas',
              data: nocontestadas,
              backgroundColor: 'red',
              borderColor: 'red',
              borderWidth: 1
            },
            {
              label: 'Total',
              data: totales,
              backgroundColor: 'blue',
              borderColor: 'blue',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  let label = context.dataset.label || '';
                  if (label) {
                    label += ': ';
                  }
                  if (context.parsed.y !== null) {
                    label += new Intl.NumberFormat('en-US').format(context.parsed.y);
                  }
                  return label;
                }
              }
            }
          },
          scales: {
            x: {
              beginAtZero: true
            },
            y: {
              beginAtZero: true
            }
          }
        }
      });
    });

  setTimeout(()=>{this.cargando = false;
  },3000);
  

  }

  ejecutar(){


  this.cargando= true;
  setTimeout(()=>{
    this.cargando = false;
  },3000);




  }
  

  cambiar() {   
    console.log(this.titulo,'titulo');
    

    if (this.titulo) {
      this.tipo = 'bar';
    }
    else {
      this.tipo = 'line';
    }
    this.titulo = !this.titulo;
    
    
    if (this.chart != null) {
      this.chart.destroy();
    }
    this.llamadasporHora();
  }

  


exportarTodo(): void {
this.graficosService.exportar(this.dataSource.data, this.reporteName );

}

descargar(){
  const parametros= {fechaini:this.fechaparametro1, fechafin:this.fechaparametro2,empresa:this.empresaparametro }
    

  this.graficosService.llamadasporHora(parametros).subscribe(data =>{
    this._excelServiceService.dowloadExcel(data,parametros);
  });

}


}