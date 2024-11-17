import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UniversitiesComponent } from './universities/universities.component';
import { AddUniversityComponent } from './add-university/add-university.component';
import { UpdateUniversityComponent } from './update-university/update-university.component';
import { RechercheParDomaineComponent } from './recherche-par-domaine/recherche-par-domaine.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { universityGuard } from './university.guard';
import { ListerDomainesComponent } from './lister-domaines/lister-domaines.component';


const routes: Routes = [
  {path: "universities", component : UniversitiesComponent},
  {path: "add-university", component : AddUniversityComponent, canActivate:[universityGuard]},
  {path: "updateUniversity/:id", component: UpdateUniversityComponent},
  {path: "rechercheParDomaine", component : RechercheParDomaineComponent},
  {path: "rechercheParNom", component : RechercheParNomComponent},
  {path: 'app-forbidden', component: ForbiddenComponent},
  {path: 'login', component: LoginComponent},
  {path: "listerDomaines", component : ListerDomainesComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
