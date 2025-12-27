import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { MultiSelectComponent } from './multi-select.component';
import { MultiSelectOption } from './multi-select.model';
import { OverlayModule } from '@angular/cdk/overlay';

const MOCK_OPTIONS: MultiSelectOption[] = [
  { value: 'cat', label: 'Cat' },
  { value: 'dog', label: 'Dog' },
  { value: 'bird', label: 'Bird' },
];

describe('MultiSelectComponent', () => {
  let component: MultiSelectComponent;
  let fixture: ComponentFixture<MultiSelectComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiSelectComponent, OverlayModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MultiSelectComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
  });

  // Clean up the overlay container from the body after each test to prevent state leakage.
  afterEach(() => {
    const overlayContainer = document.querySelector('.cdk-overlay-container');
    if (overlayContainer) {
      overlayContainer.innerHTML = '';
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Core Functionality', () => {
    beforeEach(() => {
      component.options = MOCK_OPTIONS;
      fixture.detectChanges();
    });

    it('should not be open initially', () => {
      expect(component.isOpen).toBe(false);
    });

    it('should open the dropdown when container is clicked', () => {
      const container = compiled.querySelector('.multi-select-container');
      (container as HTMLElement).click();
      fixture.detectChanges();
      expect(component.isOpen).toBe(true);
    });

    it('should display the list of options when open', fakeAsync(() => {
      component.toggleDropdown();
      fixture.detectChanges();
      tick(); // Allow time for the overlay to be created and animations to start.
      fixture.detectChanges();

      // The overlay is rendered in the document body, not within the component's element.
      const optionElements = document.querySelectorAll('.option-item');
      expect(optionElements.length).toBe(MOCK_OPTIONS.length);
      expect(optionElements[0].textContent).toContain('Cat');
      expect(optionElements[1].textContent).toContain('Dog');
      expect(optionElements[2].textContent).toContain('Bird');
    }));

    it('should toggle an option on click', () => {
      expect(component.value).toEqual([]);
      component.toggleOption(MOCK_OPTIONS[0]);
      fixture.detectChanges();
      expect(component.value).toEqual(['cat']);
      component.toggleOption(MOCK_OPTIONS[1]);
      fixture.detectChanges();
      expect(component.value).toEqual(['cat', 'dog']);
      component.toggleOption(MOCK_OPTIONS[0]);
      fixture.detectChanges();
      expect(component.value).toEqual(['dog']);
    });
  });

  describe('ControlValueAccessor Implementation', () => {
    it('should set the value correctly using writeValue', () => {
      component.options = MOCK_OPTIONS; // Provide options for isSelected to work
      component.writeValue(['cat', 'bird']);
      fixture.detectChanges();
      expect(component.value).toEqual(['cat', 'bird']);
      expect(component.isSelected(MOCK_OPTIONS[0])).toBe(true);
      expect(component.isSelected(MOCK_OPTIONS[1])).toBe(false);
      expect(component.isSelected(MOCK_OPTIONS[2])).toBe(true);
    });

    it('should call onChange with the new value when an option is toggled', () => {
      const onChangeSpy = vi.spyOn(component, 'onChange');
      component.toggleOption(MOCK_OPTIONS[0]);
      expect(onChangeSpy).toHaveBeenCalledWith(['cat']);
    });

    it('should be disabled when setDisabledState is called', () => {
      component.setDisabledState(true);
      fixture.detectChanges();
      expect(component.disabled).toBe(true);
      const container = compiled.querySelector('.multi-select-container');
      expect(container?.classList).toContain('disabled');
      // Try to open it
      (container as HTMLElement).click();
      fixture.detectChanges();
      expect(component.isOpen).toBe(false);
    });
  });
});
