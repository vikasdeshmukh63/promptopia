// import necessary styles and components
import '@styles/global.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';

// defining metadata for the layout
export const metadata = {
    title: 'Promptopia',
    description: 'Discover and Share AI Prompts',
};

// define the RootLayout component
const RootLayout = ({ children }) => {
    // render the HTML structure of the layout
    return (
        <html lang='en'>
            <body>
                {/* wrap the content in the Provider component */}
                <Provider>
                    {/* main container div with a gradient background */}
                    <div className='main'>
                        <div className='gradient' />
                    </div>
                    {/* main application content */}
                    <main className='app'>
                        {/* navigation component */}
                        <Nav />
                        {/* render the children components */}
                        {children}
                    </main>
                </Provider>
            </body>
        </html>
    );
};

// export the RootLayout component as the default export
export default RootLayout;
