const chai = require('chai')
var expect = chai.expect;
var assert = require('assert');
const validateRegisterInput = require('../validators/register');

describe('Validate if a new user info is right', () => {
    it('Should return true when the data is valid', function() {
    let { errors, isValid } = validateRegisterInput({
        "name": "Analia",
        "last_name": "Torres Mendez",
        "password": "9999998",
        "cc": "9999998", 
        "dementia_stage": "Inicial",
        "adress": "Cra 25 #15-10",
        "birthdate": "1949-07-15"
        })
    
    let error = {}
    expect(errors).to.deep.equal(error)
    assert.equal(true, isValid)

    })
    it('Should return false when the data is not valid', function() {
        let { errors, isValid } = validateRegisterInput({
            "name": "Analia",
            "last_name": "Torres Mendez",
            "password": "9999998",
            "cc": "9999998", 
            "dementia_stage": "Inicial",
            "adress": "Cra 25 #15-10"
            })
            
        let error = { birthdate: 'El campo de la fecha de nacimiento es requerido' }
        assert.equal(false, isValid)
        expect(errors).to.deep.equal(error)
    })
})