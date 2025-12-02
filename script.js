// Global variables
let baseSession = null;
let currentDepartment = "cse"; // 'cse' or 'other'
let gradeDistributionChart = null; // Chart.js instance

// Custom Modal Functions
function showConfirmModal(title, message, confirmText = 'Confirm', cancelText = 'Cancel', isDanger = false) {
	return new Promise((resolve) => {
		const overlay = document.createElement('div');
		overlay.className = 'custom-modal-overlay';
		
		const modal = document.createElement('div');
		modal.className = 'custom-modal';
		
		modal.innerHTML = `
			<div class="custom-modal-header">
				<div class="custom-modal-icon modal-icon-warning">⚠️</div>
				<h3 class="custom-modal-title">${title}</h3>
			</div>
			<div class="custom-modal-body">
				<p class="custom-modal-message">${message}</p>
			</div>
			<div class="custom-modal-footer">
				<button class="modal-btn modal-btn-cancel" id="modalCancel">${cancelText}</button>
				<button class="modal-btn ${isDanger ? 'modal-btn-danger' : 'modal-btn-confirm'}" id="modalConfirm">${confirmText}</button>
			</div>
		`;
		
		overlay.appendChild(modal);
		document.body.appendChild(overlay);
		
		const confirmBtn = modal.querySelector('#modalConfirm');
		const cancelBtn = modal.querySelector('#modalCancel');
		
		const cleanup = () => {
			overlay.style.opacity = '0';
			setTimeout(() => {
				document.body.removeChild(overlay);
			}, 200);
		};
		
		confirmBtn.onclick = () => {
			cleanup();
			resolve(true);
		};
		
		cancelBtn.onclick = () => {
			cleanup();
			resolve(false);
		};
		
		overlay.onclick = (e) => {
			if (e.target === overlay) {
				cleanup();
				resolve(false);
			}
		};
	});
}

function showSuccessModal(title, message) {
	return new Promise((resolve) => {
		const overlay = document.createElement('div');
		overlay.className = 'custom-modal-overlay';
		
		const modal = document.createElement('div');
		modal.className = 'custom-modal';
		
		modal.innerHTML = `
			<div class="custom-modal-header">
				<div class="custom-modal-icon modal-icon-success">✅</div>
				<h3 class="custom-modal-title">${title}</h3>
			</div>
			<div class="custom-modal-body">
				<p class="custom-modal-message">${message}</p>
			</div>
			<div class="custom-modal-footer">
				<button class="modal-btn modal-btn-ok" id="modalOk">OK</button>
			</div>
		`;
		
		overlay.appendChild(modal);
		document.body.appendChild(overlay);
		
		const okBtn = modal.querySelector('#modalOk');
		
		const cleanup = () => {
			overlay.style.opacity = '0';
			setTimeout(() => {
				document.body.removeChild(overlay);
			}, 200);
		};
		
		okBtn.onclick = () => {
			cleanup();
			resolve(true);
		};
		
		overlay.onclick = (e) => {
			if (e.target === overlay) {
				cleanup();
				resolve(true);
			}
		};
	});
}

// Change department and regenerate semesters
function changeDepartment() {
	const deptSelect = document.getElementById("departmentSelect");
	currentDepartment = deptSelect.value;
	generateAllSemesters();
	calculateCGPA();
}

// Get courses for a semester based on department
function getCoursesForSemester(semNum) {
	if (currentDepartment === "cse") {
		return sampleCourses[semNum] || [];
	} else {
		// For other departments, return 10 generic courses
		const courses = [];
		for (let i = 1; i <= 10; i++) {
			courses.push({
				code: "",
				name: `Course ${i}`,
				credit: 3.0,
			});
		}
		return courses;
	}
}

// Update session based on roll number
function updateSessionFromRoll() {
	const rollInput = document.getElementById("studentRoll");
	const roll = rollInput.value.trim();

	if (roll.length >= 2) {
		const firstTwoDigits = roll.substring(0, 2);
		const year = parseInt(firstTwoDigits);

		if (!isNaN(year)) {
			const fullYear = 2000 + year;
			baseSession = `${fullYear}-${fullYear + 1}`;
			document.getElementById("detectedSession").textContent = baseSession;

			// Regenerate all semesters with new session
			generateAllSemesters();
		}
	} else {
		baseSession = null;
		document.getElementById("detectedSession").textContent = "-";
	}
}

// Get session for a specific semester
function getSessionForSemester(semNum) {
	if (!baseSession) {
		return "-";
	}

	const baseYear = parseInt(baseSession.split("-")[0]);
	const yearOffset = Math.floor((semNum - 1) / 2);
	const sessionStartYear = baseYear + yearOffset;

	return `${sessionStartYear}-${sessionStartYear + 1}`;
}

