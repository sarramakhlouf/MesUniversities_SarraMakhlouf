import { Component, OnInit } from '@angular/core';
import { University } from '../model/university.model'; 
import { UniversityService } from '../services/university.service';
import { Router } from '@angular/router';
import { Domaine } from '../model/Domaine.model';

@Component({
  selector: 'app-add-university',
  templateUrl: './add-university.component.html',
  styleUrls: ['./add-university.component.css'] 
})
export class AddUniversityComponent implements OnInit { 
  newUni = new University(); 
  domaines!: Domaine[];
  newIdDom!: number;
  updatedDomId!: number;

  constructor(
    private universityService: UniversityService, // Convention de nommage : camelCase
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.universityService.listeDomaines().subscribe(doms => {
      console.log(doms);
      this.domaines = doms._embedded.domaines; 
    });
    /*// Charger les domaines depuis le service
    this.universityService.listeDomaines();
    // Vérifier si l'ID de l'université est fourni dans les paramètres d'URL (mode édition)
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      // Si un ID est présent, récupérer les informations de l'université à modifier
      const university = this.universityService.consulterUniversity(id);
      if (university) {
        // Si l'université existe, assigner ses informations
        this.newUni = university;
        this.updatedDomId = this.newUni.domaine?.idDom;
      } else {
        // Gérer le cas où l'université n'est pas trouvée (facultatif)
        console.error('Université non trouvée pour l\'ID:', id);
        // Vous pourriez rediriger vers une page d'erreur ou effectuer une autre action
      }
    }*/ 
  }
  addUniversity() {
    this.newUni.domaine = this.domaines.find(dom => dom.idDom == this.newIdDom)!;
    console.log(this.newUni);
    this.universityService.ajouterUniversity(this.newUni)
      .subscribe(uni => {
        console.log(uni);
        this.router.navigate(['universities']);
      });  
  }
}
