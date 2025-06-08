// // import React from 'react'
// // import {useGetNewMoviesQuery} from '../../pages/redux/api/movies'
// // import { Link } from 'react-router-dom'
// // import SliderUtil from '../../component/SliderUtil'

// // const Header = () => {

// //    const {data}=useGetNewMoviesQuery() 
// //   return (
// //     <div className='flex flex-col mt-[2rem] ml-[2rem] md:flex-row justify-between items-center md:items-start'>
// //         <nav className='w-full md:w-[10rem] ml-0 md:ml-2 mb-4 md:mb-0'>
// //           <Link to='/' className='transition duration-300 ease-in-out hover:bg-teal-200 block p-2 rounded mb-1 md:mb-2 text-lg'>Home</Link>
// //           <Link to='/movies' className='transition duration-300 ease-in-out hover:bg-teal-200 block p-2 rounded mb-1 md:mb-2 text-lg'>Browse Movies</Link>
// //         </nav>

// //         <div className='w-full md:w-[80%] mr-0 md:mr-2'>
// //             <SliderUtil data={data}/>
// //         </div>
// //     </div>
// //   )
// // }

// // export default Header



// import React from 'react'
// import { useGetNewMoviesQuery } from '../../pages/redux/api/movies'
// import { Link } from 'react-router-dom'
// import SliderUtil from '../../component/SliderUtil'

// const Header = () => {
//   const { data } = useGetNewMoviesQuery()

//   return (
//     <div className="flex flex-col md:flex-row gap-6 px-4 md:px-8 mt-6 md:mt-10">
//       {/* Navigation */}
//       <nav className="w-full md:w-1/5 flex flex-col gap-3">
//         <Link
//           to="/"
//           className="p-3 rounded text-lg text-gray-800 bg-gray-100 hover:bg-teal-200 transition-colors"
//         >
//           Home
//         </Link>
//         <Link
//           to="/movies"
//           className="p-3 rounded text-lg text-gray-800 bg-gray-100 hover:bg-teal-200 transition-colors"
//         >
//           Browse Movies
//         </Link>
//       </nav>

//       {/* Slider Content */}
//       <div className="w-full md:w-4/5">
//         <SliderUtil data={data} />
//       </div>
//     </div>
//   )
// }

// export default Header

import React from 'react';
import { useGetNewMoviesQuery } from '../../pages/redux/api/movies';
import { Link } from 'react-router-dom';
import SliderUtil from '../../component/SliderUtil';

const Header = () => {
  const { data } = useGetNewMoviesQuery();

  return (
    <div className="flex flex-col md:flex-row gap-6 px-4 md:px-10 mt-8 max-w-7xl mx-auto">
      {/* Navigation Panel */}
      <nav className="w-full md:w-1/4 lg:w-1/5 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-md flex flex-col gap-4">
      

        <Link
          to="/"
          className="py-2 px-4 rounded-lg bg-gray-800 text-white hover:bg-teal-500 transition duration-200 font-medium"
        >
          Home
        </Link>
        <Link
          to="/movies"
          className="py-2 px-4 rounded-lg bg-gray-800 text-white hover:bg-teal-500 transition duration-200 font-medium"
        >
          Browse Movies
        </Link>
      </nav>

      {/* Slider Section */}
      <div className="w-full md:w-3/4 lg:w-4/5">
        <div className="relative rounded-xl overflow-visible shadow-lg bg-gradient-to-br from-gray-800 to-gray-900 p-4">
          <SliderUtil data={data} />
        </div>
      </div>
    </div>
  );
};

export default Header;