// KUET CSE-22 Syllabus Course Structure (Complete 8 Semesters)
const sampleCourses = {
	1: [
		// 1st Year 1st Term
		{ code: "CSE 1101", name: "Structured Programming", credit: 3.0 },
		{
			code: "CSE 1102",
			name: "Structured Programming Laboratory",
			credit: 1.5,
		},
		{ code: "CSE 1107", name: "Discrete Mathematics", credit: 3.0 },
		{ code: "PHY 1107", name: "Physics", credit: 3.0 },
		{ code: "PHY 1108", name: "Physics Laboratory", credit: 1.5 },
		{
			code: "MATH 1107",
			name: "Differential and Integral Calculus",
			credit: 3.0,
		},
		{ code: "HUM 1107", name: "English and Human Communication", credit: 3.0 },
		{
			code: "HUM 1108",
			name: "English and Human Communication Laboratory",
			credit: 0.75,
		},
	],
	2: [
		// 1st Year 2nd Term
		{ code: "CSE 1203", name: "Digital Logic Design", credit: 3.0 },
		{ code: "CSE 1204", name: "Digital Logic Design Laboratory", credit: 1.5 },
		{ code: "CSE 1205", name: "Object Oriented Programming", credit: 3.0 },
		{
			code: "CSE 1206",
			name: "Object Oriented Programming Laboratory",
			credit: 1.5,
		},
		{ code: "CHEM 1207", name: "Chemistry", credit: 3.0 },
		{ code: "CHEM 1208", name: "Chemistry Laboratory", credit: 0.75 },
		{ code: "EEE 1207", name: "Basic Electrical Engineering", credit: 3.0 },
		{
			code: "EEE 1208",
			name: "Basic Electrical Engineering Laboratory",
			credit: 1.5,
		},
		{
			code: "MATH 1207",
			name: "Coordinate Geometry and Differential Equations",
			credit: 3.0,
		},
	],
	3: [
		// 2nd Year 1st Term
		{
			code: "CSE 2103",
			name: "Microprocessors and Microcontrollers",
			credit: 3.0,
		},
		{
			code: "CSE 2104",
			name: "Microprocessors and Microcontrollers Laboratory",
			credit: 1.5,
		},
		{ code: "CSE 2105", name: "Data Structures and Algorithms", credit: 3.0 },
		{
			code: "CSE 2106",
			name: "Data Structures and Algorithms Laboratory",
			credit: 1.5,
		},
		{ code: "CSE 2113", name: "Computer Architecture", credit: 3.0 },
		{
			code: "CSE 2114",
			name: "Computer Architecture Laboratory",
			credit: 0.75,
		},
		{ code: "EEE 2117", name: "Analog Electronics", credit: 3.0 },
		{ code: "EEE 2118", name: "Analog Electronics Laboratory", credit: 0.75 },
		{
			code: "MATH 2107",
			name: "Fourier Analysis and Linear Algebra",
			credit: 3.0,
		},
		{ code: "ME 2170", name: "Computer Aided Design Laboratory", credit: 0.75 },
	],
	4: [
		// 2nd Year 2nd Term
		{ code: "CSE 2200", name: "Advanced Programming Laboratory", credit: 1.5 },
		{ code: "CSE 2201", name: "Algorithm Analysis and Design", credit: 3.0 },
		{
			code: "CSE 2202",
			name: "Algorithm Analysis and Design Laboratory",
			credit: 1.5,
		},
		{ code: "CSE 2208", name: "Numerical Methods Laboratory", credit: 1.5 },
		{ code: "CSE 2209", name: "Theory of Computation", credit: 2.0 },
		{ code: "ECE 2213", name: "Digital Electronics", credit: 3.0 },
		{ code: "ECE 2214", name: "Digital Electronics Laboratory", credit: 1.5 },
		{ code: "HUM 2207", name: "Economics and Accounting", credit: 3.0 },
		{
			code: "MATH 2207",
			name: "Complex Variable, Vector Analysis and Statistics",
			credit: 3.0,
		},
	],
	5: [
		// 3rd Year 1st Term
		{ code: "CSE 3100", name: "Web Programming Laboratory", credit: 1.5 },
		{ code: "CSE 3101", name: "Operating Systems", credit: 3.0 },
		{ code: "CSE 3102", name: "Operating Systems Laboratory", credit: 1.5 },
		{
			code: "CSE 3105",
			name: "Embedded Systems and Internet of Things",
			credit: 3.0,
		},
		{
			code: "CSE 3106",
			name: "Embedded Systems and Internet of Things Laboratory",
			credit: 0.75,
		},
		{
			code: "CSE 3107",
			name: "Applied Statistics and Queuing Theory",
			credit: 3.0,
		},
		{ code: "CSE 3109", name: "Database Systems", credit: 3.0 },
		{ code: "CSE 3110", name: "Database Systems Laboratory", credit: 1.5 },
		{ code: "CSE 3119", name: "Information Systems Design", credit: 3.0 },
		{
			code: "CSE 3120",
			name: "Information Systems Design Laboratory",
			credit: 0.75,
		},
	],
	6: [
		// 3rd Year 2nd Term
		{ code: "CSE 3200", name: "System Development Project", credit: 1.5 },
		{ code: "CSE 3209", name: "Artificial Intelligence", credit: 3.0 },
		{
			code: "CSE 3210",
			name: "Artificial Intelligence Laboratory",
			credit: 1.5,
		},
		{ code: "CSE 3211", name: "Compiler Design", credit: 3.0 },
		{ code: "CSE 3212", name: "Compiler Design Laboratory", credit: 0.75 },
		{ code: "CSE 3217", name: "Mobile Computing", credit: 3.0 },
		{ code: "CSE 3218", name: "Mobile Computing Laboratory", credit: 0.75 },
		{
			code: "CSE 3219",
			name: "Software Engineering and Project Management",
			credit: 3.0,
		},
		{
			code: "CSE 3220",
			name: "Software Engineering and Project Management Laboratory",
			credit: 0.75,
		},
		{ code: "CSE 3230", name: "Technical Writing and Seminar", credit: 0.75 },
		{ code: "HUM 3247", name: "Engineers and Society", credit: 3.0 },
	],
	7: [
		// 4th Year 1st Term
		{ code: "CSE 4000", name: "Capstone Project/Thesis", credit: 1.5 },
		{
			code: "CSE 4101",
			name: "Computer Graphics and Image Processing",
			credit: 3.0,
		},
		{
			code: "CSE 4102",
			name: "Computer Graphics and Image Processing Laboratory",
			credit: 0.75,
		},
		{ code: "CSE 4105", name: "Computer Networks", credit: 3.0 },
		{ code: "CSE 4106", name: "Computer Networks Laboratory", credit: 1.5 },
		{ code: "CSE 4115", name: "Computer Security", credit: 3.0 },
		{ code: "CSE 4116", name: "Computer Security Laboratory", credit: 0.75 },
		{ code: "CSE xxxx", name: "Optional-I Course (Theory)", credit: 3.0 },
		{ code: "CSE xxxx", name: "Optional-I Course (Lab)", credit: 0.75 },
		{ code: "CSE xxxx", name: "Optional-I Course (Theory)", credit: 3.0 },
		{ code: "CSE xxxx", name: "Optional-I Course (Lab)", credit: 0.75 },
	],
	8: [
		// 4th Year 2nd Term
		{
			code: "CSE 4000",
			name: "Capstone Project/Thesis (Continuation)",
			credit: 3.0,
		},
		{ code: "CSE xxxx", name: "Optional-II Course", credit: 3.0 },
		{ code: "CSE xxxx", name: "Optional-II Course", credit: 3.0 },
		{ code: "CSE xxxx", name: "Optional-III Course (Theory)", credit: 3.0 },
		{ code: "CSE xxxx", name: "Optional-III Course (Lab)", credit: 0.75 },
		{ code: "IEM 4227", name: "Industrial Management", credit: 3.0 },
		{ code: "HUM 4207", name: "Entrepreneurship Development", credit: 2.0 },
	],
};

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
	generateAllSemesters();
	attachEventListeners();
	loadSavedData();
	initGradeDistributionChart();
	calculateCGPA();
});

// Generate all 8 semesters
function generateAllSemesters() {
	const container = document.getElementById("allSemesters");
	console.log("generateAllSemesters called, container:", container);
	container.innerHTML = "";

	for (let i = 1; i <= 8; i++) {
		const year = Math.ceil(i / 2);
		const term = i % 2 === 1 ? "1st" : "2nd";
		const semesterDiv = createSemesterBlock(i, year, term);
		console.log(`Semester ${i} created:`, semesterDiv);
		container.appendChild(semesterDiv);
	}
	console.log(
		"All semesters generated, container children:",
		container.children.length
	);
}

