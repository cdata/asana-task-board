define(['underscore', 'backbone', 'jquery', 'view/board', 'model/board'],
    function(_, Backbone, $, BoardView, BoardModel) {
  var App = Backbone.Router.extend({
    routes: {
      'board/:apiKey': 'loadBoard'
    },
    initialize: function() {
      this.$root = $('#Container');
      this.model = new BoardModel();
      this.view = new BoardView({
        model: this.model
      });
      this.$root.append(this.view.render().$el);
      this.backboneSync = Backbone.sync;
      Backbone.sync = _.bind(this.sync, this);
      Backbone.history.start({ pushState: false });
    },
    loadBoard: function(apiKey) {
      this.model.set({
        apiKey: apiKey
      });
    },
    sync: function(method, model, options) {
      options = _.defaults(options || {}, {
        url: '/asana/' + this.model.get('apiKey') + _.result(model, 'url')
      });
      return this.backboneSync.call(Backbone, method, model, options);
    }
  });

  return App;
});
