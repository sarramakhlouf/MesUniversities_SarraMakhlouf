import { Component } from '@angular/core';
import { University} from '../model/university.model';
import { UniversityService } from '../services/university.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
})
export class RechercheParNomComponent {
  universities!: University[];
  nomUniversity!: string;
  allUniversities! : University[];
  searchTerm!: string;

  
  constructor(private universityService: UniversityService,
    public authService: AuthService) {}
  ngOnInit(): void {
    this.universities = this.universityService.listeUniversities();
    this.allUniversities = this.universities;
  }
  onKeyUp(filterText: string) {
    this.universities = this.allUniversities.filter(item =>
      item.nomUni!.toLowerCase().includes(filterText.toLowerCase()));
      }
  }
    
  