// Create semester block with courses
function createSemesterBlock(semNum, year, term) {
	console.log(`createSemesterBlock called for semester ${semNum}`);
	const div = document.createElement("div");
	div.className = "semester-block";
	div.id = `semester-${semNum}`;

	let coursesHTML = "";
	const courses = getCoursesForSemester(semNum);
	console.log(`Semester ${semNum} has ${courses.length} courses`);

	courses.forEach((course, idx) => {
		coursesHTML += `
            <tr class="course-row">
                <td class="sl-no">${idx + 1}</td>
                <td><input type="text" class="course-code" value="${
									course.code
								}" placeholder="Code" oninput="autoSaveData()"></td>
                <td><input type="text" class="course-name" value="${
									course.name
								}" placeholder="Course Name" oninput="autoSaveData()"></td>
                <td><input type="number" class="course-credit" value="${
									course.credit
								}" min="0" max="6" step="0.75" oninput="calculateCGPA()"></td>
                <td>
                    <select class="course-grade-current" onchange="updateGradePoint(this); syncExpectedGrade(this)">
                        <option value="">-</option>
                        <option value="4.00">A+</option>
                        <option value="3.75">A</option>
                        <option value="3.50">A-</option>
                        <option value="3.25">B+</option>
                        <option value="3.00">B</option>
                        <option value="2.75">B-</option>
                        <option value="2.50">C+</option>
                        <option value="2.25">C</option>
                        <option value="2.00">D</option>
                        <option value="0.00">F</option>
                    </select>
                </td>
                <td class="grade-point">-</td>
                <td>
                    <select class="course-grade-expected" onchange="calculateCGPA()">
                        <option value="">-</option>
                        <option value="4.00">A+</option>
                        <option value="3.75">A</option>
                        <option value="3.50">A-</option>
                        <option value="3.25">B+</option>
                        <option value="3.00">B</option>
                        <option value="2.75">B-</option>
                        <option value="2.50">C+</option>
                        <option value="2.25">C</option>
                        <option value="2.00">D</option>
                        <option value="0.00">F</option>
                    </select>
                </td>
                <td><button class="remove-course-btn" onclick="removeCourse(this)">×</button></td>
            </tr>
        `;
	});

	const session = getSessionForSemester(semNum);
	const yearText =
		year === 1
			? "First"
			: year === 2
			? "Second"
			: year === 3
			? "Third"
			: "Fourth";
	const termText = term === "1st" ? "First" : "Second";

	div.innerHTML = `
        <div class="semester-header-block">
            <div class="semester-info">
                <span><strong>Session:</strong> ${session}</span>
                <span><strong>Year:</strong> ${yearText}</span>
                <span><strong>Term:</strong> ${termText}</span>
            </div>
        </div>
        <div class="courses-table-container">
            <table class="courses-table">
                <thead>
                    <tr>
                        <th>Sl. No.</th>
                        <th>Course No.</th>
                        <th>Course Title</th>
                        <th>Credit</th>
                        <th>Letter Grade</th>
                        <th>Grade Point</th>
                        <th>Expected Letter Grade</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    ${coursesHTML}
                </tbody>
            </table>
        </div>
        <div class="semester-summary">
            <div class="summary-row">
                <span><strong>Credit Taken:</strong> 0.00</span>
                <span><strong>Credit Completed:</strong> 0.00</span>
                <span><strong>Term GPA:</strong> -</span>
                <span><strong>Expected Term GPA:</strong> -</span>
            </div>
            <div class="summary-row">
                <span><strong>Total Credit Completed:</strong> 0.00</span>
                <span><strong>CGPA:</strong> 0.00</span>
            </div>
        </div>
        <div class="semester-actions">
            <button class="add-course-btn-sem" onclick="addCourse(${semNum})">+ Add Course</button>
            <button class="reset-semester-btn" onclick="resetSemesterToDefault(${semNum})">🔄 Reset to Default</button>
        </div>
        
        <!-- Target Calculator for This Semester -->
        <div class="semester-target" id="semester-target-${semNum}" style="display:none;">
            <h4>📊 Target Calculator for Remaining Courses</h4>
            <div class="semester-target-inputs">
                <label>Expected CGPA After This Semester:</label>
                <input type="number" id="target-cgpa-sem-${semNum}" min="0" max="4" step="0.01" placeholder="e.g., 3.50" oninput="calculateSemesterTarget(${semNum})">
            </div>
            <div class="semester-target-result" id="target-result-sem-${semNum}"></div>
        </div>
        <button class="toggle-target-btn" onclick="toggleSemesterTarget(${semNum})">📈 Show/Hide Target Calculator</button>
    `;

	return div;
}

// Add course to semester
function addCourse(semNum) {
	const semester = document.getElementById(`semester-${semNum}`);
	const tbody = semester.querySelector("tbody");
	const rowCount = tbody.querySelectorAll(".course-row").length;

	// Add to table
	const newRow = document.createElement("tr");
	newRow.className = "course-row";
	newRow.innerHTML = `
        <td class="sl-no">${rowCount + 1}</td>
        <td><input type="text" class="course-code" placeholder="Code" oninput="autoSaveData()"></td>
        <td><input type="text" class="course-name" placeholder="Course Name" oninput="autoSaveData()"></td>
        <td><input type="number" class="course-credit" min="0" max="6" step="0.75" value="3.0" oninput="calculateCGPA()"></td>
        <td>
            <select class="course-grade-current" onchange="updateGradePoint(this); syncExpectedGrade(this)">
                <option value="">-</option>
                <option value="4.00">A+</option>
                <option value="3.75">A</option>
                <option value="3.50">A-</option>
                <option value="3.25">B+</option>
                <option value="3.00">B</option>
                <option value="2.75">B-</option>
                <option value="2.50">C+</option>
                <option value="2.25">C</option>
                <option value="2.00">D</option>
                <option value="0.00">F</option>
            </select>
        </td>
        <td class="grade-point">-</td>
        <td>
            <select class="course-grade-expected" onchange="calculateCGPA()">
                <option value="">-</option>
                <option value="4.00">A+</option>
                <option value="3.75">A</option>
                <option value="3.50">A-</option>
                <option value="3.25">B+</option>
                <option value="3.00">B</option>
                <option value="2.75">B-</option>
                <option value="2.50">C+</option>
                <option value="2.25">C</option>
                <option value="2.00">D</option>
                <option value="0.00">F</option>
            </select>
        </td>
        <td><button class="remove-course-btn" onclick="removeCourse(this)">×</button></td>
    `;
	tbody.appendChild(newRow);

	renumberRows(semNum);
}

// Remove course
async function removeCourse(btn) {
	const row = btn.closest("tr");
	const semester = btn.closest(".semester-block");
	const semNum = semester.id.replace("semester-", "");

	if (row) {
		const tbody = row.parentElement;
		if (tbody.children.length > 1) {
			const courseName = row.querySelector('.course-name').value || 'this course';
			const confirmed = await showConfirmModal(
				'Delete Course?',
				`Are you sure you want to delete "${courseName}"?`,
				'Delete',
				'Cancel',
				true
			);
			
			if (confirmed) {
				row.remove();
				renumberRows(parseInt(semNum));
				calculateCGPA();
			}
		} else {
			showSuccessModal('Cannot Delete', 'At least one course is required per semester!');
		}
	}
}

// Renumber serial numbers after add/remove
function renumberRows(semNum) {
	const semester = document.getElementById(`semester-${semNum}`);
	const rows = semester.querySelectorAll(".course-row");

	rows.forEach((row, idx) => {
		const slNoCell = row.querySelector(".sl-no");
		if (slNoCell) {
			slNoCell.textContent = idx + 1;
		}
	});
}

// Update grade point display when letter grade is selected
function updateGradePoint(selectElement) {
	const row = selectElement.closest("tr");
	const gradePoint = parseFloat(selectElement.value);
	const gradeText = !isNaN(gradePoint) ? gradePoint.toFixed(2) : "-";

	if (row) {
		const gradePointCell = row.querySelector(".grade-point");
		if (gradePointCell) {
			gradePointCell.textContent = gradeText;
		}
	}

	calculateCGPA();
}

// Sync expected grade with current grade
function syncExpectedGrade(selectElement) {
	const row = selectElement.closest("tr");

	if (row) {
		const expectedGradeSelect = row.querySelector(".course-grade-expected");
		if (expectedGradeSelect) {
			expectedGradeSelect.value = selectElement.value;
		}
	}
}

// Toggle semester target calculator
function toggleSemesterTarget(semNum) {
	const targetDiv = document.getElementById(`semester-target-${semNum}`);
	if (targetDiv.style.display === "none") {
		targetDiv.style.display = "block";
	} else {
		targetDiv.style.display = "none";
	}
}

