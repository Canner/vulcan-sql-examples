#!/usr/bin/env node

const fs = require('fs');
const duckdb = require('@vulcan-sql/build/node_modules/duckdb');

if (fs.existsSync('mydata.db'))
  fs.unlinkSync('mydata.db');

const db = new duckdb.Database('mydata.db');

async function runQuery(query) {
  return new Promise((resolve, reject) => {
    db.run(query, (err, res) => {
      if (err) return reject(err);
      return resolve(res);
    });
  })
}

(async () => {
  await runQuery(`create table customers as select * from "customers.csv"`);
  await runQuery(`create table orders as select * from "orders.csv"`);
  await runQuery(`create table raw_customers as select * from "raw_customers.csv"`);
  await runQuery(`create table raw_orders as select * from "raw_orders.csv"`);
  await runQuery(`create table raw_payments as select * from "raw_payments.csv"`);
  await runQuery(`create table stg_customers as select * from "stg_customers.csv"`);
  await runQuery(`create table stg_orders as select * from "stg_orders.csv"`);
  await runQuery(`create table stg_payments as select * from "stg_payments.csv"`);
})();
