const csv = require('csv-parser');
const fs = require ('fs');
const canTxt = './canada.txt';
const usaTxt = './usa.txt';

if (fs.existsSync(canTxt)) {
    fs.unlinkSync(canTxt);
}
if (fs.existsSync(usaTxt)) {
    fs.unlinkSync(usaTxt);
}

fs.createReadStream('input_countries.csv')
    .pipe(csv())
    .on('headers', (headers) => {
        fs.appendFile(canTxt, `${headers[0]}, ${headers[1]}, ${headers[2]}\n`, (err) => {
            if (err) return console.log(err);
        });
        fs.appendFile(usaTxt, `${headers[0]}, ${headers[1]}, ${headers[2]}\n`, (err) => {
            if (err) return console.log(err);
        });
    })
    .on('data', (row) => {
        if (row.country == 'Canada') {
            fs.appendFile(canTxt, `${row.country}, ${row.year}, ${row.population}\n`, (err) => {
                if (err) return console.log(err);
            }); 
        } 
        if(row.country == 'United States') {
            fs.appendFile(usaTxt, `${row.country}, ${row.year}, ${row.population}\n`, (err) => {
                if (err) return console.log(err);
            }); 
        }
});