// Calculate required grades for semester target (dynamic - no button)
function calculateSemesterTarget(semNum) {
	const targetCGPA = parseFloat(
		document.getElementById(`target-cgpa-sem-${semNum}`).value
	);

	const resultDiv = document.getElementById(`target-result-sem-${semNum}`);
	
	if (!targetCGPA || targetCGPA < 0 || targetCGPA > 4) {
		resultDiv.innerHTML = "";
		return;
	}

	// Calculate current CGPA up to previous semester
	let totalPointsBefore = 0;
	let totalCreditsBefore = 0;

	for (let i = 1; i < semNum; i++) {
		const semester = document.getElementById(`semester-${i}`);
		const rows = semester.querySelectorAll(".course-row");

		rows.forEach((row) => {
			const credit = parseFloat(row.querySelector(".course-credit").value) || 0;
			const currentGrade = parseFloat(
				row.querySelector(".course-grade-current").value
			);

			if (!isNaN(currentGrade)) {
				totalPointsBefore += credit * currentGrade;
				totalCreditsBefore += credit;
			}
		});
	}

	// Get current semester credits (from courses without grades)
	const currentSemester = document.getElementById(`semester-${semNum}`);
	const currentRows = currentSemester.querySelectorAll(".course-row");
	let semesterCredits = 0;
	let gradedCredits = 0;
	let gradedPoints = 0;

	currentRows.forEach((row) => {
		const credit = parseFloat(row.querySelector(".course-credit").value) || 0;
		const currentGrade = parseFloat(
			row.querySelector(".course-grade-current").value
		);

		semesterCredits += credit;

		if (!isNaN(currentGrade)) {
			gradedCredits += credit;
			gradedPoints += credit * currentGrade;
		}
	});

	const remainingCredits = semesterCredits - gradedCredits;

	if (remainingCredits <= 0) {
		resultDiv.innerHTML = `
			<div class="target-achieved">
				<h4>✅ All courses graded!</h4>
				<p>All courses in this semester are already graded.</p>
			</div>
		`;
		return;
	}

	// Calculate required points for target CGPA
	const totalCreditsAfter = totalCreditsBefore + semesterCredits;
	const requiredTotalPoints = targetCGPA * totalCreditsAfter;
	const requiredSemesterPoints =
		requiredTotalPoints - totalPointsBefore - gradedPoints;
	const requiredGPA = requiredSemesterPoints / remainingCredits;

	if (requiredGPA > 4.0) {
		resultDiv.innerHTML = `
            <div class="target-impossible">
                <h4>❌ Target Not Achievable</h4>
                <p>Required GPA for remaining ${remainingCredits} credits: <strong>${requiredGPA.toFixed(
			2
		)}</strong> (Maximum is 4.00)</p>
                <p>Maximum achievable CGPA: <strong>${(
					(totalPointsBefore + gradedPoints + 4.0 * remainingCredits) /
					totalCreditsAfter
				).toFixed(2)}</strong></p>
            </div>
        `;
	} else if (requiredGPA < 0) {
		resultDiv.innerHTML = `
            <div class="target-achieved">
                <h4>✅ Target Already Exceeded!</h4>
                <p>Your current performance already exceeds the target CGPA of ${targetCGPA}.</p>
            </div>
        `;
	} else {
		const percentage = cgpaToPercentage(requiredGPA);
		resultDiv.innerHTML = `
            <div class="target-achievable">
                <h4>🎯 Required Performance for Remaining Courses</h4>
                <p>You need an average GPA of <strong>${requiredGPA.toFixed(
					2
				)}</strong> in your remaining ${remainingCredits} credits.</p>
                <p>This is approximately <strong>${percentage}%</strong> marks.</p>
                <p>Target Letter Grade: <strong>${getLetterGrade(
					requiredGPA
				)}</strong></p>
                ${
					requiredGPA >= 3.75
						? '<p class="warning-text">⚠️ This requires excellent performance (A or A+)!</p>'
						: ""
				}
                ${
					requiredGPA >= 3.25 && requiredGPA < 3.75
						? '<p class="info-text">✓ This requires very good performance (B+ to A-).</p>'
						: ""
				}
                ${
					requiredGPA < 3.25 && requiredGPA >= 2.2
						? '<p class="info-text">✓ This is achievable with consistent effort.</p>'
						: ""
				}
            </div>
        `;
	}
}

// Reset semester to default courses
async function resetSemesterToDefault(semNum) {
	const confirmed = await showConfirmModal(
		'Reset Semester to Default?',
		`This will remove all custom courses and restore original courses for Semester ${semNum} based on your department.`,
		'Reset',
		'Cancel',
		true
	);
	
	if (confirmed) {
		const semester = document.getElementById(`semester-${semNum}`);
		const tbody = semester.querySelector('tbody');
		tbody.innerHTML = '';
		
		const courses = getCoursesForSemester(semNum);
		courses.forEach((course, idx) => {
			const row = document.createElement('tr');
			row.className = 'course-row';
			row.innerHTML = `
				<td class="sl-no">${idx + 1}</td>
				<td><input type="text" class="course-code" value="${course.code}" placeholder="Code" oninput="autoSaveData()"></td>
				<td><input type="text" class="course-name" value="${course.name}" placeholder="Course Name" oninput="autoSaveData()"></td>
				<td><input type="number" class="course-credit" value="${course.credit}" min="0" max="6" step="0.75" oninput="calculateCGPA()"></td>
				<td>
					<select class="course-grade-current" onchange="updateGradePoint(this); syncExpectedGrade(this)">
						<option value="">-</option>
						<option value="4.00">A+</option>
						<option value="3.75">A</option>
						<option value="3.50">A-</option>
						<option value="3.25">B+</option>
						<option value="3.00">B</option>
						<option value="2.75">B-</option>
						<option value="2.50">C+</option>
						<option value="2.25">C</option>
						<option value="2.00">D</option>
						<option value="0.00">F</option>
					</select>
				</td>
				<td class="grade-point">-</td>
				<td>
					<select class="course-grade-expected" onchange="calculateCGPA()">
						<option value="">-</option>
						<option value="4.00">A+</option>
						<option value="3.75">A</option>
						<option value="3.50">A-</option>
						<option value="3.25">B+</option>
						<option value="3.00">B</option>
						<option value="2.75">B-</option>
						<option value="2.50">C+</option>
						<option value="2.25">C</option>
						<option value="2.00">D</option>
						<option value="0.00">F</option>
					</select>
				</td>
				<td><button class="remove-course-btn" onclick="removeCourse(this)">×</button></td>
			`;
			tbody.appendChild(row);
		});
		
		calculateCGPA();
		showSuccessModal('Success!', `Semester ${semNum} has been reset to default courses.`);
	}
}

// Calculate CGPA
function calculateCGPA() {
	let totalPoints = 0;
	let totalCredits = 0;
	let completedCredits = 0;
	let cumulativeExpectedPoints = 0;
	let cumulativeExpectedCredits = 0;

	// Auto-calculate smart planner if target is set
	const hasTarget =
		document.getElementById("targetCGPATop").value ||
		document.getElementById("targetCGPABottom").value;

	// Calculate for each semester
	for (let semNum = 1; semNum <= 8; semNum++) {
		const semester = document.getElementById(`semester-${semNum}`);
		const rows = semester.querySelectorAll(".course-row");

		let semPoints = 0;
		let semCredits = 0;
		let semExpectedPoints = 0;
		let semExpectedCredits = 0;

		rows.forEach((row) => {
			const credit = parseFloat(row.querySelector(".course-credit").value) || 0;
			const currentGrade = parseFloat(
				row.querySelector(".course-grade-current").value
			);
			const expectedGrade = parseFloat(
				row.querySelector(".course-grade-expected").value
			);

			totalCredits += credit;

			if (!isNaN(currentGrade)) {
				const points = credit * currentGrade;
				semPoints += points;
				semCredits += credit;
				totalPoints += points;
				completedCredits += credit;
			}

			if (!isNaN(expectedGrade)) {
				const expPoints = credit * expectedGrade;
				semExpectedPoints += expPoints;
				semExpectedCredits += credit;
			}
		});

		// Add this semester's expected points to cumulative
		cumulativeExpectedPoints += semExpectedPoints;
		cumulativeExpectedCredits += semExpectedCredits;

		// Update semester GPA display
		const sgpa = semCredits > 0 ? (semPoints / semCredits).toFixed(2) : "-";
		const expectedSGPA =
			semExpectedCredits > 0
				? (semExpectedPoints / semExpectedCredits).toFixed(2)
				: "-";

		// Calculate cumulative expected CGPA up to this semester
		const cumulativeExpectedCGPA =
			cumulativeExpectedCredits > 0
				? (cumulativeExpectedPoints / cumulativeExpectedCredits).toFixed(2)
				: "0.00";

		// Update semester summary at bottom of table
		const semesterSummary = semester.querySelector(".semester-summary");
		if (semesterSummary) {
			const creditTaken =
				semester.querySelectorAll(".course-row").length > 0
					? Array.from(semester.querySelectorAll(".course-credit")).reduce(
							(sum, el) => sum + (parseFloat(el.value) || 0),
							0
					  )
					: 0;

			semesterSummary.innerHTML = `
                <div class="summary-row">
                    <span><strong>Credit Taken:</strong> ${creditTaken.toFixed(
											2
										)}</span>
                    <span><strong>Credit Completed:</strong> ${semCredits.toFixed(
											2
										)}</span>
                    <span><strong>Term GPA:</strong> ${sgpa}</span>
                    <span><strong>Expected Term GPA:</strong> ${expectedSGPA}</span>
                </div>
                <div class="summary-row">
                    <span><strong>Total Credit Completed:</strong> ${completedCredits.toFixed(
											2
										)}</span>
                    <span><strong>CGPA:</strong> ${
											completedCredits > 0
												? (totalPoints / completedCredits).toFixed(2)
												: "0.00"
										}</span>
                    <span><strong>Expected CGPA:</strong> ${cumulativeExpectedCGPA}</span>
                </div>
            `;
		}
	}

	// Calculate overall CGPA
	const cgpa =
		completedCredits > 0 ? (totalPoints / completedCredits).toFixed(2) : "0.00";
	const percentage = cgpaToPercentage(parseFloat(cgpa));

	// Calculate expected CGPA (total from all semesters)
	const expectedCGPA =
		cumulativeExpectedCredits > 0
			? (cumulativeExpectedPoints / cumulativeExpectedCredits).toFixed(2)
			: "0.00";

	// Update summary
	document.getElementById("currentCGPA").textContent = cgpa;
	document.getElementById("totalCredits").textContent = totalCredits.toFixed(2);
	document.getElementById("completedCredits").textContent =
		completedCredits.toFixed(2);

	// Update academic status
	updateAcademicStatus(parseFloat(cgpa), completedCredits);

	// Update grade distribution chart
	updateGradeDistributionChart();

	// Auto-update smart planner if target CGPA is set
	if (hasTarget) {
		calculateSmartPlanner();
	}

	// Auto-save data
	autoSaveData();
}

