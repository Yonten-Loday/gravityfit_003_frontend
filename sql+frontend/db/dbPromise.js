import * as SQLite from 'expo-sqlite';

export const dbPromise = SQLite.openDatabaseAsync('example.db');