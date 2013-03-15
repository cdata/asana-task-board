requirejs.config({
  baseUrl: 'javascripts',
  //urlArgs: 'bust=' + (new Date()).getTime(),
  paths: {
    'jquery': 'support/jquery',
    'underscore': 'support/underscore',
    'backbone': 'support/backbone',
    'handlebars': 'support/handlebars',
    'templates': 'support/handlebars/templates'
  },
  shim: {
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'underscore': {
      exports: '_'
    },
    'handlebars': {
      exports: 'Handlebars'
    },
    'templates': {
      deps: ['handlebars'],
      exports: 'Handlebars.templates'
    }
  }
});

require(['app'], function(App) {
  window.app = new App();
});
