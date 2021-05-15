
var mycalendarId;
var myapiKey;

window.ready = jQuery(function ($) {

  //設定文件
  $.get("Setting.txt", function (data) {
    let settingarry = data.split("\n");
    for (let index = 0; index < settingarry.length; index++) {
      settingarry[index] = settingarry[index].replace(/^\s+|\s+$/g, '');
    }
    //apikey
    let apikeynum = settingarry.indexOf("1.apikey連結:") + 1;
    myapiKey = settingarry[apikeynum];
    //calendarid
    let calendaridnum = settingarry.indexOf("2.選擇要得行事曆:") + 1;
    mycalendarId = settingarry[calendaridnum];
    //get id apikey
    $('#eventlist').gCalReader({

      calendarId: mycalendarId,
      apiKey: myapiKey,
      sortDescending: false
    });
  });
});


(function ($) {
  $.fn.gCalReader = function (options) {
    var $div = $(this);

    var defaults = $.extend({
      calendarId: mycalendarId,
      apiKey: myapiKey,
      dateFormat: 'DayMonth',
      dayformat: 'Day',
      errorMsg: 'No events in calendar',
      maxEvents: 4,
      futureEventsOnly: true,
      sortDescending: true
    },
      options);

    var s = '';
    var feedUrl = 'https://www.googleapis.com/calendar/v3/calendars/' +
      encodeURIComponent(defaults.calendarId.trim()) + '/events?key=' + defaults.apiKey +
      '&orderBy=startTime&singleEvents=true';
    if (defaults.futureEventsOnly) {
      feedUrl += '&timeMin=' + new Date().toISOString();
    }

    $.ajax({
      url: feedUrl,
      dataType: 'json',
      success: function (data) {
        if (defaults.sortDescending) {
          data.items = data.items.reverse();
        }
        data.items = data.items.slice(0, defaults.maxEvents);

        $.each(data.items, function (e, item) {
          var eventdate = item.start.dateTime || item.start.date || '';
          var summary = item.summary || '';
          var description = item.description;
          var location = item.location;

          //時間 

          s = '<div class="eventdate col-4  text-center px-2">' + formatDate(eventdate, defaults.dateFormat.trim()) +
            '<div class="eventday text-center h4">' + formatDate(eventdate, defaults.dayformat.trim()) + '</div>'
            + '</div>';
          // 活動
          s += '<div class="eventtitle col-8 text-center align-self-center">' + summary + '</div>';
          // 地點
          if (location) {
            s += '<div class="location">At :' + location + '</div>';
          }
          //描述
          if (description) {
            s += '<div class="description">' + description + '</div>';
          }
          $($div).append('<li class="row col-md-3 col-lg-12 canlendar-li justify-content-center shadow-sm bg-light rounded">' + s + '</li>');
        });
      },
      error: function (error) {
        $($div).append('<p>' + defaults.errorMsg + ' | ' + error + '</p>');
      }
    });

    function formatDate(strDate, strFormat) {
      var fd, arrDate, am, time;
      var calendar = {
        months: {
          full: ['', 'January', 'February', 'March', 'April', 'May',
            'June', 'July', 'August', 'September', 'October',
            'November', 'December'
          ],
          short: ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
            'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
          ]
        },
        days: {
          full: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
            'Friday', 'Saturday', 'Sunday'
          ],
          short: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
            'Sun'
          ]
        }
      };

      if (strDate.length > 10) {
        arrDate = /(\d+)\-(\d+)\-(\d+)T(\d+)\:(\d+)/.exec(strDate);

        am = (arrDate[4] < 12);
        time = am ? (parseInt(arrDate[4]) + ':' + arrDate[5] + ' AM') : (
          arrDate[4] - 12 + ':' + arrDate[5] + ' PM');

        if (time.indexOf('0') === 0) {
          if (time.indexOf(':00') === 1) {
            if (time.indexOf('AM') === 5) {
              time = 'MIDNIGHT';
            } else {
              time = 'NOON';
            }
          } else {
            time = time.replace('0:', '12:');
          }
        }

      } else {
        arrDate = /(\d+)\-(\d+)\-(\d+)/.exec(strDate);
        time = 'Time not present in feed.';
      }

      var year = parseInt(arrDate[1]);
      var month = parseInt(arrDate[2]);
      var dayNum = parseInt(arrDate[3]);

      var d = new Date(year, month - 1, dayNum);

      switch (strFormat) {
        case 'ShortTime':
          fd = time;
          break;
        case 'ShortDate':
          fd = month + '/' + dayNum + '/' + year;
          break;
        case 'LongDate':
          fd = calendar.days.full[d.getDay()] + ' ' + calendar.months.full[
            month] + ' ' + dayNum + ', ' + year;
          break;
        case 'LongDate+ShortTime':
          fd = calendar.days.full[d.getDay()] + ' ' + calendar.months.full[
            month] + ' ' + dayNum + ', ' + year + ' ' + time;
          break;
        case 'ShortDate+ShortTime':
          fd = month + '/' + dayNum + '/' + year + ' ' + time;
          break;
        case 'DayMonth':
          fd = calendar.months.full[
            month] + ' ';
          break;
        case 'MonthDay':
          fd = calendar.months.short[month] + '.' + ' ' + dayNum;
          break;
        case 'YearMonth':
          fd = calendar.months.full[month] + ' ' + year;
          break;
        case 'Month':
          fd = calendar.days.short[d.getDay()] + '．' + calendar.months.short[month];
          break;
        case 'Day':
          fd = dayNum;
          break;
        default:
          fd = calendar.days.full[d.getDay()] + ' ' + '‧' + calendar.months.short[
            month] + ' ' + dayNum + ', ' + year + ' ' + time;
      }

      return fd;
    }
  };

}(jQuery));