import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const API_ENDPOINT="http://localhost:3001/"
  const handleFileUpload = async (event) => {
    setLoading(true);
    setError('');
    try {
      const formData = new FormData();
      console.log(event.target.files)
      formData.append('file', event.target.files[0]);
      console.log(formData)
      const response = await axios.post(`${API_ENDPOINT}parse-logs`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      downloadJson(response.data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const downloadJson = (data) => {
    console.log("done")
    const blob = new Blob([JSON.stringify(data)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'response.json';
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div style={{ textAlign: 'center' }}>
      {error && (
        <div style={{ color: 'red' }}>
          An error occurred: {error}
        </div>
      )}
      <div>
        <input type="file" onChange={handleFileUpload} />
        {loading && <div>Loading...</div>}
      </div>
    </div>
  );
};

export default App;
