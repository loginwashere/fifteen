/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function(){
    var fifteen = {
        elements: [
            [
                1,
                2,
                3,
                4
            ],
            [
                5,
                6,
                7,
                8
            ],
            [
                9,
                10,
                11,
                12
            ],
            [
                13,
                14,
                15,
                0
            ],
        ],
        write: function(){
            var self = this;
            $.each(self.elements, function(key, value){
                $.each(value, function(key, value){
                    if (value !== 0) {
                        $('#element' + value).html(value).css('backgroundColor', self.getColor()).live('click', function(){
                            if ($(this).next().attr('id') === 'element0') {
                                $('#element0').insertBefore($(this));
                            } else if ($(this).prev().attr('id') === 'element0') {
                                $('#element0').insertAfter($(this));
                            } else if ($(this).parent().prev().find('span:nth-child(' + ($(this).index() + 1) + ')').attr('id') === 'element0') {
                                var element0 = $(this).parent().prev().find('span:nth-child(' + ($(this).index() + 1) + ')');
                                self.checkPrevNext(element0, $(this));
                            } else if ($(this).parent().next().find('span:nth-child(' + ($(this).index() + 1) + ')').attr('id') === 'element0') {
                                var element0 = $(this).parent().next().find('span:nth-child(' + ($(this).index() + 1) + ')');
                                self.checkPrevNext(element0, $(this));
                            }
                            var result;
                            if (result = self.checkOrder()) {
                                alert('You WIN!!!');
                            }
                        });
                    }
                });
            });
        },
        getColor: function(){
            var r = this.getRandom(0, 255);
            var g = this.getRandom(0, 255);
            var b = this.getRandom(0, 255);
            
            return 'rgb(' + r + ',' + g + ',' + b + ')';
        },
        getRandom: function(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        checkOrder: function() {
            var self = this;
            
            var counter = 0;
            $.each($('.row'), function(key, value){                
                $.each($(value).find('.element'), function(key1, value){
                    
                    if (value.id === 'element' + self.elements[key][key1]) {
                        counter++;
                    } else {
                        return false;
                    }
                });
            });
            if (counter === 16) {
                return true;
            }
            return false;
        },
        checkPrevNext: function(element0, clickedElement) {
            var next = element0.next();
            if (next.length) {
                var thisNext = clickedElement.next();
                element0.insertBefore(thisNext);
                clickedElement.insertBefore(next);
            } else {
                var prev = element0.prev();
                var thisPrev = clickedElement.prev();
                element0.insertAfter(thisPrev);
                clickedElement.insertAfter(prev);
            }
        },
        shuffle: function(array) {
            var self = this;
            var result;
            $.each(self.elements, function(key, value){
                result = 0;
            });
        }

    };
    fifteen.write();
});

