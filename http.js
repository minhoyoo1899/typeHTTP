"use strict";
// import { Moduletest } from "./Moduletest";
const http = require('http');
const fs = require('fs');
// const modtest = Moduletest;
// console.log(modtest);
// console.log(http);
// console.log(fs);
const readFilePromise = (filename) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, (error, buffer) => {
            if (error)
                reject(error);
            else
                resolve(buffer.toString());
        });
    });
};
// const buffer: Buffer = fs.readFileSync("./index.js");
// console.log(buffer.toString());
const server = http.createServer((req, res) => {
    const index = fs.readFileSync('./index.html', 'utf-8', (err) => {
        if (err)
            throw err;
    });
    const css = fs.readFileSync('./index.css', 'utf-8', (err) => {
        if (err)
            throw err;
    });
    const js = fs.readFileSync('./index.js', "utf-8", (err) => {
        if (err)
            throw err;
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
                fs.writeFile('a.js', jsADat, 'utf-8', (err) => {
                    if (err)
                        throw err;
                    const jsA = fs.readFileSync('./a.js', 'utf-8', (err) => {
                        if (err)
                            throw err;
                    });
                    console.log(jsA);
                });
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html; charset=utf-8');
                res.end(index);
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
