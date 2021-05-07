let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../adm_delete_user/index")

//Assertion style = should
chai.should();

chai.use(chaiHttp);


/////////////////Test DELETE user route/////////////////// 

describe('Admin DELETE user', () => {
    it("Admin skal kunne slette en bruger fra databasen", (done) => {
        chai.request(server)
            .delete("/api/adm_delete_user")
            .end((err, response) => {
                response.should.have.status(200)
            done();
            });
    });
});
