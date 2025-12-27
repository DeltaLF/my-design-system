import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TitleCasePipe, JsonPipe } from '@angular/common'; // Add JsonPipe
import { ReactiveFormsModule, FormControl } from '@angular/forms'; // Add Forms

// Component Imports
import { CardComponent } from '@my-ds/card';
import { ButtonComponent } from '@my-ds/button';
import {
  MultiSelectComponent,
  MultiSelectOption, // Now imported directly from the library
} from '@my-design-system/multi-select';
import {
  SelectComponent,
  SelectOption,
} from '@my-design-system/select'; // Import new lib
import { ThemeService } from '@my-ds/theme';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CardComponent,
    ButtonComponent,
    MultiSelectComponent,
    SelectComponent, // Add SelectComponent
    TitleCasePipe,
    JsonPipe,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'demo-ds-app';
  public themeService = inject(ThemeService);

  // --- MultiSelect Demo ---
  fruitOptions: MultiSelectOption[] = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
    { value: 'orange', label: 'Orange' },
    { value: 'mango', label: 'Mango' },
  ];

  // Initialize with values that exist in the options list.
  mySelectControl = new FormControl<string[]>(['apple', 'cherry']);

  // --- SingleSelect Demo ---
  programmingLanguageOptions: SelectOption[] = [
    { value: 'typescript', label: 'TypeScript' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'csharp', label: 'C#' },
  ];

  mySingleSelectControl = new FormControl<string>('typescript');
}
