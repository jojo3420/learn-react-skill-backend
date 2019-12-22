/*
    mongo DB sample data insert 
*/

const axios = require('axios');

const insertData = (cnt) => {
    if (cnt > 1000) {
        return;
    }
    
    axios.post('http://localhost:4000/api/posts', {
        title: 'sample title' + cnt ,
        body: 'sample body' + cnt ,
        tags: [],
    })
    .then((response) => {
        console.log('[response] => ', response.status, response.statusText);
    }).catch(error  => {
        console.log('[error] => ', error);
        return;
    });

    insertData(cnt+1);
};

insertData(0);




