import { Component, OnInit } from '@angular/core';
import { ApiMosService } from 'src/app/services/api/api-mos.service';

declare var $: any;

@Component({
  selector: 'app-mos',
  templateUrl: './mos.component.html',
  styleUrls: ['./mos.component.css']
})
export class MosComponent implements OnInit {

  surveys: any;
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
    "https://voice-style-transfer.s3.amazonaws.com/CHOU_PLUS_3_SPANISH/Leon_Arango_3_to_t0.wav",
    "https://voice-style-transfer.s3.amazonaws.com/CHOU_PLUS_3_SPANISH/Leon_Arango_3_to_t0.wav",
    "https://voice-style-transfer.s3.amazonaws.com/CHOU_PLUS_3_SPANISH/Leon_Arango_3_to_t0.wav",
    "https://voice-style-transfer.s3.amazonaws.com/CHOU_PLUS_3_SPANISH/Leon_Arango_3_to_t0.wav",
    "https://voice-style-transfer.s3.amazonaws.com/CHOU_PLUS_3_SPANISH/Leon_Arango_3_to_t0.wav",
    "https://voice-style-transfer.s3.amazonaws.com/CHOU_PLUS_3_SPANISH/Leon_Arango_3_to_t0.wav",
    "https://voice-style-transfer.s3.amazonaws.com/CHOU_PLUS_3_SPANISH/Leon_Arango_3_to_t0.wav",
    "https://voice-style-transfer.s3.amazonaws.com/CHOU_PLUS_3_SPANISH/Leon_Arango_3_to_t0.wav",
    "https://voice-style-transfer.s3.amazonaws.com/CHOU_PLUS_3_SPANISH/Leon_Arango_3_to_t0.wav",
    "https://voice-style-transfer.s3.amazonaws.com/CHOU_PLUS_3_SPANISH/Leon_Arango_3_to_t0.wav",
    "https://voice-style-transfer.s3.amazonaws.com/CHOU_PLUS_3_SPANISH/Leon_Arango_3_to_t0.wav",
    "https://voice-style-transfer.s3.amazonaws.com/CHOU_PLUS_3_SPANISH/Leon_Arango_3_to_t0.wav",
    "https://voice-style-transfer.s3.amazonaws.com/CHOU_PLUS_3_SPANISH/Leon_Arango_3_to_t0.wav",
    "https://voice-style-transfer.s3.amazonaws.com/CHOU_PLUS_3_SPANISH/Leon_Arango_3_to_t0.wav",
    "https://voice-style-transfer.s3.amazonaws.com/CHOU_PLUS_3_SPANISH/Leon_Arango_3_to_t0.wav",
    "https://voice-style-transfer.s3.amazonaws.com/CHOU_PLUS_3_SPANISH/Leon_Arango_3_to_t0.wav",
    "https://voice-style-transfer.s3.amazonaws.com/CHOU_PLUS_3_SPANISH/Leon_Arango_3_to_t0.wav",
    "https://voice-style-transfer.s3.amazonaws.com/CHOU_PLUS_3_SPANISH/Leon_Arango_3_to_t0.wav",
  ]

  constructor(private surveyService: ApiMosService) { }

  ngOnInit() {

    this.surveyService.getSurvey().subscribe(async res => {
      if (res) {
        this.surveys = await res;
        for (let i = 0; i < res.length; i++) {
          this.styles[i] = "https://voice-style-transfer.s3.amazonaws.com/CHOU_PLUS_3_SPANISH/Leon_Arango_3_to_t0.wav";
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
      console.log(this.similarityRes);
      console.log(this.naturalnessRes);
      console.log(this.nativityRes);
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
