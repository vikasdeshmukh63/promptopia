'use client'

// import necessary React components and styles
import React, { useState, useEffect } from 'react';
import PromptCard from './PromptCard';

// define the PromptCardList component
const PromptCardList = ({ data, handleTagClick }) => {
     // render a list of PromptCard components based on the provided data
     return (
          <div className='mt-16 prompt_layout'>
               {data.map((post) => {
                    return (
                         <PromptCard
                              key={post._id}
                              post={post}
                              handleTagClick={handleTagClick}
                         />
                    );
               })}
          </div>
     );
};

// define the Feed component
const Feed = () => {
     // State to manage search text and results
     const [searchText, setSearchText] = useState('');
     const [searchTimeout, setSearchTimeout] = useState(null);
     const [searchedResults, setSearchedResults] = useState([]);
     const [posts, setPost] = useState([]);

     // function to fetch prompts data
     const fetchPost = async () => {
          try {
               const response = await fetch('/api/prompt');
               const data = await response.json();
               setPost(data);
          } catch (error) {
               // handle any errors that occur during the fetch
               console.error('Error fetching prompts:', error);
          }
     };

     // useEffect to fetch prompts data when the component mounts
     useEffect(() => {
          fetchPost();
     }, []);

     // function to filter prompts based on search text
     const filterPrompts = (searchText) => {
          const regex = new RegExp(searchText, 'i');
          return posts.filter((item) => {
               return (
                    regex.test(item.creator.username) ||
                    regex.test(item.tag) ||
                    regex.test(item.prompt)
               );
          });
     };

     // function to handle changes in the search input
     const handleSearchChange = (e) => {
          clearTimeout(searchTimeout);
          setSearchText(e.target.value);

          // set a timeout to delay the search and avoid unnecessary requests
          setSearchTimeout(
               setTimeout(() => {
                    const searchResult = filterPrompts(e.target.value);
                    setSearchedResults(searchResult);
               }, 500)
          );
     };

     // function to handle clicks on tags for filtering prompts
     const handleTagClick = (tagName) => {
          setSearchText(tagName);
          const searchResult = filterPrompts(tagName);
          setSearchedResults(searchResult);
     };

     // render the Feed component with a search input and filtered prompts
     return (
          <section className='feed'>
               {/* search */}
               <form className='relative w-full flex-center'>
                    <input
                         type='text'
                         placeholder='Search for a tag or username'
                         value={searchText}
                         onChange={handleSearchChange}
                         required
                         className='search_input peer'
                    />
               </form>
               {/* render either searched results or all prompts based on search text */}
               {searchText ? (
                    <PromptCardList
                         data={searchedResults}
                         handleTagClick={handleTagClick}
                    />
               ) : (
                    <PromptCardList
                         data={posts}
                         handleTagClick={handleTagClick}
                    />
               )}
          </section>
     );
};

// export the Feed component as the default export
export default Feed;
