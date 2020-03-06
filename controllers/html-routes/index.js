module.exports = function (app) {
    app.get("/", function (req, res) {
        res.render("home");
    });
    
    app.get("/video/1", function (req, res) {
        res.render("video1");
    });
    app.get("/video/*", function (req, res) {
        res.render("video1");
    });
}