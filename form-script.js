(() => {
  const API_URL = "http://localhost:3000/employees";

  /**
   * TODO:
   * - Add a function to generate random string (10 digits alphanumeric) for id
   * - Add a function to add new data (submit)
   * - Add a function to redirect to the index page
   */
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("employeeForm");

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const name = document.getElementById("name").value;
      const position = document.getElementById("position").value;

      const newEmployee = {
        id: generateRandomId(),
        name,
        position,
      };

      try {
        const response = await fetch("http://localhost:3000/employees", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newEmployee),
        });

        if (response.ok) {
          window.location.href = "index.html"; // Redirect to index page
        } else {
          throw new Error("Failed to add employee");
        }
      } catch (error) {
        console.error("Error adding employee:", error);
      }
    });

    function generateRandomId() {
      return Math.random().toString(36).substr(2, 10);
    }
  });
})();
