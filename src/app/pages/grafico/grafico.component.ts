import { Component } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardLgImage, MatCardModule, MatCardSubtitle, MatCardTitle, MatCardTitleGroup } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatDivider } from '@angular/material/divider';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-grafico',
  standalone: true,
  imports: [ MatCardModule,MatRippleModule,MatToolbarRow,MatToolbar,RouterOutlet, MatCard, MatCardContent, MatCardSubtitle, MatCardTitleGroup, MatCardTitle, MatCardLgImage, MatDivider, MatCardActions, MatButton, RouterLink, MatIcon ],
  templateUrl: './grafico.component.html',
  styleUrl: './grafico.component.scss'
})
export class GraficoComponent {

  longText = `LLamadas que Ingresan a la cola de llamadas pero no son atendidas.`;
  constructor( 
    public route: ActivatedRoute)
   {

    }
  

}

