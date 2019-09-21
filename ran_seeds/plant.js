
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('nodes').del()
    .then(function () {
  
      return knex('nodes').insert([
        
        {name: 'plant'}
      ]);
    });
};
