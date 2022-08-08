(function ($) {
  "use strict";

  /*-------------------------------------
    Subscribe Form Activation
    -------------------------------------*/
  $("[data-pixsaas]").each(function () {
    var $this = $(this);
    $(".form-result", $this).css("display", "none");

    $this.submit(function () {
      $('button[type="submit"]', $this).addClass("clicked");

      // Create a object and assign all fields name and value.
      var values = {};

      $("[name]", $this).each(function () {
        var $this = $(this),
          $name = $this.attr("name"),
          $value = $this.val();
        values[$name] = $value;
      });

      // Make Request
      $.ajax({
        url: $this.attr("action"),
        type: "POST",
        data: values,
        success: function success(data) {
          if (data.error == true) {
            $(".form-result", $this)
              .addClass("alert-warning")
              .removeClass("alert-success alert-danger")
              .fadeIn(200)
              .show()
              .fadeOut(5000);
          } else {
            $(".form-result", $this)
              .addClass("alert-success")
              .removeClass("alert-warning alert-danger")
              .fadeIn(200)
              .show()
              .fadeOut(5000);
          }
          $(".form-result > .content", $this).html(data.message);
          $('button[type="submit"]', $this).removeClass("clicked");
          $this.trigger("reset");
        },
        error: function error() {
          $(".form-result", $this)
            .addClass("alert-danger")
            .removeClass("alert-warning alert-success")
            .css("display", "block");
          $(".form-result > .content", $this).html("Sorry, an error occurred.");
          $('button[type="submit"]', $this).removeClass("clicked");
        },
      });
      return false;
    });
  });

  /*-------------------------------------
    Youtube Video
    -------------------------------------*/
  if ($.fn.YTPlayer !== undefined && $("#fxtVideo").length) {
    $("#fxtVideo").YTPlayer({ useOnMobile: true });
  }

  /*-------------------------------------
    Vegas Slider
    -------------------------------------*/
  if ($.fn.vegas !== undefined && $("#vegas-slide").length) {
    var target_slider = $("#vegas-slide"),
      vegas_options = target_slider.data("vegas-options");
    if (typeof vegas_options === "object") {
      target_slider.vegas(vegas_options);
    }
  }

  /*-------------------------------------
    Animated Headline
    -------------------------------------*/
  if ($.fn.animatedHeadline !== undefined && $(".ah-animate").length) {
    var target_slider = $(".ah-animate"),
      ah_options = target_slider.data("line-options");
    if (typeof ah_options === "object") {
      target_slider.animatedHeadline(ah_options);
    }
  }

  /*-------------------------------------
    Section background image
    -------------------------------------*/
  $("[data-bg-image]").each(function () {
    var img = $(this).data("bg-image");
    $(this).css({
      backgroundImage: "url(" + img + ")",
    });
  });

  $(function () {
    /*-------------------------------------
        Ripples activation code
        -------------------------------------*/
    if ($.fn.ripples !== undefined) {
      $("#wrapper").ripples({
        resolution: 356,
        dropRadius: 20,
        perturbance: 0.04,
      });
    }
    /*-------------------------------------
        Countdown activation code
        -------------------------------------*/
    var eventCounter = $(".countdown");
    if (eventCounter.length) {
      eventCounter.countdown("2022/08/14", function (e) {
        $(this).html(
          e.strftime(
            "<div class='countdown-section'><div><div class='countdown-number'>%D</div> <div class='countdown-unit'>Day%!D</div> </div></div><div class='countdown-section'><div><div class='countdown-number'>%H</div> <div class='countdown-unit'>Hour%!H</div> </div></div><div class='countdown-section'><div><div class='countdown-number'>%M</div> <div class='countdown-unit'>Minutes</div> </div></div><div class='countdown-section'><div><div class='countdown-number'>%S</div> <div class='countdown-unit'>Second</div> </div></div>"
          )
        );
      });
    }
  });
})(jQuery);
