$(document).ready(function () {
    thumbnails.forEach(function (curr, i) {
        $("#thumbnailContainer").append(`
            <div class="col-12 col-md-6 px-4 py-5">
                <div class="card thumbnail">
                    <div class="row m-0 flex-nowrap">
                        <div class="col-8 p-2">
                                <div class="position-relative w-100 h-100 overflow-hidden thumbnail-img-new" style="--background-thumbnail: url(${curr.thumbnail});">
                                <div class="w-100" style="padding-top:50%;"></div>
                            </div>
                        </div>
                        <div class="col-4 p-2 d-flex flex-column">
                            <div class="thumbnail-title-container">
                                <p class="m-0 thumbnail-title"><b>${curr.title.toUpperCase()}</b></p>
                                <p class="m-0 text-muted font-12">${curr.posted}</p>
                            </div>
                            <div class="thumbnail-description-container mb-auto">
                                <p class="thumbnail-description m-0">${curr.description}</p>
                            </div>
                            <p class="m-0 text-right">
                                <a href="${curr.url}">Watch</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `);
    });
});