document.addEventListener("DOMContentLoaded", () => {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, (tabs) => {
    chrome.scripting.executeScript({
        target: {
          tabId: tabs[0].id
        },
        function: getData,
      },
      (results) => {
        if (!results || results.length === 0) {
          emailElement.innerHTML = "Applicant Data not found!";
        }

        const first_name = results[0].result.first_name;
        const last_name = results[0].result.last_name;
        const email = results[0].result.emailAddress;
        var mobile = results[0].result.mobileNumber;
        const salary = results[0].result.salaryDataV;
        const age = results[0].result.age;
        const profUrl = results[0].result.profUrl;
        const country = results[0].result.countryNam;
        // const salary = results[0].result.salaryAmount;
        if (country === 'Bangladesh') {
           mobile = mobile.slice(-11);
        }
        

        const emailElement = document.getElementById("email");
        emailElement.innerHTML = `
        {
          <br> "first_name" : "${first_name}",
          <br> "last_name" : "${last_name}",
          <br> "email" : "${email}",
          <br> "mobile" : "${mobile}",
          <br> "salary" : "${salary}",
          <br> "age" : "${age}",
          <br> "profileUrl" : "${profUrl}",
          <br> "countryName" : "${country}"
          <br>
        }`;

        // Add event listener to the button to copy content
        document.getElementById("copyText").addEventListener("click", () => {
          const range = document.createRange();
          range.selectNode(emailElement);
          window.getSelection().removeAllRanges(); // Clear any current selections
          window.getSelection().addRange(range); // Select the content

          try {
            document.execCommand("copy");
            window.getSelection().removeAllRanges(); // Clear selection after copying
            // alert("Copied to clipboard!");
            window.close();
          } catch (err) {
            console.error("Copy failed", err);
          }
        });
      }
    );
  });
});

