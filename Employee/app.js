const apiUrl = 'http://localhost:3000/api/employees';

const employeeForm = document.getElementById('employeeForm');
const nameInput = document.getElementById('name');
const positionInput = document.getElementById('position');
const salaryInput = document.getElementById('salary');
const ageInput = document.getElementById('age');
const employeeTableBody = document.getElementById('employeeTableBody');

const fetchEmployees = async () => {
    const response = await fetch(apiUrl);
    const employees = await response.json();
    displayEmployees(employees);
};

const displayEmployees = (employees) => {
    employeeTableBody.innerHTML = '';
    employees.forEach(employee => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${employee.name}</td>
            <td>${employee.position}</td>
            <td>${employee.salary}</td>
            <td>${employee.age}</td>
            <td><button class="delete" onclick="deleteEmployee(${employee.id})">Delete</button></td>
        `;
        employeeTableBody.appendChild(row);
    });
};

employeeForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const newEmployee = {
        name: nameInput.value,
        position: positionInput.value,
        salary: parseFloat(salaryInput.value),
        age: parseInt(ageInput.value)
    };

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEmployee)
    });

    const employee = await response.json();
    displayEmployees([employee]);
    fetchEmployees();
});

const deleteEmployee = async (id) => {
    const response = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        fetchEmployees();
    }
};

fetchEmployees();
