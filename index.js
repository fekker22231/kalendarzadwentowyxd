const puppeteer = require('puppeteer');
const url = 'https://www.asos.com/pl/beauty-extras/asos-kalendarz-adwentowy-na-24-dni-z-produktami-do-pielegnacji-twarzy-i-ciaa-oszczedzasz-74/prd/24515527'
const cron = require('node-cron');
const nodemailer = require('nodemailer')

const contact = (msg) => {
    const smtpTransport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "tesestest1337@gmail.com",
            pass: "krolask123"
        }
    });
    const mailOptions = {
        from: 'tesestest1337@gmail.com',
        to: 'marcin.zce@gmail.com', 
        subject: msg,
        text: msg
    }
    smtpTransport.sendMail(mailOptions, function(error){
        if(error){
            console.log(error);
        }
    });
}

const run = async() =>  {
    console.log('Beginning work!')
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.setExtraHTTPHeaders({
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36',
        'upgrade-insecure-requests': '1',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'en-US,en;q=0.9,en;q=0.8'
    })
    await page.goto(url);
    var element = await page.waitFor(".product-out-of-stock-label")
    var element2 = await page.waitFor(".add-item")
    var text = await page.evaluate(element => element.textContent, element)
    var text2 = await page.evaluate(element2 => element2.textContent, element2)

    console.log('Work done, results below.')

    if(text){
        console.log('NIE MA KALENDARZA ADWENTOWEGO')
        contact('NIE MA KALENDARZA ADWENTOWEGO')
        browser.close()
        return
    } 
    
    if(text2){
        console.log('JEST KALENDARZ JEST KALENDARZ')
        contact('JEST KALENDARZ JEST KALENDARZ')
        browser.close()
        return
    }
}

run()