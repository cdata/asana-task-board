define(['backbone'],
  function(Backbone) {
    return Backbone.Collection.extend({
      parse: function(response) {
        return response.data;
      }
    });
  });
