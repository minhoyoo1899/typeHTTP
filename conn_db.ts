// import { Moduletest } from "./Moduletest";
// const http: any = require('http');
// const fs: any = require('fs');
const mysql: any = require('mysql');
// console.log(mysql);

const dbconfig = {
  host: 'localhost',
  user: 'root',
  password: 'pass',
  port: 3000,
  database: 'aitrading_db'
}

const connection = mysql.createConnection(dbconfig);
// console.log(connection);
const sqlAvg: string = `SELECT round(AVG(OPEN)) AS avg_open, round(AVG(HIGH)) AS avg_high, round(AVG(low)) AS avg_low, round(AVG(close)) AS avg_close, DATE_FORMAT(day, '%Y-%m-%d %H:%i:%s') as day from kosdak_000250_d`;
connection.query(sqlAvg, (error: any, rows: Array<any>) => {
  if (error) throw error;
  console.log(rows);
  // console.log(rows[0]);
  // console.log(rows[0]["avg_open"]);

  const sqlAll: string = `SELECT OPEN, HIGH, LOW, CLOSE, DATE_FORMAT(DAY, '%Y-%m-%d %H:%i:%s') as DAY from kosdak_000250_d WHERE DAY > (NOW() - INTERVAL 5 YEAR) ORDER BY NO`;
  connection.query(sqlAll, (error: any, rowsall: Array<any>) => {
    if (error) throw error;
    //console.log(rowsall);
    let count_open: number = 0;
    let count_close: number = 0;
    let count_high: number = 0;
    let count_low: number = 0;

    console.log(rowsall[0]["CLOSE"]);
    console.log(rows[0]["avg_close"]);
    
    for (let i: number = 0; i < rowsall.length; i++) {
      if (rowsall[i]["OPEN"] >= rows[0]["avg_open"]) {
        count_open ++;
      } else {
        count_open --;
      }

      if (rowsall[i]["CLOSE"] >= rows[0]["avg_close"]) {
        count_close ++;
      } else {
        count_close --;
      }

      if (rowsall[i]["HIGH"] >= rows[0]["avg_high"]) {
        count_high ++;
      } else {
        count_high --;
      }

      if (rowsall[i]["LOW"] >= rows[0]["avg_low"]) {
        count_low ++;
      } else {
        count_low --;
      }
    }
    // console.log(rowsall.length);
    // console.log(count_open);
    // console.log(count_close);
    // console.log(count_low);
    // console.log(count_high);

    const percentOpen: number = Math.floor(count_open / rowsall.length * 100);
    const percentClose: number = Math.floor(count_close / rowsall.length * 100);
    const percentLow: number = Math.floor(count_low / rowsall.length * 100);
    const percentHigh: number =Math.floor(count_high / rowsall.length * 100);
      
    let sum: number = 2;
    // console.log(percentOpen);

    if (percentOpen >= 80) {
      sum++;
    } else {
      sum--;
    }

    if (percentClose >= 80) {
      sum++;
    } else {
      sum--;
    }

    if (percentLow >= 80) {
      sum++;
    } else {
      sum--;
    }

    if (percentHigh >= 80) {
      sum++;
    } else {
      sum--;
    }

    if (sum >= 2) {
      console.log("매수 추천");
    } else {
      console.log("매도 추천");
    }
  });
})