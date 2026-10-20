import { test, expect } from '@playwright/test';
import { newBooking } from '../../test-data/booking';

test.describe('Booking API', () => {
  test('GET /booking returns a list of booking ids', async ({ request }) => {
    const response = await request.get('/booking');

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
    expect(typeof body[0].bookingid).toBe('number');
  });

  test('POST /booking creates a new booking', async ({ request }) => {
    const response = await request.post('/booking', {
      data: newBooking
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(typeof body.bookingid).toBe('number');
    expect(body.booking).toMatchObject({ ...newBooking });
  });
});
