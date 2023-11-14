// import necessary components
import Feed from '@components/Feed';

// define the Home component
const Home = () => {
     // render the content of the home page
     return (
          <section className='w-full flex-center flex-col'>
               {/* title */}
               <h1 className='head_text text-center'>
                    Discover & Share <br className='max-md:hidden' />{' '}
                    <span className='orange_gradient text-center'>
                         AI-Powered Prompts
                    </span>
               </h1>
               {/* description */}
               <p className='desc text-center'>
                    Promptopia is an open-source AI prompting tool for the
                    modern world to discover, create, and share creative prompts
               </p>
               {/* render the Feed component for displaying prompts */}
               <Feed />
          </section>
     );
};

// export the Home component as the default export
export default Home;
