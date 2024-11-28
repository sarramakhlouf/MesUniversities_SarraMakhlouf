import { Component, OnInit } from '@angular/core';
import { University } from '../model/university.model';
import { UniversityService } from '../services/university.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
})
export class RechercheParNomComponent implements OnInit {
  universities!: University[];
  nomUniversity!: string;
  allUniversities!: University[];
  searchTerm!: string;

  constructor(
    private universityService: UniversityService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    // Charger les universités via l'API
    this.universityService.listeUniversities().subscribe({
      next: (data) => {
        this.universities = data; // Adapter selon la structure de votre API
        this.allUniversities = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des universités :', err);
      },
    });
  }

  rechercherUnis() {
    this.universityService.rechercherParNom(this.nomUniversity).subscribe((unis) => {
      this.universities = unis;
      console.log(unis);
    });
  }

  onKeyUp(filterText: string): void {
    this.universities = this.allUniversities.filter((item) =>
      item.nomUni!.toLowerCase().includes(filterText.toLowerCase())
    );
  }
}
