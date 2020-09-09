const db = require('../../data/db-config');

module.exports = {
    getUserImage,
    getUserImageById,
    insertUserImage,
    removeUserImage,
}; 

// userimages starts here 

function getUserImage() {
    return db('userimages');
}

function getUserImageById(id) {
    return db('userimages')
    .where('id', id)
}

function insertUserImage(userid, image) {
    return db('userimages')
      .insert(userid, image)
  }
    
  function removeUserImage(id) {
    return db('userimages')
      .where('id', id)
      .del();
  }
