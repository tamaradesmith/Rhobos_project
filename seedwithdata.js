const allCountries = require('../allCountries')
const poppopulatePopulations = require('../depend/populatePopulations')

const knex = require('../depend/client');

function populatePopulations(arr) {
    const result = []
    return knex('countries')
        .select('code', 'id')
        .then((data) => {

            data.forEach(country => {
                arr.forEach(populate => {
                    // console.log('populate: ', populate);
                    // console.log('country.code: ', country.code);
                    if (country.code === populate.countryCode) {
                        result.push({ year: parseInt(populate.year), quantity: parseInt(populate.value), country_id: parseInt(country.id) })
                    }
                });
            })
            knex.destroy();
            return result;
        })
}

exports.seed = function (knex, Promise) {
    return knex('populations').del()
        .then(async function () {
            const data = await populatePopulations(allCountries)
            return knex('populations').insert(data)
        })

}