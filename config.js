'use strict';

const bunyan = require('bunyan');

module.exports = require('rc')('template', {
    log: {
        name: 'template',
        serializers: {
            res: bunyan.stdSerializers.res,
            req: bunyan.stdSerializers.req,
            err: bunyan.stdSerializers.err
        },
        level: 'info'
    },
    mysql: {
        host:'localhost',
        database: 'nba',
        user: 'root',
        password: 'root'
    },
    web:{
        port: 3000,
        url: 'http://localhost:3000'
    },
    urls:{
        players: 'http://stats.nba.com/stats/leaguedashptstats?College=&Conference=&Country=&DateFrom=&DateTo=' +
        '&Division=&DraftPick=&DraftYear=&GameScope=&Height=&LastNGames=0&LeagueID=00&Location=&Month=0' +
        '&OpponentTeamID=0&Outcome=&PORound=0&PerMode=Totals&PlayerExperience=&PlayerOrTeam=Player&PlayerPosition=' +
        '&PtMeasureType=Defense&Season=2015-16&SeasonSegment=&SeasonType=Playoffs&StarterBench=&TeamID=0' +
        '&VsConference=&VsDivision=&Weight=',
        teams: 'http://stats.nba.com/stats/leaguedashteamstats?Conference=&DateFrom=&DateTo=&Division=&GameScope=' +
        '&GameSegment=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=' +
        '&PORound=0&PaceAdjust=N&PerMode=PerGame&Period=0&PlayerExperience=&PlayerPosition=&PlusMinus=N&Rank=N' +
        '&Season=2015-16&SeasonSegment=&SeasonType=Regular+Season&ShotClockRange=&StarterBench=&TeamID=0&VsConference=' +
        '&VsDivision='
    },
    headers:  {
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'en-US,en;q=0.8',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.86 Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
        'x-nba-stats-token': 'true',
        'Referer': 'http://stats.nba.com/players/catch-shoot/',
        'Connection': 'keep-alive',
        'x-nba-stats-origin': 'stats',
        'Cookie': '_ga=GA1.2.2123752289.1484347777; s_vi=[CS]v1|2C3CACC985012902-40000136800260A8[CE]; AMCV_248F210755B762187F000101%40AdobeOrg=1304406280%7CMCIDTS%7C17246%7CMCMID%7C49641750402998926552401461816127531243%7CMCAID%7CNONE%7CMCOPTOUT-1488382352%7CNONE; octowebstatid=4dl9e9sui86mkhwf0fxa; LPVID=I5YWM2Y2E2YjU4YzRjZTIz; s_cc=true; s_fid=196126A5F525ED1B-11B3959B08B54823; s_sq=%5B%5BB%5D%5D'
    }
});