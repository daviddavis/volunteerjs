$(function() {
  
  window.Volunteer = Backbone.Model.extend({
    url: function() {
      return this.urlWithFormat('json');
    },

    urlWithFormat: function(format) {
      return this.get('id') ? '/volunteers/' + this.get('id') + '.' + format : '/volunteers.json';
    }
  });
  
  VolunteerList = Backbone.Collection.extend({
    model: Volunteer,
    url: '/volunteers.json'
  });

  window.Volunteers = new VolunteerList;
  
  window.VolunteerView = Backbone.View.extend({
    el: $('#volunteer'),
    
    events: {
      'submit form#volunteer-form': 'save'
    },
    
    initialize: function(model) {
      // render
    },
    
    save: function(e) {
      e.preventDefault();
      var params = $(e.currentTarget).serializeObject();
      Volunteers.create(params);
    }
    
  });
  
  window.volunteerView = new VolunteerView;
});