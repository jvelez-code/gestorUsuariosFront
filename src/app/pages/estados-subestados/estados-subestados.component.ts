import { Component, ChangeDetectionStrategy, model } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';

@Component({
    selector: 'app-estados-subestados',
    imports: [MatTabsModule,
        MatFormFieldModule, MatInputModule, MatSelectModule, MatIconModule, MatDividerModule, MatButtonModule, MatCardModule, MatCheckboxModule, FormsModule, MatRadioModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './estados-subestados.component.html',
    styleUrl: './estados-subestados.component.css'
})
export class EstadosSubestadosComponent {
  readonly checked = model(false);
  readonly indeterminate = model(false);
  readonly labelPosition = model<'before' | 'after'>('after');
  readonly disabled = model(false);
}
