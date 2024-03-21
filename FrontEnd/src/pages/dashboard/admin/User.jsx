import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa";

const User = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    },
  });
  const handleCheckRole = (user) => {
    if (user.role === "admin" ) {
        axiosSecure.patch(`/users/user/${user._id}`).then(()=>{
            refetch();
            Swal.fire({
                title: "Change role admin to user",
                icon: "success",
               
              });
            
           
        })

    }axiosSecure.patch(`/users/admin/${user._id}`).then(()=>{
        refetch();
        Swal.fire({
            title: "Change role user to admin",
            icon: "success",
           
          });
        
    })
    
  }
  return (
    <div>
      <div className=" flex justify-between mx-4 my-4">
        <h2 className=" text-2xl"> All users</h2>
        <h2 className=" text-2xl"> {users.length}</h2>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra md:w-[870]">
            {/* head */}
            <thead className="bg-red text-white text-center">
              <tr>
                <th>
                  <label>#</label>
                </th>
                <th>Name</th>
                <th>Job</th>
                <th>Favorite Color</th>
                <th> Action</th>
              </tr>
            </thead>
            
            <tbody>
              {/* row 1 */}
             
              {users.map((user, index) => (
                <tr key={index}>
                  <th>
                    <label>{index + 1}</label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={users.photoURL}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td className="">
                    User
                    <input
                      type="checkbox"
                      className="toggle"
                      onClick={() => handleCheckRole(user)}
                      checked={user.role === "admin"}
                    />
                    Admin
                  </td>
                  <th>
                    <button className="btn btn-ghost btn-xs"><FaTrash/></button>
                  </th>
                </tr>
              ))}
            </tbody>
            {/* foot */}
            <tfoot>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Job</th>
                <th>Favorite Color</th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default User;
