'use strict';

var io = io.connect();

io.on('news', function(data) {
    $(function() {
        var dlg = $('#newsalert');
        var dt = new Date(data.created);
        $('.modal-title').html('<span class="glyphicon glyphicon-envelope"></span> ' + data.title);
        $('.modal-body').html(data.body);
        $('.modal-timestamp').find('small').html(dt.getHours() + ':' + dt.getMinutes());
        dlg.modal({backdrop: false});
    });
});

io.on('result', function(data) {
    $(function() {
        if (data.result) {
            var result = data.result;
            var scoreline = result.homeTeam + ' ' + result.homeGoals;
            scoreline += (result.homePens ? '(' + result.homePens + ')-(' + result.awayPens + ')' : '-');
            scoreline += result.awayGoals + ' ' + result.awayTeam;
            $('#videprinter').teletype({
                text: [data.compName + '/' + data.compSection + ' ' + scoreline]
            });
        }
    });
});

