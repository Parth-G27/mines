import "@/styles/globals.css";
import Nav from "@/components/nav";
import Provider from "@/components/provider";
import { children } from 'react';

export const metadata = {
    title: 'Mines Game',
    description: 'Risk the Mines, Reap the Rewards! 🎮'
}

const Rootlayout = ({children}) => {
  return (
    <html lang='en'>
        <body className="dark:bg-medium dark:text-white">
            <Provider>
    
            <div className='main dark:bg-medium dark:text-white'>
                <div className='gradient'/>
            </div>

                <main className='app dark:bg-medium dark:text-white'>
                    <Nav/>
                    {children}
                </main>

            </Provider>
        </body>

    </html>
  )
}

export default Rootlayout