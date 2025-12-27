import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { SelectComponent } from './select.component';
import { SelectOption } from './select.model';
import { OverlayModule } from '@angular/cdk/overlay';

const MOCK_OPTIONS: SelectOption[] = [
  { value: 'cat', label: 'Cat' },
  { value: 'dog', label: 'Dog' },
  { value: 'bird', label: 'Bird' },
];

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectComponent, OverlayModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    component.options = MOCK_OPTIONS;
    fixture.detectChanges();
  });

  afterEach(() => {
    const overlayContainer = document.querySelector('.cdk-overlay-container');
    if (overlayContainer) {
      overlayContainer.innerHTML = '';
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Display and Core Functionality', () => {
    it('should display the placeholder when no value is selected', () => {
      component.placeholder = 'Test Placeholder';
      fixture.detectChanges();
      const container = compiled.querySelector('.select-container');
      expect(container?.textContent).toContain('Test Placeholder');
    });

    it('should display the label of the selected option', () => {
      component.value = 'dog';
      fixture.detectChanges();
      const container = compiled.querySelector('.select-container');
      expect(container?.textContent).toContain('Dog');
      expect(container?.textContent).not.toContain('Select an item...');
    });

    it('should open the dropdown on click', () => {
      expect(component.isOpen).toBe(false);
      const container = compiled.querySelector('.select-container');
      (container as HTMLElement).click();
      fixture.detectChanges();
      expect(component.isOpen).toBe(true);
    });

    it('should select an option on click and close the dropdown', fakeAsync(() => {
      component.toggleDropdown(); // Open dropdown
      fixture.detectChanges();
      tick();

      const optionElements = document.querySelectorAll('.option-item');
      (optionElements[1] as HTMLElement).click(); // Click 'Dog'
      fixture.detectChanges();

      expect(component.value).toBe('dog');
      expect(component.isOpen).toBe(false);
    }));

    it('should deselect an option if it is clicked again', () => {
      component.value = 'cat';
      fixture.detectChanges();

      component.selectOption(MOCK_OPTIONS[0]); // Click 'Cat' again
      fixture.detectChanges();

      expect(component.value).toBe(null);
    });
  });

  describe('ControlValueAccessor Implementation', () => {
    it('should set the value correctly using writeValue', () => {
      component.writeValue('bird');
      fixture.detectChanges();
      expect(component.value).toBe('bird');
      expect(component.isSelected(MOCK_OPTIONS[2])).toBe(true);
    });

    it('should call onChange with the new value when an option is selected', () => {
      const onChangeSpy = vi.spyOn(component, 'onChange');
      component.selectOption(MOCK_OPTIONS[0]);
      expect(onChangeSpy).toHaveBeenCalledWith('cat');
    });

    it('should be disabled when setDisabledState is called', () => {
      component.setDisabledState(true);
      fixture.detectChanges();
      const container = compiled.querySelector('.select-container');
      expect(container?.classList).toContain('disabled');

      // Try to open it
      (container as HTMLElement).click();
      fixture.detectChanges();
      expect(component.isOpen).toBe(false);
    });
  });
});

