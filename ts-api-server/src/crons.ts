import schedule from 'node-schedule';

export default () => {
	schedule.scheduleJob('*/1 * * * *', () => { console.log('IT\'s WORKING'); });
};
