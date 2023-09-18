import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const JobsDescription = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    coverLetter: "",
    resumeFile: null,
  });
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate()
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === "resumeFile" ? files[0] : value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform actions with the form data here, like sending it to a server.
    // console.log(formData);
    setSubmitted(true);
  };
  const data = useSelector((state) => state.user.job);
  // console.log("The data",data)
  return (
    <>
      <div
        className="text-red-500 cursor-pointer w-[95%] mx-auto"
        onClick={() => navigate(-1)}
      >
        Back
      </div>
      <div className="flex flex-col gap-5 w-[95%] mx-auto">
        <div className="p-5 bg-slate-100 flex flex-col gap-3">
          <h1 className="text-3xl font-bold">{data.title}</h1>
          <p className="text-lg ">{data.company.display_name}</p>
          <button className="bg-green-500 text-white px-3 py-2 rounded-lg w-[30%] sm:w-[20%] md:w-[10%]">
            Apply
          </button>
        </div>
        <div className="flex flex-col gap-3 bg-slate-100 p-3">
          <p className="text-lg font-bold">Description</p>
          <p>{data.description}</p>
          <p className="text-lg font-bold">Location</p>
          <p>{data.location.display_name}</p>
          <p className="text-lg font-bold">Contract</p>
          <p>{data.contract_type}</p>
          <p className="text-lg font-bold">Salary</p>
          <p>
            {data.salary_min} to {data.salary_max}
          </p>
          <p className="text-lg font-bold">Created</p>
          <p>{data.created}</p>
          <p className="text-lg font-bold">Url</p>
          <p>{data.redirect_url}</p>
        </div>
        <div className="lex flex-col gap-3 bg-slate-100 p-3">
          <h2 className="text-xl font-semibold">Submit Your Resume</h2>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 pt-5 w-[95%] sm:w-2/3"
          >
            <div className="flex justify-between text-lg sm:text-xl items-center">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w[70%] sm:w-[80%] p-1 text-base sm:text-lg"
              />
            </div>
            <div className="flex justify-between text-lg sm:text-xl items-center">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w[70%] sm:w-[80%] p-1 text-base sm:text-lg"
              />
            </div>
            <div className="flex justify-between text-lg sm:text-xl items-center">
              <label htmlFor="coverLetter">Cover Letter:</label>
              <textarea
                id="coverLetter"
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                rows="3"
                required
                className="w[70%] sm:w-[80%] p-1 text-base sm:text-lg"
              />
            </div>
            <div className="flex justify-between text-lg sm:text-xl items-center">
              <label htmlFor="resumeFile">Upload Resume:</label>
              <input
                type="file"
                id="resumeFile"
                name="resumeFile"
                onChange={handleChange}
                accept=".pdf,.doc,.docx"
                required
              />
            </div>
            <div>
              <button
                type="submit"
                className="text-xl bg-orange-500 text-white px-3 py-2 rounded-lg"
              >
                Submit
              </button>
            </div>
          </form>
          {submitted && (
            <div className="lex flex-col gap-3 bg-slate-100 p-3">
              <h3 className=" text-2xl font-semibold mb-2">Preview:</h3>
              <p>
                <strong>Name:</strong> {formData.name}
              </p>
              <p>
                <strong>Email:</strong> {formData.email}
              </p>
              <p>
                <strong>Cover Letter:</strong> {formData.coverLetter}
              </p>
              <p>
                <strong>Resume:</strong>{" "}
                {formData.resumeFile
                  ? formData.resumeFile.name
                  : "No file selected"}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default JobsDescription