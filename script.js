$(document).ready(function () {
  var $slider = $(".slideshow-left .slider"),
    maxItems = $(".item", $slider).length,
    currentSlide = 0;

  // Get all text items
  var $textItems = $(".text-overlay .text-item");

  // Function to update text
  function updateText(slideIndex) {
    // Hide all text items
    $textItems.removeClass("active");

    // Show the current text item
    $textItems.eq(slideIndex).addClass("active");

    console.log("Showing text:", $textItems.eq(slideIndex).text());
  }

  // Initialize the left slider with autoplay
  $slider
    .slick({
      vertical: true,
      verticalSwiping: false,
      arrows: false,
      infinite: true,
      dots: true,
      speed: 1000,
      cssEase: "cubic-bezier(0.7, 0, 0.3, 1)",
      autoplay: true,
      autoplaySpeed: 2000,
      pauseOnHover: false,
      pauseOnFocus: false,
      initialSlide: 0,
    })
    .on("beforeChange", function (event, slick, currentSlide, nextSlide) {
      console.log("Slide changing to:", nextSlide);

      // Update text
      updateText(nextSlide);

      // Sync the right slider (reverse order)
      var rightSlide = maxItems - 1 - nextSlide;
      $(".slideshow-right .slider").slick("slickGoTo", rightSlide, false);
    });

  // Initialize the right slider
  $(".slideshow-right .slider").slick({
    swipe: false,
    vertical: true,
    arrows: false,
    infinite: true,
    speed: 950,
    cssEase: "cubic-bezier(0.7, 0, 0.3, 1)",
    initialSlide: maxItems - 1,
  });

  // Show initial text
  updateText(0);

  // Backup: Manual sync every second to ensure text stays in sync
  setInterval(function () {
    var currentSlideIndex = $(".slideshow-left .slider").slick(
      "slickCurrentSlide"
    );
    updateText(currentSlideIndex);
  }, 1000);
});
