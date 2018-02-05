;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(<%= amd %>, factory);
  } else if (typeof exports === 'object' && module.exports) {
    module.exports = factory(<%= cjs %>);
  } else if(typeof exports === 'object') {
    exports['<%= namespace %>'] = factory(<%= cjs %>);
  } else {
    root.<%= namespace %> = factory(<%= global %>);
  }
}(typeof self !== 'undefined' ? self : this, function(<%= param %>) {
<%= contents %>
return <%= exports %>;
}));
