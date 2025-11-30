// Sample course structure for different departments (can be customized)
const sampleCourses = {
    1: [ // 1st Year 1st Term
        { code: 'Math 1101', name: 'Differential Calculus & Co-ordinate Geometry', credit: 3.0 },
        { code: 'Ph 1101', name: 'Physics I (Mechanics, Properties of Matter & Waves)', credit: 3.0 },
        { code: 'Ph 1102', name: 'Physics I Sessional', credit: 1.5 },
        { code: 'Ch 1101', name: 'Chemistry I (Physical & Inorganic Chemistry)', credit: 3.0 },
        { code: 'Ch 1102', name: 'Chemistry I Sessional', credit: 1.5 },
        { code: 'ME 1101', name: 'Engineering Drawing', credit: 1.5 },
        { code: 'Hum 1101', name: 'English', credit: 3.0 },
        { code: 'Hum 1102', name: 'Bangladesh Studies', credit: 1.5 }
    ],
    2: [ // 1st Year 2nd Term
        { code: 'Math 1201', name: 'Integral Calculus & Differential Equations', credit: 3.0 },
        { code: 'Ph 1201', name: 'Physics II (Electricity, Magnetism & Modern Physics)', credit: 3.0 },
        { code: 'Ph 1202', name: 'Physics II Sessional', credit: 1.5 },
        { code: 'Ch 1201', name: 'Chemistry II (Organic Chemistry)', credit: 3.0 },
        { code: 'Ch 1202', name: 'Chemistry II Sessional', credit: 1.5 },
        { code: 'ME 1201', name: 'Workshop Practice', credit: 1.5 },
        { code: 'CSE 1201', name: 'Computer Programming', credit: 3.0 },
        { code: 'CSE 1202', name: 'Computer Programming Sessional', credit: 1.5 }
    ],
    3: [ // 2nd Year 1st Term - Add sample courses
        { code: '', name: 'Course 1', credit: 3.0 },
        { code: '', name: 'Course 2', credit: 3.0 },
        { code: '', name: 'Course 3', credit: 3.0 },
        { code: '', name: 'Course 4', credit: 1.5 },
        { code: '', name: 'Course 5', credit: 3.0 },
        { code: '', name: 'Course 6', credit: 1.5 }
    ],
    4: [ // 2nd Year 2nd Term
        { code: '', name: 'Course 1', credit: 3.0 },
        { code: '', name: 'Course 2', credit: 3.0 },
        { code: '', name: 'Course 3', credit: 3.0 },
        { code: '', name: 'Course 4', credit: 1.5 },
        { code: '', name: 'Course 5', credit: 3.0 },
        { code: '', name: 'Course 6', credit: 1.5 }
    ],
    5: [ // 3rd Year 1st Term
        { code: '', name: 'Course 1', credit: 3.0 },
        { code: '', name: 'Course 2', credit: 3.0 },
        { code: '', name: 'Course 3', credit: 3.0 },
        { code: '', name: 'Course 4', credit: 1.5 },
        { code: '', name: 'Course 5', credit: 3.0 },
        { code: '', name: 'Course 6', credit: 1.5 }
    ],
    6: [ // 3rd Year 2nd Term
        { code: '', name: 'Course 1', credit: 3.0 },
        { code: '', name: 'Course 2', credit: 3.0 },
        { code: '', name: 'Course 3', credit: 3.0 },
        { code: '', name: 'Course 4', credit: 1.5 },
        { code: '', name: 'Course 5', credit: 3.0 },
        { code: '', name: 'Course 6', credit: 1.5 }
    ],
    7: [ // 4th Year 1st Term
        { code: '', name: 'Course 1', credit: 3.0 },
        { code: '', name: 'Course 2', credit: 3.0 },
        { code: '', name: 'Course 3', credit: 3.0 },
        { code: '', name: 'Course 4', credit: 1.5 },
        { code: '', name: 'Thesis/Project', credit: 1.5 }
    ],
    8: [ // 4th Year 2nd Term
        { code: '', name: 'Course 1', credit: 3.0 },
        { code: '', name: 'Course 2', credit: 3.0 },
        { code: '', name: 'Course 3', credit: 3.0 },
        { code: '', name: 'Course 4', credit: 1.5 },
        { code: '', name: 'Thesis/Project', credit: 1.5 }
    ]
};

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    generateAllSemesters();
    attachEventListeners();
    loadSavedData();
});

// Generate all 8 semesters
function generateAllSemesters() {
    const container = document.getElementById('allSemesters');
    container.innerHTML = '';
    
    for (let i = 1; i <= 8; i++) {
        const year = Math.ceil(i / 2);
        const term = i % 2 === 1 ? '1st' : '2nd';
        const semesterDiv = createSemesterBlock(i, year, term);
        container.appendChild(semesterDiv);
    }
}

