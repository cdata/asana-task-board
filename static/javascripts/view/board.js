define(['view', 'collection/user', 'view/box'],
  function(View, UserCollection, BoxView) {
    return View.extend({
      tagName: 'ul',
      initialize: function() {
        this.model.on('change:apiKey', this.invalidateApiKey_, this);
        this.users = new UserCollection();
        this.users.on('reset', this.onUsersReset_, this);
      },
      invalidateApiKey_: function() {
        this.users.fetch();
      },
      onUsersReset_: function() {
        this.$el.empty();
        this.users.each(function(user) {
          var boxView = new BoxView({
            model: user
          });
          this.$el.append(boxView.render().$el);
        }, this);
      }
    });
  });
