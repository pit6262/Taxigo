(function() {
  // SVG путь иконки стрелки для переключения
  var controlArrowPath = 'M5.707.707A1 1 0 0 0 4.293-.707L5.707.707zM0 5l-.707-.707a1 1 0 0 0 0 1.414L0 5zm4.293 5.707a1 1 0 0 0 1.414-1.414l-1.414 1.414zm0-11.414l-5 5L.707 5.707l5-5L4.293-.707zm-5 6.414l5 5 1.414-1.414-5-5-1.414 1.414z';
  // Матрица трансформаций стрелки вверх
  var controlArrowUpMatrix = 'matrix(0 1 1 0 7 10)';
  // Матрица трансформаций стрелки вниз
  var controlArrowDownMatrix = 'matrix(0 -1 -1 0 17 14)';

  // Добавляет к элементу таймпикера блоки управления (стрелки)
  var addElemControls = function($elem, $tp, $input) {
    var $upControl = $(
      '<div class="timepicker-plugin_control timepicker-plugin_control__up">' +
        '<svg viewBox="0 0 24 24">' +
          '<path transform="' + controlArrowUpMatrix + '" d="' + controlArrowPath + '"></path>' +
        '</svg>' +
      '</div>'
    );
    $upControl.on('click', function() {
      var $valuesElem = $(this).parent().find('.timepicker-plugin_values');
      scrollValues($valuesElem, $tp, $input, -1);
    });

    var $downControl = $(
      '<div class="timepicker-plugin_control timepicker-plugin_control__down">' +
        '<svg viewBox="0 0 24 24">' +
          '<path transform="' + controlArrowDownMatrix + '" d="' + controlArrowPath + '"></path>' +
        '</svg>' +
      '</div>'
    );
    $downControl.on('click', function() {
      var $valuesElem = $(this).parent().find('.timepicker-plugin_values');
      scrollValues($valuesElem, $tp, $input, 1);
    });

    $elem.append($upControl).append($downControl);
  };

  // Получение значения поля ввода
  var getInputValue = function($input) {
    var value = $input.val();
    if(value == '') return false;

    var valueParts = value.split(':');
    return {
      hours: valueParts[0],
      minutes: valueParts[1]
    };
  };

  // Установка значения в поле ввода
  var setInputValue = function($tp, $input) {
    var $hoursValues = $tp.find('.timepicker-plugin_elem__hours .timepicker-plugin_values');
    var currentHoursValue = parseInt($hoursValues.attr('data-value'));
    var hours = $($hoursValues.children().get(currentHoursValue)).text();

    $hoursValues.find('.timepicker-plugin_values-elem')
                .removeClass('timepicker-plugin_values-elem__active');
    $($hoursValues.children().get(currentHoursValue)).addClass('timepicker-plugin_values-elem__active');

    var $minutesValues = $tp.find('.timepicker-plugin_elem__minutes .timepicker-plugin_values');
    var currentMinutesValue = parseInt($minutesValues.attr('data-value'));
    var minutes = $($minutesValues.children().get(currentMinutesValue)).text();

    $minutesValues.find('.timepicker-plugin_values-elem')
                  .removeClass('timepicker-plugin_values-elem__active');
    $($minutesValues.children().get(currentMinutesValue)).addClass('timepicker-plugin_values-elem__active');

    $input.val(hours + ':' + minutes);
  };

  // Скролл элемента таймпикера
  var scrollValues = function($valuesElem, $tp, $input, dir) {
    var currentValuesValue = parseInt($valuesElem.attr('data-value'));
    if(dir == -1 && currentValuesValue == 0) return;
    if(dir == 1 && currentValuesValue == $valuesElem.children().length - 1) return;

    var newValueScroll = -(currentValuesValue + dir) * 32 + 32;
    $valuesElem.css('top', newValueScroll + 'px')
               .attr('data-value', currentValuesValue + dir);

    var inputValue = getInputValue($input);
    if(inputValue == false) return;
    setInputValue($tp, $input);
  };

  // Заполнение часами элемента таймпикера
  var fillHours = function($tpElem, $tp, $input) {
    var $wrapper = $('<div class="timepicker-plugin_values-wrapper"></div>');

    var $container = $('<div class="timepicker-plugin_values" data-value="1"></div>');

    for(var i = 0; i < 24; i++) {
      var value = i;
      if(value < 10) value = '0' + i;

      var $elem = $('<div class="timepicker-plugin_values-elem">' + value + '</div>');
      $elem.on('click', function() {
        var $this = $(this);

        $this.parent()
             .find('.timepicker-plugin_values-elem')
             .removeClass('timepicker-plugin_values-elem__active');
        $this.addClass('timepicker-plugin_values-elem__active');

        var currentValuesValue = parseInt($container.attr('data-value'));
        var currentIndex = $this.index();
        if(currentIndex > currentValuesValue) scrollValues($container, $tp, $input, 1);
        if(currentIndex < currentValuesValue) scrollValues($container, $tp, $input, -1);

        setInputValue($tp, $input);
      });
      $container.append($elem);
    }

    $wrapper.on('mousewheel', function(e) {
      e.preventDefault();

      if(e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
        scrollValues($container, $tp, $input, -1);
      } else {
        scrollValues($container, $tp, $input, 1);
      }
    });

    $wrapper.append($container);
    $tpElem.append($wrapper);
  };

  // Заполнение минутами
  var fillMinutes = function($tpElem, $tp, $input) {
    var $wrapper = $('<div class="timepicker-plugin_values-wrapper"></div>');
    var $container = $('<div class="timepicker-plugin_values" data-value="1"></div>');

    for(var i = 0; i < 60; i += 15) {
      var value = i;
      if(value < 10) value = '0' + i;

      var $elem = $('<div class="timepicker-plugin_values-elem">' + value + '</div>');
      $elem.on('click', function() {
        var $this = $(this);

        $this.parent()
             .find('.timepicker-plugin_values-elem')
             .removeClass('timepicker-plugin_values-elem__active');
        $this.addClass('timepicker-plugin_values-elem__active');

        var currentValuesValue = parseInt($container.attr('data-value'));
        var currentIndex = $this.index();
        if(currentIndex > currentValuesValue) scrollValues($container, $tp, $input, 1);
        if(currentIndex < currentValuesValue) scrollValues($container, $tp, $input, -1);

        setInputValue($tp, $input);
      });
      $container.append($elem);
    }

    $wrapper.on('mousewheel', function(e) {
      e.preventDefault();

      if(e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
        scrollValues($container, $tp, $input, -1);
      } else {
        scrollValues($container, $tp, $input, 1);
      }
    });

    $wrapper.append($container);
    $tpElem.append($wrapper);
  };

  // Обновление размера и позиции таймпикера
  var updateTimepickerPosition = function($tp, $input) {
    $tp.width($input.outerWidth());

    var boundingRect = $input[0].getBoundingClientRect();

    $tp.css('left', (window.pageXOffset + boundingRect.x) + 'px');
    $tp.css('top', (window.pageYOffset + boundingRect.y + $input.outerHeight()) + 'px');
  };

  // Отображение блока таймпикера
  var showTimepicker = function($tp, $input) {
    updateTimepickerPosition($tp, $input);
    $tp.fadeIn(250);
  };

  // Скрытие блока таймпикера
  var hideTimepicker = function($tp) {
    $tp.fadeOut(250);
  };

  window.timepicker = function($input) {
    var $tp = $('<div class="timepicker-plugin" tabindex="-1"></div>');

    // Создание элемента для часов
    var $tpHours = $('<div class="timepicker-plugin_elem timepicker-plugin_elem__hours"></div>');
    // Заполенение элементари управления
    addElemControls($tpHours, $tp, $input);
    // Заполнение значениями
    fillHours($tpHours, $tp, $input);

    // Создание элемента для минут
    var $tpMinutes = $('<div class="timepicker-plugin_elem timepicker-plugin_elem__minutes"></div>');
    // Заполенение элементари управления
    addElemControls($tpMinutes, $tp, $input);
    // Заполнение значениями
    fillMinutes($tpMinutes, $tp, $input);

    // Вставка элементов таймпикера
    $tp.append($tpHours).append($tpMinutes);

    $('body').append($tp);

    $input.attr('readonly', true);

    // Обновление размеров и позиции таймпикера
    $(window).on('resize', function() {
      updateTimepickerPosition($tp, $input);
    });

    // Отображение таймпикера при фокусе в поле
    $input.on('focus', function() {
      showTimepicker($tp, $input);
      $input.addClass('time-open')
    });
    // Учет фокуса в элементе таймпикера
    $tp.on('focus', function() {
      $tp.addClass('time-open')
    });

    // Сокрытие таймпикера если фокус не в поле и не в таймпикере
    $input.on('blur', function() {
      $input.removeClass('time-open')

      setTimeout(function() {
        if($tp.hasClass('time-open') === false) hideTimepicker($tp);
      }, 200);
    });

    $tp.on('blur', function() {
      $tp.removeClass('time-open')

      setTimeout(function() {
        if($input.hasClass('time-open') === false) hideTimepicker($tp);
      }, 200);
    });
  };
})();
