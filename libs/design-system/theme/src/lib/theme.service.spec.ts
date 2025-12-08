import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';
import { THEME_STORAGE } from './theme.types';
import { DOCUMENT } from '@angular/common';
import { vi } from 'vitest';

describe('ThemeService', () => {
  let service: ThemeService;
  let mockStorage: any;
  let documentMock: any;

  beforeEach(() => {
    // 1. Setup Mocks
    mockStorage = {
      saveTheme: vi.fn(),
      getTheme: vi.fn().mockReturnValue(null), // Default: return null (Light)
    };

    documentMock = {
      documentElement: document.createElement('html'),
    };

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    // 2. Configure Module
    TestBed.configureTestingModule({
      providers: [
        ThemeService,
        { provide: THEME_STORAGE, useValue: mockStorage },
        { provide: DOCUMENT, useValue: documentMock },
      ],
    });

    // CRITICAL CHANGE: Do NOT inject the service here!
    // We wait to inject it inside the tests so we can change mocks first.
  });

  it('should initialize with "light" by default', () => {
    // Injecting here runs the constructor for the first time
    service = TestBed.inject(ThemeService);

    expect(service.currentTheme()).toBe('light');
    expect(documentMock.documentElement.getAttribute('data-theme')).toBe(
      'light'
    );
  });

  it('should toggle to "dark"', () => {
    service = TestBed.inject(ThemeService);

    service.toggleTheme();

    expect(service.currentTheme()).toBe('dark');
    expect(mockStorage.saveTheme).toHaveBeenCalledWith('dark');
  });

  it('should respect saved storage preference', () => {
    // 1. CHANGE THE MOCK *BEFORE* THE SERVICE IS CREATED
    mockStorage.getTheme.mockReturnValue('dark');

    // 2. NOW create the service. The constructor runs and sees 'dark'
    service = TestBed.inject(ThemeService);

    expect(service.currentTheme()).toBe('dark');
    expect(documentMock.documentElement.getAttribute('data-theme')).toBe(
      'dark'
    );
  });
});
