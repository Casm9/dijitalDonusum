const Result = require('../database/models/Result');

async function evaluateResults(selectedOptions) {
 
    if (selectedOptions.includes('Üretim')) {
        return await Result.findOne({ where: { title: 'İşini Dijitalde Büyüt' } });
    } else if (selectedOptions.includes('Perakende')) {
        return await Result.findOne({ where: { title: 'Yeni Dijital Dönüşüm Çözümü' } });
    }

    return await Result.findOne({ where: { title: 'Genel Çözüm' } });
}

module.exports = evaluateResults;