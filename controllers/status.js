const Report = require('../models/reports')

// Controller function to fetch reports with a specific status
module.exports.filteredReports = async function(req, res) {
    try {
        // Find all reports with the specified status from the request parameters
        const reports = await Report.find({ status: req.params.status });

        // Return a success message with the list of filtered reports
        return res.status(200).json({
            message: `List of Reports with status ${req.params.status}`,
            reports: reports
        });
    } catch (error) {
        // Handle any errors that occur during report fetching
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}
