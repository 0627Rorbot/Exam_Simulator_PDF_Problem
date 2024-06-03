import React from 'react';
import Header from '../Components/Header'
// import SearchBar from '../Components/SearchBar'
import { useAuth } from '../Hooks/useAuth';

const Home = () => {
    const {isAuthenticated} = useAuth()
    
    return (
        <div>
            <Header />
            {/* <div style={{paddingTop: "50px", paddingBottom: "50px"}}>
                <SearchBar />
            </div> */}
            {/* {isAuthenticated && <Problem />} */}
            
        </div>
        
    );
}

export default Home;