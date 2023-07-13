/*
This script helps you setup your gmail account as a service to send emails.

To install simply create a new Google App script in your Google drive and paste the code below, then change the API_KEY value for you application
Then deploy the script as a Web App.  Copy the new web app url to the example below and test

Example curl request:
curl -X POST -L https://script.google.com/macros/s/AKfycbzb3XsVGvQROEWGQSHf_ExdZdXAE226LZ5eBRUxPEOGBnsYpIk/exec \
-d '{"API_KEY":"XXXXXXXX-1deb-4055-XXXX-adda829fXXXX","SUBJECT":"Test from gapps","MESSAGE":"Hello it is 2:00pm"}'
*/

function glob() {
  return {
    API_KEY: "XXXXXXXX-1deb-4055-XXXX-adda829fXXXX",
    RECPT: "default_to_email@example",
    ALLOWED_DOMAINS: ["example.com", "test.example.com"],
  };
}

function returnJSON(result) {
  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(
    ContentService.MimeType.JSON
  );
  // return HtmlService.createHtmlOutput('<div tag="nvdfjh32">' + JSON.stringify(result) + '</div>');
}

function sendMail(e) {
  const mailContents = JSON.parse(e.postData.contents);

  if (!mailContents.SUBJECT) return returnJSON({ success: false });

  const emailDomain = mailContents.MAILTO.split("@")[1].toLowerCase();
  const recpt =
    mailContents.MAILTO && glob().ALLOWED_DOMAINS.indexOf(emailDomain) >= 0
      ? mailContents.MAILTO
      : glob().RECPT;
  // const recpt = glob().RECPT;

  MailApp.sendEmail(recpt, mailContents.SUBJECT, mailContents.MESSAGE);

  return returnJSON({ success: true });
}

function request_validate(e) {
  return (
    e.postData &&
    e.postData.contents &&
    JSON.parse(e.postData.contents).API_KEY === glob().API_KEY
  );
}

function doPost(e, f) {
  if (request_validate(e)) return sendMail(e);
  return returnJSON({ success: false, msg: "not valid2", content: e, eff: f });
}