// Create semester block with courses
function createSemesterBlock(semNum, year, term) {
    const div = document.createElement('div');
    div.className = 'semester-block';
    div.id = `semester-${semNum}`;
    
    let coursesHTML = '';
    const courses = sampleCourses[semNum] || [];
    
    courses.forEach((course, idx) => {
        coursesHTML += `
            <tr class="course-row">
                <td><input type="text" class="course-code" value="${course.code}" placeholder="Code"></td>
                <td><input type="text" class="course-name" value="${course.name}" placeholder="Course Name"></td>
                <td><input type="number" class="course-credit" value="${course.credit}" min="0" max="6" step="0.5"></td>
                <td>
                    <select class="course-grade-current">
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
                <td>
                    <select class="course-grade-expected">
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
    
    div.innerHTML = `
        <div class="semester-header-block">
            <h3>Semester ${semNum} - Year ${year} ${term} Term</h3>
            <div class="semester-gpa-display">
                <span>SGPA: <strong id="sgpa-${semNum}">-</strong></span>
                <span>Credits: <strong id="credits-${semNum}">-</strong></span>
            </div>
        </div>
        <div class="courses-table-container">
            <table class="courses-table">
                <thead>
                    <tr>
                        <th>Course Code</th>
                        <th>Course Name</th>
                        <th>Credit</th>
                        <th>Current Grade</th>
                        <th>Expected Grade</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    ${coursesHTML}
                </tbody>
            </table>
        </div>
        <button class="add-course-btn-sem" onclick="addCourse(${semNum})">+ Add Course</button>
    `;
    
    return div;
}

// Add course to semester
function addCourse(semNum) {
    const semester = document.getElementById(`semester-${semNum}`);
    const tbody = semester.querySelector('tbody');
    
    const newRow = document.createElement('tr');
    newRow.className = 'course-row';
    newRow.innerHTML = `
        <td><input type="text" class="course-code" placeholder="Code"></td>
        <td><input type="text" class="course-name" placeholder="Course Name"></td>
        <td><input type="number" class="course-credit" min="0" max="6" step="0.5" value="3.0"></td>
        <td>
            <select class="course-grade-current">
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
        <td>
            <select class="course-grade-expected">
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
}

// Remove course
function removeCourse(btn) {
    const row = btn.closest('tr');
    const tbody = row.parentElement;
    if (tbody.children.length > 1) {
        row.remove();
    } else {
        alert('At least one course is required per semester!');
    }
}

// Calculate CGPA
function calculateCGPA() {
    let totalPoints = 0;
    let totalCredits = 0;
    let completedCredits = 0;
    
    // Calculate for each semester
    for (let semNum = 1; semNum <= 8; semNum++) {
        const semester = document.getElementById(`semester-${semNum}`);
        const rows = semester.querySelectorAll('.course-row');
        
        let semPoints = 0;
        let semCredits = 0;
        
        rows.forEach(row => {
            const credit = parseFloat(row.querySelector('.course-credit').value) || 0;
            const currentGrade = parseFloat(row.querySelector('.course-grade-current').value);
            
            totalCredits += credit;
            
            if (!isNaN(currentGrade)) {
                const points = credit * currentGrade;
                semPoints += points;
                semCredits += credit;
                totalPoints += points;
                completedCredits += credit;
            }
        });
        
        // Update semester GPA display
        const sgpa = semCredits > 0 ? (semPoints / semCredits).toFixed(2) : '-';
        document.getElementById(`sgpa-${semNum}`).textContent = sgpa;
        document.getElementById(`credits-${semNum}`).textContent = semCredits > 0 ? semCredits.toFixed(1) : '-';
    }
    
    // Calculate overall CGPA
    const cgpa = completedCredits > 0 ? (totalPoints / completedCredits).toFixed(2) : 0;
    const percentage = cgpaToPercentage(parseFloat(cgpa));
    
    // Update summary
    document.getElementById('currentCGPA').textContent = cgpa;
    document.getElementById('currentPercentage').textContent = percentage + '%';
    document.getElementById('totalCredits').textContent = completedCredits.toFixed(1);
    
    // Update academic status
    updateAcademicStatus(parseFloat(cgpa), completedCredits);
    
    // Update remaining credits in target calculator
    document.getElementById('remainingCredits').value = Math.max(0, 160 - completedCredits).toFixed(1);
}

// Update academic status
function updateAcademicStatus(cgpa, credits) {
    const statusDiv = document.getElementById('academicStatus');
    let status = '';
    let className = '';
    
    if (cgpa >= 3.75) {
        status = '🏆 Honors Track';
        className = 'status-excellent';
    } else if (cgpa >= 3.25) {
        status = '✨ Excellent';
        className = 'status-good';
    } else if (cgpa >= 3.00) {
        status = '✓ Good Standing';
        className = 'status-good';
    } else if (cgpa >= 2.50) {
        status = '📚 Satisfactory';
        className = 'status-satisfactory';
    } else if (cgpa >= 2.20) {
        status = '⚠️ Minimum Required';
        className = 'status-warning';
    } else if (cgpa > 0) {
        status = '❌ Below Minimum';
        className = 'status-critical';
    } else {
        status = 'Not Calculated';
        className = '';
    }
    
    statusDiv.textContent = status;
    statusDiv.className = 'status-display ' + className;
}

// Convert CGPA to Percentage (KUET Formula)
function cgpaToPercentage(cgpa) {
    if (cgpa >= 3.75 && cgpa <= 4.00) {
        return (79 + 80 * (cgpa - 3.75)).toFixed(2);
    } else if (cgpa >= 2.00 && cgpa < 3.75) {
        return (44 + 20 * (cgpa - 2.00)).toFixed(2);
    } else if (cgpa > 0) {
        return (44 + 20 * (cgpa - 2.00)).toFixed(2);
    } else {
        return '0.00';
    }
}

// Calculate required GPA for target
function calculateTargetGPA() {
    const targetCGPA = parseFloat(document.getElementById('targetCGPA').value);
    const remainingCredits = parseFloat(document.getElementById('remainingCredits').value);
    const currentCGPA = parseFloat(document.getElementById('currentCGPA').textContent);
    const completedCredits = parseFloat(document.getElementById('totalCredits').textContent);
    
    if (!targetCGPA || !remainingCredits) {
        alert('Please enter target CGPA and remaining credits!');
        return;
    }
    
    if (targetCGPA > 4.00 || targetCGPA < 0) {
        alert('Target CGPA must be between 0 and 4.00!');
        return;
    }
    
    const requiredPoints = (targetCGPA * (completedCredits + remainingCredits)) - (currentCGPA * completedCredits);
    const requiredGPA = requiredPoints / remainingCredits;
    
    const resultDiv = document.getElementById('targetResult');
    
    if (requiredGPA > 4.00) {
        resultDiv.innerHTML = `
            <div class="target-impossible">
                <h4>❌ Target Not Achievable</h4>
                <p>Required GPA: <strong>${requiredGPA.toFixed(2)}</strong> (Maximum is 4.00)</p>
                <p>The target CGPA of ${targetCGPA} cannot be achieved with ${remainingCredits} remaining credits.</p>
                <p>Maximum achievable CGPA: <strong>${((currentCGPA * completedCredits + 4.00 * remainingCredits) / (completedCredits + remainingCredits)).toFixed(2)}</strong></p>
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
                <p>You need an average GPA of <strong>${requiredGPA.toFixed(2)}</strong> in your remaining ${remainingCredits} credits.</p>
                <p>This is approximately <strong>${percentage}%</strong> marks.</p>
                <p>Target Letter Grade: <strong>${getLetterGrade(requiredGPA)}</strong></p>
                ${requiredGPA >= 3.75 ? '<p class="warning-text">⚠️ This requires excellent performance (A or A+) in all remaining courses!</p>' : ''}
                ${requiredGPA >= 3.25 && requiredGPA < 3.75 ? '<p class="info-text">✓ This requires very good performance (B+ or better) in most courses.</p>' : ''}
                ${requiredGPA < 3.25 && requiredGPA >= 2.20 ? '<p class="info-text">✓ This is achievable with consistent effort.</p>' : ''}
            </div>
        `;
    }
}

// Get letter grade from GPA
function getLetterGrade(gpa) {
    if (gpa >= 4.00) return 'A+';
    if (gpa >= 3.75) return 'A';
    if (gpa >= 3.50) return 'A-';
    if (gpa >= 3.25) return 'B+';
    if (gpa >= 3.00) return 'B';
    if (gpa >= 2.75) return 'B-';
    if (gpa >= 2.50) return 'C+';
    if (gpa >= 2.25) return 'C';
    if (gpa >= 2.00) return 'D';
    return 'F';
}

// Save data to localStorage
function saveData() {
    const data = {
        semesters: []
    };
    
    for (let semNum = 1; semNum <= 8; semNum++) {
        const semester = document.getElementById(`semester-${semNum}`);
        const rows = semester.querySelectorAll('.course-row');
        const courses = [];
        
        rows.forEach(row => {
            courses.push({
                code: row.querySelector('.course-code').value,
                name: row.querySelector('.course-name').value,
                credit: row.querySelector('.course-credit').value,
                currentGrade: row.querySelector('.course-grade-current').value,
                expectedGrade: row.querySelector('.course-grade-expected').value
            });
        });
        
        data.semesters.push(courses);
    }
    
    localStorage.setItem('kuetCGPAData', JSON.stringify(data));
    alert('✅ Progress saved successfully!');
}

// Load data from localStorage
function loadSavedData() {
    const savedData = localStorage.getItem('kuetCGPAData');
    if (!savedData) return;
    
    try {
        const data = JSON.parse(savedData);
        
        for (let semNum = 1; semNum <= 8; semNum++) {
            if (!data.semesters[semNum - 1]) continue;
            
            const semester = document.getElementById(`semester-${semNum}`);
            const tbody = semester.querySelector('tbody');
            tbody.innerHTML = '';
            
            data.semesters[semNum - 1].forEach(course => {
                const row = document.createElement('tr');
                row.className = 'course-row';
                row.innerHTML = `
                    <td><input type="text" class="course-code" value="${course.code}" placeholder="Code"></td>
                    <td><input type="text" class="course-name" value="${course.name}" placeholder="Course Name"></td>
                    <td><input type="number" class="course-credit" value="${course.credit}" min="0" max="6" step="0.5"></td>
                    <td>
                        <select class="course-grade-current">
                            <option value="">-</option>
                            <option value="4.00" ${course.currentGrade === '4.00' ? 'selected' : ''}>A+</option>
                            <option value="3.75" ${course.currentGrade === '3.75' ? 'selected' : ''}>A</option>
                            <option value="3.50" ${course.currentGrade === '3.50' ? 'selected' : ''}>A-</option>
                            <option value="3.25" ${course.currentGrade === '3.25' ? 'selected' : ''}>B+</option>
                            <option value="3.00" ${course.currentGrade === '3.00' ? 'selected' : ''}>B</option>
                            <option value="2.75" ${course.currentGrade === '2.75' ? 'selected' : ''}>B-</option>
                            <option value="2.50" ${course.currentGrade === '2.50' ? 'selected' : ''}>C+</option>
                            <option value="2.25" ${course.currentGrade === '2.25' ? 'selected' : ''}>C</option>
                            <option value="2.00" ${course.currentGrade === '2.00' ? 'selected' : ''}>D</option>
                            <option value="0.00" ${course.currentGrade === '0.00' ? 'selected' : ''}>F</option>
                        </select>
                    </td>
                    <td>
                        <select class="course-grade-expected">
                            <option value="">-</option>
                            <option value="4.00" ${course.expectedGrade === '4.00' ? 'selected' : ''}>A+</option>
                            <option value="3.75" ${course.expectedGrade === '3.75' ? 'selected' : ''}>A</option>
                            <option value="3.50" ${course.expectedGrade === '3.50' ? 'selected' : ''}>A-</option>
                            <option value="3.25" ${course.expectedGrade === '3.25' ? 'selected' : ''}>B+</option>
                            <option value="3.00" ${course.expectedGrade === '3.00' ? 'selected' : ''}>B</option>
                            <option value="2.75" ${course.expectedGrade === '2.75' ? 'selected' : ''}>B-</option>
                            <option value="2.50" ${course.expectedGrade === '2.50' ? 'selected' : ''}>C+</option>
                            <option value="2.25" ${course.expectedGrade === '2.25' ? 'selected' : ''}>C</option>
                            <option value="2.00" ${course.expectedGrade === '2.00' ? 'selected' : ''}>D</option>
                            <option value="0.00" ${course.expectedGrade === '0.00' ? 'selected' : ''}>F</option>
                        </select>
                    </td>
                    <td><button class="remove-course-btn" onclick="removeCourse(this)">×</button></td>
                `;
                tbody.appendChild(row);
            });
        }
    } catch (e) {
        console.error('Error loading saved data:', e);
    }
}

// Load data manually
function loadData() {
    loadSavedData();
    calculateCGPA();
    alert('✅ Progress loaded successfully!');
}

// Reset all data
function resetAll() {
    if (confirm('⚠️ Are you sure you want to reset all data? This cannot be undone!')) {
        localStorage.removeItem('kuetCGPAData');
        location.reload();
    }
}

// Attach event listeners
function attachEventListeners() {
    document.getElementById('calculateAll').addEventListener('click', calculateCGPA);
    document.getElementById('resetAll').addEventListener('click', resetAll);
    document.getElementById('saveData').addEventListener('click', saveData);
    document.getElementById('loadData').addEventListener('click', loadData);
    document.getElementById('calculateTarget').addEventListener('click', calculateTargetGPA);
}
