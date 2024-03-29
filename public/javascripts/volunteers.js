$(function() {
  
  window.Volunteer = Backbone.Model.extend({
    url: function() {
      return this.urlWithFormat('json');
    },

    urlWithFormat: function(format) {
      return this.get('id') ? '/volunteers/' + this.get('id') + '.' + format : '/volunteers';
    }
  });
  
  VolunteerCollection = Backbone.Collection.extend({
    model: Volunteer,
    url: '/volunteers'
  });

  window.Volunteers = new VolunteerCollection;
  
  window.VolunteerList = Backbone.View.extend({
    el: '#volunteer-list',
    Collection: Volunteers,
    
    initialize: function() {
      _.bindAll(this, 'render');
      //this.render();
    },
    
    render: function() {
      Volunteers.fetch({success: function(collection, resp) {
        //console.log(collection);
        collection.each(function(v) {
          $('#volunteer-list').append("<div class='user' id='" + v.get("id") + "'>" + v.get("first_name") + " " + v.get("last_name") + "</div>")
        });
        
        $("div.user").draggable({ containment: "#main", scroll: false, appendTo: "#main", zIndex:10000, helper: "clone"});
      } });
    },
    
    refresh: function() {
      $(this.el).html(""); // clear it out
      this.render();
    },
  });
  
  window.VolunteerView = Backbone.View.extend({
    el: '#volunteer',
    
    events: {
      'submit form#volunteer-form': 'save',
      'click a#show-volunteers': 'showList',
      'click a#show-volunteer-new': 'showForm'
    },
    
    initialize: function(model) {
      $(this.el).find("#volunteer-info").hide();
      this.volunteerList = new VolunteerList();
      this.volunteerList.render();
    },
    
    save: function(e) {
      e.preventDefault();
      var params = $(e.currentTarget).serializeObject();
      Volunteers.create(params);
      window.eventView.clearForm();
      this.volunteerList.refresh();
      this.showList();
      this.clearForm();
    },
    
    showList: function(e) {
      if(e) e.preventDefault();
      $("#volunteer-list").show();
      $("#volunteer-info").hide();
    },
    
    showForm: function(e) {
      e.preventDefault();
      $("#volunteer-list").hide();
      $("#volunteer-info").show();
    },
    
    refreshList: function() {
      this.volunteerList.refresh();
    },
    
    clearForm: function() {
      $(this.el).find("form#volunteer-form input").val("");
    },
    
  });
  
  window.volunteerView = new VolunteerView;
});