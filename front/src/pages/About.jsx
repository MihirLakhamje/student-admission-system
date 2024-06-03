import React from "react";

export default function About() {
  return (
    <>
      <div className="flex flex-col gap-4">
        <section>
          <h1 className="text-3xl font-bold">About</h1>
          <p>
            Welcome to the Student Admission System, a platform I have
            personally crafted to streamline and enhance the admissions process
            for students and administrators. This system reflects my dedication
            to creating an efficient, secure, and user-friendly experience,
            leveraging my skills in web development and a deep understanding of
            user needs.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold">Features</h2>
          <ul className="list-disc ms-4">
            <li>Authentication and authorization</li>
            <li>Programme management</li>
            <li>Application management</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold">Technologies</h2>
          <ul className="list-disc ms-4">
            <li>
              <b>Frontend: </b>
              The user interface is built with modern web technologies like HTML5, CSS3, and JavaScript, using frameworks such as React for a dynamic and responsive user experience.
            </li>
            <li>
              <b>Backend: </b>
              The backend is built with Node.js, Express, and MongoDB, leveraging the Mongoose library for database management and authentication.
            </li>
            <li>
              <b>Database: </b>
              The database is hosted on MongoDB Atlas.
            </li>
          </ul>
        </section>
      </div>
    </>
  );
}
