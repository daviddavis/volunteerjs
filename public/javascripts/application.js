$.fn.serializeObject = function() {
  var values = {}
  $("form input, form select, form textarea").each( function(){
    values[this.name] = $(this).val();
  });
  
  return values;
}