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

  constructor(private universityService: UniversityService,
    public authService: AuthService) {}

  ngOnInit(): void {
    this.domaines=this.universityService.listeDomaines();
    this.universities = [] ;
  } 
  onChange() {
    this.universities =
      this.universityService.rechercherParDomaine(this.IdDomaine);
  }

}


