<script>
  
console.log("beforeAfterSlider.js is loaded");

function initComparisons() {
  var comparisons = [
    {
      before: "https://storage.googleapis.com/msgsndr/Z8YgPpUzSSpU8Ky32TVD/media/66cd050599d27b6503e847c9.jpeg",
      after: "https://storage.googleapis.com/msgsndr/Z8YgPpUzSSpU8Ky32TVD/media/66cd05048bee3444251e2b6d.jpeg"
    },
    {
      before: "https://storage.googleapis.com/msgsndr/Z8YgPpUzSSpU8Ky32TVD/media/66cd05054b39f683b1113297.jpeg",
      after: "https://storage.googleapis.com/msgsndr/Z8YgPpUzSSpU8Ky32TVD/media/66cd0505e4a2e24dfe4b10b7.jpeg"
    },
    {
      before: "https://storage.googleapis.com/msgsndr/Z8YgPpUzSSpU8Ky32TVD/media/66cd0505d5f9082fec6f7cf2.jpeg",
      after: "https://storage.googleapis.com/msgsndr/Z8YgPpUzSSpU8Ky32TVD/media/66cd05050f03c7eed52eba4f.jpeg"
    }
  ];

  function applyComparisons() {
    console.log("Script is running");

    var sliderContainer = document.querySelectorAll("#image-slider-78WFta4bbQ .carousel_slide");

    comparisons.forEach(function(comparison, index) {
      if (sliderContainer[index]) {
        // Find the existing image inside the slide
        var imgElement = sliderContainer[index].querySelector("img");

        if (imgElement) {
          // Remove the existing image to replace with the before-and-after comparison
          imgElement.remove();

          var compContainer = document.createElement('div');
          compContainer.className = 'img-comp-container';

          var beforeDiv = document.createElement('div');
          beforeDiv.className = 'img-comp-img';
          beforeDiv.innerHTML = '<img src="' + comparison.before + '" style="width: 600px; height: 500px;">';

          var afterDiv = document.createElement('div');
          afterDiv.className = 'img-comp-img img-comp-overlay';
          afterDiv.innerHTML = '<img src="' + comparison.after + '" style="width: 600px; height: 500px;">';

          compContainer.appendChild(beforeDiv);
          compContainer.appendChild(afterDiv);
          sliderContainer[index].appendChild(compContainer);

          compareImages(afterDiv);
        }
      }
    });
  }

  function compareImages(img) {
    var slider, img, clicked = 0, w, h;
    w = img.offsetWidth;
    h = img.offsetHeight;
    img.style.width = (w / 2) + "px";
    slider = document.createElement("DIV");
    slider.setAttribute("class", "img-comp-slider");
    img.parentElement.insertBefore(slider, img);
    slider.style.top = (h / 2) - (slider.offsetHeight / 2) + "px";
    slider.style.left = (w / 2) - (slider.offsetWidth / 2) + "px";
    slider.addEventListener("mousedown", slideReady);
    window.addEventListener("mouseup", slideFinish);
    slider.addEventListener("touchstart", slideReady);
    window.addEventListener("touchend", slideFinish);

    function slideReady(e) {
      e.preventDefault();
      clicked = 1;
      window.addEventListener("mousemove", slideMove);
      window.addEventListener("touchmove", slideMove);
    }

    function slideFinish() {
      clicked = 0;
    }

    function slideMove(e) {
      var pos;
      if (clicked == 0) return false;
      pos = getCursorPos(e);
      if (pos < 0) pos = 0;
      if (pos > w) pos = w;
      slide(pos);
    }

    function getCursorPos(e) {
      var a, x = 0;
      e = (e.changedTouches) ? e.changedTouches[0] : e;
      a = img.getBoundingClientRect();
      x = e.pageX - a.left;
      x = x - window.pageXOffset;
      return x;
    }

    function slide(x) {
      img.style.width = x + "px";
      slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
    }
  }

  /* Ensure the script runs after everything has loaded */
  window.addEventListener('load', function() {
    setTimeout(applyComparisons, 1000); // Delay to ensure slider is ready
  });
}
</script>
