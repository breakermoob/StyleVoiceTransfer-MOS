import { Component, OnInit, Input } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() sidebar: String;

  constructor() { }

  ngOnInit() {
    $(document).ready(function () {

      $(window).scroll(function () {

        if ($(window).scrollTop() > 500) {
          $('a').addClass('textListColorScroll');
          $('a').removeClass('textListColor');
          $('span').addClass('textListColorScroll');
          $('span').removeClass('textListColor');
        } else {
          $('a').addClass('textListColor');
          $('a').removeClass('textListColorScroll');
          $('span').addClass('textListColor');
          $('span').removeClass('textListColorScroll');
        }

      });

    });

  }
  goUp() {
    // window.scroll(0, 0);
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 80); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
  }
}
