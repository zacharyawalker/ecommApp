// HomePage.js


const AppHome = () => {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundImage: "url('https://source.unsplash.com/random/1600x900')",
      backgroundSize: "cover",
      color: "#fff",
      textAlign: "center",
      padding: "0 20px",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      padding: "20px",
      borderRadius: "10px",
    },
    header: {
      fontSize: "3em",
      fontWeight: "bold",
      margin: "0.5em 0",
    },
    subheader: {
      fontSize: "1.5em",
      margin: "0.5em 0 1.5em",
      lineHeight: "1.4",
    },
    button: {
      backgroundColor: "#4CAF50",
      color: "white",
      padding: "10px 20px",
      fontSize: "1em",
      fontWeight: "bold",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    buttonHover: {
      backgroundColor: "#45a049",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <h1 style={styles.header}>Welcome to theOne</h1>
        <p style={styles.subheader}>
          Discover the ultimate platform for personalized connections and
          professional insights. Your journey starts here.
        </p>
        <button
          style={styles.button}
          onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
          onClick={() => alert("Welcome to theOne!")}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default AppHome;