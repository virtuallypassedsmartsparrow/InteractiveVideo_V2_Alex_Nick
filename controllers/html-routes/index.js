module.exports = function (app) {
    app.get("/", function (req, res) {
        res.render("home");
    });
    
    app.get("/video", function (req, res) {
        res.render("video");
    });
}