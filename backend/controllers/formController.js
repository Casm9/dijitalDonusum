const Form = require('../database/models/Form');

exports.submitForm = async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    const { name, surname, email, telno, company, numOfEmployees, companyActivityPeriod, companySector } = req.body;
    const existingForm = await Form.findOne({ where: { email } });
    if (existingForm) {
      return res.status(400).json({ success: false, message: 'This email has already been used.' });
    }
    const formSubmission = await Form.create({ name, surname, email, telno, company, numOfEmployees, companyActivityPeriod, companySector });
    res.status(201).json({ success: true, formSubmission });
    
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};