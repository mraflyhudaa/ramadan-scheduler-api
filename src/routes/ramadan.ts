import { Router } from 'express';
import { getRamadanSchedule, getRamadanDayById, calculateScheduleForLocation } from '../controllers/ramadan';
import { CalculationMethod, Coordinates, PrayerTimes, SunnahTimes } from 'adhan';
import moment from 'moment';

const router = Router();

// Get Ramadan schedule for a specific location
router.get('/schedule/:locationId', getRamadanSchedule);

// Get details for a specific day of Ramadan
router.get('/day/:id', getRamadanDayById);

// Calculate and save Ramadan schedule for a new location
router.post('/calculate/:locationId', calculateScheduleForLocation);

router.get('/prayer-times', (req, res) => {
  try {
    const coordinates = new Coordinates(35.7897507, -78.6912485);
    const params = CalculationMethod.MoonsightingCommittee();
    const date = new Date();
    const prayerTimes = new PrayerTimes(coordinates, date, params);
    const sunnahTimes = new SunnahTimes(prayerTimes);

    const times = {
      fajr: moment(prayerTimes.fajr).format('h:mm A'),
      sunrise: moment(prayerTimes.sunrise).format('h:mm A'), 
      dhuhr: moment(prayerTimes.dhuhr).format('h:mm A'),
      asr: moment(prayerTimes.asr).format('h:mm A'),
      maghrib: moment(prayerTimes.maghrib).format('h:mm A'),
      isha: moment(prayerTimes.isha).format('h:mm A'),
      middleOfTheNight: moment(sunnahTimes.middleOfTheNight).format('h:mm A'),
      lastThirdOfTheNight: moment(sunnahTimes.lastThirdOfTheNight).format('h:mm A')
    };

    res.json({
      success: true,
      data: times
    });

  } catch (error:any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export default router;