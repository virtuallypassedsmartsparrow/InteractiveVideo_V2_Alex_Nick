$(document).ready(function () {
    // thumbnails.forEach(function (curr, i) {
    //     $("#thumbnailContainer").append(`
    //         <div class="col-12 col-md-6 px-4 py-5">
    //             <div class="card thumbnail">
    //                 <div class="row m-0 flex-nowrap">
    //                     <div class="col-8 p-2">
    //                             <div class="position-relative w-100 h-100 overflow-hidden thumbnail-img-new" style="--background-thumbnail: url(${curr.thumbnail});">
    //                             <div class="w-100" style="padding-top:50%;"></div>
    //                         </div>
    //                     </div>
    //                     <div class="col-4 p-2 d-flex flex-column">
    //                         <div class="thumbnail-title-container">
    //                             <p class="m-0 thumbnail-title"><b>${curr.title.toUpperCase()}</b></p>
    //                             <p class="m-0 text-muted font-12">${curr.posted}</p>
    //                         </div>
    //                         <div class="thumbnail-description-container mb-auto">
    //                             <p class="thumbnail-description m-0">${curr.description}</p>
    //                         </div>
    //                         <p class="m-0 text-right">
    //                             <a href="${curr.url}">Watch</a>
    //                         </p>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     `);
    // });
    thumbnails.forEach(function (curr, i) {
        $("#thumbnailContainer").append(`
            <div class="col-12 col-sm-6 col-lg-4 px-4 py-5">
                <div class="card thumbnail">
                    <div class="row m-0">
                        <div class="col-12 px-2 pt-2 pb-0">
                            <a href="${curr.url}">                            
                                <div class="position-relative w-100 h-100 overflow-hidden thumbnail-img-new" style="--background-thumbnail: url(${curr.thumbnail});">
                                    <div class="w-100" style="padding-top:50%;"></div>
                                </div>
                            </a>
                        </div>
                        <div class="col-12 p-2 d-flex flex-column">
                            <div class="thumbnail-title-container">
                                <a href="${curr.url}" class="decoration-none text-dark">
                                    <p class="m-0 thumbnail-title"><b>${curr.title.toUpperCase()}</b></p>
                                </a>
                                <p class="m-0 text-muted font-12">${curr.posted}</p>
                            </div>
                            <div class="description collapse">
                                <p class="mb-2">
                                    ${curr.description}
                                </p>
                            </div>
                            <div class="d-flex justify-content-center mt-2">
                                <button
                                    class="btn btn-light rounded-pill overflow-hidden p-0 px-5 text-secondary description-toggler--expand font-12">
                                    <span class="expand d-flex align-items-center justify-content-center">DESCRIPTION
                                        <i class="material-icons">expand_more</i></span>
                                </button>
                                <button
                                    class="btn btn-light rounded-pill overflow-hidden p-0 px-5 text-secondary description-toggler--collapse font-12 d-none">
                                    <span class="d-flex align-items-center justify-content-center">HIDE
                                        <i class="material-icons">expand_less</i></span>
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        `);
    });

    $(".description-toggler--expand").on("click", function () {
        $('.description.collapse').collapse("hide");
        $(".description-toggler--collapse").addClass("d-none");
        $(".description-toggler--expand").removeClass("d-none");

        $(this).parent().parent().find(".description.collapse").collapse("show");
        $(this).addClass("d-none");
        $(this).parent().find(".description-toggler--collapse").removeClass("d-none");
    });
    $(".description-toggler--collapse").on("click", function () {
        $(this).parent().parent().find(".description.collapse").collapse("hide");
        $(this).addClass("d-none");
        $(this).parent().find(".description-toggler--expand").removeClass("d-none");
    });
});