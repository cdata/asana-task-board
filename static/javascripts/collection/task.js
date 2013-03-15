define(['collection'],
  function(Collection) {
    return Collection.extend({
      initialize: function(models, options) {
        this.user = options.user;
      },
      url: '/tasks',
      fetch: function(options) {
        options = _.extend(options || {}, {
          data: {
            assignee: this.user.get('id'),
            workspace: '179170931869',
            opt_fields: 'name,assignee_status,completed'
          }
        });

        return Collection.prototype.fetch.call(this, options);
      },
      parse: function() {
        var response = Collection.prototype.parse.apply(this, arguments);
        return _.filter(response, function(task) {
          return !task.completed && task.assignee_status === 'today';
        });
      }
    });
  });