// Update academic status
function updateAcademicStatus(cgpa, credits) {
	const statusDiv = document.getElementById("academicStatus");
	let status = "";
	let className = "";

	if (cgpa >= 3.75) {
		status = "🏆 Honors Track";
		className = "status-excellent";
	} else if (cgpa >= 3.5) {
		status = "✨ Excellent";
		className = "status-good";
	} else if (cgpa >= 3.25) {
		status = "✓ Good Standing";
		className = "status-good";
	} else if (cgpa >= 3.0) {
		status = "📚 Satisfactory";
		className = "status-satisfactory";
	} else if (cgpa >= 2.2) {
		status = "⚠️ Minimum Required";
		className = "status-warning";
	} else if (cgpa > 0) {
		status = "❌ Below Minimum";
		className = "status-critical";
	} else {
		status = "Not Calculated";
		className = "";
	}

	statusDiv.textContent = status;
	statusDiv.className = "status-display " + className;
}

// Convert CGPA to Percentage (KUET Formula)
function cgpaToPercentage(cgpa) {
	if (cgpa >= 3.75 && cgpa <= 4.0) {
		return (79 + 80 * (cgpa - 3.75)).toFixed(2);
	} else if (cgpa >= 2.0 && cgpa < 3.75) {
		return (44 + 20 * (cgpa - 2.0)).toFixed(2);
	} else if (cgpa > 0) {
		return (44 + 20 * (cgpa - 2.0)).toFixed(2);
	} else {
		return "0.00";
	}
}

// Calculate required GPA for target
function calculateTargetGPA() {
	const targetCGPA = parseFloat(document.getElementById("targetCGPA").value);
	const remainingCredits = parseFloat(
		document.getElementById("remainingCredits").value
	);
	const currentCGPA = parseFloat(
		document.getElementById("currentCGPA").textContent
	);
	const completedCredits = parseFloat(
		document.getElementById("totalCredits").textContent
	);

	if (!targetCGPA || !remainingCredits) {
		alert("Please enter target CGPA and remaining credits!");
		return;
	}

	if (targetCGPA > 4.0 || targetCGPA < 0) {
		alert("Target CGPA must be between 0 and 4.00!");
		return;
	}

	const requiredPoints =
		targetCGPA * (completedCredits + remainingCredits) -
		currentCGPA * completedCredits;
	const requiredGPA = requiredPoints / remainingCredits;

	const resultDiv = document.getElementById("targetResult");

	if (requiredGPA > 4.0) {
		resultDiv.innerHTML = `
            <div class="target-impossible">
                <h4>❌ Target Not Achievable</h4>
                <p>Required GPA: <strong>${requiredGPA.toFixed(
									2
								)}</strong> (Maximum is 4.00)</p>
                <p>The target CGPA of ${targetCGPA} cannot be achieved with ${remainingCredits} remaining credits.</p>
                <p>Maximum achievable CGPA: <strong>${(
									(currentCGPA * completedCredits + 4.0 * remainingCredits) /
									(completedCredits + remainingCredits)
								).toFixed(2)}</strong></p>
            </div>
        `;
	} else if (requiredGPA < 0) {
		resultDiv.innerHTML = `
            <div class="target-achieved">
                <h4>✅ Target Already Achieved!</h4>
                <p>Your current CGPA (${currentCGPA}) is already above your target (${targetCGPA}).</p>
            </div>
        `;
	} else {
		const percentage = cgpaToPercentage(requiredGPA);
		resultDiv.innerHTML = `
            <div class="target-achievable">
                <h4>🎯 Required Performance</h4>
                <p>You need an average GPA of <strong>${requiredGPA.toFixed(
									2
								)}</strong> in your remaining ${remainingCredits} credits.</p>
                <p>This is approximately <strong>${percentage}%</strong> marks.</p>
                <p>Target Letter Grade: <strong>${getLetterGrade(
									requiredGPA
								)}</strong></p>
                ${
									requiredGPA >= 3.75
										? '<p class="warning-text">⚠️ This requires excellent performance (A or A+) in all remaining courses!</p>'
										: ""
								}
                ${
									requiredGPA >= 3.25 && requiredGPA < 3.75
										? '<p class="info-text">✓ This requires very good performance (B+ or better) in most courses.</p>'
										: ""
								}
                ${
									requiredGPA < 3.25 && requiredGPA >= 2.2
										? '<p class="info-text">✓ This is achievable with consistent effort.</p>'
										: ""
								}
            </div>
        `;
	}
}

// Get letter grade from GPA
function getLetterGrade(gpa) {
	if (gpa >= 4.0) return "A+";
	if (gpa >= 3.75) return "A";
	if (gpa >= 3.5) return "A-";
	if (gpa >= 3.25) return "B+";
	if (gpa >= 3.0) return "B";
	if (gpa >= 2.75) return "B-";
	if (gpa >= 2.5) return "C+";
	if (gpa >= 2.25) return "C";
	if (gpa >= 2.0) return "D";
	return "F";
}

// Auto-save data to localStorage (silent, no alert)
function autoSaveData() {
	const data = {
		department: currentDepartment,
		studentName: document.getElementById("studentName").value,
		studentRoll: document.getElementById("studentRoll").value,
		targetCGPA: document.getElementById("targetCGPATop").value,
		semesters: [],
	};

	for (let semNum = 1; semNum <= 8; semNum++) {
		const semester = document.getElementById(`semester-${semNum}`);
		const rows = semester.querySelectorAll(".course-row");
		const courses = [];

		rows.forEach((row) => {
			courses.push({
				code: row.querySelector(".course-code").value,
				name: row.querySelector(".course-name").value,
				credit: row.querySelector(".course-credit").value,
				currentGrade: row.querySelector(".course-grade-current").value,
				expectedGrade: row.querySelector(".course-grade-expected").value,
			});
		});

		data.semesters.push(courses);
	}

	localStorage.setItem("kuetCGPAData", JSON.stringify(data));
}

