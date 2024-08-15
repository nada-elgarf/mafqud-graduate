import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MafqudService } from 'src/app/Mafqud.service';
import { LostChildren } from 'src/app/Models/lostChildren';

@Component({
  selector: 'app-lost-details',
  templateUrl: './lost-details.component.html',
  styleUrls: ['./lost-details.component.css']
})
export class LostDetailsComponent implements OnInit {
  child !: LostChildren

  constructor(private route : ActivatedRoute ,
              private lostById : MafqudService,
              private router : Router) { }

  ngOnInit() {
    this.getChildLostById();
  }

  getChildLostById () :void {
    const id = this.route.snapshot.paramMap.get('id');
    this.lostById.getChildLostById(id).subscribe(
      id => {
        this.child = id;
        console.log(this.child)
      }
    )
  }

  deleteLostChild(id : number) {
    this.lostById.deleteLostChildById(id).subscribe(
      () =>{
        this.router.navigate(["/Lost"])
      }
    )
  }

}
