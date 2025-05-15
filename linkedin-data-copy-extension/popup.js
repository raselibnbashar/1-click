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
        const mobile = results[0].result.mobileNumber;
        const salary = results[0].result.salaryData;
        const age = results[0].result.age;
        const profUrl = results[0].result.profUrl;
        // const salary = results[0].result.salaryAmount;
        let num = mobile.slice(-11);

        const emailElement = document.getElementById("email");
        emailElement.innerHTML = `
        {
          <br> "first_name" : "${first_name}",
          <br> "last_name" : "${last_name}",
          <br> "email" : "${email}",
          <br> "mobile" : "${num}",
          <br> "salary" : "${salary}",
          <br> "age" : "${age}",
          <br> "profileUrl" : "${profUrl}"
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


  const mobileNum = document.querySelector("span[data-test-contact-phone]").textContent.trim();

  function removeWhitespaceAndHyphens(str) {
    return str.replace(/\s|-/g, '');
  }


  const mobile = removeWhitespaceAndHyphens(mobileNum);


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



  const profUrl = proUrl || "N/A";

  return {
    first_name,
    last_name,
    emailAddress,
    mobileNumber,
    salaryData,
    age,
    profUrl
  };
}