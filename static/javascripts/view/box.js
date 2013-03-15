define(['view', 'collection/task', 'view/task', 'templates'],
  function(View, TaskCollection, TaskView, templates) {
    var lazyReasons = [
      'Taking a siesta',
      'Nothing to do',
      'Counting the stars',
      'Dreaming of Mr. Wiggles',
      'Done, done and done',
      'What tasks?'
    ];
    return View.extend({
      tagName: 'li',
      className: 'box',
      templateName: 'box',
      initialize: function() {
        this.tasks = new TaskCollection([], {
          user: this.model
        });
        this.tasks.on('reset', this.onTasksReset_, this);
        this.tasks.fetch();
      },
      render: function() {
        View.prototype.render.apply(this, arguments);
        this.$taskList = this.$el.children('ul');
        return this;
      },
      onTasksReset_: function() {
        if (this.tasks.length) {
          this.$taskList.empty();
          this.tasks.each(function(task) {
            var taskView = new TaskView({
              model: task
            });
            console.log(this.model.get('name'), task.get('name'));
            this.$taskList.append(taskView.render().$el);
          }, this);
          _.delay(_.bind(this.tasks.fetch, this.tasks),
                  300000 + Math.floor(Math.random() * 30000));
        } else {
          this.$taskList.html(templates['no-tasks']({
            message: lazyReasons[Math.floor(Math.random() * lazyReasons.length)]
          }));
        }
      }
    });
  });
