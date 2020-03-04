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
  styles:string[] = [
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
    "https://voice-style-transfer.s3.amazonaws.com/CHOU_PLUS_3_SPANISH/Leon_Arango_3_to_t0.wav",
  ]
  outputs:string[] = [
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
    "https://voice-style-transfer.s3.amazonaws.com/CHOU_PLUS_3_SPANISH/Leon_Arango_3_to_t0.wav",
  ]
    
  constructor(private surveyService: ApiMosService) {}

  ngOnInit() {

    this.surveyService.getSurvey().subscribe(async res => {
      if (res) {
        this.surveys = await res;
        for (let i = 0; i < res.length; i++) {
          this.styles[i]= "https://voice-style-transfer.s3.amazonaws.com/CHOU_PLUS_3_SPANISH/Leon_Arango_3_to_t0.wav";
        }
        console.log(this.styles);
      }
    }, error => {
      console.log(error);
    });

    $('#rating-s input').change(function () {
      var $radio = $(this);
      $('#rating-s .selected').removeClass('selected');
      $radio.closest('label').addClass('selected');
    });
    $('#rating-n input').change(function () {
      var $radio = $(this);
      $('#rating-n .selected').removeClass('selected');
      $radio.closest('label').addClass('selected');
    });
    $('#rating-na input').change(function () {
      var $radio = $(this);
      $('#rating-na .selected').removeClass('selected');
      $radio.closest('label').addClass('selected');
    });

    var current_fs, next_fs; //fieldsets
    var opacity;

    $(".next").click(function () {

      current_fs = $(this).parent();
      next_fs = $(this).parent().next();

      //Add Class Active
      $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

      //show the next fieldset
      next_fs.show();
      //hide the current fieldset with style
      current_fs.animate({ opacity: 0 }, {
        step: function (now) {
          // for making fielset appear animation
          opacity = 1 - now;

          current_fs.css({
            'display': 'none',
            'position': 'relative'
          });
          next_fs.css({ 'opacity': opacity });
        },
        duration: 600
      });
    });


    $('.radio-group .radio').click(function () {
      $(this).parent().find('.radio').removeClass('selected');
      $(this).addClass('selected');
    });

    $(".submit").click(function () {
      return false;
    })

  }



}
