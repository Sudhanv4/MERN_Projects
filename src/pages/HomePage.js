import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";


// const people = [
//   {
//     name: "John Doe",
//     title: "Front-end Developer",
//     department: "Engineering",
//     email: "john@devui.com",
//     role: "Developer",
//     image:
//       "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80",
//   },
//   {
//     name: "Jane Doe",
//     title: "Back-end Developer",
//     department: "Engineering",
//     email: "jane@devui.com",
//     role: "CTO",
//     image:
//       "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
//   },
// ];

const HomePage = () => {
  const [empData, setEmpData] = useState();
  const navigate=useNavigate();

  const handleDelete=async(id)=>{
    try{
      await fetch(
        `${process.env.REACT_APP_BASE_URL}/deleteUser`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "id":id
          })
        }
      );
    }
    catch(error){
     console.log(error)
    }
    getAllData()
  }

  const getAllData = async () => {
    try {
      const getPeople = await fetch(
        `${process.env.REACT_APP_BASE_URL}/getallUsers`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const res = await getPeople.json();
      setEmpData(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllData();
  },[]);
  console.log(empData);

  // console.log(empData);

  return (
    <>
    <div className=" bg-[url('https://res.cloudinary.com/dzqjofzf9/image/upload/v1691388804/photo-1495422964407-28c01bf82b0d_qnnkbs.jpg')] bg-cover bg-no-repeat">

    
      <section className=" container px-4 mx-auto py-4 ">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-100 dark:text-white">
              Employees
            </h2>
            <p className="mt-1 text-lg text-gray-300 dark:text-gray-300">
              This is a list of all employees. You can add new employees, edit
              or delete existing ones.
            </p>
          </div>
          <Link to={"/addemployee"}>
            <div>
              <button className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-sm font-semibold leading-7 text-white hover:bg-indigo-500 ">
                Add Employee
              </button>
            </div>
          </Link>
        </div>
        <div className="overflow-y-hidden overflow-x-hidden flex flex-col mt-6">
          <div className=" flex justify-center h-[88.8vh] -mx-4 -my-3 overflow-x-auto sm:-mx-6 lg:-mx-8">
           

           
            <div className="   overflow-auto  overflow-x-hidden  relative inline-block h-[84vh]  w-[98vw]   py-0 align-middle ">
              <div className="    py-2 px-6  dark:border-gray-700 md:rounded-lg">
                <table className="  min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="   bg-gray-50 dark:bg-gray-800">
                    <tr >
                      <th
                        scope="col"
                        className=" sticky top-0 backdrop-blur-lg py-3.5 px-4 text-lg font-bold text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <span >EMPLOYEE</span>
                      </th>
                      <th
                        scope="col"
                        className="sticky top-0 backdrop-blur-lg px-12 py-3.5 text-lg font-bold text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        TITLE
                      </th>

                      <th
                        scope="col"
                        className="sticky top-0 backdrop-blur-lg px-4 py-3.5 text-lg font-bold text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        ROLE
                      </th>
                      <th
                        scope="col"
                        className="sticky flex justify-center  top-0 backdrop-blur-lg px-4 py-3.5 text-lg font-bold text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                       DELETE
                      </th>
                    </tr>
                  </thead>

                  <tbody className=" bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {empData?.data.map((person) => (
                      <tr key={person.name}>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={person.image}
                                alt=""
                              />
                            </div>
                            <div className="ml-4 ">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {person.name}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-300">
                                {person.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-12 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {person.title}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-300">
                            {person.department}
                          </div>
                        </td>

                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                          {person.role}
                        </td>
                        <td className="px-4 py-4  flex justify-center whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        <div onClick={()=>handleDelete(person._id)}
                            
                            className=" bg-red-200 group hover:bg-red-400 transition-transform duration-300 cursor-pointer rounded-full p-3 mr-3">
                            <MdDelete className="text-red-800 group-hover:text-white" />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            
          </div>
           </div>
        </div>
      </section>
      </div>
    </>
  );
};

export default HomePage;
