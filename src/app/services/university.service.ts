import { Injectable } from '@angular/core';
import { University } from '../model/university.model';
import { Domaine } from '../model/Domaine.model';
import { DomaineWrapper } from '../model/DomaineWrapped.model';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UniversityService {
  universities ! : University[];
  domaines!:Domaine[];
  universityRecherche!: University[];

  private apiURL: string = 'http://localhost:8090/universities/api';
  private apiURLDom: string = 'http://localhost:8090/universities/dom';

  constructor(private http: HttpClient) {}

  listeUniversities(): Observable<University[]> {
    return this.http.get<University[]>(this.apiURL).pipe(
      catchError((err) => {
        console.error('Erreur lors de la récupération des universités', err);
        return of([]);
      })
    ); 
  }

  ajouterUniversity(uni: University): Observable<University> {
    return this.http.post<University>(this.apiURL, uni, httpOptions);
  }

  supprimerUniversity(id: number){
    const url = `${this.apiURL}/${id}`;
    return this.http.delete(url, httpOptions);
  }

  consulterUniversity(id: number): Observable<University> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<University>(url);
  }

  updateUniversity(uni: University): Observable<University> {
    const url = `${this.apiURL}/${uni.idUni}`;
    return this.http.put<University>(url, uni, httpOptions);
  }

  listeDomaines(): Observable<DomaineWrapper> {
    return this.http.get<DomaineWrapper>(this.apiURLDom);
  }

  ajouterDomaine(domaine: Domaine): Observable<Domaine> {
    return this.http.post<Domaine>(this.apiURLDom, domaine);
  }

  consulterDomaine(id :number):Domaine{
    return this.domaines.find(dom => dom.idDom == id)!;
  }

  rechercherParDomaine(idDom: number): Observable<University[]> {
    const url = `${this.apiURLDom}/search?domaineId=${idDom}`;
    return this.http.get<University[]>(url);
  }

  rechercherParNom(nom: string): Observable<University[]> {
    const url = `${this.apiURL}/formsByName/${nom}`;
    return this.http.get<University[]>(url);
  }

  updateDomaine(dom:Domaine): Observable<void> {
    const url = `${this.apiURL}/${dom.idDom}`; // Assurez-vous que `id` est une propriété existante
    return this.http.put<void>(url, dom);
  }
  trierUidUni() {
    this.universities = this.universities.sort((n1, n2) => {
      if (n1.idUni! > n2.idUni!) {
        return 1;
      }
      if (n1.idUni! < n2.idUni!) {
        return -1;
      }
      return 0;
    });
  }
}
