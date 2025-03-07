(() => {
  const API_URL = "http://localhost:3000/employees";

  document.addEventListener("DOMContentLoaded", () => {
    fetchAndDisplayEmployees();
  });

  function fetchAndDisplayEmployees() {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        const tableBody = document.querySelector("#employeeTable tbody");
        tableBody.innerHTML = ""; // Clear existing data
        data.forEach((employee) => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${employee.id}</td>
            <td>${employee.name}</td>
            <td>${employee.position}</td>
            <td>
              <button onclick="deleteEmployee('${employee.id}')" class="delete-btn">Delete</button>
            </td>
          `;
          tableBody.appendChild(row);
        });
      })
      .catch((error) => console.error("Error fetching employee data:", error));
  }

  window.deleteEmployee = async function (id) {
    if (confirm("Are you sure you want to delete this employee?")) {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          fetchAndDisplayEmployees(); // Refresh the table
        } else {
          throw new Error("Delete failed");
        }
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  window.filterTable = function () {
    const filterInput = document.getElementById("filterInput");
    const filterValue = filterInput.value.toLowerCase();
    const table = document.getElementById("employeeTable");
    const rows = table.getElementsByTagName("tr");

    for (let i = 1; i < rows.length; i++) {
      const cells = rows[i].getElementsByTagName("td");
      let match = false;
      for (let j = 0; j < cells.length; j++) {
        if (cells[j].innerText.toLowerCase().includes(filterValue)) {
          match = true;
          break;
        }
      }
      rows[i].style.display = match ? "" : "none";
    }
  };
})();
