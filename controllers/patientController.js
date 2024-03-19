const Report = require('../models/reports');
const User = require('../models/user');

// Controller function to register a new patient
module.exports.register = async function(req, res) {
    try {
        // Check if the user with the given username already exists
        let user = await User.findOne({ username: req.body.number });

        if (user) {
            // If user already exists, return a success message with the existing user data
            return res.status(200).json({
                message: 'User Already Registered',
                data: {
                    user: user
                }
            });
        }

        // Create a new user as a patient with default password '12345'
        user = await User.create({
            username: req.body.number,
            name: req.body.name,
            password: '12345',
            type: 'Patient'
        });

        // Return a success message with the newly created user data
        return res.status(201).json({
            message: 'Patient registered successfully',
            data: user
        });
    } catch (error) {
        // Handle any errors that occur during user registration
        console.log(error);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
};

// Controller function to create a new report for a patient
module.exports.createReport = async function(req, res) {
    try {
        // Find the user (patient) by ID
        const user = await User.findById(req.params.id);

        // Check if the user exists
        if (!user) {
            return res.status(422).json({
                message: "Patient Does not exist"
            });
        }

        // Create a new report associated with the user (patient)
        const report = await Report.create({
            createdByDoctor: req.user.id, // Assuming req.user.id contains the ID of the logged-in doctor
            patient: req.params.id,
            status: req.body.status,
            date: new Date()
        });

        // Add the newly created report to the user's reports array
        user.reports.push(report);

        // Return a success message with the newly created report data
        return res.status(201).json({
            message: 'Report created successfully',
            data: report
        });
    } catch (error) {
        // Handle any errors that occur during report creation
        console.log(error);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
};

// Controller function to fetch reports of a patient
module.exports.patientReports = async function(req, res) {
    try {
        // Find all reports related to the specified patient ID, populate createdByDoctor field, and sort by date
        const reports = await Report.find({ patient: req.params.id }).populate('createdByDoctor').sort('date');

        // Format the date and create an array of report data for response
        const reportData = reports.map(report => {
            const originalDate = report.date;
            const dateObj = new Date(originalDate);
            const formattedDate = dateObj.toLocaleString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
            });

            return {
                createdByDoctor: report.createdByDoctor.name,
                status: report.status,
                date: formattedDate
            };
        });

        // Return a success message with the list of formatted reports
        return res.status(200).json({
            message: `List of Reports of User with id -  ${req.params.id}`,
            reports: reportData
        });
    } catch (error) {
        // Handle any errors that occur during report fetching
        console.log(error);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
};
