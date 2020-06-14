import { Component, OnInit, Input } from "@angular/core";

declare var $: any;

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit {
  @Input() sidebar: String;

  constructor() {}

  ngOnInit() {
    $(document).ready(function () {
      $(window).scroll(function () {
        if ($(window).scrollTop() > 300) {
          $("span").addClass("textListColorScroll");
          $("span").removeClass("textListColor");
        } else {
          $("span").addClass("textListColor");
          $("span").removeClass("textListColorScroll");
        }
      });
    });
  }

  toggleActive() {
    $(".navColor").each(function () {
      if ($(".navColor").css("background-color") == "rgba(0, 0, 0, 0.6)") {
        $(".navColor").css("background-color", "rgba(0, 0, 0, 0)");
      } else {
        $(".navColor").css("background-color", "rgba(0, 0, 0, 0.6)");
      }
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
