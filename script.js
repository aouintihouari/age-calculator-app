const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1;
const currentDay = currentDate.getDate();

const inputs = document.querySelectorAll(
  "input[data-day], input[data-month], input[data-year]"
);

const headingDay = document.querySelector(".heading-day");
const inputDay = document.querySelector("input[data-day]");
const errorDay = document.querySelector(".error-day");

const headingMonth = document.querySelector(".heading-month");
const inputMonth = document.querySelector("input[data-month]");
const errorMonth = document.querySelector(".error-month");

const headingYear = document.querySelector(".heading-year");
const inputYear = document.querySelector("input[data-year]");
const errorYear = document.querySelector(".error-year");

const calculateButton = document.querySelector(".icon-arrow");

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function has31Days(month) {
  return [1, 3, 5, 7, 8, 10, 12].includes(month);
}

function checkDay(day, month, year) {
  if (
    (day === 31 && !has31Days(month)) ||
    (day === 30 && month === 2) ||
    (day === 29 && month === 2 && !isLeapYear(year))
  ) {
    headingDay.style.color = "#ff5959";
    inputDay.style.border = "1px solid #ff5959";
    inputDay.style.outlineColor = "#ff5959";
    errorDay.style.display = "block";
    errorDay.innerText = "Must be a valid day";
  } else {
    headingDay.style.color = "#716f6f";
    inputDay.style.border = "1px solid #716f6f";
    inputDay.style.outlineColor = "#716f6f";
    errorDay.innerText = "";
  }
}

function checkYear(year, month, day) {
  if (
    isNaN(year) ||
    year > currentYear ||
    (year === currentYear && month > currentMonth) ||
    (year === currentYear && month === currentMonth && day > currentDay)
  ) {
    headingYear.style.color = "#ff5959";
    inputYear.style.border = "1px solid #ff5959";
    inputYear.style.outlineColor = "#ff5959";
    errorYear.style.display = "block";
    errorYear.innerText = "Must be in the past";
  } else {
    headingYear.style.color = "#716f6f";
    inputYear.style.border = "1px solid #716f6f";
    inputYear.style.outlineColor = "#716f6f";
    errorYear.style.display = "none";
    errorYear.innerText = "";
  }
}

inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");

    const dayValue = document.querySelector("input[data-day]").value || "0";
    const monthValue = document.querySelector("input[data-month]").value || "0";
    const yearValue = document.querySelector("input[data-year]").value || "0";

    const day = parseInt(dayValue, 10);
    const month = parseInt(monthValue, 10);
    const year = parseInt(yearValue, 10);

    if (day > 31 || day < 1) {
      headingDay.style.color = "#ff5959";
      inputDay.style.border = "1px solid #ff5959";
      inputDay.style.outlineColor = "#ff5959";
      errorDay.style.display = "block";
      errorDay.innerText = "Must be a valid day";
    } else {
      headingDay.style.color = "#716f6f";
      inputDay.style.border = "1px solid #716f6f";
      inputDay.style.outlineColor = "#716f6f";
      errorDay.style.display = "none";
      errorDay.innerText = "";
      checkDay(day, month, year);
    }

    if (month > 12 || month < 1) {
      headingMonth.style.color = "#ff5959";
      inputMonth.style.border = "1px solid #ff5959";
      inputMonth.style.outlineColor = "#ff5959";
      errorMonth.style.display = "block";
      errorMonth.textContent = "Must be a valid month";
    } else {
      headingMonth.style.color = "#716f6f";
      inputMonth.style.border = "1px solid #716f6f";
      inputMonth.style.outlineColor = "#716f6f";
      errorMonth.style.display = "none";
      errorMonth.textContent = "";
    }

    if (year > currentYear || year < 1900) {
      headingYear.style.color = "#ff5959";
      inputYear.style.border = "1px solid #ff5959";
      inputYear.style.outlineColor = "#ff5959";
      errorYear.style.display = "block";
      errorYear.innerText = "Must be in the past";
    } else {
      headingYear.style.color = "#716f6f";
      inputYear.style.border = "1px solid #716f6f";
      inputYear.style.outlineColor = "#716f6f";
      errorYear.style.display = "none";
      errorYear.innerText = "";
      checkYear(year, month, day);
    }
  });
});

calculateButton.addEventListener("click", () => {
  const day = parseInt(inputDay.value, 10);
  const month = parseInt(inputMonth.value, 10);
  const year = parseInt(inputYear.value, 10);
  if (!day || !month || !year) {
    inputs.forEach((input) => {
      const errorMessage = input.nextElementSibling;
      const label = input.previousElementSibling;
      if (input.value.trim() === "") {
        label.style.color = "#ff5959";
        errorMessage.style.display = "block";
        errorMessage.innerText = "This field is required";
        input.style.border = "1px solid #ff5959";
        input.style.outlineColor = "#ff5959";
      }
    });
    return;
  }
  let birthDate = new Date(year, month - 1, day);
  let today = new Date();
  let ageYears = today.getFullYear() - birthDate.getFullYear();
  let ageMonths = today.getMonth() - birthDate.getMonth();
  let ageDays = today.getDate() - birthDate.getDate();
  if (ageDays < 0) {
    let prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    ageDays += prevMonth.getDate();
    ageMonths--;
  }
  if (ageMonths < 0) {
    ageMonths += 12;
    ageYears--;
  }
  document.querySelector(".day").innerText = ageDays;
  document.querySelector(".month").innerText = ageMonths;
  document.querySelector(".year").innerText = ageYears;
});
