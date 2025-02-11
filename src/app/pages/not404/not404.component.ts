import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-not404',
    templateUrl: './not404.component.html',
    styleUrls: ['./not404.component.scss'],
    imports: [RouterLink]
})
export class Not404Component {

  constructor() { }

  ngOnInit(): void {
  }

}
