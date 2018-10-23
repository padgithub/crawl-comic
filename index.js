const { app } = require('./express/expressApp');
const port = 3000

app.listen(port, () => console.log(`Express app is listening on port ${port}`))