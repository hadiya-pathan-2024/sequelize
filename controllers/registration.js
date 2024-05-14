
const db = require("../models/index")
const addUser = async (req, res) => {
    let data = req.body;
    console.log(data);
    let firstName = data.firstName;
    let lastName = data.lastName;
    let email = data.email;
    let dob = data.dob;
    let role = data.role;
    let gender = data.gender;
    try {
        let insert_data = await db.sequelize.models.Users.create(
            {
                first_name: firstName,
                last_name: lastName,
                role: role,
                email: email,
                dob: dob,
                gender: gender,
            }
        );
        console.log("success");
    } catch (error) {
        console.log("catch going", error);
        res.send(error)
    }
}

module.exports = { addUser }