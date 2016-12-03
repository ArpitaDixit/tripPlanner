/**
 * Created by shauryamittal on 12/2/16.
 */
module.exports = {
    GOOGLE_API_KEY:     process.env.CONFIG_GOOGLE_API_KEY     || null,
    LYFT_API_URI:       process.env.CONFIG_LYFT_API_URI       || 'https://api.lyft.com',
    LYFT_WWW_URI:       process.env.CONFIG_LYFT_WWW_URI       || 'https://www.lyft.com',
    LYFT_CLIENT_ID:     'grVx7yQPiybM'     || null,
    LYFT_CLIENT_SECRET: 'Nj_Ns22aCkpY-Xw2mgbXjVoH5gOVZCHs' || null,
    PORT:               4000,
    SESSION_SECRET:     process.env.CONFIG_SESSION_SECRET     || 'secret',
    USE_SANDBOX:        false
};