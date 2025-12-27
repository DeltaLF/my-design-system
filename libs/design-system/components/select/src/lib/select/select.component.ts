import { Component, forwardRef, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { SelectOption } from './select.model';

@Component({
  selector: 'lib-select',
  standalone: true,
  imports: [CommonModule, OverlayModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements ControlValueAccessor {
  // --- Inputs ---
  @Input() options: SelectOption[] = [];
  @Input() placeholder = 'Select an item...';

  // --- STATE ---
  @HostBinding('class.is-open')
  isOpen = false;
  value: any | null = null;
  disabled = false;

  // --- CVA Standard Methods ---
  onChange: (value: any | null) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(obj: any): void {
    this.value = obj;
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

  // --- Derived State ---
  get selectedOption(): SelectOption | undefined {
    return this.options.find((opt) => opt.value === this.value);
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
  selectOption(option: SelectOption): void {
    if (this.disabled) return;

    // If the same option is clicked again, deselect it.
    if (this.value === option.value) {
      this.value = null;
    } else {
      this.value = option.value;
    }

    this.onChange(this.value);
    this.closeDropdown();
  }

  isSelected(option: SelectOption): boolean {
    return this.value === option.value;
  }
}
