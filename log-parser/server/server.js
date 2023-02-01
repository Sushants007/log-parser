const express=require('express');
const fs= require('fs');
const { v4: uuidv4 } = require('uuid');
const cors=require('cors');

const app = express();
app.use(cors);
const PORT = 3001;

app.use(express.json());

app.post('/parse-logs', (req, res) => {
  console.log(req)
  const logs = req.body.logs.split('\n');
  const parsedLogs = [];
  for (const log of logs) {
    const logData = log.split(' - ');
    const date = logData[0];
    const level = logData[1];
    const data = JSON.parse(logData[2].replace(/'/g, '"'));
    const transactionId = data.transactionId;
    const details = data.details;
    const error = data.err;
    if (level === 'error' || level === 'warn') {
      parsedLogs.push({
        id: uuidv4(),
        date,
        level,
        transactionId,
        details,
        error,
      });
    }
  }
  res.status(200).send({ logs: parsedLogs });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
