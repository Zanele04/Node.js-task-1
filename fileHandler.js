const fs = require('fs');
const path = require('path');

// File paths for data storage
const DATA_DIR = path.join(__dirname, 'data');
const MOVIES_FILE = path.join(DATA_DIR, 'movies.json');
const SERIES_FILE = path.join(DATA_DIR, 'series.json');
const SONGS_FILE = path.join(DATA_DIR, 'songs.json');

// Function to ensure data directory exists
function ensureDataDirectory() {
  if (!fs.existsSync(DATA_DIR)) {
    console.log('Creating data directory...');
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// Function to initialize data files if they don't exist
function initDataFiles() {
  ensureDataDirectory();
  
  // Initialize movies.json
  if (!fs.existsSync(MOVIES_FILE)) {
    const { movies } = require('./data.js');
    fs.writeFileSync(MOVIES_FILE, JSON.stringify(movies, null, 2));
    console.log('Created movies.json file');
  }
  
  // Initialize series.json
  if (!fs.existsSync(SERIES_FILE)) {
    const { series } = require('./data.js');
    fs.writeFileSync(SERIES_FILE, JSON.stringify(series, null, 2));
    console.log('Created series.json file');
  }
  
  // Initialize songs.json
  if (!fs.existsSync(SONGS_FILE)) {
    const { songs } = require('./data.js');
    fs.writeFileSync(SONGS_FILE, JSON.stringify(songs, null, 2));
    console.log('Created songs.json file');
  }
}

// Function to read data from file
function readDataFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return [];
  }
}

// Function to write data to file
function writeDataFile(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error(`Error writing to file ${filePath}:`, error);
    return false;
  }
}

// Data access functions
function getMovies() {
  return readDataFile(MOVIES_FILE);
}

function getSeries() {
  return readDataFile(SERIES_FILE);
}

function getSongs() {
  return readDataFile(SONGS_FILE);
}

function saveMovies(movies) {
  return writeDataFile(MOVIES_FILE, movies);
}

function saveSeries(series) {
  return writeDataFile(SERIES_FILE, series);
}

function saveSongs(songs) {
  return writeDataFile(SONGS_FILE, songs);
}

// Generate a unique ID
function generateId() {
  return Math.random().toString(36).substring(2, 15);
}

// Export all functions
module.exports = {
  initDataFiles,
  getMovies,
  getSeries,
  getSongs,
  saveMovies,
  saveSeries,
  saveSongs,
  generateId
};
