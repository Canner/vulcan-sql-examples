#!/usr/bin/env node

const fs = require('fs');
const duckdb = require('duckdb');

console.log('remove db file');
if (fs.existsSync('demo.db'))
  fs.unlinkSync('demo.db');

const db = new duckdb.Database('demo.db');

async function runQuery(query) {
  return new Promise((resolve, reject) => {
    db.run(query, (err, res) => {
      if (err) return reject(err);
      return resolve(res);
    });
  })
}

(async () => {
  await runQuery(`
  CREATE TABLE churners(id VARCHAR, age INTEGER, gender VARCHAR, education_level VARCHAR, marital_status VARCHAR, income_category VARCHAR, card_category VARCHAR, months_on_book INTEGER, total_relationship_count INTEGER, months_inactive_12_mon INTEGER, contacts_count_12_mon INTEGER, credit_limit DOUBLE, attrited BOOLEAN);  `);
  await runQuery(`
  CREATE TABLE customers(id VARCHAR, first_name VARCHAR, last_name VARCHAR, email VARCHAR);
  `);
  await runQuery(`
  COPY churners FROM 'churners.csv' (FORMAT 'csv', quote '"', delimiter ',', header true);
  `);
  await runQuery(`
  COPY customers FROM 'customers.csv' (FORMAT 'csv', quote '"', delimiter ',', header true);  
  `);
  console.log('done.');
})();