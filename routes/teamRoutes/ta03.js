//TA03 PLACEHOLDER
const express = require('express');
const router = express.Router();
const url = "https://byui-cse.github.io/cse341-course/lesson03/items.json";
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
//var jsonEngine = require('../../controllers/wk3');
router.use(bodyParser.urlencoded({ extended: false }));
let items = [];

//const callFetch = (url) => {
fetch(url)
    .then(function (response) {
        return response.json();
    })
    .then(function (jsonObject) {
        //console.log(jsonObject);

        // const itms = jsonObject;
        // for (let i = 0; i < jsonObject.length; i++) {
        //console.log(jsonObject[i].name);
        console.log('jsonObject is real');
        // }

        items = jsonObject;
    })
    .catch(err => console.log(err));

//  };

router.get('/', (req, res, next) => {
    res.render('pages/teamActivities/ta03', {
        title: 'Team Activity 03',
        path: '/ta03',
        items: items

    });
})

//function filterViaCategory(arr, word) {
//   return arr.filter(obj => obj.tags === word);
//return arr.filter(obj => obj.tags.some(cat => cat.name === word));
//}
router.post('/search', (req, res, next) => {
    //console.log(req);
    const searchWord = req.body.input1;
    console.log(searchWord);
    let searchString = searchWord.toString();
    console.log(searchString);
    let lowerSearch = searchString.toLowerCase();
    console.log(lowerSearch);
    let upperSearch = lowerSearch[0].toUpperCase() + lowerSearch.substring(1);
    console.log(upperSearch);
    //console.log(items[0]);
    let found = items.filter((word) =>
        word.tags.includes(upperSearch));

    res.render('pages/teamActivities/ta03', {
        title: "filtered",
        path: '/ta03',
        items: found
    });
})

module.exports = router;

