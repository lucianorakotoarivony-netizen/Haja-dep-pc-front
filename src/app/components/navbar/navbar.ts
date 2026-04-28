import { Component, inject, signal } from '@angular/core';
import { Data } from '../../services/data';
import { RouterLinkActive, RouterLink, Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  public dataService = inject(Data);
  public auth = inject(Auth);
  private router = inject(Router);
  isMenuOpen = signal<boolean>(false);
  toggleMenu():void{
    this.isMenuOpen.set(!this.isMenuOpen());
  }
  closeMenu():void{
    this.isMenuOpen.set(false);
  }
  logout(): void{
    this.auth.logout();
    this.router.navigate(['/']);
    this.closeMenu();
  }
}