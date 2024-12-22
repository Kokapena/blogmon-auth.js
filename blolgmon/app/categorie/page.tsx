// export default function Home() {
//     return (
//         <form className="w-full max-w-md">
//       <div className="mb-4">
//         <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
//           Email Address
//         </label>
//         <input
//           type="email"
//           id="email"
//           placeholder="Enter your email"
//           className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>
//       <div className="mb-4">
//         <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
//           Password
//         </label>
//         <input
//           type="password"
//           id="password"
//           placeholder="Enter your password"
//           className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>
//       <button
//         type="submit"
//         className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
//       >
//         Login
//       </button>
//     </form>
//     );
// }

import { signIn } from "next-auth/react";

export default function Login() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      alert(res.error);
    } else {
      window.location.href = "/";
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
}
