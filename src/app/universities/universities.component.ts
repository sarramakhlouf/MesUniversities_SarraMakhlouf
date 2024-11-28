import { Component, OnInit } from '@angular/core';
import { University } from '../model/university.model';
import { UniversityService } from '../services/university.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-universities',
  templateUrl: './universities.component.html',
  styleUrls: ['./universities.component.css'] // Correction ici
})
export class UniversitiesComponent implements OnInit // Correction de l'implémentation
{
  universities!: University[]; // Correction du type et commentaire retiré

  constructor(private UniversityService: UniversityService,
    public authService: AuthService) { }

  ngOnInit(): void {
    this.chargerUniversities(); 
  }

  chargerUniversities(){ 
    this.UniversityService.listeUniversities().subscribe(prods => { 
      console.log(prods); 
      this.universities = prods; 
    });  
  }

  supprimerUniversity(uni: University){ // Correction du type // Correction du type
    let conf = confirm("Etes-vous sûr ?"); 
    if (conf) 
    this.UniversityService.supprimerUniversity(uni.idUni).subscribe(() => { 
      console.log("université supprimée"); 
      this.chargerUniversities(); 
    });
  }
}


