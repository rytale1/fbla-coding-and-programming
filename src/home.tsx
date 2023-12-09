import React, { useState } from "react";
import Layout from "./layout/Layout";
import PageTitle from "./layout/PageTitle";

// Define the type for the component props (if needed)
interface HomePageProps {}

// Create the functional component
const Home: React.FC<HomePageProps> = () => {
    // Define state variables using the useState hook
    const [counter, setCounter] = useState<number>(0);

    // Define a function to handle button click
    const handleButtonClick = () => {
        // Update the counter state when the button is clicked
        setCounter(counter + 1);
    };

    // Return the JSX structure of the component
    return (
        <Layout footer={2} headerBtn={true}>
            <PageTitle
                pageTitle="MVFBLA Coding and Programming"
                description="ooga booga."
            />
            <div style={{ textAlign: "center", marginTop: "50px" }}>
                <h1>Welcome to My Homepage</h1>
                <p>This is a simple React TypeScript homepage.</p>
                <p>Counter: {counter}</p>
                <button onClick={handleButtonClick}>Click me</button>
            </div>
        </Layout>
    );
};

// Export the component for use in other files
export default Home;