// Load data from localStorage
function loadSavedData() {
	const savedData = localStorage.getItem("kuetCGPAData");
	if (!savedData) return;

	try {
		const data = JSON.parse(savedData);

		// Restore department
		if (data.department) {
			currentDepartment = data.department;
			document.getElementById("departmentSelect").value = data.department;
		}

		// Restore student info
		if (data.studentName) {
			document.getElementById("studentName").value = data.studentName;
		}
		if (data.studentRoll) {
			document.getElementById("studentRoll").value = data.studentRoll;
			updateSessionFromRoll(); // Update session based on loaded roll
		}
		if (data.targetCGPA) {
			document.getElementById("targetCGPATop").value = data.targetCGPA;
			document.getElementById("targetCGPABottom").value = data.targetCGPA;
		}

		for (let semNum = 1; semNum <= 8; semNum++) {
			if (!data.semesters[semNum - 1]) continue;

			const semester = document.getElementById(`semester-${semNum}`);
			const tbody = semester.querySelector("tbody");
			tbody.innerHTML = "";

			data.semesters[semNum - 1].forEach((course, idx) => {
				const row = document.createElement("tr");
				row.className = "course-row";
				row.innerHTML = `
                    <td class="sl-no">${idx + 1}</td>
                    <td><input type="text" class="course-code" value="${
											course.code
										}" placeholder="Code" oninput="autoSaveData()"></td>
                    <td><input type="text" class="course-name" value="${
											course.name
										}" placeholder="Course Name" oninput="autoSaveData()"></td>
                    <td><input type="number" class="course-credit" value="${
											course.credit
										}" min="0" max="6" step="0.75" oninput="calculateCGPA()"></td>
                    <td>
                        <select class="course-grade-current" onchange="updateGradePoint(this); syncExpectedGrade(this)">
                            <option value="">-</option>
                            <option value="4.00" ${
															course.currentGrade === "4.00" ? "selected" : ""
														}>A+</option>
                            <option value="3.75" ${
															course.currentGrade === "3.75" ? "selected" : ""
														}>A</option>
                            <option value="3.50" ${
															course.currentGrade === "3.50" ? "selected" : ""
														}>A-</option>
                            <option value="3.25" ${
															course.currentGrade === "3.25" ? "selected" : ""
														}>B+</option>
                            <option value="3.00" ${
															course.currentGrade === "3.00" ? "selected" : ""
														}>B</option>
                            <option value="2.75" ${
															course.currentGrade === "2.75" ? "selected" : ""
														}>B-</option>
                            <option value="2.50" ${
															course.currentGrade === "2.50" ? "selected" : ""
														}>C+</option>
                            <option value="2.25" ${
															course.currentGrade === "2.25" ? "selected" : ""
														}>C</option>
                            <option value="2.00" ${
															course.currentGrade === "2.00" ? "selected" : ""
														}>D</option>
                            <option value="0.00" ${
															course.currentGrade === "0.00" ? "selected" : ""
														}>F</option>
                        </select>
                    </td>
                    <td class="grade-point">${
											course.currentGrade
												? parseFloat(course.currentGrade).toFixed(2)
												: "-"
										}</td>
                    <td>
                        <select class="course-grade-expected" onchange="calculateCGPA()">
                            <option value="">-</option>
                            <option value="4.00" ${
															course.expectedGrade === "4.00" ? "selected" : ""
														}>A+</option>
                            <option value="3.75" ${
															course.expectedGrade === "3.75" ? "selected" : ""
														}>A</option>
                            <option value="3.50" ${
															course.expectedGrade === "3.50" ? "selected" : ""
														}>A-</option>
                            <option value="3.25" ${
															course.expectedGrade === "3.25" ? "selected" : ""
														}>B+</option>
                            <option value="3.00" ${
															course.expectedGrade === "3.00" ? "selected" : ""
														}>B</option>
                            <option value="2.75" ${
															course.expectedGrade === "2.75" ? "selected" : ""
														}>B-</option>
                            <option value="2.50" ${
															course.expectedGrade === "2.50" ? "selected" : ""
														}>C+</option>
                            <option value="2.25" ${
															course.expectedGrade === "2.25" ? "selected" : ""
														}>C</option>
                            <option value="2.00" ${
															course.expectedGrade === "2.00" ? "selected" : ""
														}>D</option>
                            <option value="0.00" ${
															course.expectedGrade === "0.00" ? "selected" : ""
														}>F</option>
                        </select>
                    </td>
                    <td><button class="remove-course-btn" onclick="removeCourse(this)">×</button></td>
                `;
				tbody.appendChild(row);
			});
		}
	} catch (e) {
		console.error("Error loading saved data:", e);
	}
}

