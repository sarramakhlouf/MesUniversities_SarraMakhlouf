import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Domaine } from '../model/Domaine.model';

@Component({
  selector: 'app-update-domaine',
  templateUrl: './update-domaine.component.html',
  styleUrl: './update-domaine.component.css'
})
export class UpdateDomaineComponent {

  @Input()
  domaine!: Domaine;
  @Input()
  ajout! : boolean;
  @Output()
  domaineUpdated = new EventEmitter<Domaine>();

  ngOnInit(): void {
    console.log("ngOnInit du composant UpdateDomaine ",this.domaine);
  }
  saveDomaine(){
    this.domaineUpdated.emit(this.domaine);
  }

}
