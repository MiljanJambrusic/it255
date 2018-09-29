import { Person } from './../models/person.model';
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

  public firstname: string = "";
  public lastname: string = "";
  public personage: number;
  public persongender: string = "";

  public directFriends: any[] = [];
  public friendsofFriends: any[] = [];
  public suggestedfriends: any[] = [];
  public mulperson: Person[] = [];
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
        let bool: boolean = false;
        if (this.singles.length == 0) {
          this.singles.push(this.people[i]);
        }

        for (let j = 0; j < this.singles.length; j++) {
          if (this.singles[j].list_id == this.people[i].list_id) {
            console.log("Pronašao je istog");
            bool = true;
          }

        }
        if (bool == false) {
          this.singles.push(this.people[i]);
        }
      }

      for (let i = 0; i < this.singles.length; i++) {
        this.mulperson.push(new Person(this.singles[i].list_id, this.singles[i].list_firstName, this.singles[i].list_surname, this.singles[i].list_age, this.singles[i].list_gender, []));
      }
      console.log("Veličina mulperson niza je", this.mulperson.length);
    }, err => {
      alert(JSON.parse(err._body).error);
    }
    );
}

  public pickedPerson(person: any) {
  console.log(person);
  this.firstname = person.list_firstName;
  this.lastname = person.list_surname;
  this.personage = person.list_age;
  this.persongender = person.list_gender;

  let friendsids: number[] = [];
  let friendsoffriendsids: number[] = [];

  //empty array for next person
  this.directFriends = [];
  this.friendsofFriends = [];
  //picking up id of friends
  for (let i = 0; i < this.people.length; i++) {
    if (person.list_id == this.people[i].list_id) {
      friendsids.push(this.people[i].list_friends);
    }
  }

  //finding frinds in list of singles
  for (let i = 0; i < friendsids.length; i++) {
    for (let j = 0; j < this.singles.length; j++) {
      if (friendsids[i] == this.singles[j].list_id) {
        this.directFriends.push(this.singles[j]);
      }
    }
  }

  for (let i = 0; i < this.directFriends.length; i++) {
    let broj = this.directFriends[i].list_id;
    for (let j = 0; j < this.people.length; j++) {
      if (broj == this.people[j].list_id) {
        friendsoffriendsids.push(this.people[j].list_friends);
      }
    }
  }
  //empty duplicates from same array
  for (let i = 0; i < friendsoffriendsids.length; i++) {
    for (let j = i + 1; j < friendsoffriendsids.length; j++) {
      if (friendsoffriendsids[i] == friendsoffriendsids[j]) {
        friendsoffriendsids.splice(j, 1);
        j = i + 1;
      }
    }
  }
  //empty duplicates with direct friends
  for (let i = 0; i < friendsoffriendsids.length; i++) {
    for (let j = 0; j < friendsids.length; j++) {
      if (friendsoffriendsids[i] == friendsids[j]) {
        friendsoffriendsids.splice(i, 1);
        i = i - 1;
      }
    }
  }
  //empty person ID
  for (let i = 0; i < friendsoffriendsids.length; i++) {
    if (friendsoffriendsids[i] == person.list_id) {
      friendsoffriendsids.splice(i, 1);
    }
  }
  //Importing  friends of friends
  for (let i = 0; i < friendsoffriendsids.length; i++) {
    for (let j = 0; j < this.singles.length; j++) {
      if (friendsoffriendsids[i] == this.singles[j].list_id) {
        this.friendsofFriends.push(this.singles[j]);
      }
    }
  }

  for (let i = 0; i < this.mulperson.length; i++) {
    for (let j = 0; j < this.people.length; j++) {
      if (this.mulperson[i].id == this.people[j].list_id) {
        this.mulperson[i].friends.push(this.people[j].list_friends);
      }
    }
  }
  //Obriši njegove prijatelje
  let mulp = this.mulperson;
  for (let i = 0; i < mulp.length; i++) {
    for (let j = 0; j < friendsids.length; j++) {
      if (mulp[i].id == friendsids[j]) {
        mulp.splice(i, 1);
        i = i - 1;
      }
    }
  }


  for (let i = 0; i < mulp.length; i++) {
    let br = 0;
    let secondaryPerson: any[] = [];
    for (let j = 0; j < mulp[i].friends.length; j++) {
      for (let k = 0; k < this.directFriends.length; k++) {
        if (mulp[i].friends[j] == this.directFriends[k].list_id) {
          br++;
          secondaryPerson.push(this.directFriends[k]);
        }
      }
      console.log("Broj je:",br);
      if (br >= 2) {
        for(let y=0;y<secondaryPerson.length;y++){
          this.suggestedfriends.push(secondaryPerson[y]);
        }
      }else{
        br=0;
        secondaryPerson=[];
      }
    }
  }
  console.log("Krajnji rezultat je:");
  console.log(this.suggestedfriends);

}


}
