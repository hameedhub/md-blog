import app  from './index'

const PORT: number = parseInt(process.env['PORT'] ?? '3000', 10);

app.listen(PORT, () => {
    console.log(`Listening on part ${PORT}`)
})