/* 
 * CREATE MISSION 
 */

const db = require("../../utils/database.js");

exports.create = (req, res) => {

    if (!checkBodyParams(req.body)) {
        return res.status(400).json({
            "status": "error",
            "detail": "Un ou plusieurs paramètres de votre requête sont incorrects ou manquants !",
        });
    }

    const rovers = req.body.rovers;

    if (rovers.length !== 0) {
        rovers.forEach(rover => {
            db.missionModel.countDocuments({
                rovers: rover._id
            }, function (err, count) {
                if (count > 0) {
                    return res.status(400).json({
                        "status": "error",
                        "detail": "Un ou plusieurs rovers sont déjà affectés à une mission !",
                    });
                }
            });
        });
    }

    const newMission = new db.missionModel({
        name: req.body.name,
        country: req.body.country,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        rovers: req.body.rovers,
        author: req.userId
    });

    newMission.save(function (err, mission) {
        if (err) {
            return res.status(400).json({
                "status": "error",
                "detail": "La mission existe déjà ! Le nom de la mission doit être unique.",
            });
        } else {
            return res.status(201).json({
                "status": "success",
                "detail": "Mission créé avec succès !",
                "id": mission._id,
            });
        }
    });

};

function checkBodyParams(bodyParam) {
    if (!bodyParam.name) return false;
    if (!bodyParam.country) return false;
    if (!bodyParam.start_date) return false;
    if (!bodyParam.end_date) return false;
    if (!bodyParam.rovers) return false;
    if (Array.isArray(bodyParam.rovers) === false) return false;

    return true;
}