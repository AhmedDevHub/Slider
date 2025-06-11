$(document).ready(function () {
  // OnClick
  $(".gallery img").click(function () {
    // Remove
    $(".slider-container img").remove();

    // Add
    var images = $(".gallery img");
    images.each(function () {
      var imgSrc = $(this).attr("src");
      var imgAlt = $(this).attr("alt");
      $(".slider-container").append(
        '<img src="' + imgSrc + '" alt="' + imgAlt + '">'
      );
    });

    var clickedIndex = $(this).index();
    $(".slider-container img").eq(clickedIndex).addClass("active");

    // Update
    updateCounter(clickedIndex + 1, images.length);

    // display
    $(".overlay").css("display", "flex");
  });

  // colse btn
  $(".close-btn").click(function () {
    $(".overlay").hide();
  });

  // Next btn
  $(".next-btn").click(function () {
    navigateSlider("next");
  });

  // Prev btn
  $(".prev-btn").click(function () {
    navigateSlider("prev");
  });

  function navigateSlider(direction) {
    var images = $(".slider-container img");
    var currentImg = $(".slider-container img.active");
    var currentIndex = currentImg.index();
    var totalImages = images.length;
    var newIndex;

    if (direction === "next") {
      newIndex = (currentIndex + 1) % totalImages;
    } else {
      newIndex = (currentIndex - 1 + totalImages) % totalImages;
    }

    currentImg.removeClass("active");
    images.eq(newIndex).addClass("active");

    updateCounter(newIndex + 1, totalImages);
  }

  function updateCounter(current, total) {
    $(".counter").text(current + " / " + total);
  }

  $(".overlay").click(function (e) {
    if ($(e.target).hasClass("overlay")) {
      $(this).hide();
    }
  });

  $(document).keydown(function (e) {
    if ($(".overlay").is(":visible")) {
      if (e.keyCode === 37) {
        $(".next-btn").click();
      } else if (e.keyCode === 39) {
        $(".prev-btn").click();
      } else if (e.keyCode === 27) {
        // ESC
        $(".close-btn").click();
      }
    }
  });
});
