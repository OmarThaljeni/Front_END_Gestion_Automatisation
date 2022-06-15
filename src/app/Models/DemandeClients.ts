import { MatTableDataSource } from "@angular/material";
import { Client } from "./Clients";
import { plateFormeLogicielle } from "./PlateFormeLog";
import { ProduitApplications } from "./ProduitApplications";

export interface DemandeClient {
  id: any;
  type: string;
  date_Debut: string;
  date_Fin: string;
  // password : string;:'
  plareFormeLogicielleList?: plateFormeLogicielle[] | MatTableDataSource<plateFormeLogicielle>;
  produitApplications?: ProduitApplications[] | MatTableDataSource<ProduitApplications>;
  client: Client;


}