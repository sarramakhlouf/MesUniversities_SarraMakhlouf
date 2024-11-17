import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UniversityService } from '../services/university.service';
import { University } from '../model/university.model';
import { Domaine } from '../model/Domaine.model';
 // Typiquement, tout en minuscule pour le chemin

@Component({
  selector: 'app-update-university',
  templateUrl: './update-university.component.html',
  styles: []
})
export class UpdateUniversityComponent implements OnInit {
  currentUniversity: University | undefined;  // Ajouter le type 'undefined' pour gérer les valeurs non trouvées
  domaines!: Domaine[];
  updatedDomId!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private universityService: UniversityService
  ) { }

  ngOnInit() {
    // Récupérer l'ID de l'université à partir des paramètres de route
    const universityId = Number(this.activatedRoute.snapshot.params['id']); // Utilisation de 'Number()' pour plus de clarté
    this.domaines = this.universityService.listeDomaines();
    // Consulter l'université actuelle
    const university = this.universityService.consulterUniversity(universityId);
    // Si l'université existe, initialiser la currentUniversity
    if (university) {
      this.currentUniversity = university;
      // Vérifier si le domaine de l'université est défini avant d'accéder à ses propriétés
      if (this.currentUniversity.domaine) {
        this.updatedDomId = this.currentUniversity.domaine.idDom;
      }
    } else {
      console.error("L'université avec l'ID donné n'a pas été trouvée.");
    }
  }

  updateUniversity() {
    if (this.currentUniversity && this.updatedDomId) {
      // Vérifier si le domaine existe avant d'appliquer la mise à jour
      const domaine = this.universityService.consulterDomaines(this.updatedDomId);
      if (domaine) {
        this.currentUniversity.domaine = domaine;
      }
      // Mettre à jour l'université si elle existe
      this.universityService.updateUniversity(this.currentUniversity);
      this.router.navigate(['universities']);
    }
  }
}


