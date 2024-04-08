import { Component } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent {

  queriesResponse: any = [];
  query: string = '';

  showLoadingText: boolean = true;

  constructor(private _httpService: HttpService) { }

  sendUserQuery() {
    if (this.query.length) {
      this.queriesResponse.push({ id: this.queriesResponse.length + 1, query: this.query, action_by: "user" });
      this.showLoadingText = true;
    const url = "https://custom-qatar-backend-service.azurewebsites.net/qa";
    const payload = {
      "conversation_id": Math.floor(Math.random() * 30 + 1).toString(),
      "lang": "ar",
      "query": this.query
    }
    this.queriesResponse.push({id: this.queriesResponse.length+1 , botresponse: "", action_by: 'bot'});
    this.query = "";
    this._httpService.sendQueryToBot(payload, url).subscribe(({
      next: (res) => {
        this.showLoadingText = false;
        this.queriesResponse[this.queriesResponse.length-1].botresponse = res.response
        console.log(this.queriesResponse);
      },
      error: (err) => {
        this.showLoadingText = false;
        console.log(err.message);
      }
    }))
    }
    else{
      alert("Please enter some text first!!!");
    }
  }
}
