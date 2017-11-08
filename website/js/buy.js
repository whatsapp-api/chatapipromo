$(document).ready(function () {
    var recalculateButton = function () {
        "use strict";
        console.log('recals');
        var button = $('#buy_btn');
        var months = parseInt($('input[name=months]:checked').val());
        var price = months === 12 ? 9990 : months * 900;

        var textTemplate = button.data('text-template');
        var text = textTemplate
            .replace('{months}', months)
            .replace('{price}', price);
        button.text(text);

        var linkTemplate = button.data('href-template');
        var link = linkTemplate
            .replace('{months}', months)
            .replace('{price}', price);


        button.attr('href', link);
    };

    recalculateButton();
    $('input[name=months]').change(recalculateButton);
});