// Clear all grades (both actual and expected)
async function clearAllGrades() {
	const confirmed = await showConfirmModal(
		'Clear All Grades?',
		'This will remove all Letter Grade and Expected Letter Grade entries from all semesters.',
		'Clear Grades',
		'Cancel',
		true
	);
	
	if (confirmed) {
		for (let semNum = 1; semNum <= 8; semNum++) {
			const semester = document.getElementById(`semester-${semNum}`);
			const rows = semester.querySelectorAll(".course-row");

			rows.forEach((row) => {
				const currentGradeSelect = row.querySelector(".course-grade-current");
				const expectedGradeSelect = row.querySelector(".course-grade-expected");
				const gradePointCell = row.querySelector(".grade-point");

				if (currentGradeSelect) currentGradeSelect.value = "";
				if (expectedGradeSelect) expectedGradeSelect.value = "";
				if (gradePointCell) gradePointCell.textContent = "-";
			});
		}

		
		calculateCGPA();
		showSuccessModal('Grades Cleared!', 'All grades have been successfully cleared.');
	}
}// Reset all semesters to default courses
async function resetAllSemestersToDefault() {
	const confirmed = await showConfirmModal(
		'Reset All Semesters?',
		'This will remove all custom courses and restore original courses for your department in all 8 semesters. This action cannot be undone.',
		'Reset All',
		'Cancel',
		true
	);
	
	if (confirmed) {
		for (let semNum = 1; semNum <= 8; semNum++) {
			const semester = document.getElementById(`semester-${semNum}`);
			const tbody = semester.querySelector("tbody");
			tbody.innerHTML = "";

			const courses = getCoursesForSemester(semNum);
			courses.forEach((course, idx) => {
				const row = document.createElement("tr");
				row.className = "course-row";
				row.innerHTML = `
					<td class="sl-no">${idx + 1}</td>
					<td><input type="text" class="course-code" value="${course.code}" placeholder="Code" oninput="autoSaveData()"></td>
					<td><input type="text" class="course-name" value="${course.name}" placeholder="Course Name" oninput="autoSaveData()"></td>
					<td><input type="number" class="course-credit" value="${course.credit}" min="0" max="6" step="0.75" oninput="calculateCGPA()"></td>
					<td>
						<select class="course-grade-current" onchange="updateGradePoint(this); syncExpectedGrade(this)">
							<option value="">-</option>
							<option value="4.00">A+</option>
							<option value="3.75">A</option>
							<option value="3.50">A-</option>
							<option value="3.25">B+</option>
							<option value="3.00">B</option>
							<option value="2.75">B-</option>
							<option value="2.50">C+</option>
							<option value="2.25">C</option>
							<option value="2.00">D</option>
							<option value="0.00">F</option>
						</select>
					</td>
					<td class="grade-point">-</td>
					<td>
						<select class="course-grade-expected" onchange="calculateCGPA()">
							<option value="">-</option>
							<option value="4.00">A+</option>
							<option value="3.75">A</option>
							<option value="3.50">A-</option>
							<option value="3.25">B+</option>
							<option value="3.00">B</option>
							<option value="2.75">B-</option>
							<option value="2.50">C+</option>
							<option value="2.25">C</option>
							<option value="2.00">D</option>
							<option value="0.00">F</option>
						</select>
					</td>
					<td><button class="remove-course-btn" onclick="removeCourse(this)">×</button></td>
				`;
				tbody.appendChild(row);
			});
		}

		
		calculateCGPA();
		showSuccessModal('All Semesters Reset!', 'All semesters have been reset to default courses.');
	}
}// Toggle semester target calculator
// Calculate required grade point for all remaining ungraded courses
function calculateSmartPlanner() {
	// Get value from whichever input has a value (top or bottom)
	const topInput = document.getElementById("targetCGPATop");
	const bottomInput = document.getElementById("targetCGPABottom");

	let targetCGPA = parseFloat(topInput.value) || parseFloat(bottomInput.value);

	// Sync inputs
	if (topInput.value) {
		bottomInput.value = topInput.value;
	} else if (bottomInput.value) {
		topInput.value = bottomInput.value;
	}

	// Clear results if no valid input
	if (!targetCGPA || targetCGPA < 0 || targetCGPA > 4) {
		document.getElementById("resultTop").innerHTML = "";
		document.getElementById("resultBottom").innerHTML = "";
		return;
	}

	// Find first semester with ungraded courses
	let startSem = 1;
	for (let i = 1; i <= 8; i++) {
		const semester = document.getElementById(`semester-${i}`);
		const rows = semester.querySelectorAll(".course-row");
		let hasUngraded = false;

		rows.forEach((row) => {
			const currentGrade = parseFloat(
				row.querySelector(".course-grade-current").value
			);
			if (
				isNaN(currentGrade) ||
				row.querySelector(".course-grade-current").value === ""
			) {
				hasUngraded = true;
			}
		});

		if (hasUngraded) {
			startSem = i;
			break;
		}
	}

	// Calculate completed credits and points before starting semester
	let completedPoints = 0;
	let completedCredits = 0;

	for (let i = 1; i < startSem; i++) {
		const semester = document.getElementById(`semester-${i}`);
		const rows = semester.querySelectorAll(".course-row");

		rows.forEach((row) => {
			const credit = parseFloat(row.querySelector(".course-credit").value) || 0;
			const currentGrade = parseFloat(
				row.querySelector(".course-grade-current").value
			);

			if (!isNaN(currentGrade)) {
				completedPoints += credit * currentGrade;
				completedCredits += credit;
			}
		});
	}

	// Calculate total remaining credits and already graded credits from starting semester onwards
	let totalRemainingCredits = 0;
	let gradedCreditsInRemaining = 0;
	let gradedPointsInRemaining = 0;

	for (let i = startSem; i <= 8; i++) {
		const semester = document.getElementById(`semester-${i}`);
		const rows = semester.querySelectorAll(".course-row");

		rows.forEach((row) => {
			const credit = parseFloat(row.querySelector(".course-credit").value) || 0;
			const currentGrade = parseFloat(
				row.querySelector(".course-grade-current").value
			);

			totalRemainingCredits += credit;

			if (!isNaN(currentGrade)) {
				gradedCreditsInRemaining += credit;
				gradedPointsInRemaining += credit * currentGrade;
			}
		});
	}

	const ungradedCredits = totalRemainingCredits - gradedCreditsInRemaining;

	if (ungradedCredits <= 0) {
		const resultHTML = `
            <div class="target-achieved">
                <h4>✅ All remaining courses graded!</h4>
                <p>All courses from Semester ${startSem} onwards are already graded.</p>
            </div>
        `;
		document.getElementById("resultTop").innerHTML = resultHTML;
		document.getElementById("resultBottom").innerHTML = resultHTML;
		return;
	}

	// Calculate total credits including all 8 semesters
	let totalAllCredits = completedCredits + totalRemainingCredits;

	// Calculate required grade point
	const requiredTotalPoints = targetCGPA * totalAllCredits;
	const requiredUngradedPoints =
		requiredTotalPoints - completedPoints - gradedPointsInRemaining;
	const requiredGP = requiredUngradedPoints / ungradedCredits;

	let resultHTML = "";

	if (requiredGP > 4.0) {
		const maxCGPA = (
			(completedPoints + gradedPointsInRemaining + 4.0 * ungradedCredits) /
			totalAllCredits
		).toFixed(2);
		resultHTML = `
            <div class="target-impossible">
                <h4>❌ Target Not Achievable</h4>
                <p>Required average grade point for ${ungradedCredits} ungraded credits: <strong>${requiredGP.toFixed(
			2
		)}</strong></p>
                <p>Maximum possible is 4.00 per course.</p>
                <p>Maximum achievable final CGPA: <strong>${maxCGPA}</strong></p>
            </div>
        `;
	} else if (requiredGP < 0) {
		resultHTML = `
            <div class="target-achieved">
                <h4>✅ Target Already Exceeded!</h4>
                <p>Your current performance already exceeds the target CGPA of ${targetCGPA}.</p>
            </div>
        `;
	} else {
		const percentage = cgpaToPercentage(requiredGP);
		const letterGrade = getLetterGrade(requiredGP);
		resultHTML = `
            <div class="target-achievable">
                <h4>🎯 Required Performance for All Remaining Courses</h4>
                <p><strong>Required Grade Point:</strong> ${requiredGP.toFixed(
									2
								)} per course (average for ${ungradedCredits} credits)</p>
                <p><strong>Approximate Marks:</strong> ${percentage}%</p>
                <p><strong>Letter Grade:</strong> ${letterGrade}</p>
                <hr>
                <p><small>📋 Completed: ${completedCredits} credits | Remaining Semesters: ${totalRemainingCredits} credits (${gradedCreditsInRemaining} graded, ${ungradedCredits} ungraded)</small></p>
                <p><small>📊 Total Credits: ${totalAllCredits} | Semesters ${startSem}-8</small></p>
                ${
									requiredGP >= 3.75
										? '<p class="warning-text">⚠️ This requires excellent performance (A or A+) consistently!</p>'
										: ""
								}
                ${
									requiredGP >= 3.25 && requiredGP < 3.75
										? '<p class="info-text">✓ This requires very good performance (B+ to A-) consistently.</p>'
										: ""
								}
                ${
									requiredGP < 3.25 && requiredGP >= 2.2
										? '<p class="info-text">✓ This is achievable with consistent effort.</p>'
										: ""
								}
            </div>
        `;
	}

	// Update both result divs
	document.getElementById("resultTop").innerHTML = resultHTML;
	document.getElementById("resultBottom").innerHTML = resultHTML;
}

// Attach event listeners
function attachEventListeners() {
	document
		.getElementById("clearGrades")
		.addEventListener("click", clearAllGrades);
	document
		.getElementById("resetAllSemesters")
		.addEventListener("click", resetAllSemestersToDefault);

	// Sync Smart Grade Planner inputs and auto-calculate
	const topInput = document.getElementById("targetCGPATop");
	const bottomInput = document.getElementById("targetCGPABottom");

	topInput.addEventListener("input", function () {
		bottomInput.value = this.value;
		calculateSmartPlanner();
	});

	bottomInput.addEventListener("input", function () {
		topInput.value = this.value;
		calculateSmartPlanner();
	});

	// Add event listeners to sync expected grades on page load
	document.querySelectorAll(".course-grade-current").forEach((select) => {
		select.addEventListener("change", function () {
			updateGradePoint(this);
			syncExpectedGrade(this);
		});
	});

	// Auto-save when student info changes
	document
		.getElementById("studentName")
		.addEventListener("input", autoSaveData);
	document.getElementById("studentRoll").addEventListener("input", function () {
		updateSessionFromRoll();
		autoSaveData();
	});
	document
		.getElementById("departmentSelect")
		.addEventListener("change", autoSaveData);
}

