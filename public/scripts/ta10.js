const populateList = () => {
    const nameList = document.getElementById('nameList');

    fetch('ta10/fetchAll')
        .then(res => res.json())
        .then(data => {
            while (nameList.firstChild) nameList.firstChild.remove()

            for (const avenger of data.avengers) {
                const li = document.createElement('li');
                //const liAKA =document.createElement('li');
                //liAKA.appendChild(document.createTextNode("AKA " + avenger.AKA));
                // 
                li.appendChild(document.createTextNode(avenger.name + " AKA " + avenger.AKA));
                nameList.appendChild(li);
                //nameList.appendChild(liAKA);
            }
        })
        .catch(err => {
            console.log(err);
        })
}
const submitName = () => {
    const newName = document.getElementById('newName').value;
    const newNameAlias = document.getElementById('alias').value;
    var result = { newName: newName, alias: newNameAlias};
    var resultJson = JSON.stringify(result);
    console.log("ResultJson", resultJson);
    console.log("result", result);
    fetch('ta10/insertName', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( result )
        //body: JSON.stringify({ newName })
        //body: JSON.stringify({ newName, newNameAlias })
    })
        .then(res => {
            document.getElementById('newName').value = '';
            document.getElementById('alias').value = '';
            populateList();
        })
        .catch(err => {
            document.getElementById('newName').value = '';
            document.getElementById('alias').value = '';
            console.error(err);
        })
}
populateList();