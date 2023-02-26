(() => {

  // Variants Slider
  {
    document.querySelectorAll('.variants-slider').forEach(slider => new Swiper(slider, {
      loop: true,
      navigation: {
        nextEl: slider.querySelector('.swiper-button-next'),
        prevEl: slider.querySelector('.swiper-button-prev'),
      },
    }));
  }


  // Custom range
  {
    const rangeInput = document.querySelector('#range-input');
    const rangeLine = document.querySelector('#range-line');
    const rangeFilled = document.querySelector('#range-filled');
    const rangeThumb = document.querySelector('#range-thumb');
    const rangeOutput = document.querySelector('#customization-length-value');

    const min = +rangeInput.min;
    const max = +rangeInput.max;
    const step = +rangeInput.step;
    const interval = max - min;
    const initialValue = +rangeInput.value;

    renderRangeValue(initialValue);

    //Mouse
    rangeThumb.addEventListener('mousedown', () => {
      document.addEventListener('mousemove', onPointerInteraction, {passive: true});
    });
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', onPointerInteraction);
    });
    rangeLine.addEventListener('mousedown', onPointerInteraction);
    //Touch
    rangeThumb.addEventListener('touchstart', () => {
      document.addEventListener('touchmove', onPointerInteraction, {passive: true});
    });
    document.addEventListener('touchend', () => {
      document.removeEventListener('touchmove', onPointerInteraction);
    });

    function onPointerInteraction(e) {
      const pointerX = e.clientX || e.targetTouches[0].clientX;
      const {x: startX, width} = rangeLine.getBoundingClientRect();

      let fraction = (pointerX - startX) / width;
      fraction = (fraction < 0) ? 0 : (fraction > 1) ? 1 : fraction;

      let newValue = min + interval * fraction;
      newValue = roundNumberTo(newValue, step);

      rangeInput.value = newValue;
      renderRangeValue(newValue);
    }
    function renderRangeValue(value) {
      const fraction = (value - min) / interval;

      rangeThumb.style.left = fraction * 100 + '%';
      rangeFilled.style.width = fraction * 100 + '%';

      rangeOutput.textContent = value;
    }
    function roundNumberTo(x, n) {
      return Math.round(x / n) * n;
    }
  }


  // Form faceplate slider
  {
    new Swiper('.form-faceplate-slider', {
      loop: true,
      navigation: {
        nextEl: document.querySelector('.form-faceplate-slider__btn_next'),
        prevEl: document.querySelector('.form-faceplate-slider__btn_prev'),
      },
      pagination: {
        el: document.querySelector('.form-faceplate-slider__pagination'),
      }
    });
  }

})();



const rangeInput = document.querySelector('#range-input');
