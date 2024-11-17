import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Produit';

  constructor (public authService: AuthService,
    private router: Router) {}
  onLogout() {
    this.authService.logout(); // Appelez la méthode de déconnexion de votre AuthService
    this.router.navigate(['/login']); // Redirige vers la page de connexion après la déconnexion
  }
  ngOnInit() {
    let isloggedin: string | null;
    let loggedUser: string | null;
    isloggedin = localStorage.getItem('isloggedIn');
    loggedUser = localStorage.getItem('loggedUser');
    if (isloggedin != "true" || !loggedUser)
      this.router.navigate(['/login']);
    else
      this.authService.setLoggedUserFromLocalStorage(loggedUser);
  }
    
}
