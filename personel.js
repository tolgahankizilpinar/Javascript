let personelList = [];

function save(event) {
    event.preventDefault();
    const firstNameInputElement = document.getElementById("firstName");
    const lastNameInputElement = document.getElementById("lastName");
    const professionInputElement = document.getElementById("profession");
    const startDateInputElement = document.getElementById("startDate");
    const salaryInputElement = document.getElementById("salary");

    const data = {
        firstName: firstNameInputElement.value,
        lastName: lastNameInputElement.value,
        profession: professionInputElement.value,
        startDate: startDateInputElement.value,
        salary: salaryInputElement.value
    }

    personelList.push(data);

    setPersonelListToTable();

    firstNameInputElement.value = "";
    lastNameInputElement.value = "";
    professionInputElement.value = "";
    startDateInputElement.value = "2024-03-27";
    salaryInputElement.value = "17002";

    firstNameInputElement.focus();
}


function setPersonelListToTable() {
    debugger
    const tbodyElement = document.querySelector("tbody");

    personelList = personelList.sort((a, b) => a.firstName.localeCompare(b.firstName)); // sort for first name (A-Z)

    let value = "";

    for (const index in personelList) {
        value += `  <tr>
        <td>${+index + 1}</td>
        <td>${personelList[index].firstName}</td>
        <td>${personelList[index].lastName}</td>
        <td>${personelList[index].profession}</td>
        <td>${personelList[index].startDate}</td>
        <td>${personelList[index].salary}</td>
        <td>
            <button class="btn btn-sm btn-outline-primary">Update</button>
            <button class="btn btn-sm btn-outline-danger">Delete</button>
        </td>
    </tr>`
    }

    tbodyElement.innerHTML = value;    
}