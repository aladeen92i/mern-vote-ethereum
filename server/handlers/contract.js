

exports.getString = (req, res, next) => {
    console.log("debut de get string");
    try {
        console.log(req);
        const Stringladeen = "ZEBEBEBEBEBE";
        res.send(Stringladeen);

    } catch(err) {
        err.status = 400;
        err.message = "omg noob";
        next(err);
    }
};