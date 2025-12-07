import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardComponent } from '@my-ds/card'; // Import Card
import { ButtonComponent } from '@my-ds/button'; // Import Button

@Component({
  imports: [RouterModule, CardComponent, ButtonComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'demo-ds-app';
}
