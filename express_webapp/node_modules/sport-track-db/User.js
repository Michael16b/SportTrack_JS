module.exports =
    class User {
        constructor() {}
        __construct() {}
        init(lName, fName, bDate, gender, size, weight, eMail, password) {
            this.idUser = -1;
            this.lName = lName;
            this.fName = fName;
            this.birthDate = bDate;
            this.gender = gender;
            this.size = size;
            this.weight = weight;
            this.eMail = eMail;
            this.weight = weight;
            this.password = password;
        }
        getId() {
            return this.default;
        }
        getIdUser() {
            return this.idUser;
        }
        getlName() {
            return this.lName;
        }
        getfName() {
            return this.fName;
        }
        getBirthDate() {
            return this.birthDate;
        }
        getGender() {
            return this.gender;
        }
        getSize() {
            return this.size;
        }
        getWeight() {
            return this.weight;
        }
        getMail() {
            return this.eMail;
        }
        getPassword() {
            return this.password;
        }
        setId(id) {
            this.default = id;
        }
        __toString() {
            return this.lName + " " + this.fName + this.lName + " " + this.birthDate + this.gender + " " + this.size + this.weight + " " + this.eMail + this.password;
        }
    }