function getData() {
  const profileUrl = window.location.href;

  // const email = document.querySelector(
  //   ".fDIgxFncbkMIFEQovWcfFCNjpNUUUPPsauwls.t-14.t-black.t-bold"
  // );
  const name = document.querySelector('span[data-test-row-lockup-full-name] > div').textContent.trim();

  let fName;

  const commaIndex = name.indexOf(',');
  const openParenIndex = name.indexOf('(');

  if (commaIndex !== -1 && (openParenIndex === -1 || commaIndex < openParenIndex)) {
    // Comma found and it's either the only delimiter or comes before the parenthesis
    fName = name.substring(0, commaIndex).trim();
  } else if (openParenIndex !== -1) {
    // Parenthesis found (and either no comma or it comes after)
    fName = name.substring(0, openParenIndex).trim();
  } else {
    // Neither delimiter found, so the original name is the trimmed name
    fName = name.trim();
  }

  const nameParts = fName.split(' ');


  // const mobileNum = document.querySelector("span[data-test-contact-phone]").textContent.trim();

  // function removeWhitespaceAndHyphens(str) {
  //   return str.replace(/\s|-/g, '');
  // }


  // const mobile = removeWhitespaceAndHyphens(mobileNum);

  const mobileNum = document.querySelector("span[data-test-contact-phone]").textContent.trim();

  const cleaned = mobileNum.replace(/[\s\-()]/g, ''); // Results in "+8801821404101"

  function getCountryFromNumber(cleanedPhoneNumber) { // Renamed parameter for clarity, or use 'cleaned'
    const countryCodes = [
      ['+88', 'Bangladesh'],
      ['+299', 'Greenland'],
      ['+298', 'Faroe Islands'],
      ['+297', 'Aruba'],
      ['+291', 'Eritrea'],
      ['+290', 'Saint Helena'],
      ['+269', 'Comoros'],
      ['+268', 'Eswatini (Swaziland)'],
      ['+267', 'Botswana'],
      ['+266', 'Lesotho'],
      ['+265', 'Malawi'],
      ['+264', 'Namibia'],
      ['+263', 'Zimbabwe'],
      ['+262', 'Réunion / Mayotte'],
      ['+261', 'Madagascar'],
      ['+260', 'Zambia'],
      ['+258', 'Mozambique'],
      ['+257', 'Burundi'],
      ['+256', 'Uganda'],
      ['+255', 'Tanzania'],
      ['+254', 'Kenya'],
      ['+253', 'Djibouti'],
      ['+252', 'Somalia'],
      ['+251', 'Ethiopia'],
      ['+250', 'Rwanda'],
      ['+249', 'Sudan'],
      ['+248', 'Seychelles'],
      ['+247', 'Ascension Island'],
      ['+246', 'British Indian Ocean Territory'],
      ['+245', 'Guinea-Bissau'],
      ['+244', 'Angola'],
      ['+243', 'Democratic Republic of the Congo'],
      ['+242', 'Republic of the Congo'],
      ['+241', 'Gabon'],
      ['+240', 'Equatorial Guinea'],
      ['+239', 'São Tomé and Príncipe'],
      ['+238', 'Cape Verde'],
      ['+237', 'Cameroon'],
      ['+236', 'Central African Republic'],
      ['+235', 'Chad'],
      ['+234', 'Nigeria'],
      ['+233', 'Ghana'],
      ['+232', 'Sierra Leone'],
      ['+231', 'Liberia'],
      ['+230', 'Mauritius'],
      ['+229', 'Benin'],
      ['+228', 'Togo'],
      ['+227', 'Niger'],
      ['+226', 'Burkina Faso'],
      ['+225', "Côte d'Ivoire (Ivory Coast)"],
      ['+224', 'Guinea'],
      ['+223', 'Mali'],
      ['+222', 'Mauritania'],
      ['+221', 'Senegal'],
      ['+220', 'Gambia'],
      ['+218', 'Libya'],
      ['+387', 'Bosnia and Herzegovina'],
      ['+216', 'Tunisia'],
      ['+213', 'Algeria'],
      ['+212', 'Morocco'],
      ['+211', 'South Sudan'],
      ['+966', 'Saudi Arabia'],
      ['+98', 'Iran'],
      ['+95', 'Myanmar (Burma)'],
      ['+94', 'Sri Lanka'],
      ['+93', 'Afghanistan'],
      ['+92', 'Pakistan'],
      ['+91', 'India'],
      ['+90', 'Turkey'],
      ['+86', 'China'],
      ['+84', 'Vietnam'],
      ['+82', 'South Korea'],
      ['+81', 'Japan'],
      ['+66', 'Thailand'],
      ['+998', 'Uzbekistan'],
      ['+65', 'Singapore'],
      ['+64', 'New Zealand'],
      ['+63', 'Philippines'],
      ['+62', 'Indonesia'],
      ['+61', 'Australia'],
      ['+60', 'Malaysia'],
      ['+58', 'Venezuela'],
      ['+57', 'Colombia'],
      ['+56', 'Chile'],
      ['+55', 'Brazil'],
      ['+54', 'Argentina'],
      ['+53', 'Cuba'],
      ['+52', 'Mexico'],
      ['+51', 'Peru'],
      ['+49', 'Germany'],
      ['+389', 'Macedonia'],
      ['+48', 'Poland'],
      ['+47', 'Norway'],
      ['+46', 'Sweden'],
      ['+45', 'Denmark'],
      ['+44', 'United Kingdom'],
      ['+352', 'Luxembourg'],
      ['+593', 'Ecuador'],
      ['+43', 'Austria'],
      ['+41', 'Switzerland'],
      ['+971', 'United Arab Emirates'],
      ['+40', 'Romania'],
      ['+968', 'Oman'],
      ['+39', 'Italy'],
      ['+36', 'Hungary'],
      ['+34', 'Spain'],
      ['+33', 'France'],
      ['+32', 'Belgium'],
      ['+31', 'Netherlands'],
      ['+30', 'Greece'],
      ['+27', 'South Africa'],
      ['+20', 'Egypt'],
      ['+7', 'Russia / Kazakhstan'],
      ['+1', 'United States / Canada / Caribbean'],
    ];

    for (const [code, country] of countryCodes) {
      if (cleanedPhoneNumber.startsWith(code)) { // Use the parameter
        const localNumber = cleanedPhoneNumber.slice(code.length); // Use the parameter
        return {
          country,
          localNumber
        };
      }
    }

    if (/^\d{11}$/.test(cleanedPhoneNumber)) {
      var cnty = 'Bangladesh';
    } else{
       var cnty = 'Unknown Country';
    }

    return {
      country: cnty,
      localNumber: cleanedPhoneNumber // Use the parameter
    };
  }

  const result = getCountryFromNumber(cleaned);

  const countryNam = result.country; // Renamed to avoid confusion with the 'country' array in the function
  const mobile = result.localNumber; // Renamed to avoid confusion



  const email = document.querySelector("span[data-test-contact-email-address]").textContent.trim();
  const proUrl = document.querySelector("span[data-test-personal-info-profile-link-text]").textContent.trim();

  // Select the <ul> element
  const ulElement = document.querySelector('.job-application-details__compact--prescreening-list ul');

  // Select the first <li> within the <ul>
  const a = ulElement.querySelector('li:first-child');
  const firstQueryData = a.querySelector('p').textContent.trim();
  const aValue = a.querySelector('span').textContent.trim();


  const b = ulElement.querySelector('li:nth-child(2)');
  const bValue = b.querySelector('span').textContent.trim();


  const salaryAmount = Math.max(aValue, bValue);
  const ageValue = Math.min(aValue, bValue);


  const fPart = nameParts[0] || "N/A";
  const sPart = nameParts.slice(1).join(' ') || "N/A";


  const first_name = fPart.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const last_name = sPart.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  // Testing Starts
  const experienceUL = document.querySelector("div[data-test-expandable-stepper] ul");
  const expFirstLi = experienceUL.querySelector('li:first-child');


  // Job Title
  const expJobTitle = expFirstLi.querySelector("span[data-test-position-entity-title]");


  // Company Title
  const expComTitle_aTag = expFirstLi.querySelector("a[data-test-position-entity-company-link]");
  const expComTitle_spanTag = expFirstLi.querySelector("dd[data-test-position-entity-company-name] span");
  if (expComTitle_aTag || expComTitle_spanTag) {
    var comTitle = expComTitle_aTag || expComTitle_spanTag;
  }

  // Country name
  const countryName = expFirstLi.querySelector("dd[data-test-position-entity-location]");

  // Job description
  const jobDesc = expFirstLi.querySelector("dd[data-test-position-entity-description]");


  // Testing End

  const fullName = fName || "N/A";

  const emailAddress = email || "N/A";
  const mobileNumber = mobile || "N/A";

  function getAge(aValue) {
    return !isNaN(Number(aValue)) ? Number(aValue) : 0;
  }

  function getSalary(bValue) {
    return !isNaN(Number(bValue)) ? Number(bValue) : "";
  }

  if (firstQueryData !== null && firstQueryData !== undefined && firstQueryData !== "" && firstQueryData === "Your Age?") {

    var age = getAge(aValue);
    var salaryData = getSalary(bValue);
    //var salaryData =getSalary(bValue);

  } else if (firstQueryData !== null && firstQueryData !== undefined && firstQueryData !== "" && firstQueryData === "Your Age?s") {
    var age = getAge(aValue);
    var salaryData = getSalary(bValue);
  } else if (firstQueryData !== null && firstQueryData !== undefined && firstQueryData !== "" && firstQueryData === "Your Salary Expectation?") {
    var age = getAge(bValue);
    var salaryData = getSalary(aValue);
  } else if (firstQueryData !== null && firstQueryData !== undefined && firstQueryData !== "" && firstQueryData === "Your expected Salary?") {
    var age = getAge(bValue);
    var salaryData = getSalary(aValue);
  } else if (firstQueryData !== null && firstQueryData !== undefined && firstQueryData !== "" && firstQueryData === "Your Expected Salary?") {
    var age = getAge(bValue);
    var salaryData = getSalary(aValue);
  } else {
    var age = "0";
    var salaryData = "";
  }

  var x = salaryData;
  var stringX = String(x);
  var salaryData;
  var step = 500;

  if (stringX.length === 2) {
    salaryData = stringX + "000";
  } else if (stringX === '0') {
    var minSalary = 20000;
    var maxSalary = 32000;
    var possibleValues = [];

    for (var i = minSalary; i <= maxSalary; i += step) {
      possibleValues.push(i);
    }

    var randomIndex = Math.floor(Math.random() * possibleValues.length);
    salaryData = possibleValues[randomIndex];
  } else if (stringX.length === 3 && stringX.includes('.')) {
    var minSalary = 20000;
    var maxSalary = 32000;
    var possibleValues = [];

    for (var i = minSalary; i <= maxSalary; i += step) {
      possibleValues.push(i);
    }

    var randomIndex = Math.floor(Math.random() * possibleValues.length);
    salaryData = possibleValues[randomIndex];
  } else if (Number(x) <= 9) {
    salaryData = stringX + "0000";
  }


  // const age = ageValue || "0"; Your Salary Expectation? Your expected Salary? Your Age?s                    Your Expected Salary?

 const euroCountries = [
  'Austria', 'Belgium', 'Croatia', 'Cyprus', 'Estonia',
  'Finland', 'France', 'Germany', 'Greece', 'Ireland',
  'Italy', 'Latvia', 'Lithuania', 'Luxembourg', 'Malta',
  'Netherlands', 'Portugal', 'Slovakia', 'Slovenia', 'Spain'
];

const currencyRatesToBDT = {
  // North America
  'United States': 117.5,     // USD
  'Canada': 85.3,             // CAD
  'Mexico': 6.3,              // MXN
  'Cuba': 117.5,              // CUP (approx USD parity)
  'Jamaica': 75.4,            // JMD

  // South America
  'Argentina': 1.3,           // ARS
  'Brazil': 23.5,             // BRL
  'Chile': 0.15,              // CLP
  'Colombia': 0.03,           // COP
  'Peru': 30.8,               // PEN
  'Ecuador': 122,               // PEN
  'Venezuela': 0.0002,        // VES (very volatile)

  // Asia
  'Bangladesh': 1,            // BDT
  'India': 1.3,               // INR
  'Pakistan': 0.47,           // PKR
  'Afghanistan': 1.53,        // AFN
  'Sri Lanka': 0.30,          // LKR
  'Nepal': 0.87,              // NPR
  'Bhutan': 1.6,              // BTN (pegged to INR)
  'China': 16.5,              // CNY
  'Japan': 0.76,              // JPY
  'South Korea': 0.10,        // KRW
  'Indonesia': 0.0067,        // IDR
  'Malaysia': 25.2,           // MYR
  'Philippines': 2.2,         // PHP
  'Singapore': 93.6,          // SGD
  'Thailand': 3.5,            // THB
  'Vietnam': 0.005,           // VND
  'Myanmar': 0.048,           // MMK
  'Laos': 0.012,              // LAK
  'Mongolia': 0.040,          // MNT
  'Maldives': 7.6,            // MVR
  'Saudi Arabia': 31.2,       // SAR
  'United Arab Emirates': 32, // AED
  'Qatar': 32.5,              // QAR
  'Oman': 304.5,              // OMR
  'Kuwait': 385.5,            // KWD
  'Bahrain': 311.2,           // BHD
  'Israel': 38.5,             // ILS
  'Jordan': 165.7,            // JOD
  'Lebanon': 0.078,           // LBP (very volatile)
  'Syria': 0.09,              // SYP (volatile)
  'Turkey': 4.5,              // TRY
  'Kazakhstan': 0.25,         // KZT
  'Uzbekistan': 0.012,        // UZS
  'Turkmenistan': 0.034,      // TMT
  'Kyrgyzstan': 0.97,         // KGS
  'Tajikistan': 0.086,        // TJS

  // Europe (non-Euro)
  'United Kingdom': 148.7,    // GBP
  'Switzerland': 153.5,       // CHF
  'Norway': 13.5,             // NOK
  'Sweden': 11.3,             // SEK
  'Denmark': 18.4,            // DKK
  'Poland': 28.2,             // PLN
  'Russia': 1.5,              // RUB
  'Ukraine': 3.4,             // UAH
  'Czech Republic': 5.2,      // CZK
  'Hungary': 0.35,            // HUF
  'Bulgaria': 69.5,           // BGN
  'Croatia': 18.1,            // HRK (but Euro adopted in 2023)
  'Iceland': 0.83,            // ISK
  'Albania': 1.0,             // ALL
  'Belarus': 45.5,            // BYN
  'Moldova': 6.5,             // MDL
  'Serbia': 1.2,              // RSD
  'Montenegro': 1,            // EUR used, no currency
  'Macedonia': 2.1,     // MKD
  'Romania': 27.01,     
  'Bosnia and Herzegovina': 70.05,     

  // Africa
  'South Africa': 6.8,        // ZAR
  'Nigeria': 0.29,            // NGN
  'Egypt': 7.4,               // EGP
  'Kenya': 0.85,              // KES
  'Morocco': 13.0,            // MAD
  'Tanzania': 0.05,           // TZS
  'Uganda': 0.034,            // UGX
  'Ghana': 15.0,              // GHS
  'Ethiopia': 2.3,            // ETB
  'Algeria': 0.89,            // DZD
  'Angola': 0.18,             // AOA
  'Botswana': 10.8,           // BWP
  'Cameroon': 0.19,           // XAF (CFA Franc BEAC)
  'Democratic Republic of the Congo': 0.057, // CDF
  'Libya': 25.0,              // LYD
  'Madagascar': 0.028,        // MGA
  'Mauritius': 3.4,           // MUR
  'Mozambique': 0.016,        // MZN
  'Namibia': 6.8,             // NAD (pegged to ZAR)
  'Nigeria': 0.29,            // NGN
  'Rwanda': 0.11,             // RWF
  'Senegal': 0.19,            // XOF
  'Sudan': 0.22,              // SDG
  'Tunisia': 41.5,            // TND
  'Zambia': 0.06,             // ZMW
  'Zimbabwe': 0.68,           // ZWL

  // Oceania
  'Australia': 78.2,          // AUD
  'New Zealand': 70.5,        // NZD
  'Fiji': 50.5,               // FJD
  'Papua New Guinea': 32.5,   // PGK
  'Samoa': 43.0,              // WST

  // Middle East (some overlap with Asia)
  'Yemen': 0.47,              // YER
  'Iraq': 0.08,               // IQD

  // Caribbean & Others
  'Bahamas': 117.5,           // BSD (USD pegged)
  'Barbados': 58.7,           // BBD
  'Jamaica': 75.4,            // JMD
  'Trinidad and Tobago': 17.6,// TTD

  // Add more countries/rates as needed
};


const euroCurrency = 136.08;

function convertSalaryToBDT(countryNam, salaryData) {
  let rate;

  if (euroCountries.includes(countryNam)) {
    rate = euroCurrency;

    if (/^\d{5}$/.test(salaryData)) {
      return Math.floor((salaryData * rate) / 12);
    } else if (/^\d{4}$/.test(salaryData)) {
      return Math.floor(salaryData * rate);
    } else if (/^\d{6}$/.test(salaryData)) {
      return Math.floor((salaryData * rate) / 12);
    }else {
      return 'Invalid salary format for Euro countries';
    }

  } else {
    // Non-Euro countries
    rate = currencyRatesToBDT[countryNam];
    if (!rate) {
      return Math.floor(salaryData * 1);
    }

    if (salaryData) {
      return Math.floor(salaryData * rate);
    } else {
      return 'Invalid salary data';
    }
  }
}

const salaryDataV = convertSalaryToBDT(countryNam, salaryData);


  const profUrl = proUrl || "N/A";

  return {
    first_name,
    last_name,
    emailAddress,
    mobileNumber,
    salaryDataV,
    age,
    profUrl,
    countryNam
  };
}
