import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardComponent } from '@my-ds/card'; // Import Card
import { ButtonComponent } from '@my-ds/button'; // Import Button
import { ThemeService } from '@my-ds/theme';
import { TitleCasePipe } from '@angular/common';

@Component({
  imports: [RouterModule, CardComponent, ButtonComponent, TitleCasePipe],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'demo-ds-app';
  public themeService = inject(ThemeService);
}
