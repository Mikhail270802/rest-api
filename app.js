import express from 'express'
import path from 'path'
import {v4} from 'uuid'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


let CONTACTS = [
    {id: v4(), name: 'Mikhail', value: '+7 228-69-55', marked: false}
]

app.use(express.json())

// GET - server request
app.get('/api/contacts', (req, res) => {
    setTimeout(() => {
        res.status(200).json(CONTACTS)
    }, 1000)
})

// POST - creates a new model
app.post('/api/contacts', (req, res) => {
    const contact = {...req.body, id: v4(), marked: false}
    CONTACTS.push(contact)
    res.status(201).json({test: 1})
})

// DELETE
app.delete('/api/contacts/:id', (req, res) => {
    CONTACTS = CONTACTS.filter(c => c.id !== req.params.id)
    res.status(200).json({message: 'Contact has been deleted'})
})

// PUT 
app.put('/api/contacts/:id', (req, res) => {
    const idx = CONTACTS.findIndex(c => c.id === req.params.id)
    CONTACTS[idx] = req.body
    res.json(CONTACTS[idx])
})

app.use(express.static(path.resolve(__dirname, 'client')))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})

app.listen(3000, () =>  console.log('Server has been started...'))


