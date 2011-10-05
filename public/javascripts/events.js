$(function() {
  
  window.Event = Backbone.Model.extend({
    url: function() {
      return this.urlWithFormat('json');
    },

    urlWithFormat: function(format) {
      return this.get('id') ? '/events/' + this.get('id') + '.' + format : '/events';
    },
    
    prettyDate: function() {
      if(this.get("date") && this.get("date").length > 0)
        return this.get("date").substr(0, 10) + " at " + this.get("date").substr(11, 5);
      else
        return null;
    }
  });
  
  EventCollection = Backbone.Collection.extend({
    model: Event,
    url: '/events'
  });

  window.Events = new EventCollection;
  
  window.EventList = Backbone.View.extend({
    el: '#event-list',
    Collection: Events,
    
    initialize: function() {
      _.bindAll(this, 'render');
      //this.render();
    },
    
    render: function() {
      Events.fetch({success: function(collection, resp) {
        //console.log(collection);
        collection.each(function(v) {
          date = v.prettyDate() ? (" on " + v.prettyDate()) : "";
          volunteer_count = " (" + v.get("volunteer_count") + " volunteers)";
          $('#event-list').append("<div class='event'>" + v.get("title") + date + volunteer_count + "</div>")
        });
      } });
    },
    
    refresh: function() {
      $(this.el).html(""); // clear it out
      this.render();
    }
  });
  
  window.EventView = Backbone.View.extend({
    el: '#event',
    
    events: {
      'submit form#event-form': 'save',
      'click a#show-events': 'showList',
      'click a#show-event-new': 'showForm'
    },
    
    initialize: function(model) {
      $(this.el).find("#event-info").hide();
      this.eventList = new EventList();
      this.eventList.render();
      $(this.el).find("#event-form").droppable({
        drop: function(event, ui) {
          window.eventView.addVolunteer(event, ui);
        }
      });
    },
    
    save: function(e) {
      e.preventDefault();
      var params = $(e.currentTarget).serializeObject();
      Events.create(params);
      this.showList();
      this.eventList.refresh();
    },
    
    showList: function(e) {
      if(e) e.preventDefault();
      $("#event-list").show();
      $("#event-info").hide();
    },
    
    showForm: function(e) {
      e.preventDefault();
      $("#event-list").hide();
      $("#event-info").show();
    },
    
    addVolunteer: function(e, ui) {
      volunteer = ui.draggable;
      $("#assigned-volunteers").append(volunteer);

      volunteer_ids = $(this.el).find("form#event-form #volunteer_ids");
      separator = (volunteer_ids.val().length > 0) ? "," : ""
      volunteer_ids.val(volunteer_ids.val() + separator + volunteer.attr('id'));
    }
    
  });
  
  window.eventView = new EventView;
});