import { Component } from '@angular/core';
import { Domaine } from '../model/Domaine.model';
import { UniversityService } from '../services/university.service';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-lister-domaines',
  templateUrl: './lister-domaines.component.html',
  styleUrl: './lister-domaines.component.css'
})
export class ListerDomainesComponent {
  domaines! : Domaine[];
  updatedDom: Domaine = {"idDom":0,"nomDom":""};
  ajout: boolean = true;
  constructor(private UniversityService: UniversityService,public authService: AuthService){}
  ngOnInit(): void {
    this.domaines = this.UniversityService.listeDomaines();
  }
  domaineUpdated(dom: Domaine): void {
    if (this.ajout) {
      // Si ajout est vrai, ajouter la marque
      this.UniversityService.ajouterDomaine(dom);
    } else {
      // Si ajout est faux, modifier la marque existante
      const index = this.domaines.findIndex(m => m.idDom === dom.idDom);
      this.domaines[index] = dom;
      this.updatedDom = { "idDom": 0, "nomDom": "" };
    }
    this.chargerDomaines();
    this.ajout = true;
  }
  chargerDomaines(){
    this.UniversityService.listeDomaines();
  }
  updateDom(dom:Domaine){
    this.updatedDom = dom;
    this.ajout = false;
  }

}
