import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import { Link, useNavigate } from 'react-router-dom'; 

const Home = () => { 
  const [data, setData] = useState([]); 
  const [newPost, setNewPost] = useState(''); 
  const [error, setError] = useState(''); 
  const [loading, setLoading] = useState(true); 

  const navigate = useNavigate(); 

  useEffect(() => { 
    const fetchPosts = async () => { 
      try { 
        const response = await axios.get('https://cactus-t49s.onrender.com/post/showpost', { 
          headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }, 
        }); 
        setData(response.data.data); 
        setLoading(false); 
      } catch (error) { 
        setError('Error fetching posts'); 
        setLoading(false); 
      } 
    }; 

    fetchPosts(); 
  }, []); 

  const handlePostChange = (e) => { 
    setNewPost(e.target.value); 
  }; 

  const handlePostSubmit = async () => { 
    if (newPost.trim()) { 
      try { 
        const newPostData = { 
          content: newPost, 
        }; 

        setData([newPostData, ...data]); 
        setNewPost(''); 

        const response = await axios.post( 
          'https://cactus-t49s.onrender.com/post/createpost', 
          { content: newPost }, 
          { 
            headers: { 
              Authorization: `Bearer ${localStorage.getItem('authToken')}`, 
            }, 
          } 
        ); 

        setData((prevData) => 
          prevData.map((post) => 
            post._id === newPostData._id ? response.data.data.post : post 
          ) 
        ); 

        alert('Post submitted successfully!'); 
        navigate('/home'); 
      } catch (error) { 
        console.error('Error creating post:', error); 
        setError('Error creating post. Please try again later.'); 
        setData(data); 
      } 
    } else { 
      setError('Post content cannot be empty.'); 
    } 
  }; 

  const renderPosts = () => { 
    if (!data || data.length === 0) { 
      return <p>No posts available.</p>; 
    } 

    return data.map((post) => { 
      if (!post || !post._id) return null; 

      return ( 
        <div key={post._id}> 
          <p>{post.content}</p> 
        </div> 
      ); 
    }); 
  }; 

  if (loading) { 
    return ( 
      <div className="flex justify-center items-center min-h-screen"> 
        <div className="typewriter"> 
          <div className="slide"> 
            <i></i> 
          </div> 
          <div className="paper"></div> 
          <div className="keyboard"></div> 
        </div> 
      </div> 
    ); 
  } 

  if (error) { 
    return <div>{error}</div>; 
  } 

  return ( 
    <div className="container p-0 min-h-screen"> 
      <div className="container py-2 gap-2"> 
        <div className="flex flex-col gap-2 p-4 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 rounded-lg shadow-md mx-auto"> 
          <textarea 
            className="w-full p-2 bg-card border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500" 
            rows="3" 
            placeholder="What's happening?" 
            value={newPost} 
            onChange={handlePostChange} 
          ></textarea> 
          <button 
            className="self-end px-4 py-2 bg-home text-black rounded-lg hover:bg-home active:bg-home focus:outline-none focus:ring-2 focus:ring-home focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105 active:scale-95" 
            onClick={handlePostSubmit} 
          > 
            Post 
          </button> 
        </div> 
      </div> 

      <div className="flex flex-col gap-2 p-0"> 
        {data.map((d) => { 
          if (!d || !d._id || !d.user || !d.profile) return null; 

          return ( 
            <div 
              key={d._id} 
              className="flex flex-col w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 text-white p-4 shadow-md rounded-lg mx-auto" 
            > 
              <div className="flex flex-row w-full"> 
                <div className="basis-1/6"> 
                  <Link to={`/profile/${d.user._id}`}> 
                    <img 
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full cursor-pointer" 
                      src={d.profile?.profilepic || 'https://static-00.iconduck.com/assets.00/user-circle-icon-2048x2048-rbk3fbd1.png'} 
                      alt="profile" 
                    /> 
                  </Link> 
                </div> 
                <div className="basis-5/6 flex-grow"> 
                  <Link to={`/profile/${d.user._id}`}> 
                    <p className="font-medium text-sm sm:text-sm md:text-base lg:text-lg text-white cursor-pointer"> 
                      {d.profile?.firstname} {d.profile?.lastname} 
                    </p> 
                  </Link> 
                  <p className="text-gray-500 text-xs sm:text-sm md:text-base lg:text-base"> 
                    {d.user.Y_id} 
                  </p> 
                  <div className="my-5 w-full h-auto text-xs sm:text-sm md:text-base lg:text-base text-white"> 
                    <p className="quicksand-text text-sm md:text-lg">{d.content}</p> 
                  </div> 
                </div> 
              </div> 

              {d.image && ( 
                <div className="relative w-full pt-[100%] overflow-hidden rounded-lg"> 
                  <img 
                    src={d.image} 
                    alt="post" 
                    className="absolute top-0 left-0 w-full h-full object-cover" 
                  /> 
                </div> 
              )} 

              <p className="text-gray-400 text-xs sm:text-sm md:text-base lg:text-base"> 
                <span className="text-gray-400 text-xs sm:text-sm md:text-base lg:text-base"> 
                  {new Date(d.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} 
                </span> 
              </p> 
            </div> 
          ); 
        })} 
      </div> 
    </div> 
  ); 
}; 

export default Home; 
