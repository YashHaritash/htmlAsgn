const infoForm = document.getElementById("infoForm");
const tableWrapper = document.getElementById("tableWrapper");
const techHeader = document.getElementById("techHeader");
const techDropdown = document.getElementById("techDropdown");
const selectPlaceholder = techHeader.querySelector(".select-placeholder");
const arrow = techHeader.querySelector(".arrow");

techHeader.addEventListener("click", () => {
  techDropdown.classList.toggle("open");
  arrow.classList.toggle("open");
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".custom-multi-select")) {
    techDropdown.classList.remove("open");
    arrow.classList.remove("open");
  }
});

const techCheckboxes = document.querySelectorAll('input[name="tech"]');
techCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", updatePlaceholder);
});

function updatePlaceholder() {
  const selected = Array.from(techCheckboxes)
    .filter((cb) => cb.checked)
    .map((cb) => cb.value);

  if (selected.length === 0) {
    selectPlaceholder.textContent = "Select technologies";
    selectPlaceholder.classList.remove("has-selections");
  } else if (selected.length === 1) {
    selectPlaceholder.textContent = selected[0];
    selectPlaceholder.classList.add("has-selections");
  } else {
    selectPlaceholder.textContent = `${selected.length} technologies selected`;
    selectPlaceholder.classList.add("has-selections");
  }
}

infoForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(infoForm);
  const data = Object.fromEntries(formData.entries());

  const selectedTech = Array.from(techCheckboxes)
    .filter((cb) => cb.checked)
    .map((cb) => cb.value);

  let tableHTML = `
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Phone</th>
                    <th>Country</th>
                    <th>Gender</th>
                    <th>Tech Stack</th>
                    <th>Address</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>${data.name}</td>
                    <td>${data.email}</td>
                    <td>${data.age}</td>
                    <td>${data.phone}</td>
                    <td>${data.country}</td>
                    <td>${data.gender}</td>
                    <td>${selectedTech.join(", ")}</td>
                    <td>${data.address}</td>
                </tr>
            </tbody>
        </table>
    `;

  tableWrapper.innerHTML = tableHTML;
});

infoForm.addEventListener("reset", () => {
  tableWrapper.innerHTML = "";
  updatePlaceholder();
});
