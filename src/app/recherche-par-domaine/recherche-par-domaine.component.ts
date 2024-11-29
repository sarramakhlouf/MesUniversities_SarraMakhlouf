import { Component, OnInit } from '@angular/core';
import { University } from '../model/university.model';
import { Domaine } from '../model/Domaine.model';
import { UniversityService } from '../services/university.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-recherche-par-domaine',
  templateUrl: './recherche-par-domaine.component.html',
})
export class RechercheParDomaineComponent implements OnInit {
  universities!: University[];
  IdDomaine!: number;
  domaines!: Domaine[];

  constructor(private universityService: UniversityService,public authService: AuthService) {}

  ngOnInit(): void {
    this.universityService.listeDomaines().subscribe((dom) => {
      this.domaines =dom._embedded.domaines;
      console.log(dom);
    });
    /*// Charger les domaines
    this.universityService.listeDomaines().subscribe({
      next: (data) => {
        this.domaines = data._embedded.domaines; // Adapter selon la structure de votre API
      },
      error: (err) => {
        console.error('Erreur lors du chargement des domaines :', err);
      },
    });
    this.universities = [];*/
  }

  onChange(){
    const domaineId = Number(this.IdDomaine);
    console.log(domaineId);
    this.universityService.rechercherParDomaine(domaineId).subscribe((uni) => {
      this.universities =uni;
    });
    /*this.universityService.rechercherParDomaine(this.IdDomaine).subscribe({
      next: (data) => {
        this.universities = data;
      },
      error: (err) => {
        console.error('Erreur lors de la recherche par domaine :', err);
      },
    });*/
  }
  supprimerUniversity(uni: University) {
    let conf = confirm('Etes-vous sûr ?');
    if (conf) {
      this.universityService.supprimerUniversity(uni.idUni!).subscribe(() => {
        // Met à jour la liste des chansons après la suppression
        this.universities = this.universities.filter(
          (c) => c.idUni !== uni.idUni
        );
        console.log('université supprimée');
      });
    }
  }
}
