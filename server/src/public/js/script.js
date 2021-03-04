$(document).ready(function () {
  $('#formMailer').off().on('submit', function (event) {
    var form = $(this)[0];
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      $('#btnSubmit').prop('disabled', true);
      var ajaxRequest = $.ajax({
        url: "/api/mail/send",
        type: "POST",
        dataType: 'json',
        data: $(this).serialize(),
      });
      ajaxRequest.done(function (data, textStatus, jqXHR) {
        // console.info(data);
        alert("[" + data.data.providerName + "] " + data.message);
        form.reset();
        form.classList.remove('was-validated');
      });
      ajaxRequest.fail(function (jqXHR, textStatus, errorThrown) {
        alert("Error: " + textStatus);
      });
      ajaxRequest.always(function (jqXHROrData, textStatus, jqXHROrErrorThrown) {
        $('#btnSubmit').prop('disabled', false);
      });
    }

    form.classList.add('was-validated');
    return false;
  });
});
