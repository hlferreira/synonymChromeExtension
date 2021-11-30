const request = require('request')
const express = require('express')

const app =

request({
    url: "https://api.datamuse.com/words?ml=ringing+in+the+ears",
    json: true
}, (err, response, body) => {
    console.log(body)
})