
import { Http, Headers } from '../../../node_modules/@angular/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  constructor(private _http: Http, private _router: Router) { }

  public people: any[] = [];
  public singles: any[] = [];

  ngOnInit() {
    this.getpeople();
  }

  public getpeople() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this._http.get('http://localhost/socialnetworkphp/getpeople.php', { headers: headers })
      .subscribe(data => {
        this.people = JSON.parse(data['_body']).people;

        for (let i = 0; i < this.people.length; i++) {
          let truefalse: boolean = false;
          if (this.singles.length == 0) {
            this.singles.push(this.people[i]);
          }

          for (let j = 0; j < this.singles.length; j++) {
            if (this.singles[j].list_id == this.people[i].list_id) {
              console.log("Pronašao je istog");
              truefalse = true;
            }

          }
          if (truefalse == false) {
            this.singles.push(this.people[i]);
          }
        }
        console.log(this.singles);
        console.log(this.people);
      }, err => {
        alert(JSON.parse(err._body).error);
      }
      );

  }

}
