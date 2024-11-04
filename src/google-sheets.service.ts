import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';

@Injectable()
export class GoogleSheetsService {
  private sheets = google.sheets('v4');
  private auth: any;

  constructor() {
    this.initializeAuth();
  }

  private async initializeAuth() {
    if (!this.auth) {
      const auth = new google.auth.GoogleAuth({
        keyFile: 'google-file.json',
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });
      this.auth = await auth.getClient();
    }
  }

  async addRow(values: any[][]) {
    await this.initializeAuth();
    try {
      await this.sheets.spreadsheets.values.append({
        auth: this.auth,
        spreadsheetId: process.env.SHEET_ID,
        range: 'spins!A1',
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        requestBody: {
          values,
        },
      });
      console.log('Запись успешно добавлена в Google Sheets');
    } catch (error) {
      console.error('Ошибка при добавлении записи в Google Sheets:', error);
    }
  }
}
