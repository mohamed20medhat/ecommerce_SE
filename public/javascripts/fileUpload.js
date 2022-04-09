const rootStyle = window.getComputedStyle(document.documentElement);

if (
    rootStyle.getPropertyValue("--book-cover-width-large") != null &&
    rootStyle.getPropertyValue("--book-cover-width-large") !== '' ) {
    ready();
} else {
    document.getElementById("main-css").addEventListener("load", ready);
}

function ready() {
    const coverWidth = parseFloat(
        rootStyle.getPropertyValue("--book-cover-width-large")
    );
    const coverAspectRatio = parseFloat(
        rootStyle.getPropertyValue("--book-cover-aspect-ratio")
    );
    const coverHeight = parseFloat(coverWidth / coverAspectRatio);

    FilePond.registerPlugin(
        FilePondPluginImagePreview,
        FilePondPluginImageResize,
        FilePondPluginFileEncode
    );

    FilePond.setOptions({
        //the same as the aspect ratio of the image that we set when we made it pull it from the database in the books route -> books/index.ejs
        stylePanelAspectRatio: 1 / coverAspectRatio,
        imageResizeTargetWidth: coverWidth,
        imageResizeTargetHeight: coverHeight,
    });

    FilePond.parse(document.body);
}
