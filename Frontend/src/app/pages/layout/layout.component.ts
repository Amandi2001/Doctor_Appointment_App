import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  constructor(private router: Router) {}

  logout() {
    // Clear local storage, session, or auth token
    localStorage.clear(); // or sessionStorage.clear();
    this.router.navigate(['/login']); // redirect to login page
  }

}
