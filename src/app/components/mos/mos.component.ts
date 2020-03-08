import { Component, OnInit } from '@angular/core';
import { ApiMosService } from 'src/app/services/api/api-mos.service';
import { Utterance } from '../../model/utterance'

declare var $: any;

@Component({
  selector: 'app-mos',
  templateUrl: './mos.component.html',
  styleUrls: ['./mos.component.css']
})
export class MosComponent implements OnInit {

  surveys: any;
  utterance = new Utterance();
  similarityRes:number[]=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  naturalnessRes:number[]=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  nativityRes:number[]=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  count: number = 0;
  styles: string[] = [
    "/assets/12345.wav",
    "/assets/12345.wav",
    "/assets/12345.wav",
    "/assets/12345.wav",
    "/assets/12345.wav",
    "/assets/12345.wav",
    "/assets/12345.wav",
    "/assets/12345.wav",
    "/assets/12345.wav",
    "/assets/12345.wav",
    "/assets/12345.wav",
    "/assets/12345.wav",
    "/assets/12345.wav",
    "/assets/12345.wav",
    "/assets/12345.wav",
    "/assets/12345.wav",
    "/assets/12345.wav",
    "/assets/12345.wav",
  ]
  outputs: string[] = [
    "/assets/12345.wav",
    "/assets/12345.wav",
    "/assets/12345.wav",
    "/assets/12345.wav",
    "/assets/12345.wav",
    "/assets/12345.wav",
    "/assets/12345.wav",
    "/assets/12345.wav",
    "/assets/12345.wav",
    "/assets/12345.wav",
    "/assets/12345.wav",
    "/assets/12345.wav",
    "/assets/12345.wav",
    "/assets/12345.wav",
    "/assets/12345.wav",
    "/assets/12345.wav",
    "/assets/12345.wav",
    "/assets/12345.wav",
  ]

  constructor(private surveyService: ApiMosService) { }

  ngOnInit() {

    this.surveyService.getSurvey().subscribe(async res => {
      if (res) {
        this.surveys = await res;
        for (let i = 0; i < res.length; i++) {
          this.outputs[i] = res[i].output[0].url;
          this.styles[i] = res[i].style[0].url;
        }
      }
    }, error => {
      console.log(error);
    });
  }

  nextItem(event) {
    var current_fs, next_fs;
    var opacity;

    current_fs = $(event.currentTarget).parent();
    next_fs = $(event.currentTarget).parent().next();

    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

    next_fs.show();

    current_fs.animate({ opacity: 0 }, {
      step: function (now) {

        opacity = 1 - now;

        current_fs.css({
          'display': 'none',
          'position': 'relative'
        });
        next_fs.css({ 'opacity': opacity });
      },
      duration: 600
    });

    this.count++;
    if (this.count===19) {
      //Aqui ejecutaremos el post
      for (let i = 0; i < this.surveys.length; i++) {
        this.utterance.nativeness = this.nativityRes[i];
        this.utterance.similarity = this.similarityRes[i];
        this.utterance.naturalness = this.naturalnessRes[i];
        this.utterance.utteranceID = this.surveys[i].id;
        this.surveyService.saveSurvey(this.utterance).subscribe(res=>{
          console.log(res)
        })
        
      }
    }
  
  }

  similarity(event,value){
    this.similarityRes[this.count-1]=value;
    var radio = $(event.currentTarget);
    radio.removeClass('selected');
    $('#similarity .selected').removeClass('selected');
    radio.addClass('selected');
  }
  nativity(event,value){
    this.nativityRes[this.count-1]=value;
    var radio = $(event.currentTarget);
    radio.removeClass('selected');
    $('#nativity .selected').removeClass('selected');
    radio.addClass('selected');
  }
  naturalness(event,value){
    this.naturalnessRes[this.count-1]=value;
    var radio = $(event.currentTarget);
    radio.removeClass('selected');
    $('#naturalness .selected').removeClass('selected');
    radio.addClass('selected');
  }
}
