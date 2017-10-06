require('dotenv').config()

const Telegraf = require('telegraf')
const TelegrafWit = require('telegraf-wit')

const telegraf = new Telegraf(process.env.TELEGRAF)
const wit = new TelegrafWit(process.env.WIT)
const invoiceToken = process.env.STRIPE

telegraf.command('start', ({ from, reply }) => {
  return reply('Benvenuto!');
})

telegraf.on('text', (ctx) => {

  	return wit.meaning(ctx.message.text)
    .then((result) => {
    	if(result.entities.intent) {
    		switch(result.entities.intent[0].value) {
	    		case 'info_get':
	      			return ctx.reply('Sono un bot che vende bot. Dimmi che vuoi comprare un bot! DAI DAI!');
	    		case 'bot_buy':
	    			return ctx.replyWithInvoice({
	    				title: 'Un nuovo bot',
	    				description: 'Un bellissimo nuovo bot tutto da sviluppare, solo per te',
	    				payload: 'miao',
	    				provider_token: invoiceToken,
	    				start_parameter: 'miao',
	    				currency: 'chf',
	    				photo_url: 'http://www.gold-binary-robot.com/images/robot-img.png',
	    				prices: [
	    					{label: 'Sviluppo', amount: 90000},
	    					{label: 'Project Management', amount: 20000},
	    				]
	    			});
	      		case 'salute':
	      			return ctx.reply('Ciao a te! Chiedimi cosa posso fare per te! :)');
    		}
    	}

	    return ctx.reply('Non ti capisco... \n' + JSON.stringify(result,2));

    });
})

telegraf.startPolling()