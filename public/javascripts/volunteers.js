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
          $('#volunteer-list').append("<div class='user'>" + v.attributes.first_name + " " + v.attributes.last_name + "</div>")
        });
      } });
    },
    
    refresh: function() {
      $(this.el).html(""); // clear it out
      this.render();
    }
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
      this.showList();
      this.volunteerList.refresh();
    },
    
    showList: function(e) {
      if(e) e.preventDefault();
      $("#volunteer-list").show();
      $("#volunteer-form").hide();
    },
    
    showForm: function(e) {
      e.preventDefault();
      $("#volunteer-list").hide();
      $("#volunteer-info").show();
    }
    
  });
  
  window.volunteerView = new VolunteerView;
});