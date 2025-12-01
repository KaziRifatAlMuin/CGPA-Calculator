# 🎓 KUET CGPA Calculator

A comprehensive web-based CGPA (Cumulative Grade Point Average) calculator designed specifically for **Khulna University of Engineering & Technology (KUET)** students. This tool helps students track their academic progress, calculate their CGPA, and plan their future performance across all 8 semesters.

![KUET CGPA Calculator](https://img.shields.io/badge/KUET-CGPA%20Calculator-2563eb)
![Responsive](https://img.shields.io/badge/Responsive-Mobile%20%7C%20Tablet%20%7C%20Desktop-success)
![License](https://img.shields.io/badge/License-MIT-green)

## 🌟 Features

### 📊 **Comprehensive CGPA Tracking**

- Calculate CGPA across all 8 semesters
- Real-time GPA calculation for individual semesters
- Track completed credits vs. total credits required
- Academic status indicator (Honors Track, Excellent, Good Standing, etc.)

### 🎯 **Smart Grade Planner**

- Calculate required grades for target CGPA
- Intelligent analysis of achievable vs. unachievable targets
- Automatic grade recommendations for remaining courses
- Dual placement (top and bottom) for easy access

### 🏫 **Multi-Department Support**

- Support for all 16 KUET departments:
  - Computer Science & Engineering (CSE)
  - Civil Engineering (CE)
  - Electrical & Electronic Engineering (EEE)
  - Mechanical Engineering (ME)
  - Electronics & Communication Engineering (ECE)
  - Industrial Engineering & Management (IEM)
  - Urban & Regional Planning (URP)
  - Leather Engineering (LE)
  - Textile Engineering (TE)
  - Building Engineering & Construction Management (BECM)
  - Biomedical Engineering (BME)
  - Materials Science & Engineering (MSE)
  - Energy Science & Engineering (ESE)
  - Architecture (ARCH)
  - Mechatronics Engineering (MTE)
  - Chemical Engineering (ChE)

### 📱 **Fully Responsive Design**

- **Mobile-First Design**: Optimized for smartphones
- **Touch-Friendly**: Large tap targets and smooth scrolling
- **Adaptive Layouts**: Seamlessly scales across all devices
- **Compact Tables**: Horizontal scrolling for detailed data on mobile
- **Progressive Enhancement**: Better features on larger screens

### 💾 **Data Persistence**

- Auto-save functionality using browser localStorage
- Automatic data restoration on page reload
- No data loss even after closing the browser
- Manual clear option available

### 📈 **Advanced Features**

- **Session Auto-Detection**: Automatically detects student session from roll number
- **Expected Grade System**: Plan future grades alongside current grades
- **Course Management**: Add/remove courses dynamically
- **KUET Grading Scale**: Compliant with official KUET ordinance
- **Percentage Conversion**: Automatic CGPA to percentage conversion
- **Semester-wise GPA**: Individual GPA calculation for each semester

## 🚀 Live Demo

[🔗 Visit KUET CGPA Calculator](https://cgpa.rifatalmuin.com)

## 🛠️ Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with responsive design
  - CSS Grid & Flexbox for layouts
  - CSS Variables for theming
  - Media queries for responsiveness
  - Smooth animations and transitions
- **Vanilla JavaScript**: No framework dependencies
  - DOM manipulation
  - Local storage API
  - Event handling
  - Dynamic content generation

## 📦 Installation

### Option 1: Direct Download

1. Download the repository as ZIP
2. Extract the files
3. Open `index.html` in your browser

### Option 2: Git Clone

```bash
git clone https://github.com/KaziRifatAlMuin/CGPA-Calculator.git
cd CGPA-Calculator
```

Then open `index.html` in your preferred web browser.

### Option 3: Live Server (Recommended for Development)

```bash
# Using VS Code Live Server Extension
# or using Python
python -m http.server 8000

# or using Node.js
npx http-server
```

## 🎯 How to Use

### 1. **Enter Student Information**

- Enter your name
- Input your roll number (session auto-detected)
- Select your department

### 2. **Input Course Grades**

- Navigate through each semester
- Enter course codes and names (pre-filled for CSE)
- Input credit hours for each course
- Select letter grades from dropdown

### 3. **View Your CGPA**

- CGPA automatically calculated in real-time
- View semester-wise GPA
- Check academic status
- Monitor credit completion progress

### 4. **Use Smart Grade Planner**

- Enter your target CGPA
- Get recommendations for required grades
- See if target is achievable
- Plan your academic performance

### 5. **Manage Courses**

- Add new courses using "Add Course" button
- Remove courses with the × button
- Grades auto-save as you type

## 📐 KUET Grading System

The calculator uses the official KUET grading scale:

| Letter Grade | Percentage | Grade Point |
| ------------ | ---------- | ----------- |
| A+           | 80-100%    | 4.00        |
| A            | 75-79%     | 3.75        |
| A-           | 70-74%     | 3.50        |
| B+           | 65-69%     | 3.25        |
| B            | 60-64%     | 3.00        |
| B-           | 55-59%     | 2.75        |
| C+           | 50-54%     | 2.50        |
| C            | 45-49%     | 2.25        |
| D            | 40-44%     | 2.00        |
| F            | <40%       | 0.00        |

### Academic Requirements

- **Minimum CGPA**: 2.20 (to graduate)
- **Honors Track**: 3.75+ CGPA
- **Maximum Study Period**: 7 years

## 🔧 Customization

### Changing Colors

Edit CSS variables in `style.css`:

```css
:root {
	--primary-color: #2563eb;
	--secondary-color: #8b5cf6;
	--success-color: #10b981;
	--warning-color: #f59e0b;
	--error-color: #ef4444;
}
```

### Adding More Courses

Modify the `sampleCourses` object in `script.js`:

```javascript
const sampleCourses = {
	1: [
		{ code: "CSE 1101", name: "Course Name", credit: 3.0 },
		// Add more courses
	],
};
```

### Department Configuration

Update the `getCoursesForSemester()` function for department-specific courses.

## 📊 Features Breakdown

### Auto-Save System

- Saves data on every input change
- Uses browser's localStorage
- Data persists across sessions
- No server required

### Smart Grade Planner Algorithm

```javascript
// Calculates required GPA for remaining courses
requiredGPA = (targetCGPA × totalCredits - completedPoints) / remainingCredits

// Determines if target is achievable
if (requiredGPA > 4.00) → Target Impossible
if (requiredGPA < 0.00) → Target Already Achieved
else → Shows required performance
```

### Expected Grade System

- Plan future performance
- Dual grade tracking (current vs expected)
- Helps in strategic academic planning

## 🌐 Browser Support

| Browser | Supported Versions   |
| ------- | -------------------- |
| Chrome  | ✅ Latest 2 versions |
| Firefox | ✅ Latest 2 versions |
| Safari  | ✅ Latest 2 versions |
| Edge    | ✅ Latest 2 versions |
| Opera   | ✅ Latest 2 versions |

## 📱 Mobile Optimization

- **Touch-Optimized**: 44px minimum touch targets
- **Smooth Scrolling**: Enhanced for touch devices
- **Compact Layout**: Efficient use of screen space
- **Readable Text**: Font sizes scaled for mobile (16px minimum)
- **iOS Safari Compatible**: Prevents zoom on input focus

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Kazi Rifat Al Muin**

- GitHub: [@KaziRifatAlMuin](https://github.com/KaziRifatAlMuin)
- Repository: [CGPA-Calculator](https://github.com/KaziRifatAlMuin/CGPA-Calculator)

## 🙏 Acknowledgments

- KUET Academic Ordinance for grading system
- CSE Students for testing and feedback
- All KUET students using this tool

## 📞 Support

For support, issues, or feature requests:

- Open an issue on [GitHub Issues](https://github.com/KaziRifatAlMuin/CGPA-Calculator/issues)
- Contact via GitHub profile

## 🔄 Version History

### v2.0.0 (Current)

- ✅ Fully responsive mobile design
- ✅ Smart Grade Planner (dual placement)
- ✅ Multi-department support
- ✅ Auto-save functionality
- ✅ Expected grade system
- ✅ Session auto-detection

### v1.0.0

- Initial release with basic CGPA calculation

## 🎯 Future Enhancements

- [ ] Export data as PDF
- [ ] Dark mode toggle
- [ ] Multiple student profiles
- [ ] Cloud sync option
- [ ] Grade distribution graphs
- [ ] Semester comparison charts
- [ ] Course recommendation system
- [ ] GPA prediction using ML

## 💡 Tips for Students

1. **Keep It Updated**: Enter grades as soon as results are published
2. **Plan Ahead**: Use expected grades to strategize your study plan
3. **Set Realistic Targets**: Use Smart Planner to set achievable goals
4. **Track Progress**: Monitor your credit completion regularly
5. **Backup Data**: Take screenshots or export data periodically

## ⚠️ Disclaimer

This calculator is created for educational purposes and student convenience. While it follows KUET's grading system, please verify all calculations with your department for official academic records.

---

<div align="center">

**Made with ❤️ for KUET Students**

⭐ Star this repo if you find it helpful!

[Report Bug](https://github.com/KaziRifatAlMuin/CGPA-Calculator/issues) · [Request Feature](https://github.com/KaziRifatAlMuin/CGPA-Calculator/issues)

</div>
