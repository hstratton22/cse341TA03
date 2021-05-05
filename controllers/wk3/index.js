console.log("/controllers/wk3/inside index.js")
/*const url = "https://byui-cse.github.io/cse341-course/lesson03/items.json";
const fetch = require('node-fetch');

exports.processJson = (req, res, next) => {
    

fetch(url)
.then(function(response) {
    return response.json();
})
.then(function (jsonObject) {
    //console.log(jsonObject);

    const items = jsonObject;
    /*for (let i = 0; i < items.length; i++){
        console.log(items[i]);
    }*/
 //   return parseJSON(items);
//})
    //getJSON; //?

//}
    /*fetch(url)
    .then(res  => res.json())
    .then(out) => {
        return out;
    })
    .catch(err => console.log(err));

/*}


/*
//https://byui-cse.github.io/cse341-course/lesson03/items.json
/*fetch('https://byui-cse.github.io/cse341-course/lesson03/items.json')
.then(res => res.json())
.then((out) => {
    console.log('Output: ', out);
}).catch(err => console.error(err));
?
*/
/*
const getJSON = (cb) => {
    fetch(url, (err, data) => {
        //console.log(fileContent);
        if (err) {
            //return [];
            cb([]);
        }
        else {
            //return JSON.parse(fileContent);
            cb(JSON.parse(data));
        }
    });
};*/