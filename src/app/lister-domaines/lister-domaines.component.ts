import { Component, OnInit } from '@angular/core';
import { Domaine } from '../model/Domaine.model';
import { UniversityService } from '../services/university.service';

@Component({
  selector: 'app-lister-domaines',
  templateUrl: './lister-domaines.component.html',
  styleUrls: ['./lister-domaines.component.css']
})
export class ListerDomainesComponent implements OnInit {
  domaines!: Domaine[];
  updatedDom: Domaine = { idDom: 0, nomDom: '' };
  ajout: boolean = true;

  constructor(
    private universityService: UniversityService,
  ) {}

  ngOnInit(): void {
    this.chargerDomaines();
  }

  chargerDomaines(): void {
    this.universityService.listeDomaines().subscribe({
      next: (data) => {
        this.domaines = data._embedded.domaines;
      },
      error: (err) => {
        console.error("Erreur lors du chargement des domaines :", err);
      },
    });
  }

  domaineUpdated(dom: Domaine){
    console.log('university reçue du composant updateduniversity:', dom);
    this.universityService.ajouterDomaine(dom).subscribe(()=> this.chargerDomaines());
    /*if (this.ajout) {
      // Ajouter un domaine
      this.universityService.ajouterDomaine(dom).subscribe({
        next: () => {
          console.log("Domaine ajouté avec succès.");
          this.chargerDomaines(); // Rafraîchir la liste des domaines
        },
        error: (err) => {
          console.error("Erreur lors de l'ajout du domaine :", err);
        },
      });
    } else {
      // Modifier un domaine existant
      const index = this.domaines.findIndex((m) => m.idDom === dom.idDom);
      if (index !== -1) {
        this.domaines[index] = dom; // Met à jour localement pour éviter un rechargement total
        console.log("Domaine mis à jour localement.");
      }
      this.updatedDom = { idDom: 0, nomDom: '' };
      this.ajout = true;
    }*/
  }

  updateDom(dom: Domaine){
    /*this.updatedDom = { ...dom }; // Créer une copie pour éviter de modifier l'original directement
    this.ajout = false;*/
    console.log("dom updated event", dom); // Journal pour déboguer
    this.universityService.updateDomaine(dom) // Appel API pour mettre à jour la catégorie
      .subscribe(
        () => {
          this.chargerDomaines(); // Recharge la liste des catégories après mise à jour
          this.ajout = false; // Cache le formulaire d'ajout
          console.log("Domaine mise à jour avec succès");
        },
      );
  }
}
