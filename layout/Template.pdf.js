function Merge() {

    $('.alert .alert-text').text("Creating PDF. Please wait...");
    $('.alert').show();

    var serviceURL = "@Url.Action("PDFHtml", "TX")";

    // send document to controller
    $.ajax({
        type: "POST",
        url: serviceURL,
        data: {
            html: $("#htmleditor").html()
        },
        success: successFunc,
        error: errorFunc
    });

}

function successFunc(data, status) {
    TXDocumentViewer.loadDocument(data, "results.pdf");

    $('.alert').hide();
}

function errorFunc(data) {
    console.log(data);
}
