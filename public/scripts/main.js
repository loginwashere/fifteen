var fifteen = (function() {
    return {            
        counter: 0,
        emptyElementId: null,
        elements: null,
        width: 4,
        height: 4,
        increment: function() {
            this.counter++;
            $('.counter').text(this.counter);
        },
        init: function(){
            var self = this;
            self.elements = $('.element');
            self.emptyElementId = self.elements.last().attr('id');
            self.elements.each(function(index, value){
                var element = $(value);
                if (element.attr('id') !== self.emptyElementId) {
                    element.css('backgroundColor', self.getColor());
                }
            }).live('click', function(){
                var emptyElement = null,
                    clickedElement = $(this);
                if (clickedElement.next().attr('id') === self.emptyElementId) {
                    self.increment();
                    $('#'+self.emptyElementId).insertBefore(clickedElement);
                } else if (clickedElement.prev().attr('id') === self.emptyElementId) {
                    self.increment();
                    $('#'+self.emptyElementId).insertAfter(clickedElement);
                } else if ((emptyElement = clickedElement.parent().find('div:eq(' + (clickedElement.index()- self.width) + ')')).attr('id') === self.emptyElementId) {
                    self.switchElements($(emptyElement), clickedElement);
                } else if ((emptyElement = clickedElement.parent().find('div:eq(' + (clickedElement.index() + self.width) + ')')).attr('id') === self.emptyElementId) {
                    self.switchElements($(emptyElement), clickedElement);
                }
            });
        },
        getColor: function(){
            return 'rgb(' 
                + this.getRandom(0, 255) + ',' 
                + this.getRandom(0, 255) + ',' 
                + this.getRandom(0, 255) + ')';
        },
        getRandom: function(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },            
        switchElements: function(emptyElement, clickedElement) {
            this.increment();
            if (emptyElement.index() > clickedElement.index()) {
                var tmpElement = clickedElement.next();
                var tmpElement0 = emptyElement.prev();
                emptyElement.insertBefore(tmpElement);
                clickedElement.insertAfter(tmpElement0);
            } else {
                var tmpElement = clickedElement.prev();
                var tmpElement0 = emptyElement.next();
                emptyElement.insertAfter(tmpElement);
                clickedElement.insertBefore(tmpElement0);
            }
        }
    }
})();
$(document).ready(function(){
    fifteen.init();
});