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
    el: $('#volunteer-list'),
    Collection: Volunteers,
    
    initialize: function() {
      _.bindAll(this, 'render');
      //this.render();
    },
    
    render: function() {
      Volunteers.fetch({success: function(collection, resp) {
        console.log(collection);
        collection.each(function(v) {
          $('#volunteer-list').append("<div>" + v.attributes.first_name + " " + v.attributes.last_name + "</div>")
        });
      } });
    }
  });
  
  window.VolunteerView = Backbone.View.extend({
    el: $('#volunteer'),
    
    events: {
      'submit form#volunteer-form': 'save'
    },
    
    initialize: function(model) {
      $("#volunteer-info").hide();
      this.volunteerList = new VolunteerList();
      this.volunteerList.render();
    },
    
    save: function(e) {
      e.preventDefault();
      var params = $(e.currentTarget).serializeObject();
      Volunteers.create(params);
    }
    
  });
  
  window.volunteerView = new VolunteerView;
});