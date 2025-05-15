const site = window.location.href;

// LinkedIn Applicant JobSeeker Identity Information Function: Start
if (site.includes("https://ln.bdjobs.com/linkedinApplication/jobListLn.asp?")) {

    function addInputToModalFooter() {


        // Select the logout div element
        const logoutDiv = document.querySelector(".logout");
        logoutDiv.style.backgroundColor = "#87264b";

        // Select the name div element
        const nameDiv = document.querySelector(".name");

        // Get the current text content
        let text = nameDiv.textContent;

        // Capitalize the first letter
        let capitalizedText = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

        // Update the div's text content
        nameDiv.textContent = capitalizedText;


        const panelDiv = document.querySelector(".panel");
        const panelHeadingDiv = document.querySelector(".panel-heading");
        panelHeadingDiv.style.backgroundColor = "#87264b";

        // Change the border color
        panelDiv.style.borderColor = "#87264b";
        panelHeadingDiv.style.borderColor = "#87264b";


        const modalContent = document.querySelector(".modal-content");

        if (modalContent) {
            // Change the display style to 'block'
            modalContent.style.backgroundColor = "#87264b";
            modalContent.style.color = "#ffffff";



        }


        const modalErrorMsg = document.getElementById("modalErrorMsg");


        // Example: Modify the style
        modalErrorMsg.style.color = "red";
        modalErrorMsg.style.padding = "5px";
        modalErrorMsg.style.borderRadius = "6px";
        modalErrorMsg.style.backgroundColor = "#fff";




        // Create the input element
        var newInput = document.createElement("textarea");
        newInput.type = "text";
        newInput.id = "dataPass";
        newInput.name = "dataPass";
        newInput.placeholder = "JSON Paste Here";

        // Add inline styles
        newInput.style.marginTop = "10px";
        newInput.style.marginBottom = "10px";
        newInput.style.padding = "5px";
        newInput.style.width = "100%";
        newInput.style.borderRadius = "5px";
        newInput.style.border = "1px solid #ccc";
        newInput.style.height = "150px";
        newInput.style.color = "#000";

        // Get the div that contains the buttons
        var buttonDiv = document.querySelector(".modal-footer > div");



        const modalFooter = document.querySelector(".modal-footer");

        if (modalFooter) {
            // Change the display style to 'block'
            modalFooter.style.display = "block";
        }




        // Close button hidden
        document.querySelector(".modal-footer > div > button:nth-child(1)").style.display = "none";
        document.querySelector(".modal-footer > div > button:nth-child(2)").style.display = "block";
        document.querySelector(".modal-footer > div > button:nth-child(2)").style.width = "100%";
        document.querySelector(".modal-footer > div > button:nth-child(2)").style.marginLeft = "0";
        document.querySelector(".modal-footer > div > button:nth-child(2)").style.backgroundColor = "#006B55";
        document.querySelector(".modal-footer > div > button:nth-child(2)").style.padding = "4rem";

        // Insert the new input before the buttons
        buttonDiv.insertBefore(newInput, buttonDiv.lastChild);
    }

    // Call the function to add the input field
    addInputToModalFooter();




}
// LinkedIn Applicant JobSeeker Identity Information Function: End


