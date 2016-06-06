var $ = global.jQuery = require('jquery');
require('jquery.easing');

class ClickHandler {
  constructor(el){
    var $el = this.$el = $(el);
    this.$target = $el.find('.expandable_target').not( $el.find('.expandable .expandable_target'));
    this.$cueOpen = $el.find('.expandable_cue-open').not( $el.find('.expandable .expandable_cue-collapse'));
    this.$cueClose = $el.find('.expandable_cue-close').not( $el.find('.expandable .expandable_cue-close'));
    this.$content = $el.find('.expandable_content').not( $el.find('.expandable .expandable_content'));

    $el.attr('aria-controls', this.$content.attr('id'));
  }

  calculateExpandDuration(height){
    return this.constrainValue(450, 900, height * 4);
  }

  calculateCollapseDuration(height){
    return this.constrainValue(350, 900, height * 2);
  }

  constrainValue(min, max, val){
    return val > max ? max : val < min ? min : val;
  }

  toggle(){
    if(this.$target.attr('aria-pressed') === 'true'){
      this.collapse();
    }else{
      this.expand();
    }
  }

  expand(duration){
    this.$cueOpen.css( 'display', 'none' );
    this.$cueClose.css( 'display', 'inline' );
    this.$content.attr( 'aria-expanded', 'true' );
    this.$target.attr( 'aria-pressed', 'true' );
    if(duration === void 0){
      duration = this.calculateExpandDuration(this.$content.height());
    }
    this.$el.addClass('expandable__expanded');
    this.$content.slideDown({
      duration: duration,
      easing: 'easeOutExpo'
    });
  }

  collapse(duration){
    this.$cueOpen.css( 'display', 'inline' );
    this.$cueClose.css( 'display', 'none' );
    this.$content.attr( 'aria-expanded', 'false' );
    this.$target.attr( 'aria-pressed', 'false' );
    if (duration === void 0) {
      duration = this.calculateCollapseDuration(this.$content.height());
    }
    this.$el.removeClass('expandable__expanded');
    this.$content.slideUp({
      duration: duration,
      easing: 'easeOutExpo'
    });
  }
}


class Expandable {
  constructor(){
    this.handlerCache = [];
  }

  clearCache(){
    this.handlerCache.length = 0;
  }

  init(){
    this.update();
    $('body').on( 'click', this.handleClick.bind(this));
  }

  update(){
    var self = this;

    self.clearCache();

    $('.expandable').each(function(i, v) {
      if($(v).hasClass('.expandable__expanded')){
        self.makeHandler(v).expand(0);
      }else{
        self.makeHandler(v).collapse(0);
      }
    })
  }

  resolveHandler(el){
    for(var i=0; i<this.handlerCache.length; i++){
      if(this.handlerCache[i].el === el) return this.handlerCache[i].instance;
    }
    return this.makeHandler(el);
  }

  makeHandler(el){
    var instance = new ClickHandler(el);
    this.handlerCache.push({el: el, instance: instance});
    return instance;
  }

  handleClick(ev) {
    var expandableTarget = $(ev.target).closest('.expandable_target');
    if(expandableTarget.length){
      ev.preventDefault();
      ev.stopPropagation();
      this.resolveHandler(expandableTarget[0].parentNode).toggle();
    }
  }
}

//Poor man's singleton
module.exports = new Expandable();
