const Sandbox = () => {
    const apiUrl = import.meta.env.VITE_API_BASEURL
    console.log(apiUrl)
    return (
        <>
            <h1>Test</h1>
            <h1>{apiUrl}</h1>
        </>
    );
};
export default Sandbox;