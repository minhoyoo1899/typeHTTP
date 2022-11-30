// import { Moduletest } from "./Moduletest";
const http: any = require('http');
const fs: any = require('fs');
// const mysql: any = require('mysql');

// console.log(mysql);

// const dbconfig = {
//   host: 'localhost',
//   user: 'root',
//   password: 'pass',
//   port: 3000,
//   database: 'aitrading_db'
// }

// const connection = mysql.createConnection(dbconfig);
// // console.log(connection);
// const sql: string = `SELECT round(AVG(OPEN)) AS avg_open, round(AVG(high)) AS avg_high, round(AVG(low)) AS avg_low, round(AVG(close)) AS avg_close from kosdak_000250_d`;
// connection.query(sql, (error: any, rows: Array<any>) => {
//   if (error) throw error;
//   console.log(rows);
// })


// const modtest = Moduletest;
// console.log(modtest);

// console.log(http);
// console.log(fs);
const readFilePromise = (filename: string): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    fs.readFile(filename, (error: Error, buffer: Buffer) => {
      if (error)
        reject(error);
      else
        resolve(buffer.toString());
    });
  });
};

// const buffer: Buffer = fs.readFileSync("./index.js");
// console.log(buffer.toString());

const server: any = http.createServer((req: any, res: any) => {
  const index = fs.readFileSync('./index.html', 'utf-8', (err: any) => {
    if (err) throw err;
  });
  const css = fs.readFileSync('./index.css', 'utf-8', (err: any) => {
    if (err) throw err;
  });

  const js = fs.readFileSync('./index.js',"utf-8",(err:any) => {
    if (err) throw err;
  });

  //console.log(index)
  if (req.method === "GET") {    
    let url = req.url;
    // function read_file(loca:any) {
    //   const returnDat = fs.readFileSync(loca, 'utf-8', (err: any) => {
    //     if (err) throw err;
    //   });
    //   return returnDat;
    // }
    switch (url) {
      case '/':
        const setHTML = index.replace('<돼지>', '유민호');
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(setHTML);
        break;
      case '/index.css':
        res.setHeader('Content-Type', 'text/css; charset=utf-8');
        res.end(css);
        break;
      case '/index.js':
        res.setHeader('Content-Type', 'text/javascript; charset=utf-8');
        res.end(js);
        break;
      case '/mkFileJs':
        const jsADat = "console.log('a');";
        fs.writeFile('a.js', jsADat, 'utf-8', (err: any) => {
          if (err) throw err;
          const jsA: any = fs.readFileSync('./a.js', 'utf-8', (err: any) => {
            if (err) throw err;
          });            
          console.log(jsA);
        });
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(index);
        break;

      case '/select_db': 
        const sql: string = `SELECT round(AVG(OPEN)) AS avg_open, round(AVG(high)) AS avg_high, round(AVG(low)) AS avg_low, round(AVG(close)) AS avg_close from kosdak_000250_d`;
        connection.query(sql, (error:any, rows:Array<any>) => {
          if (error) throw error;
          console.log(rows);
          res.setHeader('Content-Type', 'text/plain; charset=utf-8');
          res.end(rows);
        });

        break;

        
        
      

        // fs.readFileSync("./a.js", (error: Error, buffer: Buffer) => {          
        //   console.log(buffer.toString());
        // });

        // const readFilePromise = (filename: string): Promise<string> => new Promise<string>((resolve, reject) => {
        //   fs.readFile(filename, (error: Error, buffer: Buffer) => {
        //     if (error)
        //       reject(error);
        //     else
        //       resolve(buffer.toString());
        //   });
        // });
        
        // (async () => {
        //     const jsA = await readFilePromise('./a.js');            
        //     console.log(jsA);
        // })()
        //const jsA: Buffer = fs.readFileSync("./a.js");
        //console.log(jsA.toString())
        
        // const proMK = new Promise((resolve, reject) => {
        //   const jsDat = "console.log('a');";
        //   fs.writeFile("a.js", jsDat, "utf8", function (err: any) {
        //     console.log("비동기적 파일 쓰기 완료 a");
        //   })
        // });
        // proMK.then(read_file("a.js")).
        // console.log(readFilePromise('./a.js'));
    }
    
  }
});

server.listen(7979, () => {
  console.log('server running 7979');
});