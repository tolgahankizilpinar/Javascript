let personelList = [
    {
        firstName: "Tolgahan",
        lastName: "kizilpinar",
        profession: "Back-End Developer",
        startDate: "2023-05-17",
        salary: "20000"
    }, 
    {
        firstName: "Tolgahan",
        lastName: "kizilpinar",
        profession: "Back-End Developer",
        startDate: "2023-05-17",
        salary: "20000"
    }, 
    {
        firstName: "Tolgahan",
        lastName: "kizilpinar",
        profession: "Back-End Developer",
        startDate: "2023-05-17",
        salary: "20000"
    }
];


let updateIndex = -1;

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

    showToast("Personnel is added succesfuly");
}


function setPersonelListToTable() {
    const tbodyElement = document.querySelector("tbody");

    personelList = personelList.sort((a, b) => a.firstName.localeCompare(b.firstName)); // sort for first name (A-Z)

    let value = "";

    for (const index in personelList) {

        const date = new Date(personelList[index].startDate);
        const newDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;

        const salary = formatSalary(personelList[index].salary.replace(",", "."));

        value += `  <tr>
        <td>${+index + 1}</td>
        <td>${personelList[index].firstName}</td>
        <td>${personelList[index].lastName}</td>
        <td>${personelList[index].profession}</td>
        <td>${newDate}</td>
        <td>${salary}</td>
        <td>
            <button onclick="showUpdateForm('${index}')" class="btn btn-sm btn-outline-primary"><i class="fa-solid fa-edit"></i>Update</button>
            <button class="btn btn-sm btn-outline-danger" 
                onclick="deleteByIndex('${index}')">
                <i class="fa-solid fa-trash"></i>Delete
            </button>
        </td>
    </tr>`
    }

    tbodyElement.innerHTML = value;
}

function deleteByIndex(index) {
    const personel = personelList[index];
    Swal.fire({
        title: 'Delete?',
        text: `Do you want to delete ${personel.firstName} ${personel.lastName}?`,
        icon: 'question', // info, success, error, question, warning
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        showCancelButton: true
    }).then((val) => {
        if (val.isConfirmed) {
            personelList.splice(index, 1);
            setPersonelListToTable();

            showToast("Personnel record has been deleted", "info");
        }
    })

    // const result = confirm("Do you want to delete this record?");
    // if(result){
    //     personelList.splice(index, 1);
    //     setPersonelListToTable();
    // }
}

function formatSalary(salaryString) {
    const salaryNumber = +salaryString;

    const formatter = new Intl.NumberFormat('tr-TR', {
        style: "currency",
        currency: "TRY",
        minimumFractionDigits: 2
    });

    return formatter.format(salaryNumber);
}


function showToast(message, icon = "success") {
    const Toast = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 3000
    });
    Toast.fire(message, "", icon);
}

function showOrHideAddPersonnelForm() {
    const el = document.getElementById("addPersonnelForm");
    if (el !== null) {
        if (el.style.display === "flex") {
            el.style.display = "none";

            const btnEl = document.getElementById("addPersonnelBtnDiv");
            if (btnEl !== null) {
                btnEl.style.display = "initial";
            }
        }
        else{
            el.style.display = "flex";

            const btnEl = document.getElementById("addPersonnelBtnDiv");
            if (btnEl !== null) {
                btnEl.style.display = "flex";
            }
        }
    }
}


function showUpdateForm(index){
    const personel = personelList[index];
    updateIndex = index;
    const el = document.getElementById("updatePersonnelForm");
    const elAdd = document.getElementById("addPersonnelForm");
    if(el !== null){
        el.style.display = "flex";

        const addBtnEl = document.getElementById("addPersonnelBtnDiv");
        addBtnEl.style.display = "none";

        const firstNameEl = document.getElementById("updateFirstName");
        firstNameEl.value = personel.firstName;

        const lastNameEl = document.getElementById("updateLastName");
        lastNameEl.value = personel.lastName;

        const professionEl = document.getElementById("updateProfession");
        professionEl.value = personel.profession;

        const StartDateEl = document.getElementById("updateStartDate");
        StartDateEl.value = personel.startDate;

        const SalaryEl = document.getElementById("updateSalary");
        SalaryEl.value = personel.salary;

        elAdd.style.display = "none";
    }
}

function update(event){
    event.preventDefault();
    const personel = personelList[updateIndex];

    const firstNameEl = document.getElementById("updateFirstName");
    const lastNameEl = document.getElementById("updateLastName");
    const professionEl = document.getElementById("updateProfession");
    const StartDateEl = document.getElementById("updateStartDate");
    const SalaryEl = document.getElementById("updateSalary");

    personel.firstName = firstNameEl.value;
    personel.lastName = lastNameEl.value;
    personel.profession = professionEl.value;
    personel.startDate = StartDateEl.value;
    personel.salary = SalaryEl.value;

    setPersonelListToTable();
    closeUpdateForm();
    updateIndex = -1;
    showToast("Personnel is updated successfully.","info");
}

function closeUpdateForm(){
    const el = document.getElementById("updatePersonnelForm");
    if(el !== null){
        el.style.display = "none";
    }
}