// Initialize Grade Distribution Chart
function initGradeDistributionChart() {
	const ctx = document.getElementById("gradeDistributionChart");
	if (!ctx) return;

	gradeDistributionChart = new Chart(ctx, {
		type: "bar",
		data: {
			labels: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F"],
			datasets: [
				{
					label: "Number of Courses",
					data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					backgroundColor: [
						"rgba(16, 185, 129, 0.8)", // A+ - Green
						"rgba(52, 211, 153, 0.8)", // A - Light Green
						"rgba(110, 231, 183, 0.8)", // A- - Lighter Green
						"rgba(59, 130, 246, 0.8)", // B+ - Blue
						"rgba(96, 165, 250, 0.8)", // B - Light Blue
						"rgba(147, 197, 253, 0.8)", // B- - Lighter Blue
						"rgba(251, 191, 36, 0.8)", // C+ - Yellow
						"rgba(252, 211, 77, 0.8)", // C - Light Yellow
						"rgba(251, 146, 60, 0.8)", // D - Orange
						"rgba(239, 68, 68, 0.8)", // F - Red
					],
					borderColor: [
						"rgba(16, 185, 129, 1)",
						"rgba(52, 211, 153, 1)",
						"rgba(110, 231, 183, 1)",
						"rgba(59, 130, 246, 1)",
						"rgba(96, 165, 250, 1)",
						"rgba(147, 197, 253, 1)",
						"rgba(251, 191, 36, 1)",
						"rgba(252, 211, 77, 1)",
						"rgba(251, 146, 60, 1)",
						"rgba(239, 68, 68, 1)",
					],
					borderWidth: 2,
					borderRadius: 6,
					barThickness: "flex",
					maxBarThickness: 50,
				},
			],
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				legend: {
					display: false,
				},
				title: {
					display: true,
					text: "Grade Distribution Across All Courses",
					font: {
						size: 14,
						weight: "bold",
					},
					color: "#1e293b",
					padding: {
						bottom: 20,
					},
				},
				tooltip: {
					callbacks: {
						title: function (context) {
							return `Grade: ${context[0].label}`;
						},
						label: function (context) {
							const gradePoints = [
								4.0, 3.75, 3.5, 3.25, 3.0, 2.75, 2.5, 2.25, 2.0, 0.0,
							];
							return `Count: ${context.parsed.y} course${
								context.parsed.y !== 1 ? "s" : ""
							}`;
						},
						afterLabel: function (context) {
							const gradePoints = [
								4.0, 3.75, 3.5, 3.25, 3.0, 2.75, 2.5, 2.25, 2.0, 0.0,
							];
							const lines = [
								`Grade Point: ${gradePoints[context.dataIndex].toFixed(2)}`,
							];

							// Get course list for this grade
							const courseLists = context.dataset.courseLists;
							if (
								courseLists &&
								courseLists[context.dataIndex] &&
								courseLists[context.dataIndex].length > 0
							) {
								lines.push(""); // Empty line
								lines.push("Courses:");
								courseLists[context.dataIndex].forEach((course, idx) => {
									// Limit course name length for tooltip
									const maxLength = 40;
									const displayCourse =
										course.length > maxLength
											? course.substring(0, maxLength) + "..."
											: course;
									lines.push(`${idx + 1}. ${displayCourse}`);
								});
							}

							return lines;
						},
					},
					backgroundColor: "rgba(0, 0, 0, 0.9)",
					padding: 12,
					displayColors: false,
					titleFont: {
						size: 14,
						weight: "bold",
					},
					bodyFont: {
						size: 12,
					},
					bodySpacing: 4,
					maxWidth: 300,
				},
			},
			scales: {
				y: {
					beginAtZero: true,
					ticks: {
						stepSize: 1,
						font: {
							size: 11,
						},
					},
					grid: {
						color: "rgba(0, 0, 0, 0.05)",
					},
				},
				x: {
					ticks: {
						font: {
							size: 11,
							weight: "bold",
						},
					},
					grid: {
						display: false,
					},
				},
			},
		},
	});
}

// Update Grade Distribution Chart
function updateGradeDistributionChart() {
	const gradeCount = {
		"4.00": 0, // A+
		3.75: 0, // A
		"3.50": 0, // A-
		3.25: 0, // B+
		"3.00": 0, // B
		2.75: 0, // B-
		"2.50": 0, // C+
		2.25: 0, // C
		"2.00": 0, // D
		"0.00": 0, // F
	};

	// Store course names for each grade
	const gradeCourses = {
		"4.00": [],
		3.75: [],
		"3.50": [],
		3.25: [],
		"3.00": [],
		2.75: [],
		"2.50": [],
		2.25: [],
		"2.00": [],
		"0.00": [],
	};

	let totalCourses = 0;
	let totalGradePoints = 0;

	// Count grades from all semesters and collect course names
	for (let semNum = 1; semNum <= 8; semNum++) {
		const semester = document.getElementById(`semester-${semNum}`);
		if (!semester) continue;

		const rows = semester.querySelectorAll(".course-row");
		rows.forEach((row) => {
			const gradeSelect = row.querySelector(".course-grade-current");
			const gradeValue = gradeSelect.value;
			const courseName =
				row.querySelector(".course-name").value || "Unnamed Course";
			const courseCode = row.querySelector(".course-code").value || "";

			if (gradeValue && gradeCount.hasOwnProperty(gradeValue)) {
				gradeCount[gradeValue]++;
				const displayName = courseCode
					? `${courseCode}: ${courseName}`
					: courseName;
				gradeCourses[gradeValue].push(displayName);
				totalCourses++;
				totalGradePoints += parseFloat(gradeValue);
			}
		});
	}

	// Update chart data
	if (gradeDistributionChart) {
		gradeDistributionChart.data.datasets[0].data = [
			gradeCount["4.00"],
			gradeCount["3.75"],
			gradeCount["3.50"],
			gradeCount["3.25"],
			gradeCount["3.00"],
			gradeCount["2.75"],
			gradeCount["2.50"],
			gradeCount["2.25"],
			gradeCount["2.00"],
			gradeCount["0.00"],
		];

		// Store course names in chart for tooltip access
		gradeDistributionChart.data.datasets[0].courseLists = [
			gradeCourses["4.00"],
			gradeCourses["3.75"],
			gradeCourses["3.50"],
			gradeCourses["3.25"],
			gradeCourses["3.00"],
			gradeCourses["2.75"],
			gradeCourses["2.50"],
			gradeCourses["2.25"],
			gradeCourses["2.00"],
			gradeCourses["0.00"],
		];

		gradeDistributionChart.update();
	}

	// Update statistics
	document.getElementById("totalCourses").textContent = totalCourses;

	const avgGPA =
		totalCourses > 0 ? (totalGradePoints / totalCourses).toFixed(2) : "0.00";
	document.getElementById("averageGPA").textContent = avgGPA;

	// Find most common grade
	let maxCount = 0;
	let mostCommonGrade = "-";
	const gradeLabels = {
		"4.00": "A+",
		3.75: "A",
		"3.50": "A-",
		3.25: "B+",
		"3.00": "B",
		2.75: "B-",
		"2.50": "C+",
		2.25: "C",
		"2.00": "D",
		"0.00": "F",
	};

	for (const [grade, count] of Object.entries(gradeCount)) {
		if (count > maxCount) {
			maxCount = count;
			mostCommonGrade = gradeLabels[grade];
		}
	}

	document.getElementById("mostCommonGrade").textContent =
		totalCourses > 0 ? `${mostCommonGrade} (${maxCount})` : "-";
}