// LinkedIn ApplicantList From Function: Start
if (site.includes("https://ln.bdjobs.com/linkedinApplication/createApplicant.asp?")) {

    // Function to add a new input group dynamically
    function addInputGroup() {

        // Select the logout div element
        const pageHeaderDiv = document.querySelector(".page-header");

        pageHeaderDiv.style.margin = "10px";

        const logoutDiv = document.querySelector(".logout");
        logoutDiv.style.backgroundColor = "#87264b";

        const panelDiv = document.querySelector(".panel");
        const panelHeadingDiv = document.querySelector(".panel-heading");
        panelHeadingDiv.style.backgroundColor = "#87264b";

        // Change the border color
        panelDiv.style.borderColor = "#87264b";
        panelHeadingDiv.style.borderColor = "#87264b";

        // Select the name div element
        const nameDiv = document.querySelector(".name");

        // Get the current text content
        let text = nameDiv.textContent;

        // Capitalize the first letter
        let capitalizedText = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

        // Update the div's text content
        nameDiv.textContent = capitalizedText;


        // Select all label elements within the form
        const labels = document.querySelectorAll("#createApplicant label");

        // Iterate through the labels and hide each one
        // labels.forEach(label => {
        //     label.style.display = "none";
        // });



        // Create a new div element with the class "input-group"
        var newDiv = document.createElement("div");
        newDiv.className = "input-group";

        // Create a label element
        var newLabel = document.createElement("label");
        newLabel.setAttribute("for", "dataPass");
        newLabel.innerText = "Data Pass";

        // Create an input element
        var newInput = document.createElement("textarea");
        newInput.type = "text";
        newInput.id = "dataPass";
        newInput.name = "dataPass";
        newInput.style.height = "100px";

        const button = document.querySelector("button[type='button']");
        button.style.height = "100px";
        button.style.backgroundColor = "#006B55";
        button.style.color = "#fff";

        // Append the label and input to the div
        newDiv.appendChild(newLabel);
        newDiv.appendChild(newInput);

        // Append the new div to the form
        var form = document.getElementById("createApplicant");
        form.insertBefore(newDiv, form.querySelector('.input-group[style]')); // Insert before the button div
    }

    // Call the function to add the new input group
    addInputGroup();

}
// LinkedIn ApplicantList From Function: End

// Data Pass Function: Start
document.getElementById("dataPass").addEventListener("click", async function () {
    try {
        const clipboardText = await navigator.clipboard.readText();
        this.value = clipboardText;

        const dataVal = JSON.parse(this.value);

        // LinkedIn Applicant JobSeeker Identity Information Function: Start
        if (site.includes("https://ln.bdjobs.com/linkedinApplication/jobListLn.asp?")) {
            let emailAdd = document.querySelector('input[name="contact_email"]');
            let mobileNumber = document.querySelector('input[name="contact_phone"]');

            if (emailAdd && mobileNumber) {
                emailAdd.value = dataVal.email;
                mobileNumber.value = dataVal.mobile;
            }
        }
        // LinkedIn Applicant JobSeeker Identity Information Function: End

        // LinkedIn ApplicantList From Function: Start
        if (site.includes("https://ln.bdjobs.com/linkedinApplication/createApplicant.asp?")) {
            let fName = document.querySelector('input[name="first_name"]');

            let lName = document.querySelector('input[name="last_name"]');
            let email = document.querySelector('input[name="email"]');
            let mobile = document.querySelector('input[name="mobile"]');
            //let age = document.querySelector('input[name="age"]').value;
            let salaryValue = document.querySelector('input[name="salary"]');
            let lnprofile = document.querySelector('input[name="lnprofile"]');
            let gender = document.querySelector('input[name="gender"]');

            let genderVal = document.querySelector("input[name='gender']").value;


            fName.value = dataVal.first_name;
            lName.value = dataVal.last_name;
            mobile.value = dataVal.mobile;
            email.value = dataVal.email;

            salaryValue.value = dataVal.salary;
            lnprofile.value = dataVal.profileUrl;

            if (genderVal === 'Male' || genderVal === '') {
                gender.value = "Male";
            } else {
                gender.value = "Female";
            }





            let ageInput = document.querySelector('input[name="age"]'); // Get the input element

            // if (fName && fName.value === "") {
            //     fName.value = dataVal.first_name;
            // }

            // if (lName && lName.value === "") {
            //     lName.value = dataVal.last_name;
            // }


            if (ageInput.value === "") {
                ageInput.value = dataVal.age; // Set default age if empty
            } else if (Number(ageInput.value) >= Number(dataVal.age)) {
                ageInput.value = ageInput.value; // This line is redundant and can be removed
            }








        }
        // LinkedIn ApplicantList From Function: End
    } catch (err) {
        console.error('Failed to read clipboard contents: ', err);
    }
});
// Data Pass Function: End