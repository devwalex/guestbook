$('.small.modal')
    .modal('attach events', '.delete.button', 'show');

$('.message .close')
    .on('click', function () {
        $(this)
            .closest('.message')
            .transition('fade');
    });