$(document).ready(()=>{
  let total = $('#total').text();
  let ans0 = $('#result0').text();
  let ans1 = $('#result1').text();
  let ans2 = $('#result2').text();
  let ans3 = $('#result3').text();
  console.log(ans0/total);
  $('#bar0').css({"width":(ans0/total)*100+"%"});
  $('#bar1').css({"width":(ans1/total)*100+"%"});
  $('#bar2').css({"width":(ans2/total)*100+"%"});
  $('#bar3').css({"width":(ans3/total)*100+"%"});
});
