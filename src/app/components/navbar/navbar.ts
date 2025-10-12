import { Component, signal, OnInit, OnDestroy, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="sticky z-50 transition-all duration-500 ease-in-out"
         [class.top-0]="!isScrolled()"
         [class.top-2]="isScrolled()"
         [class.sm:top-4]="isScrolled()">
      <div class="transition-all duration-500 ease-in-out mx-auto"
           [class.max-w-7xl]="!isScrolled()"
           [class.max-w-6xl]="isScrolled()"
           [class.px-3]="!isScrolled()"
           [class.sm:px-6]="!isScrolled()"
           [class.lg:px-8]="!isScrolled()"
           [class.px-2]="isScrolled()"
           [class.sm:px-3]="isScrolled()">
        <div class="transition-all duration-500 ease-in-out backdrop-blur-md"
             [class.bg-white/95]="isScrolled()"
             [class.rounded-xl]="isScrolled()"
             [class.sm:rounded-2xl]="isScrolled()"
             [class.shadow-sm]="isScrolled()"
             [class.border-gray-100]="!isScrolled()">
          <div class="flex justify-between items-center h-16"
               [class.px-4]="!isScrolled()"
               [class.px-3]="isScrolled()"
               [class.sm:px-6]="isScrolled()">
          <!-- Logo Section -->
          <div class="flex-shrink-0 flex items-center">
            <a routerLink="/" class="flex items-center space-x-3">
              <img
                src="/assets/logo-1.png"
                alt="DevFest Kivu Logo"
                class="h-8 w-auto sm:h-10 lg:h-10"
              />
            </a>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-1 lg:space-x-2 group">
              @for (item of navItems(); track item.path) {
              <a
                [routerLink]="item.path"
                routerLinkActive="nav-active"
                class="nav-link lg:text-base"
                [attr.aria-current]="item.path === '/' ? 'page' : null"
              >
                {{ item.label }}
              </a>
              }
            </div>
          </div>

          <!-- CTA Button (Desktop) -->
          <div class="hidden md:block">
            <a routerLink="/dp-generator" class="btn btn-primary btn-md"> Genérer votre DP </a>
          </div>

          <!-- Mobile Menu Button -->
          <div class="md:hidden">
            <button
              (click)="toggleMobileMenu()"
              class="relative inline-flex items-center justify-center p-sm text-text hover:text-primary hover:bg-background/50 transition-all duration-300 rounded-sm group"
              [class.rotate-90]="isMobileMenuOpen()"
              [attr.aria-expanded]="isMobileMenuOpen()"
              aria-label="Toggle navigation menu"
            >
              <div class="relative w-6 h-6">
                <svg
                  class="absolute inset-0 w-6 h-6 transition-all duration-300"
                  [class.opacity-0]="isMobileMenuOpen()"
                  [class.rotate-180]="isMobileMenuOpen()"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  class="absolute inset-0 w-6 h-6 transition-all duration-300"
                  [class.opacity-0]="!isMobileMenuOpen()"
                  [class.rotate-180]="!isMobileMenuOpen()"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>

        <!-- Mobile Navigation Menu -->
        <div
          class="md:hidden bg-white/95 backdrop-blur-sm border-t border-gray-100 overflow-hidden transition-all duration-500 ease-in-out"
          [class.max-h-0]="!isMobileMenuOpen()"
          [class.max-h-screen]="isMobileMenuOpen()"
        >
        <div
          class="px-md pt-lg pb-xl space-y-1 transition-all duration-300 delay-100"
          [class.opacity-0]="!isMobileMenuOpen()"
          [class.opacity-100]="isMobileMenuOpen()"
          [class.translate-y-4]="!isMobileMenuOpen()"
          [class.translate-y-0]="isMobileMenuOpen()"
        >
          @for (item of navItems(); track item.path; let i = $index) {
          <a
            [routerLink]="item.path"
            routerLinkActive="nav-active-mobile"
            (click)="closeMobileMenu()"
            class="block px-sm py-md text-base font-medium text-text hover:text-primary transition-all duration-300 border-l-4 border-transparent hover:translate-x-1 hover:border-primary"
            [style.transition-delay]="i * 50 + 'ms'"
          >
            {{ item.label }}
          </a>
          }

          <!-- Mobile CTA Button -->
          <div class="pt-lg border-t border-background/50 mt-md">
            <a
              routerLink="/dp-generator"
              (click)="closeMobileMenu()"
              class="btn btn-primary btn-md w-full text-center block"
            >
              Genérer votre DP
            </a>
          </div>
        </div>
        </div>
        </div>
      </div>
    </nav>
  `,
  styles: `
    /* Navigation Links */
    .nav-link {
      position: relative;
      padding: var(--spacing-sm);
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--color-text);
      text-decoration: none;
      transition: all 0.3s ease-in-out;
    }

    .nav-link::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 50%;
      width: 0;
      height: 2px;
      background-color: var(--color-primary);
      transition: all 0.3s ease-in-out;
      transform: translateX(-50%);
    }

    .nav-link:hover {
      color: var(--color-primary);
    }

    .nav-link:hover::after {
      width: 100%;
    }

    .nav-link.nav-active {
      color: var(--color-primary);
    }

    .nav-link.nav-active::after {
      width: 100%;
    }

    /* Hide active line when hovering other links */
    .group:hover .nav-link.nav-active:not(:hover)::after {
      width: 0;
    }

    /* Mobile active state */
    .nav-active-mobile {
      color: var(--color-primary) !important;
      border-left-color: var(--color-primary) !important;
    }
    
    /* Backdrop blur support */
    .backdrop-blur-sm {
      backdrop-filter: blur(4px);
    }
    
    /* Smooth height transitions */
    .transition-max-height {
      transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }
  `,
})
export class Navbar implements OnInit, OnDestroy {
  isMobileMenuOpen = signal(false);
  isScrolled = signal(false);

  navItems = signal([
    { path: '/', label: 'Home' },
    { path: '/agenda', label: 'Agenda' },
    { path: '/speakers', label: 'Speakers' },
    { path: '/sponsor', label: 'Sponsors' },
    { path: '/qa', label: 'Q&A' },
    { path: '/live_q', label: 'Live Q' },
  ]);

  ngOnInit() {
    this.checkScroll();
  }

  ngOnDestroy() {
    // Cleanup if needed
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkScroll();
  }

  private checkScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isScrolled.set(scrollPosition > 50);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update((value) => !value);
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }
}
