const SignUpUser = require("../models/SignupUser");

async function generateNextAdmno() {
  try {
    // Find the document with the highest `admno`
    const latestUser = await SignUpUser.findOne().sort({ admno: -1 }).exec();

    // Generate the next admission number
    let nextAdmno = "STUDENT-00001";
    if (latestUser) {
      const latestNumber = parseInt(latestUser.admno.split("-")[1], 10);
      nextAdmno = `STUDENT-${(latestNumber + 1).toString().padStart(5, "0")}`;
    }

    return nextAdmno;
  } catch (error) {
    console.error("Error generating next admission number:", error);
    throw error;
  }
}

module.exports = { generateNextAdmno };
