const request = require('supertest-as-promised');
const httpStatus = require('http-status');
const chai = require('chai');  
const expect = require('chai').expect;

const app = require('../index.js');
chai.config.includeStack = true;


/* Load Band Data Access Object */
const BandDao = require('../app/dao/bandDao');

/**
 * root level hooks
 */

let bandToInsert = {
        name:"Queen",
        gender:"British rock ",
        manager: "Jim Beach",
        description: "Queen are a British rock band that formed in London in 1970..."
    }

after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  /*mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();*/

    //borramos el escenario de test, si es que se necesita hacerlo.
    bandDao = new BandDao();    
    bandDao.exists(bandToInsert.name).then( (exists) => {
                if(exists){
                    bandDao.deleteById(bandToInsert.name)
                    .then( (res) => {console.log('Escenario de test borrado correctamente');} )
                    .catch((res) => {console.log('No se pudo borrar escenario de test');});           
                }
            }
            
        )
        .catch( (res) =>{ 
            console.log(res + JSON.stringify(res));
            console.log('No se pudo verificar eliminación de escneario de test'); 
        });    
    
   
    
    done();    
});

describe('## Bands APIs', () => {
  let user = {
    username: 'KK123',
    mobileNumber: '1234567890',
    prueba: 'Metallica'  
  };

    
    
    describe('# GET /api/bands/count/', () => {

        it('should get a bands count, > 0', (done) => {
            
            request(app)
            .get('/api/bands/count')
            .expect(httpStatus.OK)
            .then((res) => {
                expect(res.body.count).to.be.a('number').to.be.above(0);
                done();
            })
            .catch(done);
        });
    });

    describe('# GET /api/exists/:name', () => {

        it('should get true for this band', (done) => {
            
            let bandToFind = 'Metallica';
                        
            request(app)
            .get('/api/bands/exists/' + bandToFind)
            .expect(httpStatus.OK)
            .then((res) => {
                                
                expect(res.body).to.equal(true);
                done();
            })
            .catch(done);
        });
    });
    
  describe('# GET /api/bands/:name', () => {      
      it('should get a band', (done) => {
      
        let bandName = 'Oasis';  
        request(app)
        .get('/api/bands/' + bandName)
        .expect(httpStatus.OK)
        .then((res) => {
            expect(res.body.name).to.equal('Oasis');
            done();
        })
        .catch(done);
    });
  });    
    
    
  describe('# GET /api/bands/', () => {      
      it('should get all bands', (done) => {
      
        request(app)
        .get('/api/bands/')
        .expect(httpStatus.OK)
        .then((res) => {
            expect(res.body).to.be.an('array');
            done();
        })
        .catch(done);
    });
  });
    
    
  describe('# POST /api/bands', () => {
    it('should create a new band', (done) => {
      request(app)
        .post('/api/bands/')
        .send(bandToInsert)
        .expect(httpStatus.OK)
        .then((res) => {
          
         /* console.log('bandToInsert: ' + JSON.stringify(bandToInsert));
          console.log('res.body: ' + JSON.stringify(res.body));*/
          
          //expect(res.body.nam).to.equal(bandToInsert.name);
          done();
        })
        .catch(done);
    });
  });    
    

    describe('# PUT /api/bands/:name', () => {
        it('should update band field', (done) => {
          bandToInsert.gender =  bandToInsert.gender + 'EDITADO';
          request(app)
            .put('/api/bands/' + bandToInsert.name)
            .send(bandToInsert)
            .expect(httpStatus.OK)
            .then((res) => {
              /*expect(res.body.username).to.equal('KK');
              expect(res.body.mobileNumber).to.equal(user.mobileNumber);*/
              done();
            })
            .catch(done);
        });    
    });      

    
    describe('# DELETE /api/bands/', () => {
        it('should delete band', (done) => {
          request(app)
            .delete('/api/bands/' + bandToInsert.name)
            .expect(httpStatus.OK)
            .then((res) => {
              /*expect(res.body.username).to.equal('KK');
              expect(res.body.mobileNumber).to.equal(user.mobileNumber);*/
              done();
            })
            .catch(done);
        });
    });
    
    
  /*describe('# GET /api/users/:userId', () => {
    it('should get user details', (done) => {
      request(app)
        .get(`/api/users/${user._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.username).to.equal(user.username);
          expect(res.body.mobileNumber).to.equal(user.mobileNumber);
          done();
        })
        .catch(done);
    });

    it('should report error with message - Not found, when user does not exists', (done) => {
      request(app)
        .get('/api/users/56c787ccc67fc16ccc1a5e92')
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message).to.equal('Not Found');
          done();
        })
        .catch(done);
    });
  });

  describe('# PUT /api/users/:userId', () => {
    it('should update user details', (done) => {
      user.username = 'KK';
      request(app)
        .put(`/api/users/${user._id}`)
        .send(user)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.username).to.equal('KK');
          expect(res.body.mobileNumber).to.equal(user.mobileNumber);
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/users/', () => {
    it('should get all users', (done) => {
      request(app)
        .get('/api/users')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });

    it('should get all users (with limit and skip)', (done) => {
      request(app)
        .get('/api/users')
        .query({ limit: 10, skip: 1 })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });
  });

  describe('# DELETE /api/users/', () => {
    it('should delete user', (done) => {
      request(app)
        .delete(`/api/users/${user._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.username).to.equal('KK');
          expect(res.body.mobileNumber).to.equal(user.mobileNumber);
          done();
        })
        .catch(done);
    });
  });*/
});


//console.log('JSON.stringify(res.body): ' + JSON.stringify(res.body))
