import { Domaine } from "./Domaine.model";
export class University {
    idUni! : number;
    nomUni! : string;
    adresseUni! : string;
    dateCreation! : Date ;
    numberEtudiants! : number ;
    domaine! : Domaine ;
    email!: string;
}