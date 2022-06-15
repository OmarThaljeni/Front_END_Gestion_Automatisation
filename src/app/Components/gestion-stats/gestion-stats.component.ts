import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { GestionDemandeClientsService } from 'src/app/Services/gestion_demande_client.service';

@Component({
  selector: 'app-gestion-stats',
  templateUrl: './gestion-stats.component.html',
  styleUrls: ['./gestion-stats.component.scss']
})
export class GestionStatsComponent implements OnInit {

   nbDA : any;
   nbDAc : any;

  constructor(public demandeService : GestionDemandeClientsService) { }

  ngOnInit() {
    this.fillChartData();
    this.getValue();
  }

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['Nombre des demandes traité/NB Total', 'Nombre des machines', 'Nombre des plate Forme logicielle', 'Nombre des systéme'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[]


  getValue()
  {
    this.demandeService.GetNBDemande().subscribe(res=> {
      this.nbDA = res;
      console.log("==> 1",this.nbDA);
    })
    this.demandeService.GetNBDemandeAccepte().subscribe(res=> {
      this.nbDA = res;
      console.log("==> 2",this.nbDAc);
    })

   

  
  }
fillChartData()
{
  this.barChartData= [
    { data: [100, 100, 100, 100], label: 'Nombre total' },
    { data: [60, 48, 40, 19], label: 'Nombre acqui' }
  ];

}

 
 

}
