import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-asignar-extension',
  standalone: true,
  imports: [
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatPaginatorModule, 
    CommonModule,
    MatToolbarModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    
  ],
  templateUrl: './asignar-extension.component.html',
  styleUrls: ['./asignar-extension.component.scss'],
})
export class AsignarExtensionComponent {
  // Variables para el control de la interfaz
  showHorario = false;
  selectedExtension: string | null = null;

  // Configuración de botones y paginación
  buttons: string[] = [
    '1022', '1045', '1053', '1056', '1064', '1110', '1111', '1120', '1121', '1126', '1131', 
    '1130', '1131', '1136', '1053', '1056', '3064', '3110', '3111', '3053', '3056', '3064', 
    '3110', '3111','2022', '2045', '2053', '2056', '2064', '2110', '2111', '2120', '2121', 
    '2126', '2131', '2130', '2131', '2136', '2053', '2056', '4064', '4110', '4111', '4053', 
    '4056', '4064', '4110', '4111' 
  ];

  currentPage: number = 0;
  buttonsPerPage: number = 24;

  // Método para manejar la paginación
  get paginatedButtons(): string[] {
    const startIndex = this.currentPage * this.buttonsPerPage;
    return this.buttons.slice(startIndex, startIndex + this.buttonsPerPage);
  }

  // Maneja cambios de página
  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
  }

  // Maneja el click en los botones de extensión
  onExtensionButtonClick(extension: string): void {
    if (this.selectedExtension === extension) {
      // Toggle visibility si se hace click en la misma extensión
      this.showHorario = !this.showHorario;
    } else {
      // Mostrar y actualizar extensión si es diferente
      this.showHorario = true;
      this.selectedExtension = extension;
    }
  }

}