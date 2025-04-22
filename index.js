const http = require('http');

// Sample data
const data = {
  movies: [
    { id: 1, title: 'Movie 1', genre: 'Action', year: 2022 },
    { id: 2, title: 'Movie 2', genre: 'Comedy', year: 2023 }
  ],
  series: [
    { id: 1, title: 'Series 1', genre: 'Drama', seasons: 3 },
    { id: 2, title: 'Series 2', genre: 'Sci-fi', seasons: 2 }
  ],
  songs: [
    { id: 1, title: 'Song 1', artist: 'Artist 1', album: 'Album 1' },
    { id: 2, title: 'Song 2', artist: 'Artist 2', album: 'Album 2' }
  ]
};

// Helper function to send JSON response
const sendResponse = (res, statusCode, data) => {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
};

// Create the server
const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/movies') {
    if (method === 'GET') {
      sendResponse(res, 200, data.movies);
    } else if (method === 'POST') {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', () => {
        const newMovie = JSON.parse(body);
        newMovie.id = data.movies.length + 1; // Assign a new ID
        data.movies.push(newMovie);
        sendResponse(res, 201, data.movies);
      });
    }
  } else if (url === '/series') {
    if (method === 'GET') {
      sendResponse(res, 200, data.series);
    } else if (method === 'POST') {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', () => {
        const newSeries = JSON.parse(body);
        newSeries.id = data.series.length + 1; // Assign a new ID
        data.series.push(newSeries);
        sendResponse(res, 201, data.series);
      });
    }
  } else if (url === '/songs') {
    if (method === 'GET') {
      sendResponse(res, 200, data.songs);
    } else if (method === 'POST') {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', () => {
        const newSong = JSON.parse(body);
        newSong.id = data.songs.length + 1; // Assign a new ID
        data.songs.push(newSong);
        sendResponse(res, 201, data.songs);
      });
    }
  } else {
    // 404 for undefined routes
    sendResponse(res, 404, { message: 'Route not found' });
  }
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
