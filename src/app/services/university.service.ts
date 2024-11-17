import { Injectable } from '@angular/core';
import { University } from '../model/university.model';
import { Domaine } from '../model/Domaine.model'; // Vérifiez le nom de fichier ici
@Injectable({
  providedIn: 'root'
})
export class UniversityService {

  universities: University[];
  domaines: Domaine[];
  universitiesRecherche: University[] = [];

  constructor() {
    this.domaines = [
      { idDom: 1, nomDom: "Informatique" },
      { idDom: 2, nomDom: "Lettres et langues" },
      { idDom: 3, nomDom: "Santé" },
      { idDom: 4, nomDom: "Economie et gestion" },
    ];
    this.universities = [
      { idUni: 1, nomUni: "Iset", adresseUni: "Nabeul", dateCreation: new Date("01/12/2011"), nombreEtudiants: 2000, domaine: { idDom: 1, nomDom: "Informatique" } , email: "isetnabeul@gmail.com"},
      { idUni: 2, nomUni: "Ihec", adresseUni: "Carthage", dateCreation: new Date("12/08/2010"), nombreEtudiants: 1000, domaine: { idDom: 4, nomDom: "Economie et gestion" }, email: "ihecCarthage@gmail.com"},
      { idUni: 3, nomUni: "Université centrale", adresseUni: "Tunis", dateCreation: new Date("02/10/2020"), nombreEtudiants: 5000, domaine: { idDom: 3, nomDom: "Santé" }, email: "UniversiteCentrale@gmail.com" },
      { idUni: 4, nomUni: "Isam", adresseUni: "Manouba", dateCreation: new Date("12/05/2020"), nombreEtudiants: 4500, domaine: { idDom: 1, nomDom: "informatique" }, email: "isam@gmail.com" }
    ];
  }

  listeUniversities(): University[] {
    return this.universities;
  }

  ajouterUniversity(uni: University): void {
    this.universities.push(uni);
  }

  supprimerUniversity(uni: University): void {
    const index = this.universities.indexOf(uni);
    if (index !== -1) {
      this.universities.splice(index, 1);
    }
  }

  consulterUniversity(id: number): University | undefined {
    return this.universities.find(p => p.idUni === id);
  }

  updateUniversity(uni: University): void {
    const index = this.universities.findIndex(u => u.idUni === uni.idUni);
    if (index !== -1) {
      this.universities[index] = uni; // Mettre à jour directement
    }
    this.trierUniversities();
  }

  trierUniversities(): void {
    this.universities.sort((n1, n2) => n1.idUni - n2.idUni);
  }

  listeDomaines(): Domaine[] {
    return this.domaines;
  }

  consulterDomaines(id: number): Domaine | undefined {
    return this.domaines.find(dom => dom.idDom == id);
  }

  rechercherParDomaine(idDom: number): University[] {
    return this.universities.filter(uni => uni.domaine.idDom == idDom);
  }
  ajouterDomaine(dom: Domaine): Domaine {
    const id = this.domaines.length + 1
    dom.idDom = id;
    this.domaines.push({ ...dom }); // ... pour faire un copie de objet dom
    return dom;
  }
}
