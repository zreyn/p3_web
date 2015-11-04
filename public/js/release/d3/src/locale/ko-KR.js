// wrapped by build app
define("d3/src/locale/ko-KR", ["dojo","dijit","dojox"], function(dojo,dijit,dojox){
import "locale";

var d3_locale_koKR = d3.locale({
  decimal: ".",
  thousands: ",",
  grouping: [3],
  currency: ["₩", ""],
  dateTime: "%Y/%m/%d %a %X",
  date: "%Y/%m/%d",
  time: "%H:%M:%S",
  periods: ["오전", "오후"],
  days: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
  shortDays: ["일", "월", "화", "수", "목", "금", "토"],
  months: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
  shortMonths: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]
});

});
