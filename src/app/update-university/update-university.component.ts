import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UniversityService } from '../services/university.service';
import { University } from '../model/university.model';
import { Domaine } from '../model/Domaine.model';

@Component({
  selector: 'app-update-university',
  templateUrl: './update-university.component.html',
  styles: []
})
export class UpdateUniversityComponent implements OnInit {
  currentUniversity: University | undefined;
  domaines: Domaine[] = [];
  updatedDomId: number | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private universityService: UniversityService
  ) {}

  ngOnInit(): void {
    const universityId = Number(this.activatedRoute.snapshot.params['id']);

    if (isNaN(universityId)) {
      console.error("L'ID fourni dans l'URL n'est pas valide.");
      this.router.navigate(['universities']);
      return;
    }

    // Charger les domaines
    this.universityService.listeDomaines().subscribe({
      next: (doms) => {
        this.domaines = doms._embedded.domaines;
      },
      error: (err) => {
        console.error("Erreur lors du chargement des domaines :", err);
      },
    });

    // Charger l'université
    this.universityService.consulterUniversity(universityId).subscribe({
      next: (uni) => {
        this.currentUniversity = uni;
        this.updatedDomId = this.currentUniversity.domaine?.idDom;
      },
      error: (err) => {
        console.error("Erreur lors du chargement de l'université :", err);
        this.router.navigate(['universities']);
      },
    });
  }

  updateUniversity(): void {
    if (!this.currentUniversity || !this.updatedDomId) {
      console.error("Les données nécessaires ne sont pas disponibles.");
      return;
    }

    // Assigner le domaine mis à jour à l'université
    const selectedDomaine = this.domaines.find((dom) => dom.idDom === this.updatedDomId);
    if (selectedDomaine) {
      this.currentUniversity.domaine = selectedDomaine;
    } else {
      console.error("Le domaine sélectionné est introuvable.");
      return;
    }

    // Appeler le service pour mettre à jour l'université
    this.universityService.updateUniversity(this.currentUniversity).subscribe({
      next: () => {
        console.log("Université mise à jour avec succès.");
        this.router.navigate(['universities']);
      },
      error: (err) => {
        console.error("Erreur lors de la mise à jour de l'université :", err);
      },
    });
  }
}
