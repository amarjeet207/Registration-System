const form = document.querySelector("#student-form");
const recordsList = document.querySelector("#records-list");

//taking form values into variables
const stdName = form["studentName"];
const stdId = form["studentId"];
const stdEmail = form["emailId"];
const stdContact = form["contactNo"];

const students = JSON.parse(localStorage.getItem("students")) || [];
console.log(students);

//function for adding student
const addingStudent = (name, id, email, contact) => {
  const student = { name, id, email, contact };
  students.push(student);

  localStorage.setItem("students", JSON.stringify(students));

  return student;
};

//function for creating a student record
function creatingStudent(student, index) {
  const record = document.createElement("div");
  record.classList.add("record");

  const studentName = document.createElement("span");
  const studentId = document.createElement("span");
  const studentEmail = document.createElement("span");
  const studentContact = document.createElement("span");
  const delButton = document.createElement("span");
  const editButton = document.createElement("span");

  //taking values from students array into variables
  studentName.innerHTML = `<b>Name:</b>  ${student.name}`;
  studentId.innerHTML = `<b>ID:</b>  ${student.id}`;
  studentEmail.innerHTML = `<b>Email:</b>  ${student.email}`;
  studentContact.innerHTML = `<b>Contact No:</b>  ${student.contact}`;
  delButton.innerText = "Delete";
  editButton.innerText = "Edit";

  delButton.classList.add("bttn");
  editButton.classList.add("bttn");

  // Delete button functionality
  delButton.onclick = () => {
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    recordsList.removeChild(record);
  };

  // Edit button functionality
  editButton.onclick = () => {
    stdName.value = student.name;
    stdId.value = student.id;
    stdEmail.value = student.email;
    stdContact.value = student.contact;
    // Remove the current student from the list
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    recordsList.removeChild(record);
  };

  // appending variables into record and records into records list
  record.append(
    studentName,
    studentId,
    studentEmail,
    studentContact,
    delButton,
    editButton
  );
  recordsList.appendChild(record);
}

//calling create function for every student
students.forEach(creatingStudent);

//onsubmit
form.onsubmit = (e) => {
  e.preventDefault();

  //Validating input fields
  if (!stdName.value || !stdId.value || !stdEmail.value || !stdContact.value) {
    alert("Empty input fields are not allowed!");
    return;
  }

  if (!/^[a-zA-Z\s]+$/.test(stdName.value)) {
    alert("Name should contain only letters.");
    return;
  }

  if (!/^\d+$/.test(stdId.value)) {
    alert("Student ID should contain only numbers.");
    return;
  }

  if (!/^\d+$/.test(stdContact.value)) {
    alert("Contact number should contain only numbers.");
    return;
  }

  if (!/\S+@\S+\.\S+/.test(stdEmail.value)) {
    alert("Please enter a valid email address.");
    return;
  }

  const newStudent = addingStudent(
    stdName.value,
    stdId.value,
    stdEmail.value,
    stdContact.value
  );

  creatingStudent(newStudent, students.length - 1);
  stdName.value = "";
  stdId.value = "";
  stdEmail.value = "";
  stdContact.value = "";
};
