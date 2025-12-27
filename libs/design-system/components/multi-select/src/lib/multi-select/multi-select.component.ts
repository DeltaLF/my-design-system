import { Component, forwardRef, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { MultiSelectOption } from './multi-select.model';

@Component({
  selector: 'lib-multi-select',
  standalone: true,
  imports: [CommonModule, OverlayModule],
  templateUrl: './multi-select.component.html',
  styleUrl: './multi-select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectComponent),
      multi: true,
    },
  ],
})
export class MultiSelectComponent implements ControlValueAccessor {
  // --- Inputs ---
  @Input() options: MultiSelectOption[] = [];
  @Input() placeholder = 'Select items...';

  // --- STATE ---
  @HostBinding('class.is-open')
  isOpen = false;
  value: any[] = [];
  disabled = false;

  // --- CVA Standard Methods ---
  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(obj: any): void {
    this.value = obj || [];
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // --- COMPONENT ACTIONS ---

  toggleDropdown() {
    if (this.disabled) return;
    this.isOpen = !this.isOpen;
    if (!this.isOpen) {
      this.onTouched();
    }
  }

  closeDropdown() {
    this.isOpen = false;
    this.onTouched();
  }

  // --- SELECTION LOGIC ---

  /**
   * Toggles the selection of a given option.
   * @param option The option to toggle.
   */
  toggleOption(option: MultiSelectOption): void {
    if (this.disabled) return;

    const isSelected = this.isSelected(option);
    if (isSelected) {
      this.value = this.value.filter((v) => v !== option.value);
    } else {
      this.value = [...this.value, option.value];
    }
    this.onChange(this.value);
  }

  /**
   * Checks if an option is currently selected.
   * @param option The option to check.
   * @returns True if the option is selected, false otherwise.
   */
  isSelected(option: MultiSelectOption): boolean {
    return this.value.includes(option.value);
  }
}
