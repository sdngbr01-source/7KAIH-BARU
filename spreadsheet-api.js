// Google Sheets API
// GANTI DENGAN URL WEB APP ANDA!
const SPREADSHEET_API_URL = 'https://script.google.com/macros/s/AKfycbx-CWZCea4gAu8ON5IpljbhjbozF5a5I1IqCnBAS_vINWXN_gRIWGw5jSejsL5fjoY7/exec';

async function callSpreadsheetApi(action, data = {}) {
    try {
        const response = await fetch(SPREADSHEET_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action, ...data })
        });
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        return { success: false, error: error.message };
    }
}

async function submitHabitToSheet(habitData) {
    return await callSpreadsheetApi('submitHabit', habitData);
}

async function getHabitsFromSheet() {
    return await callSpreadsheetApi('getHabits');
}

async function getScoresFromSheet() {
    return await callSpreadsheetApi('getScores');
}
