define(['view'],
  function(View) {
    return View.extend({
      tagName: 'li',
      render: function() {
        this.$el.text(this.model.get('name'));
        return this;
      }
    });
  });
